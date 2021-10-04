import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";

export function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}
