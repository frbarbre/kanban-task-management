import { useBoardStore } from "@/store";
import useStore from "@/store/useStore";
import { useState } from "react";
import Image from "next/image";
import CreateNewBoard from "./CreateNewBoard";
export default function AllBoards() {
  const [createBoard, setCreateBoard] = useState(true);
  const boards = useStore(useBoardStore, (state) => state.boards);
  const addBoard = useBoardStore((state) => state.addBoard);
  const removeBoard = useBoardStore((state) => state.removeBoard);

  console.log(addBoard);
  console.log(boards);
  return (
    <div>
      <p>ALL BOARDS ({boards?.length})</p>
      <div>
        <Image src="/icon-board.svg" alt="board" width={20} height={20} />

        <p onClick={() => setCreateBoard(!createBoard)}>+Create New Board</p>
      </div>
      {boards?.length !== 0 &&
        boards?.map((board) => (
          <div>
            <p>{board?.name}</p>
            <p onClick={() => removeBoard(board?.id)}>slet</p>
          </div>
        ))}
      {createBoard ? <CreateNewBoard /> : null}
    </div>
  );
}
