import { useBoardStore, useCurrentBoardStore, useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import Image from "next/image";
import CreateNewBoard from "./CreateNewBoard";
import { AnimatePresence, motion as m } from "framer-motion";
export default function AllBoards() {
  const [createBoard, setCreateBoard] = useState(false);
  const boards = useStore(useBoardStore, (state) => state.boards);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const currentBoardId = useStore(
    useCurrentBoardStore,
    (state) => state.currentBoardId
  );
  const setCurrentBoardId = useCurrentBoardStore(
    (state) => state.setCurrentBoardId
  );
  const theme = useStore(useThemeStore, (state) => state.theme);
  return (
    <div>
      <p className="uppercase font-bold text-[12px] tracking-[2.4px] text-gray-300 pb-5">
        All Boards ({boards?.length})
      </p>
      {boards?.length !== 0 &&
        boards?.map((board) => (
          <button
            className={`flex items-center relative cursor-pointer gap-4 h-12 text-[15px] transition-colors font-bold w-full ${
              currentBoardId !== board.id
                ? "text-gray-300 hover:text-primary"
                : "text-white"
            }`}
            onClick={() => setCurrentBoardId(board.id)}
            onMouseEnter={() => setIsHovered(board.id)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <Image
              src={`/icon-board${
                currentBoardId === board.id
                  ? "-selected"
                  : isHovered === board.id
                  ? "-new"
                  : ""
              }.svg`}
              alt="board"
              width={20}
              height={20}
              className="w-[16px] h-[16px]"
            />
            {board?.name}
            <AnimatePresence>
              {(isHovered === board.id || currentBoardId === board.id) && (
                <m.div
                  initial={{ x: "-100%" }}
                  animate={{
                    x: "0%",
                    transition: { delay: 0.2, type: "tween" },
                  }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.2, type: "tween" }}
                  className={`absolute -left-8 h-12 right-0 ${
                    currentBoardId === board.id
                      ? "bg-primary"
                      : isHovered === board.id
                      ? `${theme === "light" ? "bg-gray-100" : "bg-white"}`
                      : ""
                  } rounded-r-full z-[-1]`}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      {createBoard ? <CreateNewBoard setCreateBoard={setCreateBoard} /> : null}
      <button
        className="flex items-center cursor-pointer gap-4 h-12 text-primary text-[15px] font-bold"
        onClick={() => setCreateBoard(!createBoard)}
        onMouseEnter={() => setIsHovered("new")}
        onMouseLeave={() => setIsHovered(null)}
      >
        <Image
          src="/icon-board-new.svg"
          alt="board"
          width={20}
          height={20}
          className="w-[16px] h-[16px]"
        />
        +Create New Board
        <AnimatePresence>
          {isHovered === "new" && (
            <m.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%", transition: { delay: 0.2, type: "tween" } }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2, type: "tween" }}
              className={`absolute -left-8 h-12 right-8 ${
                isHovered === "new"
                  ? `${theme === "light" ? "bg-gray-100" : "bg-white"}`
                  : ""
              } rounded-r-full z-[-1]`}
            />
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
