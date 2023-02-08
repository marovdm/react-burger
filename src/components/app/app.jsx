import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassswordPage from '../../pages/forgot-password-page';
import LoginPage from '../../pages/login-page';
import MainPage from '../../pages/main-page';
import ProfilePage from '../../pages/profile-page';
import RegisterPage from '../../pages/register-page';
import ResetPassswordPage from '../../pages/reset-password-page';
import ProtectedRouteElement  from '../../hocs/protected-route-element';
import IngredientPage from '../../pages/ingredient-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={ <MainPage />}/>
        <Route path="/ingredients/:id" element={ <IngredientPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/forgot-password" element={<ForgotPassswordPage />}/>
        <Route path="/reset-password" element={<ResetPassswordPage />}/>
        <Route path="/profile" element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
        <Route path="/profile/orders" element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
        <Route path="/profile/orders/:id" element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
      </Routes>
      { background && (
        <Routes>
          <Route 
            path="/ingredients/:id" 
            element={
              <Modal 
                header="Детали ингредиента"
                className="pt-10 pb-15"
                onClose={() => navigate('/')}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;