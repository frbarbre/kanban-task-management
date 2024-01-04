"use client";
import Image from "next/image";
import { useThemeStore, useMenuStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import { useBoardStore, useCurrentBoardStore } from "@/store";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
export default function TopBar() {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const isOpen = useStore(useMenuStore, (state) => state.isOpen);
  const boards = useStore(useBoardStore, (state) => state.boards);
  const [dropDown, setDropDown] = useState(false);
  const [editBoard, setEditBoard] = useState(false);
  const [isRemoveBoard, setIsRemoveBoard] = useState(false);

  const currentBoardId = useStore(
    useCurrentBoardStore,
    (state) => state.currentBoardId
  );
  const currentBoard = boards?.find((board) => board.id === currentBoardId);
  //   console.log(currentBoard);
  return (
    <div
      className={`flex items-center w-full h-[96px] border-b border-gray-200 ${
        theme === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-500 border-gray-400"
      }`}
    >
      {isOpen ? null : theme === "light" ? (
        <Image
          src={"/logo-light.svg"}
          alt="logo"
          width={100}
          height={100}
          className="w-[150px] h-[25px] mx-[24px]"
        />
      ) : (
        <Image
          src={"/logo-dark.svg"}
          alt="logo"
          width={100}
          height={100}
          className="w-[150px] h-[25px] mx-[24px]"
        />
      )}
      <div
        className={`flex justify-between items-center w-full h-full px-[32px] ${
          theme === "light" ? "border-gray-200" : "border-gray-400"
        } ${isOpen ? "border-l-0" : "border-l"}`}
      >
        <h2 className="font-bold text-[24px]">{currentBoard?.name}</h2>
        <div className="flex items-center">
          <button className="bg-primary hover:bg-primary-foreground transition-colors w-[164px] h-[48px] rounded-[24px] flex justify-center items-center">
            <p className="text-white font-bold">+ Add New Task</p>
          </button>
          <Image
            src="/icon-vertical-ellipsis.svg"
            alt="plus"
            width={20}
            height={20}
            className="w-[5px] h-[20px] ml-[24px] cursor-pointer"
            onClick={() => setDropDown(!dropDown)}
          />
          {dropDown && currentBoard ? (
            <div className="absolute top-[80px] right-[32px] w-[200px] h-[100px] bg-white shadow-lg rounded-[24px]">
              <div className="flex flex-col justify-center w-full h-full pl-[16px]">
                <p
                  className="text-gray-300 font-medium mb-[16px] cursor-pointer"
                  onClick={() => {
                    setEditBoard(!editBoard);
                    setDropDown(false);
                  }}
                >
                  Edit Board
                </p>
                <p
                  className="text-destructive font-medium cursor-pointer"
                  onClick={() => {
                    setIsRemoveBoard(!isRemoveBoard);
                    setDropDown(false);
                  }}
                >
                  Delete Board
                </p>
              </div>
            </div>
          ) : null}
          {isRemoveBoard ? (
            <DeleteBoard setIsRemoveBoard={setIsRemoveBoard} />
          ) : null}
          {editBoard ? <EditBoard setEditBoard={setEditBoard} /> : null}
        </div>
      </div>
    </div>
  );
}
