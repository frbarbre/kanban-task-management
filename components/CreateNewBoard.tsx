import { useBoardStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import { useThemeStore } from "@/store";
import Image from "next/image";
interface CreateNewBoardProps {
  setCreateBoard: (createBoard: boolean) => void;
}

export default function CreateNewBoard({
  setCreateBoard,
}: CreateNewBoardProps) {
  const boards = useStore(useBoardStore, (state) => state.boards);
  const addBoard = useBoardStore((state) => state.addBoard);
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const theme = useStore(useThemeStore, (state) => state.theme);
  console.log(addBoard);
  console.log(boards);

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
  console.log(theme);
  return (
    <div className="fixed bg-black/50 w-[100svw] h-[100svh] top-0 left-0 z-10">
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-500"
        } w-[500px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-[6px] p-8`}
      >
        <Image
          src="/icon-cross.svg"
          width={20}
          height={20}
          alt="cross"
          className="absolute top-[20px] right-[20px] cursor-pointer"
          onClick={() => setCreateBoard(false)}
        />
        <h3 className="font-bold text-[18px]">Add New Board</h3>
        <p className="font-bold text-[12px] text-gray-300 pb-2 pt-4">Name</p>
        <input
          type="text"
          placeholder="e.g Web Design"
          onChange={(e) => setBoardName(e.target.value)}
          className={`${
            theme === "light"
              ? "bg-white border-gray-200"
              : "bg-gray-500 border-gray-400"
          } border rounded-[6px] w-full h-[40px] px-4 py-2 text-[13px] font-medium`}
        />
        <p className="font-bold text-[12px] text-gray-300 pb-2 pt-4">Columns</p>
        {columns.map((column, index) => (
          <div key={index} className="flex items-center gap-2 mb-[12px]">
            <input
              placeholder={`Column ${index + 1}`}
              value={column}
              className={`${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-gray-500 border-gray-400"
              } border rounded-[6px] w-full h-[40px] px-4 py-2 text-[13px] font-medium`}
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
          <p className="text-primary font-bold text-[13px]">+ Add New Column</p>
        </div>
        <div
          onClick={() => {
            addBoard(boardName, columns);
            setCreateBoard(false);
          }}
          className="rounded-[20px] bg-primary w-full text-center h-[40px] items-center flex justify-center mt-6 cursor-pointer"
        >
          <p className="text-white font-bold text-[13px]">Create New Board</p>
        </div>
      </div>
    </div>
  );
}
