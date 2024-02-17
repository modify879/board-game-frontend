import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BROWSER_PATH } from './constants/path';
import Main from './pages/Main/Main';
import Signup from './pages/Member/Signup';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={BROWSER_PATH.BASE} element={<Main />} />

                <Route path={BROWSER_PATH.MEMBER.SIGN_UP} element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
