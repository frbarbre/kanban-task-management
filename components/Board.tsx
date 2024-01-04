import { colors } from "@/constants";
import Column from "./Column";
import { Board as TBoard } from "@/types";

interface BoardProps {
  currentBoard?: TBoard;
}

export default function Board({ currentBoard }: BoardProps) {
  return currentBoard?.columns.map((column, index) => {
    function adjustNumber(max: number, num: number) {
      return num % max;
    }

    const color = adjustNumber(colors.length, index);

    const tasks = currentBoard?.tasks.filter(
      (task) => task.status === column.name
    );

    return <Column color={color} column={column} tasks={tasks} key={index} />;
  });
}
