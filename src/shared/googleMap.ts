import {reactive} from "vue";
import {appConst} from "@/helpers";
import {Geolocation} from "@capacitor/geolocation";

const {GOOGLE_API_KEY} = appConst;

declare global {
    interface Window {
        initMap: () => void;
    }
}

interface UserAddress {
    location?: string,
    city?: string,
    state?: string,
    country?: string,
}


export function useGoogleMap() {
    const address = reactive<UserAddress>({
        location: undefined,
        city: undefined,
        state: undefined,
        country: undefined,
    });

    const printCurrentPosition = async () => {
        return await Geolocation.getCurrentPosition().then((res) => {
            const new_center = {lat: res.coords.latitude, lng: res.coords.longitude};
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return window.geocoder?.geocode({location: new_center}).then((response: any) => {
                if (!response.results[0]) {
                    return Promise.reject({message: "No results found"});
                }
                const result = response.results[0];
                const {address_components, formatted_address} = result
                const country = address_components.find((location: any) => location.types[0] == 'country');
                const state = address_components.find((location: any) => location.types[0] == 'administrative_area_level_1');
                const city = address_components.find((location: any) => location.types[0] == 'locality');
                address.location = formatted_address;
                address.location = formatted_address;
                address.country = country.long_name;
                address.state = state?.long_name;
                address.city = city?.long_name;
                return Promise.resolve(true);
            }).catch((e: any) => {
                window.alert("Geocoder failed due to: " + e);
                return Promise.reject();
            });
        }).catch((err) => Promise.reject(err)) || Promise.reject({message: 'Something Went Wrong'});
    };
    const detectUser = async () => {
        return await setupMap().then(async () => {
            return await printCurrentPosition().then(() => {
                return Promise.resolve();
            }).catch(err => Promise.reject(err));
        });
    }
    const setupMap = () => {
        const check = document.getElementById("google_map_script");
        if (!check) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.id = "google_map_script";
            document.head.appendChild(script);
        }
        return Promise.resolve(true);
    }

    const removedScript = () => {
        const script = document.getElementById("google_map_script");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        script?.parentNode?.removeChild(script);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.initMap = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.geocoder = new window.google.maps.Geocoder();
    }

    return {address, setupMap, removedScript, printCurrentPosition, detectUser}
}