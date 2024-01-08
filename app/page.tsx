"use client";

import Board from "@/components/Board";
import {
  useBoardStore,
  useCurrentBoardStore,
  useMenuStore,
  useThemeStore,
} from "@/store";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ReformatedColums, Board as TBoard } from "@/types";
import CreateNewBoard from "@/components/CreateNewBoard";

export default function Home() {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const boards = useStore(useBoardStore, (state) => state.boards);
  const currentBoardId = useStore(
    useCurrentBoardStore,
    (state) => state.currentBoardId
  );
  const currentBoard = boards.find((board) => board.id === currentBoardId);
  const isOpen = useStore(useMenuStore, (state) => state.isOpen);
  const [columns, setColumns] = useState<ReformatedColums[]>(
    reformattedColumns(currentBoard!)
  );
  const toggleEditing = useStore(useMenuStore, (state) => state.toggleEditing);
  const toggleCreateBoard = useStore(
    useMenuStore,
    (state) => state.toggleCreateBoard
  );
  const createBoard = useStore(useMenuStore, (state) => state.createBoard);
  const setCreateBoard = useMenuStore((state) => state.setCreateBoard);
  const [isClient, setIsClient] = useState(false);
  const changeStatus = useBoardStore((state) => state.changeStatus);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setColumns(reformattedColumns(currentBoard!));
  }, [currentBoard, changeStatus]);

  function reformattedColumns(board: TBoard) {
    const columns = board?.columns;
    const tasks = board?.tasks;

    const newColumns = columns?.map((column) => {
      const columnTasks = tasks?.filter((task) => task.status === column.name);
      return {
        ...column,
        tasks: columnTasks,
      };
    });

    return newColumns;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    const currentTask = currentBoard?.tasks.find(
      (task) => task.id === active.id
    );

    if (currentTask?.status === over?.id) return;
    changeStatus(active?.id as string, over?.id as string);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (!isClient) return;

  if (!currentBoard) {
    return (
      <main className="flex items-center flex-col justify-center w-full h-[calc(100svh-96px)] gap-8">
        <p className="text-[18px] text-center font-bold text-gray-300 px-4">
          You currently haven't selected any board, either select or create one.
        </p>
        <button
          onClick={toggleCreateBoard}
          className="bg-primary hover:bg-primary-foreground transition-colors w-max px-[18px] h-[48px] rounded-[24px] flex justify-center items-center text-white font-bold"
        >
          + Add New Board
        </button>
        {createBoard ? (
          <CreateNewBoard setCreateBoard={setCreateBoard} />
        ) : null}
      </main>
    );
  }

  if (currentBoard?.columns.length === 0) {
    return (
      <main className="flex items-center flex-col justify-center w-full h-[calc(100svh-96px)] gap-8">
        <p className="text-[18px] text-center font-bold text-gray-300 px-4">
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
      className={`overflow-auto flex h-[calc(100svh-96px)] gap-6 p-6 w-[100svw] ${
        isOpen ? "sm:w-[calc(100svw-300px)]" : "sm:w-[100svw]"
      }`}
    >
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Board columns={columns} />
      </DndContext>
      <div
        onClick={toggleEditing}
        className={`h-[calc(100svh-209px)] min-w-[280px] mt-12 rounded-md text-[24px] font-bold flex items-center justify-center text-gray-300 hover:text-primary transtition-colors cursor-pointer ${
          theme === "light" ? "bg-gray-200" : "bg-gray-500/20"
        }`}
      >
        + New Column
      </div>
    </main>
  );
}
