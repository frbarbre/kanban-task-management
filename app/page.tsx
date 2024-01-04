"use client";

import { colors } from "@/constants";
import { getRandomIndex } from "@/lib/getRandomIndex";
import { useBoardStore, useCurrentBoardStore, useMenuStore } from "@/store";
import { color } from "framer-motion";
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
        <button className="bg-primary hover:bg-primary-foreground transition-colors w-max px-[18px] h-[48px] rounded-[24px] flex justify-center items-center">
          <p className="text-white font-bold">+ Add New Column</p>
        </button>
      </main>
    );
  }

  return (
    <main
      className={`overflow-auto flex h-[calc(100svh-96px)] gap-6 ${
        isOpen ? "w-[calc(100svw-300px)]" : "w-[100svw]"
      }`}
    >
      {currentBoard?.columns.map((column, index) => {
        function adjustNumber(max: number, num: number) {
          while (num >= max) {
            num = Math.floor(num / 2);
          }
          return num;
        }

        const randomIndex = adjustNumber(colors.length, index);

        return (
          <section className="min-w-[280px]">
            <div className="flex items-center gap-3">
              <div
                className="w-[15px] h-[15px] rounded-full"
                
                style={{ background: colors[randomIndex] }}
              />
              <h2 className="uppercase font-bold text-gray-300 tracking-[2.4px]">
                {column.name}
              </h2>
            </div>
          </section>
        );
      })}
    </main>
  );
}
