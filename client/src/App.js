import React from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
    const history = useHistory();
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Login} history={history} />
                {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
                <PrivateRoute
                    exact
                    path="/bubblepage"
                    component={BubblePage}
                    history={history}
                />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
