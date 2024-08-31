import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddPost = () => {
    setIsOpen(false);
    navigate("/add-post");
  };

  const handleAddExpense = () => {
    setIsOpen(false);
    navigate("/add-expense");
  };

  return (
    <div className="fixed bottom-8 right-8">
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-2">
          <button
            onClick={handleAddPost}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
          >
            Add Post
          </button>
          <button
            onClick={handleAddExpense}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
          >
            Add Expense
          </button>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default AddButton;