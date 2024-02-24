import { tokenProvider } from '../utils/jwtProvider';
import { API_PATH } from '../constants/path';
import axios from 'axios';
import authApi from './auth';

const commonAxios = axios.create({
    baseURL: API_PATH.BASE_API_HOST
});

const authAxios = axios.create({
    baseURL: API_PATH.BASE_API_HOST
});

commonAxios.interceptors.response.use(
    (response) => {
        const { errorMessage } = response.data;
        if (errorMessage) {
            alert(errorMessage);
        }

        return Promise.resolve(response);
    }
);

authAxios.interceptors.request.use(
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

authAxios.interceptors.response.use(
    (response) => {
        const { errorMessage } = response.data;
        if (errorMessage) {
            alert(errorMessage);
        }

        return Promise.resolve(response);
    },
    async (error) => {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (config.url === API_PATH.AUTH.REISSUE || status !== 401) {
            return Promise.reject(error);
        }

        if (lock) {
            return new Promise((resolve) => {
                addSubscriber((accessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    resolve(authAxios(originalRequest));
                });
            });
        }

        lock = true;
        const accessToken = await reissueToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return authAxios(config);
        }

        return Promise.reject(error);
    }
);

let lock = false;
let subscribers = [];

const addSubscriber = (callback) => {
    subscribers.push(callback);
};

const onTokenReissued = (accessToken) => {
    subscribers.forEach((callback) => callback(accessToken));
};

const reissueToken = async () => {
    try {
        const savedAccessToken = tokenProvider.getAccessToken();
        const savedRefreshToken = tokenProvider.getRefreshToken();

        if (savedAccessToken) {
            const { accessToken, refreshToken } = await authApi.reissue(savedAccessToken, savedRefreshToken);

            lock = false;

            onTokenReissued(accessToken);
            subscribers = [];

            tokenProvider.setAccessToken(accessToken);
            tokenProvider.setRefreshToken(refreshToken);

            return accessToken;
        } else {
            return '';
        }
    } catch (e) {
        lock = false;
        subscribers = [];
        tokenProvider.RemoveAccessToken();
        tokenProvider.removeRefreshToken();
    }
};

export { commonAxios, authAxios };