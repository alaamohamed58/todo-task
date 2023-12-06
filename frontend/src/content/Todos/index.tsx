import { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import View from "./View";
import Form from "./Form";
import { getTodosAsync } from "../../store/todosSlice";

const Todos = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const openFormHandler = (): void => {
    setOpen(true);
  };
  const closeFormHandler = (): void => {
    setOpen(false);
    // setSelectedTask(null)
  };

  return (
    <Fragment>
      <Helmet>
        <title>Todos</title>
      </Helmet>

      <Form open={open} closeFormHandler={closeFormHandler} />

      <PageTitleWrapper>
        <PageHeader handleOpen={openFormHandler} />
      </PageTitleWrapper>

      <View todos={todos} openFormHandler={openFormHandler} />
    </Fragment>
  );
};

export default Todos;
