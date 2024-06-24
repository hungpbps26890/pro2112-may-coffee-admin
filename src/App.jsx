import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import DrinkTable from "./pages/Drink/DrinkTable";
import DrinkForm from "./pages/Drink/DrinkForm";
import CategoryTable from "./pages/Category/CategoryTable";
import CategoryForm from "./pages/Category/CategoryForm";
import ToppingTable from "./pages/Topping/ToppingTable";
import ToppingForm from "./pages/Topping/ToppingForm";
import SizeTable from "./pages/Size/SizeTable";
import SizeForm from "./pages/Size/SizeForm";
import BankTable from "./pages/Bank/BankTable";
import BankForm from "./pages/Bank/BankForm";
import PaymentMethodTable from "./pages/PaymentMethod/PaymentMethodTable";
import PaymentMethodForm from "./pages/PaymentMethod/PaymentMethodForm";
import PaymentMethodBankTable from "./pages/PaymentMethodBank/PaymentMethodBankTable";
import PaymentMethodBankForm from "./pages/PaymentMethodBank/PaymentMethodBankForm";
import VoucherTypeTable from "./pages/VoucherType/VoucherTypeTable";
import VoucherTypeForm from "./pages/VoucherType/VoucherTypeForm";
import VoucherTable from "./pages/Voucher/VoucherTable";
import VoucherForm from "./pages/Voucher/VoucherForm";
import OrderTable from "./pages/Order/OrderTable";
import OrderDetails from "./pages/Order/OrderDetails";
import OrderForm from "./pages/Order/OrderForm";
import UserTable from "./pages/User/UserTable";
import UserForm from "./pages/User/UserForm";

const App = () => {
  return (
    <>
      <div className="templatemo-flex-row">
        <SideBar />

        {/* Main content */}
        <div className="templatemo-content col-1 light-gray-bg">
          {/* Top Navigation Bar */}
          <NavBar />

          {/* Content */}
          <div className="templatemo-content-container">
            <Routes>
              <Route path="/admin/drinks" element={<DrinkTable />}></Route>
              <Route path="/admin/drinks/add" element={<DrinkForm />}></Route>
              <Route
                path="/admin/edit-drink/:id"
                element={<DrinkForm />}
              ></Route>

              <Route
                path="/admin/categories"
                element={<CategoryTable />}
              ></Route>
              <Route
                path="/admin/categories/add"
                element={<CategoryForm />}
              ></Route>
              <Route
                path="/admin/edit-category/:id"
                element={<CategoryForm />}
              ></Route>

              <Route path="/admin/toppings" element={<ToppingTable />}></Route>
              <Route
                path="/admin/toppings/add"
                element={<ToppingForm />}
              ></Route>
              <Route
                path="/admin/edit-topping/:id"
                element={<ToppingForm />}
              ></Route>

              <Route path="/admin/users" element={<UserTable />}></Route>
              <Route path="/admin/users/add" element={<UserForm />}></Route>
              <Route path="/admin/edit-user/:id" element={<UserForm />}></Route>

              <Route path="/admin/sizes" element={<SizeTable />}></Route>
              <Route path="/admin/sizes/add" element={<SizeForm />}></Route>
              <Route path="/admin/edit-size/:id" element={<SizeForm />}></Route>

              <Route path="/admin/banks" element={<BankTable />}></Route>
              <Route path="/admin/banks/add" element={<BankForm />}></Route>
              <Route path="/admin/edit-bank/:id" element={<BankForm />}></Route>

              <Route
                path="/admin/payment-methods"
                element={<PaymentMethodTable />}
              ></Route>
              <Route
                path="/admin/payment-methods/add"
                element={<PaymentMethodForm />}
              ></Route>
              <Route
                path="/admin/edit-payment-method/:id"
                element={<PaymentMethodForm />}
              ></Route>

              <Route
                path="/admin/payment-method-banks"
                element={<PaymentMethodBankTable />}
              ></Route>
              <Route
                path="/admin/payment-method-banks/add"
                element={<PaymentMethodBankForm />}
              ></Route>
              <Route
                path="/admin/edit-payment-method-bank/:id"
                element={<PaymentMethodBankForm />}
              ></Route>

              <Route
                path="/admin/voucher-types"
                element={<VoucherTypeTable />}
              ></Route>
              <Route
                path="/admin/voucher-types/add"
                element={<VoucherTypeForm />}
              ></Route>
              <Route
                path="/admin/edit-voucher-type/:id"
                element={<VoucherTypeForm />}
              ></Route>

              <Route path="/admin/vouchers" element={<VoucherTable />}></Route>
              <Route
                path="/admin/vouchers/add"
                element={<VoucherForm />}
              ></Route>
              <Route
                path="/admin/edit-voucher/:id"
                element={<VoucherForm />}
              ></Route>

              <Route path="/admin/orders" element={<OrderTable />}></Route>
              <Route
                path="/admin/order-details/:id"
                element={<OrderDetails />}
              ></Route>
              <Route
                path="/admin/edit-order/:id"
                element={<OrderForm />}
              ></Route>
            </Routes>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>

      {/* Tostify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
};

export default App;
