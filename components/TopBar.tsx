"use client";
import Image from "next/image";
import { useThemeStore, useMenuStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import { useBoardStore, useCurrentBoardStore } from "@/store";
import CreateNewTask from "./CreateNewTask";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import NavBarMobile from "./NavBarMobile";
import Modal from "./Modal";
import { motion as m } from "framer-motion";
import { AnimatePresence } from "framer-motion";
export default function TopBar() {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const isOpen = useStore(useMenuStore, (state) => state.isOpen);
  const boards = useStore(useBoardStore, (state) => state.boards);
  const [dropDown, setDropDown] = useState(false);
  const [navBarDropDown, setNavBarDropDown] = useState(false);
  const [isRemoveBoard, setIsRemoveBoard] = useState(false);
  const [isCreateNewTask, setIsCreateNewTask] = useState(false);
  const isEditing = useStore(useMenuStore, (state) => state.isEditing);
  const setIsEditing = useMenuStore((state) => state.setEditing);

  const currentBoardId = useStore(
    useCurrentBoardStore,
    (state) => state.currentBoardId
  );
  const currentBoard = boards?.find((board) => board.id === currentBoardId);

  return (
    <div
      className={`flex items-center w-full h-[64px] sm:h-[96px] border-b border-gray-200 ${
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
          className="w-[150px] h-[25px] mx-[24px] hidden md:block"
        />
      ) : (
        <Image
          src={"/logo-dark.svg"}
          alt="logo"
          width={100}
          height={100}
          className="w-[150px] h-[25px] mx-[24px] hidden md:block"
        />
      )}
      {theme === "light" ? (
        <Image
          src={"/logo-mobile.svg"}
          alt="logo"
          width={100}
          height={100}
          className="w-[25px] h-[25px] mx-[24px] sm:hidden"
        />
      ) : (
        <Image
          src={"/logo-mobile.svg"}
          alt="logo"
          width={100}
          height={100}
          className="w-[25px] h-[25px] mx-[24px] sm:hidden"
        />
      )}
      <div
        className={`flex justify-between items-center w-full h-full px-4 sm:px-[32px] ${
          theme === "light" ? "border-gray-200" : "border-gray-400"
        } ${isOpen ? "border-l-0" : "border-l"}`}
      >
        <div
          className="flex justify-center items-center gap-2"
          onClick={() => setNavBarDropDown(!navBarDropDown)}
        >
          <h2 className="font-bold text-[24px] cursor-pointer">
            {currentBoard?.name}
            <span className="sm:hidden">
              {!currentBoard?.name ? "Menu" : ""}
            </span>
          </h2>
          <div className="sm:hidden">
            <Image
              src="/icon-chevron-down.svg"
              alt="search"
              width={10}
              height={10}
              className={`w-[16px] h-[10px] object-contain translate-y-0.5 transition-transform ${
                navBarDropDown ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <AnimatePresence>
          {navBarDropDown && (
            <div className="relative sm:hidden">
              <div className="fixed w-[100svw] h-[100svh] top-0 left-0 flex items-start justify-center mt-[80px]">
                <m.div
                  initial={{ scaleY: 0, transformOrigin: "top", opacity: 0 }}
                  animate={{ scaleY: 1, transformOrigin: "top", opacity: 1 }}
                  exit={{ scaleY: 0, transformOrigin: "top", opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    theme === "light" ? "bg-white" : "bg-gray-500"
                  } w-[80%] lg:w-[500px] rounded-[6px] p-8 z-20 relative overflow-hidden`}
                >
                  <NavBarMobile />
                </m.div>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black/50 inset-0 top-[64px] fixed w-[100svw]"
                  onClick={() => setNavBarDropDown(false)}
                />
              </div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex items-center">
          <button
            disabled={!currentBoard || currentBoard?.columns.length === 0}
            onClick={() => setIsCreateNewTask(true)}
            className="disabled:opacity-50 disabled:pointer-events-none bg-primary hover:bg-primary-foreground transition-colors md:w-[164px] md:h-[48px] w-[48px] h-[32px] rounded-[24px] flex justify-center items-center"
          >
            <Image
              src="/icon-add-task-mobile.svg"
              alt="plus"
              width={15}
              height={15}
              className="w-[15px] h-[15px] md:hidden"
            />
            <p className="text-white font-bold hidden md:block">
              + Add New Task
            </p>
          </button>
          <button
            disabled={!currentBoard || currentBoard?.columns.length === 0}
            onClick={() => setDropDown(!dropDown)}
            className="disabled:opacity-50 disabled:pointer-events-none w-[20px] h-[20px] cursor-pointer ml-[24px] flex justify-center items-center"
          >
            <Image
              src="/icon-vertical-ellipsis.svg"
              alt="plus"
              width={20}
              height={20}
              className="w-[5px] h-[20px] "
            />
          </button>
          {dropDown && currentBoard ? (
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
            <DeleteBoard
              setIsRemoveBoard={setIsRemoveBoard}
              currentBoard={currentBoard}
            />
          ) : null}
          {isCreateNewTask && currentBoardId ? (
            <CreateNewTask
              setNewTask={setIsCreateNewTask}
              currentId={currentBoardId}
              currentStatus={
                currentBoard?.columns.map((column) => column.name) || []
              }
            />
          ) : null}
        </div>

        {isEditing ? <EditBoard setEditBoard={setIsEditing} /> : null}
      </div>
    </div>
  );
}
