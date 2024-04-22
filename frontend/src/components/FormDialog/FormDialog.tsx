import React, { useState, ChangeEvent, FormEvent } from "react";
import Modal from "react-modal";

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormDialog = ({ isOpen, onClose }: FormDialogProps) => {
  const [formData, setFormData] = useState({
    id: "",
    displayName: "",
    imageURL: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission here
    // You can send formData to your backend or handle it as needed
    onClose(); // Close the dialog after submission
  };

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
    >
      <div className="p-4">
        <h2 className="text-2xl text-center font-extrabold mb-4">
          Enter Group Details
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row gap-4 mt-4">
            <label className="">Display Name:</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 h-8"
            />
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <label className="mr-[21px]">Image URL:</label>
            <input
              type="text"
              name="imgUrl"
              value={formData.imageURL}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 h-8"
            />
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <label className="mr-[87px]">ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 h-8"
            />
          </div>
          {/* Add more form fields as needed */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-20 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create Group
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormDialog;
