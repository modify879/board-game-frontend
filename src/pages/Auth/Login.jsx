import React, { useState } from 'react';
import { tokenProvider } from '../../utils/jwtProvider';
import authApi from '../../api/auth';
import { useSetRecoilState } from 'recoil';
import { authState } from '../../recoil/auth';

const Login = () => {
    const setAuthState = useSetRecoilState(authState);
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handlerChangeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handlerClickLogin = async () => {
        const { accessToken, refreshToken } = await authApi.login(inputs);
        if (accessToken && refreshToken) {
            tokenProvider.setAccessToken(accessToken);
            tokenProvider.setRefreshToken(refreshToken);

            const authCheckResponse = await authApi.authCheck();
            const { login } = authCheckResponse;
            if (login) {
                setAuthState({
                    ...authCheckResponse
                });
            }
        }
    };

    return (
        <div>
            <div>
                <div>아이디</div>
                <input name={'username'} onChange={handlerChangeInputs} value={inputs.username} />
            </div>
            <div>
                <div>비밀번호</div>
                <input name={'password'} onChange={handlerChangeInputs} value={inputs.password} />
            </div>
            <div>
                <button onClick={handlerClickLogin}>로그인</button>
            </div>
        </div>
    );
};

export default Login;