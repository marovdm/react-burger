import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassswordPage from '../../pages/forgot-password-page';
import LoginPage from '../../pages/login-page';
import MainPage from '../../pages/main-page';
import ProfilePage from '../../pages/profile-page';
import RegisterPage from '../../pages/register-page';
import ResetPassswordPage from '../../pages/reset-password-page';
import ProtectedRouteElement  from '../../hocs/protected-route-element';
import UnAuthRouteElement from '../../hocs/unauth-route-element'; 
import IngredientPage from '../../pages/ingredient-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { URLS } from '../../utils/consts';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path={URLS.MAIN} element={ <MainPage />}/>
        <Route path={URLS.INGREDIENTS_ID} element={ <IngredientPage />} />
        <Route path={URLS.LOGIN} element={<UnAuthRouteElement element={<LoginPage />}/> } />
        <Route path={URLS.REGISTER} element={<UnAuthRouteElement element={<RegisterPage />}/> } />
        <Route path={URLS.FORGOT_PASSWORD} element={<UnAuthRouteElement element={<ForgotPassswordPage />}/> } />
        <Route path={URLS.RESET_PASSWORD} element={<UnAuthRouteElement element={<ResetPassswordPage />}/> } />
        <Route path={URLS.PROFILE} element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
        <Route path={URLS.PROFILE_ORDERS} element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
        <Route path={URLS.PROFILE_ORDERS_ID} element={ <ProtectedRouteElement element={ <ProfilePage /> } /> } />
      </Routes>
      { background && (
        <Routes>
          <Route 
            path="/ingredients/:id" 
            element={
              <Modal 
                header="Детали ингредиента"
                className="pt-10 pb-15"
                onClose={() => navigate(URLS.MAIN)}
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