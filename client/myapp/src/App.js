import "./App.css";
import ProductList from "./pages/productlist/productList";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import NotFound from "./pages/notfound/NotFound";
import NavBar from "./components/Navbar/Navbar";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/productdetail/ProductDetail";
import ProtectedRoute from "./components/protectedRoute";
import Shipping from "./pages/shipping/shipping";
import Order from "./pages/order/order";
import OrderDetail from "./pages/orderDetailPage/orderDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentMethod from "./pages/paymentmethods/paymentMethods";
import Payment from "./pages/paymethodIntentPage/payment";
import PaymentConfirmatoin from "./pages/paymentConfirmationPage/paymentConfirmation";
import Profile from "./pages/user/Profile";
import AdminSellerAccess from "./components/seller-admin-only";
import AdminPanel from "./pages/admin/adminPanel";
import AllOrder from "./pages/admin-allOrders/allOrders";
import AllProduct from "./pages/admin-allProducts/allProduct";
import AllOrderUser from "./pages/user/allOrderUser";
import AllAddressUser from "./pages/user/allAddressUser";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<PaymentMethod />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment-intent" element={<Payment />} />
            <Route path="/order-detail/:orderId" element={<OrderDetail />} />
            <Route path="/update-pay-int" element={<PaymentConfirmatoin />} />
            {/* user panel */}
            <Route path="/profile" element={<Profile />}>
              <Route index element={<AllOrderUser />} />
              <Route path="all-user-orders" element={<AllOrderUser />} />
              <Route path="all-user-address" element={<AllAddressUser />} />
            </Route>
            {/* only admim routes */}
            <Route element={<AdminSellerAccess />}>
              <Route path="/admin" element={<AdminPanel />}>
                <Route index element={<AllProduct />} />
                <Route path="all-product" element={<AllProduct />} />
                <Route path="all-order" element={<AllOrder />} />
              </Route>
            </Route>
          </Route>
          <Route path="/product-detail/:id" element={<ProductDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
