import Column from "./Column";
import { ReformatedColums } from "@/types";

interface BoardProps {
  columns?: ReformatedColums[];
}

export default function Board({ columns }: BoardProps) {
  return columns?.map((column, index) => {
    return <Column column={column} key={index} index={index} />;
  });
}
