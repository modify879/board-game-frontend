import { commonAxios } from './axios';
import { API_PATH } from '../constants/path';

const fileApi = {
    uploadImage: async (image) => {
        const formData = new FormData();
        formData.append('profile', image);

        const url = API_PATH.FILE.UPLOAD_PROFILE;
        const { data } = await commonAxios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data;
    }
};

export default fileApi;