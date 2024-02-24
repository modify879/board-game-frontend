import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/auth';
import authApi from '../api/auth';
import { tokenProvider } from '../utils/jwtProvider';

const AuthCheck = () => {
    const setAuthState = useSetRecoilState(authState);

    useEffect(() => {
        authCheck();
    }, []);

    const authCheck = async () => {
        try {
            const accessToken = tokenProvider.getAccessToken();
            if (accessToken !== '') {
                const authCheckResponse = await authApi.authCheck();
                const { login } = authCheckResponse;
                if (login) {
                    setAuthState({
                        ...authCheckResponse
                    });
                } else {
                    logout();
                }
            }
        } catch (e) {
            logout();
        }
    };

    const logout = () => {
        setAuthState({});
        tokenProvider.RemoveAccessToken();
        tokenProvider.removeRefreshToken();
    };

    return (
        <Outlet />
    );
};

export default AuthCheck;