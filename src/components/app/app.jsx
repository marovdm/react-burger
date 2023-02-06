import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassswordPage from '../../pages/forgot-password-page';
import LoginPage from '../../pages/login-page';
import MainPage from '../../pages/main-page';
import ProfilePage from '../../pages/profile-page';
import RegisterPage from '../../pages/register-page';
import ResetPassswordPage from '../../pages/reset-password-page';
import ProtectedRouteElement  from '../../hocs/protected-route-element';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <MainPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/forgot-password" element={<ForgotPassswordPage />}/>
        <Route path="/reset-password" element={<ResetPassswordPage />}/>
        <Route path="/profile" element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
        <Route path="/profile/orders" element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
        <Route path="/profile/orders/:id" element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
      </Routes>
    </Router>
  );
}

export default App;