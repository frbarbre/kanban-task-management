import { useDraggable } from "@dnd-kit/core";
import { useCurrentTaskStore } from "../store";
import useStore from "@/store/useStore";
import { Task as TTask, Theme } from "@/types";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface TaskProps {
  task: TTask;
  theme: Theme;
  setViewTask: (viewTask: boolean) => void;
  viewTask: boolean;
}

export default function Task({
  task,
  theme,
  setViewTask,
  viewTask,
}: TaskProps) {
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isDone
  ).length;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const setCurrentTaskId = useCurrentTaskStore(
    (state) => state.setCurrentTaskId
  );
  return (
    <div
      onClick={() => {
        setViewTask(true);
        setCurrentTaskId(task.id);
      }}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-[280px] ${
        theme === "light" ? "bg-white" : "bg-gray-500"
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
}
