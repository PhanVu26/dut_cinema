// import logo from './logo.svg';
import "./App.css";

import AdminPage from "./pages/admin/AdminPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import routes from "./routes/index.route";
import HomePage from "./pages/HomePage/HomePage"
import UserManagementPage from './pages/admin/UserManagementPage';
import MovieManager from './pages/manager/MovieManager';
import ActorManager from './pages/manager/ActorManager/index';
import ManagerPage from './pages/manager/index';
import Login from './pages/Login/Login';
import ShowTimeManager from "./pages/ShowTimeManager/HomePage/HomePage";
import EditShowTimePage from "./pages/ShowTimeManager/EditShowTimePage/EditShowTimePage";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminPage></AdminPage>
          </Route>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route path="/manager"> 
            <ManagerPage></ManagerPage>
          </Route>
          <Route path="/login"> 
            <Login></Login>
          </Route>
          <Route exact path="/showtime_manager">
            <ShowTimeManager></ShowTimeManager>
          </Route>
          <Route exact path="/showtime_manager/edit">
            <EditShowTimePage></EditShowTimePage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
