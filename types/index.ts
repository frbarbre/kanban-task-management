export type Theme = "light" | "dark";

export interface ThemeStore {
  theme: Theme;
  changeTheme: () => void;
}

export interface MenuStore {
  isOpen: boolean;
  toggleMenu: () => void;
  isEditing: boolean;
  setEditing: (isEditing: boolean) => void;
  toggleEditing: () => void;
  createBoard: boolean;
  setCreateBoard: (createBoard: boolean) => void;
  toggleCreateBoard: () => void;
}

export type Board = {
  name: string;
  id: string;
  columns: { name: string; id: string }[] | [];
  tasks:
    | {
        name: string;
        id: string;
        description: string;
        status: string;
        lastDragged: number;
        subtasks:
          | {
              name: string;
              isDone: boolean;
              id: string;
            }[]
          | [];
      }[]
    | [];
};

export type Column = {
  name: string;
  id: string;
};

export type Task = {
  name: string;
  id: string;
  description: string;
  status: string;
  lastDragged: number;
  subtasks:
    | {
        name: string;
        isDone: boolean;
        id: string;
      }[]
    | [];
};

export interface BoardStore {
  boards: Board[];
  addBoard: (name: string, columns?: string[]) => void;
  removeBoard: (id: string) => void;
  addColumn: (name: string, id: string) => void;
  editBoard: (id: string, name: string, columns: string[]) => void;
  addTask: (
    name: string,
    description: string,
    status: string,
    subtasks: string[],
    id: string
  ) => void;
  removeTask: (id: string) => void;
  changeStatus: (id: string, status: string) => void;
  changeSubtaskStatus: (id: string, subtaskId: string) => void;
  editTask: (
    id: string,
    name: string,
    description: string,
    subtasks: string[],
    status: string
  ) => void;
}

export interface currentBoardStore {
  currentBoardId: string | null;
  setCurrentBoardId: (id: string | null) => void;
  resetCurrentBoard: () => void;
}

export interface currentTaskStore {
  currentTaskId: string | null;
  setCurrentTaskId: (id: string | null) => void;
  resetCurrentTask: () => void;
}

export interface ReformatedColums {
  tasks: {
    name: string;
    id: string;
    description: string;
    status: string;
    lastDragged: number;
    subtasks:
      | []
      | {
          name: string;
          isDone: boolean;
          id: string;
        }[];
  }[];
  name: string;
  id: string;
}
[];
