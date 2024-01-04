import { colors } from "@/constants";
import { useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import { Column as TColumn, Task } from "@/types";

interface ColumnProps {
  column: TColumn;
  color: number;
  tasks: Task[];
}

export default function Column({ column, color, tasks }: ColumnProps) {
  const theme = useStore(useThemeStore, (state) => state.theme);

  return (
    <section className="min-w-[280px]">
      <div className="flex items-center gap-3 pb-6">
        <div
          className="w-[15px] h-[15px] rounded-full"
          style={{ background: colors[color] }}
        />
        <h2 className="uppercase font-bold text-gray-300 tracking-[2.4px]">
          {column.name} ({tasks.length})
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        {tasks?.map((task) => {
          const completedSubtasks = task.subtasks.filter(
            (subtask) => subtask.isDone
          ).length;
          return (
            <div
              className={`w-[280px] ${
                theme === "light" ? "bg-gray-200" : "bg-gray-500"
              } rounded-lg shadow-sm px-4 py-6 group cursor-pointer`}
            >
              <h3 className="text-[15px] font-bold group-hover:text-primary transition-colors">
                {task.name}
              </h3>
              {task.subtasks.length !== 0 && (
                <p className="text-[12px] font-bold text-gray-300 pt-2">
                  {completedSubtasks} of {task.subtasks.length} subtasks
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
