import { Link } from "react-router-dom";
import DormCard from "../../components/Provider/DormCard";

function GroupChatPage() {
  const groupsData = [
    {
      id: "1",
      displayName: "group 1",
      imageURL: "",
    },
    {
      id: "2",
      displayName: "group 2",
      imageURL: "",
    },
    {
      id: "3",
      displayName: "group 3",
      imageURL: "",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-7rem)]">
      <ul className="grid max-w-[26rem] sm:max-w-[52.5rem] lg:max-w-7xl w-[100%] mt-[2rem] mb-[4rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8  px-4 sm:px-6 lg:px-8">
        {groupsData.map((data) => {
          return (
            <Link to={`/group-chats/${data.id}`}>
              <DormCard
                key={data.id}
                id={data.id}
                title={data.displayName}
                image={data.imageURL}
                isGroup={true}
              />
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
export default GroupChatPage;
