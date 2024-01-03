import { useBoardStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import Image from "next/image";

interface CreateNewBoardProps {}

export default function CreateNewBoard() {
  const boards = useStore(useBoardStore, (state) => state.boards);
  const addBoard = useBoardStore((state) => state.addBoard);
  const addColumn = useBoardStore((state) => state.addColumn);
  const removeBoard = useBoardStore((state) => state.removeBoard);
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
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

  return (
    <div className="">
      <div className="absolute bg-black opacity-50 w-full h-full top-0"></div>
      <div className="bg-white h-[480px] w-[500px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-[6px] p-12">
        <h3 className="font-bold text-[18px]">Add New Board</h3>
        <p className="font-bold text-[12px] text-gray-300 ">Name</p>
        <input
          type="text"
          placeholder="e.g Web Design"
          onChange={(e) => setBoardName(e.target.value)}
          className="border border-gray-300 rounded-[6px] w-full h-[40px] px-2"
        />
        <p>Columns</p>
        {columns.map((column, index) => (
          <div key={index}>
            <input
              placeholder={`Column ${index + 1}`}
              value={column}
              className="border border-gray-300 rounded-[6px] w-full h-[40px] px-2"
              onChange={(e) => handleColumnChange(index, e.target.value)}
            />
          </div>
        ))}

        <div className="rounded-[20px] bg-idle w-full text-center h-[40px]">
          <p className="opacity-100 text-primary" onClick={handleAddColumn}>
            + Add New Column
          </p>
        </div>
        <p onClick={() => addBoard(boardName, columns)}>Create New Board</p>
      </div>
    </div>
  );
}
