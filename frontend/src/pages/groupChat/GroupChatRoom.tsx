const GroupChatRoom = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 text-center font-bold text-sm">
        GROUP xxx
      </div>

      {/* Chat Messages */}
      <div className="flex-grow">
        {/* Sender Message */}
        <div className="flex justify-end">
          <div className="bg-emerald-500 text-white p-2 rounded-lg m-2 max-w-xs">
            Sender Message
          </div>
        </div>

        {/* Receiver Message */}
        <div className="flex justify-start items-center">
          <img
            src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Avatar"
            className="w-8 h-8 rounded-full m-2"
          />
          <div className="bg-gray-300 p-2 rounded-lg m-2 max-w-xs">
            Receiver Message
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-gray-200 p-4 sticky bottom-12">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default GroupChatRoom;
