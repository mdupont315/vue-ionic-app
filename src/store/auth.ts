import {defineStore} from 'pinia';
import {appConst, fetchWrapper} from "@/helpers";
import {useLoadingStore} from "@/store/loading";

const USER_PROFILE_STORAGE_KEY = 'user';
const USER_TOKEN_STORAGE_KEY = 'user-token';
const USER_VERIFICATION_STORAGE_KEY = 'user-verify';
const USER_PROFILE_COMPLETED_STORAGE_KEY = 'user-profile-completed';
const USER_ROLE_ID = 'user-role-id';
const USER_RESEND_CODE_IN = 'user-resend-code-in'
const {BASE_URL, ROLE_STUDENT} = appConst;
const localUser = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
const resendCodeIn = localStorage.getItem(USER_RESEND_CODE_IN);
// const {showToast} = useToast();
// export interface User {
//     user: any;
//     token: any;
//     userError: any;
// }

// interface State {
//     user: any | null;
//     profile: any;
//     error: null;
//     returnUrl: null
// }

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: localUser ? JSON.parse(localUser) : undefined,
        can_resend_code_in: resendCodeIn? parseInt(resendCodeIn) : 0,
        token: localStorage.getItem(USER_TOKEN_STORAGE_KEY),
        verified: localStorage.getItem(USER_VERIFICATION_STORAGE_KEY),
        completed: localStorage.getItem(USER_PROFILE_COMPLETED_STORAGE_KEY),
        role:localStorage.getItem(USER_ROLE_ID),
        error: {
            message: null,
        },
        returnUrl: null
    }),
    getters: {
        isLoggedIn: (state) => state.token !== null,
        roleId: (state) => parseInt(state.role || ROLE_STUDENT.toString()),
        userToken: (state) => state.token,
        userError: (state) => state.error,
        currentStep: (state) => parseInt(state.user?.user_bio?.profile_completion_status || 0) + 1,
        actualStep: (state) => parseInt(state.user?.user_bio?.profile_completion_status || 0),
        isVerified: (state) => state.verified,
        profileCompleted: (state) => state.completed == 'true',
        sendCodeIn: (state) => `00:${(state.can_resend_code_in < 10 ? '0' :'')} ${state.can_resend_code_in}`,
    },

    actions: {
        async login(email: string, password: string) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/user/login`, {email, password});
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(data => {
                try {
                    this.setUserData(data);
                    this.updateCanSendCodeIn(60);
                    //TODO: get can send verification in time
                    return true;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            })
        },
        async requestOtp(email: string) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/request-otp`, {email});
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });

            }
            return response.json().then(() => {
                return true;
            })
        },
        async loadUserData() {
            // console.log("loading User Data...");
            if (!this.isLoggedIn || this.user) return Promise.resolve(true);
            const response = await fetchWrapper.get(`${BASE_URL}/user/get`);
            if (!response.ok) {
                if ([401, 403].includes(response.status) && this.isLoggedIn) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    this.logout();
                }
                return Promise.resolve(true);
            }
            response.json().then(({data}) => {
                this.setProfileData(data);
            });
            return Promise.resolve(true);
        },
        async resetPassword(formData: any) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/reset-password`, formData);
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(() => {
                return true;
            })
        },
        async logout() {
            try {
                // await fetchWrapper.get(`${BASE_URL}/logout`);
                this.user = null;
                this.token = null;
                this.verified = null;
                this.completed = 'false';
                localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
                localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
                localStorage.removeItem(USER_VERIFICATION_STORAGE_KEY);
                localStorage.removeItem(USER_PROFILE_COMPLETED_STORAGE_KEY);
                localStorage.removeItem(USER_ROLE_ID);
                // localStorage.removeItem(USER_RESEND_CODE_IN);
                this.resetErrors();
                return true;
            } catch (e: any) {
                this.error = e;
                // console.log(e);
                return false;
            }
        },
        async register(form:any) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/register`, form);

            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });

            }
            return response.json().then(data => {
                try {
                    this.setUserData(data);
                    this.updateCanSendCodeIn(60);
                    return true;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            });
        },
        async verifyEmail(form: any) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/email/verify`, form);
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(data => {
                try {
                    this.setUserVerification(data.user.email_verified_at);
                    this.updateCanSendCodeIn(0);
                    return true;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            });
        },
        async updateEmail(form: any) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/email/update`, form);
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(() => {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.user.email = form.email;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.user.user_bio.mobile= form.mobile;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.user.user_bio.mobile_country_id= form.mobile_country_id;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.user.user_bio.mobile_number= `+${form.mobile_country_id}${form.mobile}`;
                    this.updateCanSendCodeIn(60);
                    return true;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            });
        },
        async updateEmailOnly(form: any) {
            this.resetErrors();
            if (this.user.email == form.email) return true;
            const response = await fetchWrapper.post(`${BASE_URL}/user/update-email`, form);
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(() => {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.user.email = form.email;
                    this.setUserVerification(null);
                    this.updateCanSendCodeIn(60);
                    return true;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            });
        },
        async updatePhoneNumber(form: any) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/user/update-phone`, form);
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(() => {
                try {
                    this.user.user_bio.mobile= form.mobile;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.user.user_bio.mobile_country_id= form.mobile_country_id;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.user.user_bio.mobile_number= `+${form.mobile_country_id}${form.mobile}`;
                    this.setUserVerification(null);
                    this.updateCanSendCodeIn(60);
                    return true;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            });
        },
        async updatePassword(form: any) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/user/update-password`, form);
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(() => {
                try {
                    return true;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            });
        },
        async deleteAccount(form: any) {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/user/delete-account`, form);
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(() => {
                try {
                    return true;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            });
        },

        async resendVerifyEmail() {
            this.resetErrors();
            const response = await fetchWrapper.post(`${BASE_URL}/email/resend-verification`, {});
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });

            }
            this.updateCanSendCodeIn(60);
            return true;
        },
        resetErrors() {
            this.error = {
                message: null
            };
        },
        setProfileData(user: any, key: undefined | string = undefined) {
            try {
                if (key) {
                    this.user[key] = user[key]
                } else {
                    this.user = user;
                }
                this.setUserProfileCompleted(this.user.user_bio.profile_completion_status);
            } catch (e: any) {
                throw new Error();
                // //showToast({message: 'Something Went Wrong!', color: 'danger'});
            }
            // localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(user));
        },
        updateUserProfileData(key: string, value: any) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.user.profile_data[key] = value;
            this.setProfileData(this.user);
        },
        setUserBioData(bio: any) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.user.user_bio = bio;
            this.setProfileData(this.user);
        },
        updateUserBioProfileStatus(bio: any) {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.user.user_bio.profile_completion_status = bio.profile_completion_status;
                this.setProfileData(this.user);
                this.setUserProfileCompleted(bio.profile_completion_status);
            } catch (e: any) {
                const {hideLoading} = useLoadingStore();
                hideLoading()
                //showToast({message: 'Something Went Wrong!', color: "danger"})
                throw new Error();
            }

        },
        setUserData(user: any) {
            try {
                this.setProfileData(user);
                this.setUserToken(user.token);
                this.setUserVerification(user.email_verified_at);
                this.setUserProfileCompleted(user.user_bio.profile_completion_status);
                this.setUserRoleId(user.role_id);
            } catch (e: any) {
                const {hideLoading} = useLoadingStore();
                hideLoading()
                throw new Error();
            }

        },
        setUserToken(token: string) {
            try {
                this.token = token;
                localStorage.setItem(USER_TOKEN_STORAGE_KEY, token);
            } catch (e: any) {
                const {hideLoading} = useLoadingStore();
                hideLoading()
                throw new Error();
            }
        },
        setUserVerification(verification: string | null) {
            try {
                this.verified = verification;
                localStorage.setItem(USER_VERIFICATION_STORAGE_KEY, verification || '');
            } catch (e: any) {
                const {hideLoading} = useLoadingStore();
                hideLoading()
                throw new Error();
            }
        },
        setUserProfileCompleted(status: any) {
            try {
                this.completed = String(status >= 9);
                localStorage.setItem(USER_PROFILE_COMPLETED_STORAGE_KEY, this.completed);
            } catch (e: any) {
                const {hideLoading} = useLoadingStore();
                hideLoading()
                throw new Error();
            }
        },
        setUserRoleId(role:any){
            this.role = role
            localStorage.setItem(USER_ROLE_ID, role.toString());
        },
        updateCanSendCodeIn(secs:number){
            this.can_resend_code_in = secs;
            localStorage.setItem(USER_RESEND_CODE_IN, secs.toString());
        },
        async checkAccount(email: string) {
            this.resetErrors();
            // https://uniranks.com/ranking/api/app/v2/user/check-account?apikey={API_SECRET}
            const response = await fetchWrapper.post(`${BASE_URL}/user/check-account`, {email: email});
            if (!response.ok) {
                return response.json().then((res) => {
                    this.error = res;
                    return false;
                });
            }
            return response.json().then(data => {
                try {
                    console.log(data);
                    // this.setUserData(data);
                    // this.updateCanSendCodeIn(60);
                    //TODO: get can send verification in time
                    return data;
                } catch (e: any) {
                    //showToast({message: 'Something Went Wrong!', color: 'danger'});
                    return false;
                }
            })
        }
    }
});

