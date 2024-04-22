import { Link } from "react-router-dom";
import DormCard from "../../components/Provider/DormCard";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import FormDialog from "../../components/FormDialog/FormDialog";

function GroupChatPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

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
        {groupsData.map((room) => {
          return (
            <Link to={`/group-chats/${room.id}`}>
              <DormCard
                key={room.id}
                id={room.id}
                title={room.displayName}
                image={room.imageURL}
                isGroup={true}
              />
            </Link>
          );
        })}
      </ul>

      <button
        className="fixed text-xl font-extrabold bottom-20 right-10 bg-emerald-500 text-white p-2 rounded-full w-14 h-14 hover:bg-emerald-600"
        onClick={openDialog}
      >
        <div className="flex items-center justify-center">
          <FaPlus />
        </div>
      </button>

      <FormDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
}
export default GroupChatPage;
