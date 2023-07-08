import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import {useAuthStore} from "@/store";
import {appConst} from "@/helpers";

const {ROLE_STUDENT} = appConst;
const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: '/get-start'
    },
    {
        path: '/get-start',
        name: 'getStart',
        component: () => import('../views/GetStartPage.vue'),
    },
    {
        path: '/chat',
        name: 'Chat',
        component: () => import('../views/Chat/index.vue'),
    },
    {
        path: '/chat/login',
        name: 'ChatLogin',
        component: () => import('../views/Chat/Login.vue'),
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile/index.vue'),
    },
    {
        path: '/profile/login',
        name: 'ProfileLogin',
        component: () => import('../views/Profile/Login.vue'),
    },
    {
        path: '/explore',
        name: 'Explore',
        component: () => import('../views/Explore/index.vue'),
    },
    {
        path: '/explore/universitymore',
        name: 'UniversityMore',
        component: () => import('../views/Explore/UniversityMore.vue'),
    },
    {
        path: '/explore/studydestination',
        name: 'StudyDestination',
        component: () => import('../views/Explore/StudyDestination.vue'),
    },
    {
        path: '/explore/studydestination/:id',
        name: 'StudyDestinationRegion',
        component: () => import('../views/Explore/StudyDestinationRegion.vue'),
    },
    {
        path: '/explore/getinspired',
        name: 'GetInspired',
        component: () => import('../views/Explore/GetInspired.vue'),
    },
    {
        path: '/explore/unlockingsec',
        name: 'UnlockingSec',
        component: () => import('../views/Explore/UnlockingSec.vue'),
    },
    {
        path: '/explore/searchpage/:keyword',
        name: 'Search',
        component: () => import('../views/Explore/SearchPage.vue'),
    },
    {
        path: '/explore/searchdetailpage/:keyword',
        name: 'SearchDetail',
        component: () => import('../views/Explore/SearchDetailPage.vue'),
    },
    {
        path: '/explore/toparticles',
        name: 'TopArticles',
        component: () => import('../views/Explore/TopArticles.vue'),
    },
    {
        path: '/profile/qrmain',
        name: 'QrMain',
        component: () => import('../views/Profile/QrMainPage.vue'),
    },
    {
        path: '/profile/qrindv',
        name: 'QrIndv',
        component: () => import('../views/Profile/QrIndvPage.vue'),
    },
    {
        path: '/profile/qrscanned',
        name: 'QrScanned',
        component: () => import('../views/Profile/QrScannedPage.vue'),
    },
    {
        path: '/application',
        name: 'Application',
        component: () => import('../views/Application/index.vue'),
    },
    {
        path: '/application/login',
        name: 'ApplicationLogin',
        component: () => import('../views/Application/Login.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomePage.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import ('../views/Auth/UserLogin.vue'),
        meta: {hideMenu: true}
    },
    {
        path: '/register',
        name: 'register',
        component: () => import ('../views/Auth/UserRegister.vue'),
        meta: {hideMenu: true}
    },
    {
        path: '/forget-password',
        name: 'forgetPassword',
        component: () => import ('../views/Auth/ForgetPassword.vue'),
        meta: {hideMenu: true}
    },
    {
        path: '/verify-code',
        name: 'verifyOtp',
        component: () => import ('../views/Auth/VerifyCode.vue'),
        meta: {hideMenu: true}
    },
    {
        path: '/rest-password',
        name: 'resetPassword',
        component: () => import ('../views/Auth/ResetPassword.vue'),
        meta: {hideMenu: true}
    },
    {
        path: '/verify-email',
        name: 'verifyEmail',
        component: () => import ('../views/Auth/VerifyEmail.vue'),
        meta: {hideMenu: true}
    },
    {
        path: '/update-email',
        name: 'updateEmail',
        component: () => import ('../views/Auth/UpdateEmail.vue'),
        meta: {hideMenu: true}
    },
    {
        path: "/user/update-email",
        component: () => import("../views/User/UpdateEmail.vue"),
        name: 'user.update.email',
    },
    {
        path: "/user/update-phone-number",
        component: () => import("../views/User/UpdatePhoneNumber.vue"),
        name: 'user.update.phone',
    },
    {
        path: "/user/update-password",
        component: () => import("../views/User/UpdatePassword.vue"),
        name: 'user.update.password',
    },
    {
        path: "/user/delete-account",
        component: () => import("../views/User/DeleteAccount.vue"),
        name: 'user.delete',
    },
    {
        path: "/user/profile/setup/step/1",
        component: () => import("../views/User/SetupProfile/ProfileStep1.vue"),
        name: 'user.profile.setup1',
    },
    {
        path: "/user/profile/setup/step/2",
        component: () => import("../views/User/SetupProfile/ProfileStep2.vue"),
        name: 'user.profile.setup2',
    },
    {
        path: "/user/profile/setup/step/3",
        component: () => import("../views/User/SetupProfile/ProfileStep3.vue"),
        name: 'user.profile.setup3',
    },
    {
        path: "/user/profile/setup/step/4",
        component: () => import("../views/User/SetupProfile/ProfileStep4.vue"),
        name: 'user.profile.setup4',
    },
    {
        path: "/user/profile/setup/step/5",
        component: () => import("../views/User/SetupProfile/ProfileStep5.vue"),
        name: 'user.profile.setup5',
    },
    {
        path: "/user/profile/setup/step/6",
        component: () => import("../views/User/SetupProfile/ProfileStep6.vue"),
        name: 'user.profile.setup6',
    },
    {
        path: "/user/profile/setup/step/7",
        component: () => import("../views/User/SetupProfile/ProfileStep7.vue"),
        name: 'user.profile.setup7',
    },
    {
        path: "/user/profile/setup/step/8",
        component: () => import("../views/User/SetupProfile/ProfileStep8.vue"),
        name: 'user.profile.setup8',
    },
    {
        path: "/user/profile/setup/step/9",
        component: () => import("../views/User/SetupProfile/ProfileStep9.vue"),
        name: 'user.profile.setup9',
    },

    //Rep Routes
    {
        path: '/rep-home',
        name: 'rep-home',
        component: () => import('../views/RepHomePage.vue'),
        meta: {repMenu: true},
    },
    {
        path: '/university/save-lead/:id',
        name: 'save-lead',
        component: () => import('../views/UniversityRep/AddNewLead.vue'),
        meta: {repMenu: true},
    },
    {
        path: '/university/leads',
        name: 'rep-leads',
        component: () => import('../views/UniversityRep/LeadsPage.vue'),
        meta: {repMenu: true},
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = [
        '/login',
        '/explore',
        '/explore/universitymore',
        '/explore/studydestination',
        '/explore/studydestination/:id',
        // '/explore/studydestinationcountry/:id',

        '/register',
        '/forget-password',
        '/verify-code',
        '/rest-password',
        '/get-start',
        '/home',
        // '/chat',
        // '/application',
        '/chat/login',
        '/application/login',
        '/profile/login',
    ];
    // const authRequired = !publicPages.includes(to.path);
    const authRequired = false;
    const {isLoggedIn, isVerified, currentStep, profileCompleted, roleId} = useAuthStore();

    if (authRequired && !isLoggedIn && to.path == '/chat') {
        return '/chat/login';
    }

    if (authRequired && !isLoggedIn && to.path == '/application') {
        return '/application/login';
    }

    if (authRequired && !isLoggedIn && to.path == '/profile') {
        return '/profile/login';
    }

    if (authRequired && !isLoggedIn) {
        return '/login';
    }


    if (isLoggedIn && isVerified && (to.path.includes('user/update-') || to.path.includes('user/delete-'))) {
        return;
    }

    if (isLoggedIn && isVerified && roleId != ROLE_STUDENT && to.path.includes('university')) {
        return;
    }

    if (isLoggedIn && isVerified && roleId != ROLE_STUDENT && to.path != '/rep-home') {
        return '/rep-home';
    }


    if (!authRequired && isLoggedIn && isVerified) {
        return '/home';
    }

    if ((isLoggedIn && !isVerified) && to.path == '/update-email') {
        return;
    }

    if ((isLoggedIn && !isVerified) && to.path != '/verify-email') {
        return '/verify-email'
    }

    const base_path = '/user/profile/setup/step';
    const profile_path = `${base_path}/${currentStep}`;
    if (isVerified && roleId == ROLE_STUDENT && to.path != profile_path && isLoggedIn && !profileCompleted && !to.path.includes(base_path)) {
        return profile_path;
    }
});
export default router
