import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import Column from "./Column";
import { Board as BoardType, Task } from "../types";
import { v4 as uuidv4 } from "uuid";

const initialData: BoardType = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "1",
          title: "First Task",
          description: "This is a sample task",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
  ],
};

const Board: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = board.columns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = board.columns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destColumn) return;

    const newBoard = { ...board };
    const sourceColumnIndex = board.columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColumnIndex = board.columns.findIndex(
      (col) => col.id === destination.droppableId
    );

    if (sourceColumn === destColumn) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      newBoard.columns[sourceColumnIndex].tasks = newTasks;
    } else {
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      newBoard.columns[sourceColumnIndex].tasks = sourceTasks;
      newBoard.columns[destColumnIndex].tasks = destTasks;
    }

    setBoard(newBoard);
  };

  const handleAddTask = (columnId: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title: "New Task",
      description: "Click edit to modify this task",
    };

    const newBoard = { ...board };
    const columnIndex = newBoard.columns.findIndex(
      (col) => col.id === columnId
    );
    newBoard.columns[columnIndex].tasks.push(newTask);
    setBoard(newBoard);
  };

  const handleDeleteTask = (taskId: string) => {
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.id !== taskId),
    }));
    setBoard(newBoard);
  };

  const handleEditTask = (editedTask: Task) => {
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.map((column) => ({
      ...column,
      tasks: column.tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      ),
    }));
    setBoard(newBoard);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          padding: 2,
          gap: 2,
          minHeight: "100vh",
          backgroundColor: "#e3f2fd",
          width: "100%",
          boxSizing: "border-box",
          "& > *": {
            flex: 1,
            minWidth: 300,
            maxWidth: "none",
          },
        }}
      >
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};

export default Board;
