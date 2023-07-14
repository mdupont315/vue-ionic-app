import {scan, location,people} from "ionicons/icons";
import {useRoute} from "vue-router";
import {useIonRouter} from "@ionic/vue";

// import {useIonRouter} from "@ionic/vue";

export function usePages() {
    // const router = useRouter();
    const iRouter =  useIonRouter();

    const route = useRoute();
    const appPages = [
        {
            title: 'My QR Code',
            url: '/home',
            icon:'assets/images/icons/qr-code.svg'
        },
    ];
    const repMenu = [
        {
            title: 'Scan',
            url: '/rep-home',
            icon:scan
        },
        {
            title: 'Leads',
            url: '/university/leads',
            icon:people
        },
    ];
    const setup_profile_base_url = '/profile/setup/step';
    const setupProfilePages = [
        {
            title: 'Personal Information',
            url: `${setup_profile_base_url}/1`,
            icon: 'assets/images/icons/personal-info.svg',
        },
        {
            title: 'Select Country',
            url: `${setup_profile_base_url}/2`,
            icon: location,
        },
        {
            title: 'School Information',
            url: `${setup_profile_base_url}/3`,
            icon: 'assets/images/icons/school.svg'
        },
        {
            title: 'Select Majors',
            url: `${setup_profile_base_url}/4`,
            icon: 'assets/images/icons/majors.svg'
        },
        {
            title: 'Study Budget',
            url: `${setup_profile_base_url}/5`,
            icon: 'assets/images/icons/budget.svg'
        },
        {
            title: 'Study Destination',
            url: `${setup_profile_base_url}/6`,
            icon: 'assets/images/icons/location.svg'
        },
        {
            title: 'Select Universities',
            url: `${setup_profile_base_url}/7`,
            icon: 'assets/images/icons/university.svg'
        },
        {
            title: 'Select Hobbies',
            url: `${setup_profile_base_url}/8`,
            icon: 'assets/images/icons/hobbies.svg'
        },
        {
            title: 'Upload Photo',
            url: `${setup_profile_base_url}/9`,
            icon: 'assets/images/icons/photo.svg'
        },
    ];

    const activePageId = () => {
        const path = route.path;
        if (!path.includes(setup_profile_base_url)) return 0;
        return path.split('/').pop()
    }

    const isSelected = (url: string) => {
        activePageId();
        return route.path == url;
    }

    const isStepActive = (step: any) => step == activePageId();

    const checkoutSetupProfileStep = (step?: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const dir = activePageId() > step ? 'forwards:'back';
        // return router.push(`${setup_profile_base_url}/${step}`);
        return iRouter.push(`${setup_profile_base_url}/${step}`);
    }

    return {
        appPages,
        repMenu,
        setupProfilePages,
        isSelected,
        isStepActive,
        checkoutSetupProfileStep,
        setup_profile_base_url
    }
}