"use client";

import Board from "@/components/Board";
import createNewTask from "@/components/CreateNewTask";
import { colors } from "@/constants";
import { useBoardStore, useCurrentBoardStore, useMenuStore } from "@/store";
import { Board as TBoard } from "@/types";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export default function Home() {
  const boards = useStore(useBoardStore, (state) => state.boards);
  const currentBoardId = useStore(
    useCurrentBoardStore,
    (state) => state.currentBoardId
  );
  const currentBoard = boards.find((board) => board.id === currentBoardId);
  const isOpen = useStore(useMenuStore, (state) => state.isOpen);
  const toggleEditing = useStore(useMenuStore, (state) => state.toggleEditing);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  if (currentBoard === null) {
    return (
      <main className="flex items-center flex-col justify-center w-full h-[calc(100svh-96px)] gap-8">
        <p className="text-[18px] font-bold text-gray-300">
          You currently haven't selected any board, either select or create one.
        </p>
      </main>
    );
  }

  if (currentBoard?.columns.length === 0) {
    return (
      <main className="flex items-center flex-col justify-center w-full h-[calc(100svh-96px)] gap-8">
        <p className="text-[18px] font-bold text-gray-300">
          This board is empty. Create a new column to get started.
        </p>
        <button
          onClick={toggleEditing}
          className="bg-primary hover:bg-primary-foreground transition-colors w-max px-[18px] h-[48px] rounded-[24px] flex justify-center items-center text-white font-bold"
        >
          + Add New Column
        </button>
      </main>
    );
  }

  return (
    <main
      className={`overflow-auto flex h-[calc(100svh-96px)] gap-6 p-6 ${
        isOpen ? "w-[calc(100svw-300px)]" : "w-[100svw]"
      }`}
    >
      <Board currentBoard={currentBoard} />
    </main>
  );
}
