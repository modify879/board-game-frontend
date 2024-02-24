import { authAxios, commonAxios } from './axios';
import { API_PATH } from '../constants/path';

const authApi = {
    login: async (params) => {
        const url = API_PATH.AUTH.LOGIN;
        const { data } = await commonAxios.post(url, params);

        return data;
    },
    reissue: async (accessToken, refreshToken) => {
        const url = API_PATH.AUTH.REISSUE;
        const { data } = await commonAxios.put(url, {
            accessToken,
            refreshToken
        });

        return data;
    },
    authCheck: async () => {
        const url = API_PATH.AUTH.AUTH_CHECK;
        const { data } = await authAxios.get(url);

        return data;
    }
};

export default authApi;