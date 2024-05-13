import "./App.css";
import HomePage from "./pages/home/HomePage";
import NavigationBar from "./components/NavBar/NavigationBar";
import Footbar from "./components/Footbar";
import RegisterPage from "./pages/register/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./lib/context/UserContext";
import ProfilePage from "./pages/profile/ProfilePage";

import SettingLayout from "./pages/profile/setting/SettingLayout";
import AccountPage from "./pages/profile/setting/setting-page/AccountPage";
import ProfileSettingPage from "./pages/profile/setting/setting-page/ProfileSettingPage";
import NotFoundPage from "./pages/etc/NotFoundPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatPage from "./pages/chat/ChatPage";
import UserList from "./pages/users/UserList";
import { OnlineStatusProvider } from "./lib/context/OnlineContext";
import GroupChatPage from "./pages/groupChat/GroupChatPage";
import GroupChatRoom from "./pages/groupChat/GroupChatRoom";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <OnlineStatusProvider>
            
            <NavigationBar />
            
            <Routes>
              
              <Route path="/" element={<HomePage />} />

              <Route path="register" element={<RegisterPage />} />

              <Route path="profile" element={<ProfilePage />} />

              <Route path="settings">
                
                <Route element={<SettingLayout />}>
                  
                  <Route path="profile" element={<ProfileSettingPage />} />
                  <Route path="account" element={<AccountPage />} />

                </Route>

              </Route>

              <Route path="chats" element={<ChatPage />} />
              <Route path="chats/:chatId" element={<ChatPage />} />

              <Route path="group-chats" element={<GroupChatPage />} />
              <Route path="group-chats/:id" element={<GroupChatRoom />} />

              <Route path="users" element={<UserList />} />

              <Route path="/*" element={<NotFoundPage />} />

            </Routes>

            <Footbar />
            <ToastContainer />
            
          </OnlineStatusProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
