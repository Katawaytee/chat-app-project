import "./App.css";
import HomePage from "./pages/home/HomePage";
import NavigationBar from "./components/NavBar/NavigationBar";
import Footbar from "./components/Footer/Footbar";
import RegisterPage from "./pages/register/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./lib/context/UserContext";
import ProfilePage from "./pages/profile/ProfilePage";

import SettingLayout from "./pages/profile/setting/SettingLayout";
import AccountPage from "./pages/profile/setting/setting-page/AccountPage";
import ProfileSettingPage from "./pages/profile/setting/setting-page/ProfileSettingPage";
import NotFoundPage from "./pages/etc/NotFoundPage";
import EmailChangePage from "./pages/profile/setting/setting-page/EmailChangePage";
import DeleteAccountPage from "./pages/profile/setting/setting-page/DeleteAccountPage";

import PasswordChangePage from "./pages/profile/setting/setting-page/PasswordChangePage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatPage from "./pages/chat/ChatPage";
import UserList from "./pages/search/UserList";


function App() {

  

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />

            <Route path="settings">
              <Route element={<SettingLayout />}>
                <Route path="profile" element={<ProfileSettingPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="password" element={<PasswordChangePage />} />
                <Route path="email" element={<EmailChangePage />} />
                <Route path="delete" element={<DeleteAccountPage />} />

                {/* <Route path="topup" element={<TopUpPage />} /> */}
                {/* <Route
                  path="payment_information"
                  element={<PaymentInformationPage />}
                /> */}
              </Route>
            </Route>

            {/* <Route path="verify" element={<MailVerifyPage />} />
            <Route path="verify/success" element={<SuccessVerifyPage />} />
            <Route path="verify/:id" element={<AccVerifyTempPage />} />

            <Route path="verify" element={<MailVerifyPage />} />
            <Route path="verify/success" element={<SuccessVerifyPage />} />
            <Route path="verify/:id" element={<AccVerifyTempPage />} /> */}

            <Route path="chats" element={<ChatPage />} />
            <Route path="chats/:chatId" element={<ChatPage />} />

            <Route path="users" element={<UserList />} />

            {/* <Route path="bookings/:bookingId/payment/success/:checkoutToken" element={<SuccessPaymentTempPage />} /> */}

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
          <Footbar />
          <ToastContainer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
