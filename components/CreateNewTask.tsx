import { placeholderSubtasks } from "@/constants";
import { useBoardStore, useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface createNewTaskProps {
  setNewTask: (newTask: boolean) => void;
  currentId: string;
  currentStatus: string[];
}

export default function createNewTask({
  setNewTask,
  currentId,
  currentStatus,
}: createNewTaskProps) {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const addTask = useBoardStore((state) => state.addTask);

  type Status = (typeof currentStatus)[number];

  interface TForm {
    title: string;
    description: string;
    status: Status | "";
    subtasks: string[] | [];
  }

  const [form, setForm] = useState<TForm>({
    title: "",
    description: "",
    status: currentStatus[0] || "",
    subtasks: [],
  });

  const [formErrors, setFormErrors] = useState<{
    title: boolean;
    description: boolean;
  }>({
    title: false,
    description: false,
  });

  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [isValidated, setValidated] = useState(false);

  const handleAddSubtask = () => {
    setForm((prev) => ({
      ...prev,
      subtasks: [...form.subtasks, ""],
    }));
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...form.subtasks];
    updatedSubtasks[index] = value;
    setForm((prev) => ({
      ...prev,
      subtasks: updatedSubtasks,
    }));
  };

  const handleRemoveSubtask = (index: number) => {
    const updatedSubtasks = [...form.subtasks];
    updatedSubtasks.splice(index, 1);
    setForm((prev) => ({
      ...prev,
      subtasks: updatedSubtasks,
    }));
  };

  const handleSubmit = () => {
    if (form.title === "") {
      setFormErrors((prev) => ({ ...prev, title: true }));
    }
    if (form.description === "") {
      setFormErrors((prev) => ({ ...prev, description: true }));
    }

    if (isValidated) {
      addTask(
        form.title,
        form.description,
        form.status,
        form.subtasks,
        currentId
      );
      setNewTask(false);
    }
  };
  return (
    <div className="fixed bg-black/50 w-[100svw] h-[100svh] top-0 left-0 z-10">
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-500"
        } w-[500px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-[6px] p-8`}
      >
        <Image
          src="/icon-cross.svg"
          width={20}
          height={20}
          alt="cross"
          className="absolute top-[20px] right-[20px] cursor-pointer"
          onClick={() => setNewTask(false)}
        />
        <h3 className="font-bold text-[18px]">Add New Task</h3>
        <label
          htmlFor="title"
          className="font-bold text-[12px] text-gray-300 pb-2 pt-4 block"
        >
          Title
        </label>
        <input
          name="title"
          type="text"
          placeholder="e.g Take coffee break"
          onChange={(e) => {
            setForm((prev) => ({ ...prev, title: e.target.value }));
            if (form.title !== "" && form.description !== "") {
              setValidated(true);
            }
            if (form.title !== "") {
              setFormErrors((prev) => ({ ...prev, title: false }));
            }
            if (form.description !== "") {
              setFormErrors((prev) => ({ ...prev, description: false }));
            }
          }}
          className={`${
            theme === "light"
              ? "bg-white border-gray-200"
              : "bg-gray-500 border-gray-400"
          } border  rounded-[6px] w-full h-[40px] px-4 py-2 text-[13px] font-medium`}
        />
        {formErrors.title && (
          <p className="text-destructive font-medium pt-2 text-[12px]">
            A title is required
          </p>
        )}
        <label
          htmlFor="description"
          className="font-bold text-[12px] text-gray-300 pb-2 pt-4 block"
        >
          Description
        </label>
        <textarea
          name="description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          onChange={(e) => {
            setForm((prev) => ({ ...prev, description: e.target.value }));
            if (form.title !== "" && form.description !== "") {
              setValidated(true);
            }
            if (form.title !== "") {
              setFormErrors((prev) => ({ ...prev, title: false }));
            }
            if (form.description !== "") {
              setFormErrors((prev) => ({ ...prev, description: false }));
            }
          }}
          className={`${
            theme === "light"
              ? "bg-white border-gray-200"
              : "bg-gray-500 border-gray-400"
          } border  rounded-[6px] w-full h-[112px] px-4  py-2 resize-none text-[13px] font-medium`}
        />
        {formErrors.description && (
          <p className="text-destructive font-medium text-[12px]">
            A description is required
          </p>
        )}
        <label
          htmlFor="subtask"
          className="font-bold text-[12px] text-gray-300 pb-2 pt-4 block"
        >
          Subtasks
        </label>
        {form.subtasks.map((subtask, index) => (
          <div key={index} className="flex items-center gap-2 mb-[12px]">
            <input
              name={`subtask`}
              placeholder={`${
                index < 3 ? placeholderSubtasks[index] : `Subtask ${index + 1}`
              }`}
              value={subtask}
              className={`${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-gray-500 border-gray-400"
              } border rounded-[6px] w-full h-[40px] px-4 py-2 text-[13px]`}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
            />
            <Image
              alt="cross"
              src="/icon-cross.svg"
              width={15}
              height={15}
              className="w-[15px] h-[15px] cursor-pointer"
              onClick={() => handleRemoveSubtask(index)}
            />
          </div>
        ))}
        <button
          onClick={handleAddSubtask}
          className="rounded-full bg-gray-100 text-primary w-full h-10 font-bold text-[13px] hover:opacity-80 transition-opacity"
        >
          +Add New Subtask
        </button>
        <p className="font-bold text-[12px] text-gray-300 pb-2 pt-4 ">
          Subtasks
        </p>
        <div
          aria-label="status"
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          className={`w-full h-10 rounded-sm ${
            theme === "light" ? "border-gray-200" : "border-gray-400"
          } border flex items-center px-4 py-2 text-[13px] font-medium justify-between cursor-pointer relative `}
        >
          {form.status}
          <Image
            src={"/icon-chevron-down.svg"}
            height={4.7}
            width={9}
            alt="dropdown"
            className={`transition-transform ${
              isStatusOpen ? "transform rotate-180" : ""
            }`}
          />
          <AnimatePresence>
            {isStatusOpen && (
              <div
                className={`absolute z-20 top-12 left-0 right-0 rounded-sm border max-h-[140px] overflow-auto ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-gray-500 border-gray-400"
                }`}
              >
                {currentStatus.map((status, index) => (
                  <div
                    key={index}
                    onClick={() => setForm((prev) => ({ ...prev, status }))}
                    className={`w-full h-10 ${
                      theme === "light"
                        ? "border-b-gray-200"
                        : "border-b-gray-400"
                    } border-b last:border-b-none flex items-center px-4 py-2 text-[13px] font-medium justify-between cursor-pointer `}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={handleSubmit}
          className="rounded-full bg-primary text-white w-full h-10 font-bold text-[13px] mt-6 hover:opacity-80 transition-opacity"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
