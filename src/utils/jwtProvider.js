const CONST_TOKEN = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken'
};

export const tokenProvider = {
    getAccessToken: () => {
        return localStorage.getItem(CONST_TOKEN.ACCESS_TOKEN) ?? '';
    },
    setAccessToken: (accessToken) => {
        localStorage.setItem(CONST_TOKEN.ACCESS_TOKEN, accessToken);
    },
    RemoveAccessToken: () => {
        localStorage.removeItem(CONST_TOKEN.ACCESS_TOKEN);
    },
    getRefreshToken: () => {
        return localStorage.getItem(CONST_TOKEN.REFRESH_TOKEN) ?? '';
    },
    setRefreshToken: (refreshToken) => {
        localStorage.setItem(CONST_TOKEN.REFRESH_TOKEN, refreshToken);
    },
    removeRefreshToken: () => {
        localStorage.removeItem(CONST_TOKEN.REFRESH_TOKEN);
    }
};