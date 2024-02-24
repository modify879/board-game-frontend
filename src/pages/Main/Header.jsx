import React from 'react';
import { useRecoilValue } from 'recoil';
import { memberState } from '../../recoil/auth';
import { Outlet } from 'react-router-dom';

const Header = () => {
    const member = useRecoilValue(memberState);

    return (
        <>
            <div>
                닉네임: {member.nickname}
            </div>
            <div>
                프로필: {member.profile}
            </div>
            <div>
                권한: {member.role}
            </div>
            <Outlet />
        </>
    );
};

export default Header;