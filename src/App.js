import "./App.css";

import AdminPage from "./pages/admin/AdminPage";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/client/Header/Header";
import Footer from "./components/client/Footer/Footer";
import HomePage from "./pages/client/HomePage/HomePage";
import BuyTicketPage from "./pages/client/BuyTicketPage/BuyTicketPage";
import BuyTicketDetailPage from "./pages/client/BuyTicketDetailPage/BuyTicketDetailPage";
import TicketBooking from "./pages/client/TicketBooking/TicketBooking";
import MoviePage from "./pages/client/MoviePage/MoviePage";
import PayMovie from "./pages/client/PayMovie/PayMovie";
import Promotion1 from "./pages/client/HomePage/Promotion/PromotionItems/promotion001_SinhNhatTrangThi";
import Promotion2 from "./pages/client/HomePage/Promotion/PromotionItems/promotion002_miloDay";
import Promotion3 from "./pages/client/HomePage/Promotion/PromotionItems/promotion003_TriAnThanhVien";
import Promotion4 from "./pages/client/HomePage/Promotion/PromotionItems/promotion004_TungBungHaiSao";
import PromotionPage from "./pages/client/HomePage/Promotion/PromotionPage";
import UserPage from "./pages/client/UserPage/UserPage";
import MovieDetail from "./pages/client/TicketBooking/MovieInformation/MovieInfo";
import SearchPage from "./pages/client/SearchPage/SearchPage";
import ManagerPage from "./pages/manager/index";
import Login from "./pages/Login/Login";
import ShowTimeManager from "./pages/ShowTimeManager/HomePage/HomePage";
import NotFoundPage from "./pages/error/404/NotFoundPage";
import UnAuthPage from "./pages/error/unauth/UnauthPage";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminPage></AdminPage>
        </Route>
        <Route path="/manager">
          <ManagerPage></ManagerPage>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/showtime-manager">
          <ShowTimeManager></ShowTimeManager>
        </Route>
        <Route
          exact
          path="/buy-ticket"
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
        <Route exact path="/ticket-booking">
          <Header />
          <TicketBooking />
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
          path="/pay-movie"
          component={({ match }) => {
            return (
              <>
                <Header />
                <PayMovie match={match} />
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
        <Route
          exact
          path="/search"
          component={() => (
            <>
              <Header />
              <SearchPage />
              <Footer />
            </>
          )}
        ></Route>
        <Route exact path="/buy-ticket-detail/:movie">
          <Header /> <BuyTicketDetailPage /> <Footer />
        </Route>
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
        <Route path="/booking/" >
          
                <Header />
                <MovieDetail/>
                <Footer />
        </Route>
        <Route path='/403' exact component={UnAuthPage} />
        <Route path='/404' component={NotFoundPage} />
        <Redirect from='*' to='/404' />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
