import { FC, Dispatch, SetStateAction } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Stack,
  Card,
  CardContent,
  Tooltip,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { blue, red } from "@mui/material/colors";
import { useAppDispatch } from "../../hooks";
import Todo from "../../interfaces/todo.interface";
import { deleteTodoAsync, updateTodoAsync } from "../../store/todosSlice";

interface Prop {
  todos: Todo[];
  openFormHandler: () => void;
}

const View: FC<Prop> = ({ todos, openFormHandler }) => {
  const dispatch = useAppDispatch();

  const editTaskHandler = (task: Todo) => {
    openFormHandler();

    sessionStorage.setItem("task", JSON.stringify(task));
  };

  const updateStatus = (id: number, newStatus: number, task: Todo) => {
    dispatch(
      updateTodoAsync({
        task_id: id,
        status: newStatus,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        category_id: task.category_id,
      })
    );
  };

  return (
    <Grid container spacing={2}>
      {todos &&
        todos.map((todo: Todo, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  bgcolor="#fff"
                  mb={2}
                  position="relative"
                  height={180}
                  sx={{
                    width: "100%",
                    opacity: todo.status === 2 ? 0.6 : 1,
                  }}
                >
                  <>
                    <EventIcon style={{ color: blue[500] }} />
                    <Typography variant="body2">{todo.due_date}</Typography>
                    <AssignmentIcon style={{ color: blue[500] }} />
                    <Typography variant="h6">{todo.title}</Typography>
                    <Typography variant="body2">{todo.description}</Typography>
                    <Checkbox
                      checked={todo.status === 2}
                      onChange={() =>
                        updateStatus(
                          todo.task_id as number,
                          todo.status === 1 ? 2 : 1,
                          todo
                        )
                      }
                    />
                    {todo.status === 2 && (
                      <Typography color="error">Completed!</Typography>
                    )}
                  </>

                  <Box
                    position="absolute"
                    sx={{
                      right: "10px",
                      top: "10px",
                    }}
                  >
                    {todo.status !== 2 && (
                      <Tooltip
                        title="Edit"
                        onClick={() => editTaskHandler(todo)}
                      >
                        <IconButton aria-label="Edit" color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip
                      title="Delete Task"
                      onClick={() =>
                        dispatch(deleteTodoAsync(todo.task_id as number))
                      }
                    >
                      <IconButton aria-label="close" color="error">
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default View;
