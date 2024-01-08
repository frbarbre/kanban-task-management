"use client";

import {
  BoardStore,
  MenuStore,
  ThemeStore,
  currentBoardStore,
  currentTaskStore,
} from "@/types";
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
      createBoard: false,
      setCreateBoard: (createBoard) => set({ createBoard: createBoard }),
      toggleCreateBoard: () => set({ createBoard: !get().createBoard }),
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
                    id: crypto.randomUUID(),
                    description: description,
                    status: status,
                    lastDragged: new Date().getTime(),
                    subtasks: subtasks.map((subtask) => {
                      return {
                        name: subtask,
                        isDone: false,
                        id: crypto.randomUUID(),
                      };
                    }),
                  },
                ],
              };
            }
            return board;
          }),
        })),
      removeTask: (id) =>
        set({
          boards: get().boards.map((board) => {
            return {
              ...board,
              tasks: board.tasks.filter((task) => task.id !== id),
            };
          }),
        }),
      changeStatus: (id, status) =>
        set((state) => ({
          boards: state.boards.map((board) => {
            return {
              ...board,
              tasks: board.tasks.map((task) => {
                if (task.id === id) {
                  return {
                    ...task,
                    status: status,
                    lastDragged: new Date().getTime(),
                  };
                }
                return task;
              }),
            };
          }),
        })),
      changeSubtaskStatus: (id, subtaskId) =>
        set((state) => ({
          boards: state.boards.map((board) => {
            return {
              ...board,
              tasks: board.tasks.map((task) => {
                if (task.id === id) {
                  return {
                    ...task,
                    subtasks: task.subtasks.map((subtask) => {
                      if (subtask.id === subtaskId) {
                        return {
                          ...subtask,
                          isDone: !subtask.isDone,
                        };
                      }
                      return subtask;
                    }),
                  };
                }
                return task;
              }),
            };
          }),
        })),
      editTask: (id, name, description, subtasks, status) =>
        set((state) => ({
          boards: state.boards.map((board) => {
            return {
              ...board,
              tasks: board.tasks.map((task) => {
                if (task.id === id) {
                  return {
                    ...task,
                    name: name,
                    description: description,
                    status: status,
                    subtasks: Array.isArray(subtasks)
                      ? subtasks.map((subtask: string) => {
                          return {
                            name: subtask,
                            isDone: false,
                            id: crypto.randomUUID(),
                          };
                        })
                      : [],
                  };
                }
                return task;
              }),
            };
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

export const useCurrentTaskStore = createWithEqualityFn<currentTaskStore>()(
  persist(
    (set): currentTaskStore => ({
      currentTaskId: null,
      setCurrentTaskId: (id) => set({ currentTaskId: id }),
      resetCurrentTask: () => set({ currentTaskId: null }),
    }),
    {
      name: "current-task-storage",
    }
  )
);
