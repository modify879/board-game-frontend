const BROWSER_PATH = {
    BASE: '/',

    AUTH: {
        LOGIN: '/login'
    },

    MEMBER: {
        SIGN_UP: '/member/signup'
    }
};

const API_PATH = {
    BASE_API_HOST: 'http://localhost:8080',

    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REISSUE: '/api/v1/auth/reissue',
        AUTH_CHECK: '/api/v1/auth/check'
    },

    MEMBER: {
        SIGN_UP: '/api/v1/member'
    },

    FILE: {
        UPLOAD_PROFILE: '/api/v1/file/profile'
    }
};

export { BROWSER_PATH, API_PATH };