import React, { useState, ChangeEvent, FormEvent } from "react";
import Modal from "react-modal";
import FileUploadPane from "./FileUploadPane";
import { uploadFile } from "../lib/firebase";

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormDialog = ({ isOpen, onClose }: FormDialogProps) => {
  
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    
    e.preventDefault();

    if (!file) return

    const files = [file]
    const imageURL = (await uploadFile(files, 'doc'))[0]

    const data = { groupName: groupName, imageURL: imageURL }

    // Create Group Chat API
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/group-chats/`;
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setGroupName("")
    setFile(null)
    onClose();

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: "500px",
          height: "400px",
          margin: "auto",
        },
      }}
      ariaHideApp={false}
    >
      <div className="p-4">
        
        <h2 className="text-2xl text-center font-extrabold mb-4">
          Enter Group Details
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-row gap-4 mt-4">
            <label className="mr-2">Group Name:</label>
            <input
              type="text"
              name="groupName"
              value={groupName}
              onChange={handleGroupNameChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 h-8"
            />
          </div>

          <FileUploadPane setFile={setFile} />
          
          <button
            type="submit"
            className="bg-emerald-500 text-white py-2 px-4 rounded-md mt-10 hover:bg-emerald-600 focus:outline-none focus:bg-emerald-600"
          >
            Create Group
          </button>
        
        </form>

      </div>
    </Modal>
  );
};

export default FormDialog;
