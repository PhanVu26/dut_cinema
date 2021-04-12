
import logo from "./logo.svg";
import "./App.css";

import AdminPage from "./pages/admin/AdminPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes/index.route";
import AccountManagementPage from "./pages/admin/AccounManagementPage";
import Header from "./components/client/Header/Header";
import Footer from "./components/client/Footer/Footer";
import HomePage from "./pages/client/HomePage/HomePage";
import BuyTicketPage from "./pages/client/BuyTicketPage/BuyTicketPage";
import MoviePage from "./pages/client/MoviePage/MoviePage";
import Promotion1 from "./pages/client/HomePage/Promotion/PromotionItems/promotion001_SinhNhatTrangThi";
import Promotion2 from "./pages/client/HomePage/Promotion/PromotionItems/promotion002_miloDay";
import Promotion3 from "./pages/client/HomePage/Promotion/PromotionItems/promotion003_TriAnThanhVien";
import Promotion4 from "./pages/client/HomePage/Promotion/PromotionItems/promotion004_TungBungHaiSao";
import PromotionPage from "./pages/client/HomePage/Promotion/PromotionPage";
import UserPage from "./pages/client/UserPage/UserPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin">
          <AdminPage></AdminPage>
        </Route>
        <Route exact path="/admin/account">
          <AccountManagementPage></AccountManagementPage>
        </Route>
        <Route exact path="/buy-ticket"
          component={({ history }) => {
            return (
              <>
                <Header />
                <BuyTicketPage history={history} />
                <Footer />
              </>
            );
          }}
        ></Route>
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
        <Route exact path="/promotion/sinh-nhat-trang-thi-nhan-qua-met-nghi">
          <Header /> <Promotion1 /> <Footer />
        </Route>
        <Route exact path="/promotion/ngay-thanh-vien---milo-day">
          <Header /> <Promotion2 /> <Footer />
        </Route>
        <Route exact path="/promotion/DUT-cinema-tri-an-thanh-vien">
          <Header /> <Promotion3 /> <Footer />
        </Route>
        <Route exact path="/promotion/tung-bung-hai-sao--nhan-uu-dai-khung">
          <Header /> <Promotion4 /> <Footer />
        </Route>
        <Route exact path="/promotion">
          <Header /> <PromotionPage /> <Footer />
        </Route>
        <Route exact path="/profile">
          <Header /> <UserPage /> <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
