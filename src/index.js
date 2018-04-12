import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/common/Header";
import List from "./components/list/List";
import Notfound from "./components/notfound/Notfound";
import Detail from "./components/detail/Detail";
import "./index.css";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/currency/:id" component={Detail} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
