import { API_PATH } from '../constants/path';
import { commonAxios } from './axios';

const memberApi = {
    signUp: async (param) => {
        const url = API_PATH.MEMBER.SIGN_UP;
        await commonAxios.post(url, param);
    }
};

export default memberApi;