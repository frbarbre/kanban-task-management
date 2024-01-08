"use client";

import { colors } from "@/constants";
import { useBoardStore, useCurrentBoardStore, useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import { ReformatedColums } from "@/types";
import { useState } from "react";
import ViewTask from "./ViewTask";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";
import DeleteTask from "./DeleteTask";
import { useCurrentTaskStore } from "../store";
import EditTask from "./EditTask";
interface ColumnProps {
  column: ReformatedColums;
  index: number;
}

export default function Column({ column, index }: ColumnProps) {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const [isRemoveTask, setIsRemoveTask] = useState(false);
  const [viewTask, setViewTask] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function adjustNumber(max: number, num: number) {
    return num % max;
  }

  const color = adjustNumber(colors.length, index);

  const { isOver, setNodeRef } = useDroppable({
    id: column.name,
  });

  const style = {
    opacity: isOver ? "80%" : undefined,
  };

  const sortedTasks = column.tasks?.sort(
    (a, b) => b.lastDragged - a.lastDragged
  );

  const boards = useStore(useBoardStore, (state) => state.boards);
  const currentTaskId = useStore(
    useCurrentTaskStore,
    (state) => state.currentTaskId
  );
  const currentBoardId = useStore(
    useCurrentBoardStore,
    (state) => state.currentBoardId
  );

  const currentBoard = boards?.find((board) => board.id === currentBoardId);
  const currentTask = currentBoard?.tasks.find(
    (task) => task.id === currentTaskId
  );

  return (
    <section ref={setNodeRef} style={style} className="min-w-[280px]">
      <div className="flex items-center gap-3 pb-6">
        <div
          className="w-[15px] h-[15px] rounded-full"
          style={{ background: colors[color] }}
        />
        <h2 className="uppercase font-bold text-gray-300 tracking-[2.4px]">
          {column.name} ({column.tasks?.length})
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        {sortedTasks?.map((task) => {
          return (
            <Task
              setViewTask={setViewTask}
              viewTask={viewTask}
              task={task}
              theme={theme || "light"}
            />
          );
        })}
      </div>
      {viewTask ? (
        <ViewTask
          viewTask={viewTask}
          setViewTask={setViewTask}
          setIsRemoveTask={setIsRemoveTask}
          isRemoveTask={isRemoveTask}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      ) : null}
      {isRemoveTask ? (
        <DeleteTask
          setIsRemoveTask={setIsRemoveTask}
          currentTask={currentTask}
          setViewTask={setViewTask}
          viewTask={viewTask}
        />
      ) : null}
      {isEditing ? (
        <EditTask
          setIsEditing={setIsEditing}
          setViewTask={setViewTask}
          currentStatus={
            currentBoard?.columns.map((column) => column.name) || []
          }
        />
      ) : null}
    </section>
  );
}
