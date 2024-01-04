"use client";

import { BoardStore, MenuStore, ThemeStore, currentBoardStore } from "@/types";
import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

export const useThemeStore = createWithEqualityFn<ThemeStore>()(
  persist(
    (set, get): ThemeStore => ({
      theme: "light",
      changeTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    {
      name: "theme-storage",
    }
  )
);

export const useMenuStore = createWithEqualityFn<MenuStore>()(
  persist(
    (set, get): MenuStore => ({
      isOpen: true,
      toggleMenu: () => set({ isOpen: !get().isOpen }),
      isEditing: false,
      setEditing: (isEditing) => set({ isEditing: isEditing }),
      toggleEditing: () => set({ isEditing: !get().isEditing }),
    }),
    {
      name: "menu-storage",
    }
  )
);

export const useBoardStore = createWithEqualityFn<BoardStore>()(
  persist(
    (set, get): BoardStore => ({
      boards: [],
      addBoard: (name, columns) =>
        set({
          boards: [
            {
              name: name,
              id: crypto.randomUUID(),
              columns: columns
                ? columns.map((column) => {
                    return { name: column, id: crypto.randomUUID() };
                  })
                : [],
              tasks: [],
            },
            ...get().boards,
          ],
        }),
      removeBoard: (id) =>
        set({
          boards: get().boards.filter((board) => board?.id !== id),
        }),
      addColumn: (name, id) =>
        set((state) => ({
          boards: state.boards.map((board) => {
            if (board.id === id) {
              return {
                ...board,
                columns: [
                  ...board.columns,
                  { name: name, id: crypto.randomUUID() },
                ],
              };
            }
            return board;
          }),
        })),
      editBoard: (id, name, columns) =>
        set((state) => ({
          boards: state.boards.map((board) => {
            if (board.id === id) {
              return {
                ...board,
                name: name,
                columns: columns.map((column) => {
                  return { name: column, id: crypto.randomUUID() };
                }),
              };
            }
            return board;
          }),
        })),
      addTask: (name, description, status, subtasks, id) =>
        set((state) => ({
          boards: state.boards.map((board) => {
            if (board.id === id) {
              return {
                ...board,
                tasks: [
                  ...board.tasks,
                  {
                    name: name,
                    description: description,
                    status: status,
                    subtasks: subtasks.map((subtask) => {
                      return { name: subtask, isDone: false };
                    }),
                  },
                ],
              };
            }
            return board;
          }),
        })),
    }),

    {
      name: "board-storage",
    }
  )
);

export const useCurrentBoardStore = createWithEqualityFn<currentBoardStore>()(
  persist(
    (set): currentBoardStore => ({
      currentBoardId: null,
      setCurrentBoardId: (id) => set({ currentBoardId: id }),
      resetCurrentBoard: () => set({ currentBoardId: null }),
    }),
    {
      name: "current-board-storage",
    }
  )
);
