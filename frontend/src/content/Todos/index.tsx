import { Fragment, useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import axios from "../../api/axios";

import { useAppDispatch, useAppSelector } from "../../hooks";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import View from "./View";
import Form from "./Form";
import { getTodosAsync } from "../../store/todosSlice";
import Loading from "../../components/Loading";

const Todos = () => {
  const dispatch = useAppDispatch();
  const { todos, status } = useAppSelector((state) => state.todos);
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const getAllCategories = useCallback(async (): Promise<void | Error> => {
    try {
      const response = await axios.get("category");
      const results = await response.data;

      setCategories(results);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories, dispatch]);
  const openFormHandler = (): void => {
    setOpen(true);
    sessionStorage.removeItem("task");
  };
  const closeFormHandler = (): void => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Todos</title>
      </Helmet>

      <Form
        open={open}
        closeFormHandler={closeFormHandler}
        categories={categories}
      />

      <PageTitleWrapper>
        <PageHeader handleOpen={openFormHandler} catagories={categories} />
      </PageTitleWrapper>
    {status === 'loading' && <Loading />}
    {status !== 'loading' &&  <View  todos={todos} openFormHandler={openFormHandler} />}
    </Fragment>
  );
};

export default Todos;
