import logo from './logo.svg';
import './App.css';

import AdminPage from "./pages/admin/AdminPage"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from "./routes/index.route";
import HomePage from "./pages/HomePage/HomePage"
import UserManagementPage from './pages/admin/UserManagementPage';

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
