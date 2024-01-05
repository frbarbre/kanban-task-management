import { placeholderSubtasks } from "@/constants";
import { useBoardStore, useCurrentBoardStore, useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useCurrentTaskStore } from "../store";
import { Task } from "@/types";
// import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import Modal from "./Modal";
interface viewTaskProps {
  setViewTask: (arg: boolean) => void;
  viewTask: boolean;
  setIsRemoveTask: (arg: boolean) => void;
  isRemoveTask: boolean;
  isEditing: boolean;
  setIsEditing: (arg: boolean) => void;
}

export default function createNewTask({
  setViewTask,
  viewTask,
  setIsRemoveTask,
  isRemoveTask,
  isEditing,
  setIsEditing,
}: viewTaskProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const theme = useStore(useThemeStore, (state) => state.theme);
  const changeSubtaskStatus = useBoardStore(
    (state) => state.changeSubtaskStatus
  );
  const changeStatus = useBoardStore((state) => state.changeStatus);

  const currentBoardId = useStore(
    useCurrentBoardStore,
    (state) => state.currentBoardId
  );
  const boards = useStore(useBoardStore, (state) => state.boards);
  const currentTaskId = useStore(
    useCurrentTaskStore,
    (state) => state.currentTaskId
  );
  const setCurrentTaskId = useCurrentTaskStore(
    (state) => state.setCurrentTaskId
  );
  const currentBoard = boards?.find((board) => board.id === currentBoardId);
  const currentTask = currentBoard?.tasks.find(
    (task) => task.id === currentTaskId
  );

  const doneSubtasks =
    currentTask?.subtasks?.filter((subtask) => subtask.isDone) || [];
  const numDone = doneSubtasks.length;
  const currentStatus =
    currentBoard?.columns.map((column) => column.name) || [];
  console.log(currentTask);
  return (
    <Modal setIsModalOpen={setViewTask}>
      <div className="flex justify-between flex-row-reverse items-center ">
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-[20px] h-[20px] cursor-pointer ml-[24px] flex justify-center items-center"
        >
          <Image
            src="/icon-vertical-ellipsis.svg"
            alt="plus"
            width={20}
            height={20}
            className="w-[5px] h-[20px] "
          />
        </div>
        {isDropdownOpen && currentBoard ? (
          <div
            className={`absolute top-[92px] right-[32px] w-[200px] h-[100px] shadow-lg rounded-lg ${
              theme === "light" ? "bg-white" : "bg-gray-600"
            }`}
          >
            <div className="flex flex-col justify-center w-full h-full pl-[16px]">
              <p
                className="text-gray-300 font-medium mb-[16px] cursor-pointer"
                onClick={() => {
                  setIsEditing(!isEditing);
                  setIsDropdownOpen(false);
                  setViewTask(!viewTask);

                }}
              >
                Edit Board
              </p>
              <p
                className="text-destructive font-medium cursor-pointer"
                onClick={() => {
                  setIsRemoveTask(!isRemoveTask);
                  setIsDropdownOpen(false);
                  setViewTask(!viewTask);
                }}
              >
                Delete Task
              </p>
            </div>
          </div>
        ) : null}

        <h3 className="font-bold text-[18px]">{currentTask?.name}</h3>
      </div>
      <p className="text-[13px] text-gray-300 leading-[23px] py-6 font-medium">
        {currentTask?.description}
      </p>
      <p className="text-[12px] font-bold text-gray-300 pb-4">
        Subtasks ({numDone} of {currentTask?.subtasks?.length})
      </p>
      {currentTask?.subtasks?.length !== 0 ? (
        currentTask?.subtasks.map((subtask) => {
          return (
            <div className="flex items-center">
              <label className="text-[14px]">
                <input
                  defaultChecked={subtask.isDone}
                  name={subtask.id}
                  type="checkbox"
                  className="mr-2 checked:bg-primary checked:border-transparent"
                  onClick={() =>
                    changeSubtaskStatus(currentTask.id, subtask.id)
                  }
                />
                {subtask.name}
              </label>
            </div>
          );
        })
      ) : (
        <p className="text-[14px] text-gray-500">No subtasks</p>
      )}
      <p>Current Status</p>
      <div
        aria-label="status"
        onClick={() => setIsStatusOpen(!isStatusOpen)}
        className={`w-full h-10 rounded-sm ${
          theme === "light" ? "border-gray-200" : "border-gray-400"
        } border flex items-center px-4 py-2 text-[13px] font-medium justify-between cursor-pointer relative `}
      >
        {currentTask?.status}
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
              {currentStatus?.map((status, index) => (
                <div
                  key={index}
                  onClick={() => changeStatus(currentTask?.id!, status)}
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
    </Modal>
  );
}
