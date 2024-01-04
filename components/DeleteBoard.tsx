import { useBoardStore, useCurrentBoardStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import { useThemeStore } from "@/store";
import Image from "next/image";
import { useEffect } from "react";
interface CreateNewBoardProps {
  setIsRemoveBoard: (isRemoveBoard: boolean) => void;
  currentBoard: any;
}

export default function EditBoard({
  setIsRemoveBoard,
  currentBoard,
}: CreateNewBoardProps) {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const removeBoard = useBoardStore((state) => state.removeBoard);
  const resetCurrentBoard = useCurrentBoardStore(
    (state) => state.resetCurrentBoard
  );

  return (
    <>
      <div className="fixed bg-black/50 w-[100svw] h-[100svh] top-0 left-0">
        <div
          className={`${
            theme === "light" ? "bg-white" : "bg-gray-500"
          } w-[500px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-[6px] p-12`}
        >
          <h3 className="font-bold text-[18px] text-destructive">
            Delete This Board?
          </h3>
          <p className="font-medium text-[12px] text-gray-300 pb-2 pt-4">
            Are you sure you want to delete the ‘Platform Launch’ board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
          <div className="flex gap-4 mt-2">
            <div
              className="rounded-[20px] bg-destructive hover:bg-destructive-foreground w-full text-center h-[40px] items-center flex justify-center cursor-pointer"
              onClick={() => {
                removeBoard(currentBoard.id);
                setIsRemoveBoard(false);
                resetCurrentBoard();
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
              onClick={() => setIsRemoveBoard(false)}
            >
              <p className="text-primary font-bold text-[13px]">Cancel</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
