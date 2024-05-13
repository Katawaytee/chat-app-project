
import ListSettingItem from "./ListSettingItem";
import { GoGear } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";

export default function SettingSidebar() {

  const location = useLocation();
  const currentPath = location.pathname.split("settings/")[1];

  return (
    <nav className="w-2/4 md:w-1/4 h-full text-sm">
      <ul className="grid grid-cols-1">
        
        <Link to="profile">
          <ListSettingItem active={currentPath === "profile"}>
            <LuUser2 />
            <div>Public Profile</div>
          </ListSettingItem>
        </Link>
        
        <Link to="account">
          <ListSettingItem active={currentPath === "account"}>
            <GoGear />
            <div>Account</div>
          </ListSettingItem>
        </Link>

      </ul>
    </nav>
  );
  
}
