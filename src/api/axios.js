import { default as ax } from 'axios';
import { BROWSER_PATH } from '../constants/path';
import { tokenProvider } from '../utils/jwtProvider';

const commonAxios = ax.create({
    baseURL: BROWSER_PATH.BASE_API_HOST
});

const axios = ax.create({
    baseURL: BROWSER_PATH.BASE_API_HOST
});

commonAxios.interceptors.response.use(
    (response) => {
        const { errorMessage } = response.data;
        if (errorMessage) {
            alert(errorMessage);
        }
    }
);

axios.interceptors.request.use(
    (config) => {
        const accessToken = tokenProvider.getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        const { errorMessage } = response.data;
        if (errorMessage) {
            alert(errorMessage);
        }
    }
);

export { commonAxios, axios };