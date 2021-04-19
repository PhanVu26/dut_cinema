// import logo from './logo.svg';
import "./App.css";

import AdminPage from "./pages/admin/AdminPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import routes from "./routes/index.route";
import HomePage from "./pages/HomePage/HomePage"
import UserManagementPage from './pages/admin/UserManagementPage';
import MovieManager from './pages/manager/movie manager';
import ActorManager from './pages/manager/ActorManager/index';
import ManagerPage from './pages/manager/index';
import HomePage from "./pages/HomePage/HomePage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import MovieManager from "./pages/manager/movie manager";
import ShowTimeManager from "./pages/ShowTimeManager/HomePage/HomePage";
<<<<<<< HEAD
=======
import EditShowTimePage from "./pages/ShowTimeManager/EditShowTimePage/EditShowTimePage";
>>>>>>> e4e561f (create edit showtime page)
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/admin">
            <AdminPage></AdminPage>
          </Route>
          <Route exact path="/admin/users">
            <UserManagementPage></UserManagementPage>
          </Route>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/manager"> 
            <ManagerPage></ManagerPage>
          </Route>  
          <Route exact path="/manager/movies">
            <MovieManager></MovieManager>
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
