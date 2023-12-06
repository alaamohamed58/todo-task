import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { Dialog, DialogContent, Stack } from "@mui/material";
import { useAppDispatch } from "../../../hooks";
import axios from "../../../api/axios";
import Input from "./Input";
import { createTodoAsync, updateTodoAsync } from "../../../store/todosSlice";
import Todo from "../../../interfaces/todo.interface";

interface Prop {
  open: boolean;
  closeFormHandler: () => void;
}

const Form = ({ open, closeFormHandler }: Prop) => {
  const selectedTask = sessionStorage.getItem("task")
    ? JSON.parse(sessionStorage.getItem("task") as string)
    : null;
  const dispatch = useAppDispatch();
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const [categories, setCategories] = useState([]);

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
    }
  }, [open]);
  const getAllCategories = useCallback(async (): Promise<void | Error> => {
    try {
      const response = await axios.get("category");
      const results = await response.data;

      setCategories(results);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

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

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories, dispatch]);

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
