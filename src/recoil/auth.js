import { atom, selector } from 'recoil';

const loginState = atom({
    key: 'loginState',
    default: false
});

const memberState = atom({
    key: 'memberState',
    default: {
        nickname: '',
        profile: '',
        role: '',
    },
});

const authState = selector({
    key: 'authState',
    get: ({ get }) => {
        const login = get(loginState);
        const member = get(memberState);

        return {
            login,
            ...member
        };
    },
    set: ({ set, reset }, authCheckResponse) => {
        if (authCheckResponse.constructor === Object && Object.keys(authCheckResponse).length === 0) {
            reset(loginState);
            reset(memberState);
        } else {
            set(loginState, authCheckResponse['login']);
            set(memberState, {
                nickname: authCheckResponse['nickname'],
                profile: authCheckResponse['profile'],
                role: authCheckResponse['role']
            });
        }
    }
});

export { loginState, memberState, authState };
