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

              <Route path="/admin/sizes" element={<SizeTable />}></Route>
              <Route path="/admin/sizes/add" element={<SizeForm />}></Route>
              <Route path="/admin/edit-size/:id" element={<SizeForm />}></Route>
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
