import "./index.css";

import { Fragment, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginHandler } from "./store/auth-actions";

import Navigation from "./components/Navigation/Navigation";
import LoginPage from "./pages/LoginPage";
import DetailsPage from "./pages/DetailsPage";

import Workflow from "./components/UI/Workflow";
import Toast from "./components/UI/Toast";

export default function App() {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const expirationTime = useSelector((state) => state.auth.expirationTime);
  const dispatch = useDispatch();
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn) dispatch(loginHandler(token, userId, expirationTime));
  }, [dispatch, isLoggedIn, expirationTime, token, userId]);

  let switchContent;
  if (isLoggedIn) {
    switchContent = (
      <Switch>
        <Route>
          <Navigation />
          <Workflow>
            <Switch>
              <Route path="/details" exact>
                <DetailsPage />
              </Route>
              <Route>
                <Redirect to="/details" />
              </Route>
            </Switch>
          </Workflow>
        </Route>
      </Switch>
    );
  } else {
    switchContent = (
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    );
  }

  return (
    <Fragment>
      {switchContent}
      <Toast />
    </Fragment>
  );
}
