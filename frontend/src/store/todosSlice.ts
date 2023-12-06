import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../api/axios";
import Cookies from "js-cookie";
import Todo from "../interfaces/todo.interface";

const token = Cookies.get("app-token");
const userId = Number(sessionStorage.getItem("user_id"));

interface TodosState {
  status: "idle" | "pending" | "loading" | "succeeded" | "failed";
  todos: Todo[];
}

const initialTodosState: TodosState = {
  status: "idle",
  todos: [],
};

export const createTodoAsync = createAsyncThunk(
  "todos/createTodo",
  async (todo: Todo, thunkAPI) => {
    try {
      const response = await axios.post(
        "/tasks",
        {
          ...todo,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const createdTodo = response.data;
      thunkAPI.dispatch(getTodosAsync());
      return createdTodo;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTodosAsync = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`tasks/getAllTasksByUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const todos = response.data;
      return todos;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getFilteredTodosAsync = createAsyncThunk(
  "todos/filteredTodos",
  async (todoId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `tasks/getAllFilteredTasks/${userId}/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const todos = response.data;
      return todos;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  `todos/deleteTodo`,
  async (todoId: number, thunkAPI) => {
    try {
      await axios.delete(`tasks/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(getTodosAsync());
      return todoId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async (
    { task_id, status, title, description, due_date, category_id }: Todo,
    thunkAPI
  ) => {
    try {
      await axios.put(
        `tasks/${task_id}`,
        {
          status,
          title,
          description,
          due_date,
          category_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(getTodosAsync());
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodosState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          state.status = "succeeded";
          state.todos.push(action.payload);
        }
      )
      .addCase(createTodoAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getTodosAsync.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.status = "succeeded";
          state.todos = action.payload;
        }
      )
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getFilteredTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getFilteredTodosAsync.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.status = "succeeded";
          state.todos = action.payload;
        }
      )
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteTodoAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          // state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        }
      )
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const todosSelectors = {
  selectTodos: (state: { todos: TodosState }) => state.todos.todos,
  selectTodosStatus: (state: { todos: TodosState }) => state.todos.status,
};

export default todosSlice.reducer;
