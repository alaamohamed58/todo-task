import { Fragment, Dispatch, SetStateAction, ChangeEvent } from "react";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  InputLabel,
} from "@mui/material";
import { useAppSelector } from "../../../hooks";
import { styled } from "@mui/system";
import Loading from "../../../components/Loading";

const StyledDateInput = styled("input")({
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
});

interface Task {
  title: string;
  description: string;
  due_date: string;
}
interface Category {
  category_id: number;
  categoryNameAr: string;
  categoryNameEn: string;
}
interface Prop {
  task: Task;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
  setCategoryId: Dispatch<SetStateAction<number | string>>;
  selectedCategory: string | number;
}

const Input = (props: Prop) => {
  const { status } = useAppSelector((state) => state.todos);
  const { task, changeHandler, categories, setCategoryId, selectedCategory } =
    props;
  const { title, description, due_date } = task;

  return (
    <Fragment>
      <TextField
        name="title"
        label="Title"
        variant="standard"
        value={title}
        onChange={changeHandler}
      />
      <TextField
        name="description"
        label="Description"
        variant="standard"
        multiline
        value={description}
        onChange={changeHandler}
      />

      <Box width="100%">
        <InputLabel>Category</InputLabel>
        <Select
          name="selectOption"
          fullWidth
          value={selectedCategory}
          onChange={(event: any) =>
            setCategoryId(event.target.value as number | string)
          }
        >
          <MenuItem value="" disabled>
            Categories
          </MenuItem>
          {categories &&
            categories.map((category: any) => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.categoryNameEn}
              </MenuItem>
            ))}
        </Select>
      </Box>

      <StyledDateInput
        name="due_date"
        type="date"
        value={due_date}
        onChange={changeHandler}
      />
      {status === 'loading' && <Loading />}
      {status !== "loading" && <Button type="submit">Submit</Button>}
    </Fragment>
  );
};

export default Input;
