type Theme = "light" | "dark";

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
}

export type Board = {
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
      }[]
    | [];
};

export type Column = {
  name: string;
  id: string;
};

export type Task = {
  name: string;
  description: string;
  status: string;
  subtasks: {
    name: string;
    isDone: Boolean;
  }[];
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
}

export interface currentBoardStore {
  currentBoardId: string | null;
  setCurrentBoardId: (id: string | null) => void;
  resetCurrentBoard: () => void;
}
