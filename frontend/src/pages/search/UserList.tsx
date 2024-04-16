import DormCard from "../../components/Provider/DormCard";
import { useEffect, useState } from "react";

function UserList(){

    const [usersData, setUsersData] = useState<any[]>([]);
  
    async function getUsers() {
      try {
        
        const userRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/")
        const mydata = await userRes.json();
        console.log(mydata)
        setUsersData(mydata)

      } catch (err) {

      }
    }
  
    useEffect(() => {
      window.document.title = "Dorms List | HorHub"
      getUsers();
    }, []);

    return (
      <div className="min-h-[calc(100vh-7rem)]">
        <ul className="grid max-w-[26rem] sm:max-w-[52.5rem] lg:max-w-7xl w-[100%] mt-[2rem] mb-[4rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8  px-4 sm:px-6 lg:px-8">
            {
              usersData.map((data) => {
                return(
                  <DormCard
                    key={data.id}
                    id={data.id}
                    title={data.displayName}
                    image={data.imageURL}
                  />
                )
              })
            }
        </ul>
      </div>
    )
}

export default UserList