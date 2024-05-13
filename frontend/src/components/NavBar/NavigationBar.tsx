
import LoginButton from "../Button/LoginButton";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext";
import { Avatar, Tooltip } from "@mui/material";
import MenuBar from "./MenuBar";
import { AiFillMessage } from "react-icons/ai";
import { FaHouse } from "react-icons/fa6";

const NavigationBar = () => {
  
  const { currentUser, isLoading } = useUser();

  const location = useLocation();

  return (
    <nav className="sticky top-0 h-16 backdrop-blur-md flex items-center justify-between px-4 bg-base-100/50 z-20 border-b-2 border-slate-900/10">
      <ul className="flex gap-5 items-center w-[70%] h-full">
        
        <li className="h-full">
          <Link to="/">
            <FaHouse className="h-full w-6 text-emerald-500" />
          </Link>
        </li>
        
        <li className="h-full flex gap-4">
          
          <Link to="/users">
            <div
              className={`h-full px-2 border-b-4 hover:bg-slate-600/10 hover:border-emerald-600 flex items-center hover:text-emerald-600 font-bold text-sm ${
                location.pathname.split("/").length >= 2 &&
                location.pathname.split("/")[1] === "users"
                  ? "text-emerald-600 border-emerald-600"
                  : "border-white text-slate-400"
              }`}
            >
              Online Users
            </div>
          </Link>

          <Link to="/group-chats">
            <div
              className={`h-full px-2 border-b-4 hover:bg-slate-600/10 hover:border-emerald-600 flex items-center hover:text-emerald-600 font-bold text-sm ${
                location.pathname.split("/").length >= 2 &&
                location.pathname.split("/")[1] === "group-chats"
                  ? "text-emerald-600 border-emerald-600"
                  : "border-white text-slate-400"
              }`}
            >
              Group chats
            </div>
          </Link>
        
        </li>

      </ul>

      <div className="flex items-center gap-5 w-[30%] h-full justify-end">
        
        {!isLoading && !currentUser && (
          <>
            <Tooltip title="Chats">
              <Link to="/register" className="secondary-button">
                Sign Up
              </Link>
            </Tooltip>

            <LoginButton />
          </>
        )}

        {!isLoading && currentUser && (
          <>
            <Link
              to="/chats"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-indigo-50 transition-colors"
            >
              <AiFillMessage className="text-emerald-600 w-6 h-6" />
            </Link>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="w-fit h-fit rounded-full"
              >
                <Avatar src={currentUser.imageURL} />
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-[20] menu shadow bg-white rounded-box -bottom-2 translate-y-full border border-slate-100"
              >
                <MenuBar />
              </div>
            </div>
          </>
        )}

      </div>

    </nav>
  );
};

export default NavigationBar;
