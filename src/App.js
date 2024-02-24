import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BROWSER_PATH } from './constants/path';
import Main from './pages/Main/Main';
import Signup from './pages/Member/Signup';
import AuthCheck from './router/AuthCheck';
import Login from './pages/Auth/Login';
import Header from './pages/Main/Header';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthCheck />}>
                    <Route element={<Header />}>
                        <Route path={BROWSER_PATH.BASE} element={<Main />} />
                        <Route path={BROWSER_PATH.MEMBER.SIGN_UP} element={<Signup />} />
                        <Route path={BROWSER_PATH.AUTH.LOGIN} element={<Login />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
