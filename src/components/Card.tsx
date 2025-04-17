import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Card as MUICard,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Task } from "../types";
import EditTaskDialog from "./EditTaskDialog";

interface Props {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const stickyNoteColors = [
  "#fff740", // yellow
  "#ffc4c4", // pink
  "#87f7cf", // mint
  "#7afcff", // blue
  "#ffb347", // orange
];

const Card: React.FC<Props> = ({ task, index, onDelete, onEdit }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // Use task ID to consistently assign the same color to each card
  const colorIndex =
    Math.abs(
      task.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % stickyNoteColors.length;
  const backgroundColor = stickyNoteColors[colorIndex];

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <MUICard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              margin: "8px 4px",
              backgroundColor: snapshot.isDragging
                ? `${backgroundColor}dd`
                : backgroundColor,
              boxShadow: snapshot.isDragging
                ? "8px 8px 8px rgba(0,0,0,0.2)"
                : "2px 2px 4px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "rotate(-1deg)",
                "& .actions": {
                  opacity: 1,
                },
              },
              transition: "all 0.2s ease-in-out",
              borderRadius: "2px",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "40%",
                height: "4px",
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "0 0 3px 3px",
              },
            }}
          >
            <CardContent
              sx={{
                pb: "8px !important",
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    wordBreak: "break-word",
                    flex: 1,
                    mr: 1,
                    fontFamily: "inherit",
                  }}
                >
                  {task.title}
                </Typography>
                <Box
                  className="actions"
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                    display: "flex",
                    gap: 0.5,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: "4px",
                    padding: "2px",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={handleOpenEditDialog}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(task.id)}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  wordBreak: "break-word",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontFamily: "inherit",
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                {task.description}
              </Typography>
            </CardContent>
          </MUICard>
        )}
      </Draggable>

      <EditTaskDialog
        task={task}
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={onEdit}
      />
    </>
  );
};

export default Card;
