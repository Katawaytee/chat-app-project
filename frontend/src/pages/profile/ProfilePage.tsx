
import UserPanel from "../../components/Profile/UserPanel";
import { useUser } from "../../lib/context/UserContext";
import LoadingPage from "../etc/LoadingPage";
import useAuthRedirect from "../../lib/authRedirect";

export default function ProfilePage(){

    const { currentUser } = useUser();
    useAuthRedirect();
   
    if(!currentUser) return <LoadingPage/>

    return (
    <div className="page">
        <div className="flex flex-col w-full">
            <UserPanel currentUser = {currentUser}/>
        </div>
    </div>);

}