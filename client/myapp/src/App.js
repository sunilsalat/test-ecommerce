import "./App.css";
import ProductList from "./pages/productlist/productList";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import NotFound from "./pages/notfound/NotFound";
import NavBar from "./components/Navbar/Navbar";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/productdetail/ProductDetail";
import Main from "./components/main/Main";
import ProtectedRoute from "./components/protectedRoute";
import Shipping from "./pages/shipping/shipping";
import Order from "./pages/order/order";
import OrderDetail from "./pages/orderDetailPage/orderDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentMethod from "./pages/paymentmethods/paymentMethods";
import Payment from "./pages/paymethodIntentPage/payment";
import PaymentConfirmatoin from "./pages/paymentConfirmationPage/paymentConfirmation";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<PaymentMethod />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment-intent" element={<Payment />} />
            <Route path="/order-detail/:orderId" element={<OrderDetail />} />
            <Route path="/update-pay-int" element={<PaymentConfirmatoin />} />
          </Route>
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route
            path="/main/*"
            element={
              <Main>
                <Routes>
                  <Route path="productlist" element={<ProductList />} />
                </Routes>
              </Main>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
