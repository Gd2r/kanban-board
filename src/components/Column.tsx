import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Paper, Typography, Button, Box, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Card from "./Card";
import { Column as ColumnType, Task } from "../types";

interface Props {
  column: ColumnType;
  onAddTask: (columnId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

const Column: React.FC<Props> = ({
  column,
  onAddTask,
  onDeleteTask,
  onEditTask,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        height: "calc(100vh - 92px)", // Adjusted for footer
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "4px",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        px={1}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
          }}
        >
          {column.title}
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => onAddTask(column.id)}
          size="small"
          variant="contained"
          color="primary"
          sx={{
            boxShadow: "none",
            textTransform: "none",
            fontSize: "0.8125rem",
            py: 0.5,
            "&:hover": {
              boxShadow: "none",
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Add
        </Button>
      </Box>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              minHeight: 100,
              flexGrow: 1,
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
                borderRadius: "4px",
                margin: "4px 0",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(0,0,0,0.2)",
                borderRadius: "4px",
                "&:hover": {
                  background: "rgba(0,0,0,0.3)",
                },
              },
              mx: -1,
              px: 1,
            }}
          >
            {column.tasks.map((task, index) => (
              <Card
                key={task.id}
                task={task}
                index={index}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
