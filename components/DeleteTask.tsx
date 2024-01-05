import { useBoardStore, useCurrentBoardStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import { useThemeStore } from "@/store";
import Image from "next/image";
import { useEffect } from "react";
import Modal from "./Modal";
interface DeleteTaskProps {
  setIsRemoveTask: (isRemoveTask: boolean) => void;
  currentTask: any;
  setViewTask: (viewTask: boolean) => void;
  viewTask: boolean;
}

export default function DeleteTask({
  setIsRemoveTask,
  currentTask,
  setViewTask,
  viewTask,
}: DeleteTaskProps) {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const removeTask = useBoardStore((state) => state.removeTask);

  return (
    <Modal setIsModalOpen={setIsRemoveTask}>
      <h3 className="font-bold text-[18px] text-destructive">
        Delete This Task?
      </h3>
      <p className="font-medium text-[12px] text-gray-300 pb-2 pt-4">
        Are you sure you want to delete the {currentTask.name} Task? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex gap-4 mt-2">
        <div
          className="rounded-[20px] bg-destructive hover:bg-destructive-foreground w-full text-center h-[40px] items-center flex justify-center cursor-pointer"
          onClick={() => {
            removeTask(currentTask.id);
            setIsRemoveTask(false);
          }}
        >
          <p className="text-white font-bold text-[13px]">Delete</p>
        </div>
        <div
          className={`rounded-[20px]  hover:bg-gray-100 w-full text-center h-[40px] items-center flex justify-center cursor-pointer ${
            theme === "light"
              ? "bg-idle hover:bg-gray-100"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => {
            setIsRemoveTask(false);
            setViewTask(!viewTask);
          }}
        >
          <p className="text-primary font-bold text-[13px]">Cancel</p>
        </div>
      </div>
    </Modal>
  );
}
