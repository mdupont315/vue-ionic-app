import {useAuthStore, useTranslationStore} from '@/store';
import {appConst} from "./app-constents";

const {GOOGLE_API_KEY} = appConst;

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: any) {
    return (url: string, body?: any) => {
        const requestOptions = {
            method,
            headers: authHeader(),
            body: (body ? transformData(body) : undefined)
        };
        try {
            url = addRequiredLangWithUrl(url);
            url = addAPIKey(url);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return fetch(url, requestOptions);
        } catch (e: any) {
            throw new Error();
            return Promise.reject();
        }
    }
}

function addRequiredLangWithUrl(url: string) {
    const {locale} = useTranslationStore();
    if (locale == 'en') {
        return url;
    }
    const lang = `lang=${locale}`;
    return url.includes('?') ? `${url}&${lang}` : `${url}?${lang}`
}
function addAPIKey(url: string) {
    const apikey = `apikey=${GOOGLE_API_KEY}`;
    return url.includes('?') ? `${url}&${apikey}` : `${url}?${apikey}`
}

// helper functions
function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    const {userToken, isLoggedIn} = useAuthStore();
    return isLoggedIn ? {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json'
    } : {Accept: 'application/json'};
}

function transformData(data: any) {
    if (data instanceof FormData) {
        return data;
    }
    return getFormData(data);
}

function getFormData(data: object) {

    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.entries(data).forEach((entry) => {
        const [key, value] = entry;
        if (value !== null && typeof value == 'object' && !(value instanceof File)) {
            for (let i = 0; i < value.length; i++) {
                formData.append(`${key}[]`, value[i]);
            }
        } else {
            formData.append(key, value)
        }
    });
    return formData;
}