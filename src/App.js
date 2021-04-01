import logo from "./logo.svg";
import "./App.css";

import AdminPage from "./pages/admin/AdminPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes/index.route";
import AccountManagementPage from "./pages/admin/AccounManagementPage";
import Header from "./components/client/Header/Header";
import Footer from "./components/client/Footer/Footer";
import HomePage from "./pages/client/HomePage/HomePage";
import MoviePage from "./pages/client/MoviePage/MoviePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/admin">
            <AdminPage></AdminPage>
          </Route>
          <Route exact path="/admin/account">
            <AccountManagementPage></AccountManagementPage>
          </Route>
          <Route exact path="/">
            <Header />
            <HomePage />
            <Footer />
          </Route>
          <Route
            exact
            path="/coming-soon"
            component={({ match }) => {
              return (
                <>
                  <Header />
                  <MoviePage match={match} />
                  <Footer />
                </>
              );
            }}
          ></Route>
          <Route
            exact
            path="/now-showing"
            component={({ match }) => {
              return (
                <>
                  <Header />
                  <MoviePage match={match} />
                  <Footer />
                </>
              );
            }}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
