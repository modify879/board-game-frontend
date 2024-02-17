import React, { useRef, useState } from 'react';
import fileApi from '../../api/file';
import memberApi from '../../api/member';

const Signup = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        rePassword: '',
        nickname: '',
        profile: '',
    });

    const refProfile = useRef(null);

    const handlerChangeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handlerChangeProfile = async (e) => {
        const profile = refProfile.current.files[0];
        if (profile) {
            const url = await fileApi.uploadImage(profile);
            setInputs({
                ...inputs,
                profile: url
            });
        }
    };

    const handlerClickSignUp = async () => {
        await memberApi.signUp(inputs);
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
                <div>비밀번호 확인</div>
                <input name={'rePassword'} onChange={handlerChangeInputs} value={inputs.rePassword} />
            </div>
            <div>
                <div>닉네임</div>
                <input name={'nickname'} onChange={handlerChangeInputs} value={inputs.nickname} />
            </div>
            <div>
                <div>프로필</div>
                <input type={'file'} ref={refProfile} onChange={handlerChangeProfile} />
            </div>
            <div>
                <button onClick={handlerClickSignUp}>회원가입</button>
            </div>
        </div>
    );
};

export default Signup;