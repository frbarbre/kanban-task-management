import { useBoardStore, useCurrentBoardStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import { useThemeStore } from "@/store";
import Image from "next/image";
import { useEffect } from "react";
interface CreateNewBoardProps {
  setEditBoard: (editBoard: boolean) => void;
}

export default function EditBoard({ setEditBoard }: CreateNewBoardProps) {
  const boards = useStore(useBoardStore, (state) => state.boards);
  const editBoard = useBoardStore((state) => state.editBoard);
  const theme = useStore(useThemeStore, (state) => state.theme);
  const currentBoardId = useStore(
    useCurrentBoardStore,
    (state) => state.currentBoardId
  );
  const currentBoard = boards?.find((board) => board.id === currentBoardId);
  const [columns, setColumns] = useState<string[]>([]);
  const [boardName, setBoardName] = useState(currentBoard?.name);

  useEffect(() => {
    const currentBoardColumns = currentBoard?.columns.map(
      (column) => column.name
    );
    setColumns(currentBoardColumns || []);
  }, [currentBoard]);

  const handleAddColumn = () => {
    setColumns([...columns, ""]);
  };

  const handleColumnChange = (index: number, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  const handleRemoveColumn = (index: number) => {
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
  };

  if (!currentBoard) return null;
  return (
    <>
      <div className="fixed bg-black/50 w-[100svw] h-[100svh] top-0 left-0">
        <div
          className={`${
            theme === "light" ? "bg-white" : "bg-gray-500"
          } w-[500px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-[6px] p-12`}
        >
          <Image
            src="/icon-cross.svg"
            width={20}
            height={20}
            alt="cross"
            className="absolute top-[20px] right-[20px] cursor-pointer"
            onClick={() => setEditBoard(false)}
          />
          <h3 className="font-bold text-[18px]">Edit Board</h3>
          <p className="font-bold text-[12px] text-gray-300 pb-2 pt-4">Name</p>
          <input
            type="text"
            placeholder="e.g Web Design"
            defaultValue={currentBoard?.name}
            onChange={(e) => setBoardName(e.target.value)}
            className={`${
              theme === "light" ? "bg-white" : "bg-gray-500"
            } border border-gray-300 rounded-[6px] w-full h-[40px] px-2`}
          />
          <p className="font-bold text-[12px] text-gray-300 pb-2 pt-4">
            Columns
          </p>
          {columns.map((column, index) => (
            <div key={index} className="flex items-center gap-2 mb-[12px]">
              <input
                placeholder={`Column ${index + 1}`}
                value={column}
                className={`${
                  theme === "light" ? "bg-white" : "bg-gray-500"
                } border border-gray-300 rounded-[6px] w-full h-[40px] px-2`}
                onChange={(e) => handleColumnChange(index, e.target.value)}
              />
              <Image
                alt="cross"
                src="/icon-cross.svg"
                width={15}
                height={15}
                className="w-[15px] h-[15px] cursor-pointer"
                onClick={() => handleRemoveColumn(index)}
              />
            </div>
          ))}

          <div
            className="rounded-[20px] bg-idle w-full text-center h-[40px] items-center flex justify-center cursor-pointer"
            onClick={handleAddColumn}
          >
            <p className="text-primary font-bold text-[13px]">
              + Add New Column
            </p>
          </div>
          <div
            onClick={() => {
              editBoard(
                currentBoard?.id,
                boardName === ""
                  ? currentBoard.name
                  : boardName || currentBoard.name,
                columns
              );
              setEditBoard(false);
            }}
            className="rounded-[20px] bg-primary w-full text-center h-[40px] items-center flex justify-center mt-6 cursor-pointer"
          >
            <p className="text-white font-bold text-[13px]">Edit Board</p>
          </div>
        </div>
      </div>
    </>
  );
}
