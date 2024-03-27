"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo, getRandomDogImage } from "@/api"; // Import your API function
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newImageValue, setNewImageValue] = useState<string>("");

  const handleOpenModal = async () => {
    setModalOpen(true);
    try {
      const image = await getRandomDogImage();
      setNewImageValue(image.message);
    } catch (error) {
      console.error("Error fetching random dog image:", error);
    }
  };

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
      image: newImageValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className='btn btn-primary w-full'
      >
        Add new task <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
  <form onSubmit={handleSubmitNewTodo} className="flex flex-col items-center">
    <h3 className='font-bold text-lg mb-4'>Add new task</h3>
    <div className='modal-action flex items-center'>
      <input
        value={newTaskValue}
        onChange={(e) => setNewTaskValue(e.target.value)}
        type='text'
        placeholder='Type here'
        className='input input-bordered w-full mr-2'
      />
      {/* Display image preview */}
      {newImageValue && (
        <img src={newImageValue} alt='Dog' className='w-10 h-10 mr-2' />
      )}
      <button type='submit' className='btn'>
        Submit
      </button>
    </div>
  </form>
</Modal>
    </div>
  );
};

export default AddTask;
