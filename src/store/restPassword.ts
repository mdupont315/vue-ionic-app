import {defineStore} from 'pinia';

export const useRestPasswordStore = defineStore({
    id: 'restPassword',
    state: () => ({
        token: '',
        email: '',
    }),
    actions: {
        setEmail(email: string) {
            this.email = email
        },
        setToken(token: string) {
            this.token = token;
        }
    }
});
