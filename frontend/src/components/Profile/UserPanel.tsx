
import { Avatar } from "@mui/material";
import { UserInfo } from "../../lib/type/UserHidden";
import LabelProfile from "./LabelProfile";
import { Link } from "react-router-dom";

export default function UserPanel({currentUser} : {currentUser : UserInfo}){

        return (
            
            <div className="flex flex-col md:flex-row items-center w-full gap-3 md:gap-0">
                
                <div className="flex flex-col items-center w-full md:w-1/4 gap-2">
                    <Avatar className = " block justify-center" src={currentUser.imageURL} sx={{width : 100, height : 100}}/>
                    <Link to="/settings/profile" className="primary-button">Edit Profile</Link>
                </div>
                
                <div className="w-full md:w-3/4">
                    <LabelProfile header={"Email Address"} deactiveHover >{currentUser.email}</LabelProfile>
                    <LabelProfile header={"Display Name"} deactiveHover>{currentUser.displayName}</LabelProfile>
                </div>

            </div>
        );
}
