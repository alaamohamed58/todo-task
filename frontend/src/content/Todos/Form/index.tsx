import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { Dialog, DialogContent, Stack } from "@mui/material";
import { useAppDispatch } from "../../../hooks";
import Input from "./Input";
import { createTodoAsync, updateTodoAsync } from "../../../store/todosSlice";
import Todo from "../../../interfaces/todo.interface";

interface Prop {
  open: boolean;
  closeFormHandler: () => void;
  categories : any[]
}

const Form = ({ open, closeFormHandler ,categories }: Prop) => {
  const selectedTask = sessionStorage.getItem("task")
    ? JSON.parse(sessionStorage.getItem("task") as string)
    : null;
  const dispatch = useAppDispatch();
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
  });


  const [selectedCategory, setCategoryId] = useState<number | string>("");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const storedTask = sessionStorage.getItem("task");
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setTask(parsedTask);
      setCategoryId(parsedTask.category_id || "");
    } else {
      setTask({
        title: "",
        description: "",
        due_date: "",
      });
      setCategoryId("");
    }
  }, [open]);



  const updateStatus = (task: Todo) => {
    dispatch(
      updateTodoAsync({
        task_id: selectedTask.task_id,
        status: task.status,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        category_id: task.category_id,
      })
    );
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (selectedTask) {
      updateStatus({
        ...task,
        category_id: selectedCategory,
      });
    }
    dispatch(
      createTodoAsync({
        ...task,
        category_id: selectedCategory,
      })
    );
  };


  return (
    <Dialog open={open} onClose={closeFormHandler} fullWidth>
      <DialogContent>
        <Stack component="form" spacing={3} onSubmit={submitHandler}>
          <Input
            task={task}
            changeHandler={changeHandler}
            categories={categories}
            setCategoryId={setCategoryId}
            selectedCategory={selectedCategory}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
