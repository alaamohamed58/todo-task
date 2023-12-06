import React, { Fragment } from "react";
import { useAppSelector } from "./hooks";
import AllPages from "./pages/AllPages";
import Header from "./layout/Header";

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <Fragment>
      {isAuthenticated && <Header />}
      <AllPages />
    </Fragment>
  );
};

export default App;
