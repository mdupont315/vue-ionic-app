import {useAlert} from "@/shared/alert";

export function useComingSoonAlert(){
    const {presentAlert} = useAlert();
    const comingSoon = ():void => {
        presentAlert('Coming Soon!', '', 'This feature is coming soon!');
    }
    return {comingSoon};
}