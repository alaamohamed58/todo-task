interface Todo {
  task_id?: number;
  status?: number;
  user_id?:number
  category_id?: number | string;
  title?: string;
  description?: string;
  due_date?: string;
}

export default Todo;
