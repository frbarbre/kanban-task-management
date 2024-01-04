"use client";

import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  changeTheme: () => void;
}

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

interface MenuStore {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const useMenuStore = createWithEqualityFn<MenuStore>()(
  persist(
    (set, get): MenuStore => ({
      isOpen: true,
      toggleMenu: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "menu-storage",
    }
  )
);

type Board = {
  name: string;
  id: string;
  columns: { name: string; id: string }[] | [];
  tasks:
    | {
        name: string;
        description: string;
        status: string;
        subtasks:
          | {
              name: string;
              isDone: Boolean;
            }[]
          | [];
      }
    | [];
};

interface BoardStore {
  boards: Board[];
  addBoard: (name: string, columns?: string[]) => void;
  removeBoard: (id: string) => void;
  addColumn: (name: string, id: string) => void;
  editBoard: (id: string, name: string, columns: string[]) => void;
}

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
    }),

    {
      name: "board-storage",
    }
  )
);

interface currentBoardStore {
  currentBoardId: string | null;
  setCurrentBoardId: (id: string | null) => void;
  resetCurrentBoard: () => void;
}

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
