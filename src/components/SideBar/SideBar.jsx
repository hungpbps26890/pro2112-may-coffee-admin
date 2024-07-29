import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="templatemo-sidebar">
      <header className="templatemo-site-header">
        <div className="square"></div>
        <h1>Visual Admin</h1>
      </header>

      <form className="templatemo-search-form" role="search">
        <div className="input-group">
          <button type="submit" className="fa fa-search"></button>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            name="srch-term"
            id="srch-term"
          />
        </div>
      </form>
      <div className="mobile-menu-icon">
        <i className="fa fa-bars"></i>
      </div>
      <nav className="templatemo-left-nav">
        <ul>
          <li>
            <NavLink
              to={"/admin/chart/chartjs"}
              style={{ textDecoration: "none" }}
            >
              <i className="fa fa-home fa-fw"></i>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/table/orders"}
              style={{ textDecoration: "none" }}
            >
              <i className="fa fa-table"></i>Manage Order
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/drinks"} style={{ textDecoration: "none" }}>
              <i className="fa fa-coffee fa-fw"></i>Manage Drink
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/categories"}
              style={{ textDecoration: "none" }}
            >
              <i className="fa fa-database fa-fw"></i>Manage Category
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/toppings"} style={{ textDecoration: "none" }}>
              <i className="fa fa-list fa-fw"></i>Manage Topping
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/sizes"} style={{ textDecoration: "none" }}>
              <i className="fa fa-sliders fa-fw"></i>Manage Size
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/table/users"}
              style={{ textDecoration: "none" }}
            >
              <i className="fa fa-users fa-fw"></i>Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/banks"} style={{ textDecoration: "none" }}>
              <i className="fa fa-sliders fa-fw"></i>Manage Bank
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/payment-methods"}
              style={{ textDecoration: "none" }}
            >
              <i className="fa fa-sliders fa-fw"></i>Manage Payment Method
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/payment-method-banks"}
              style={{ textDecoration: "none" }}
            >
              <i className="fa fa-sliders fa-fw"></i>Manage Payment Method Bank
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/voucher-types"}
              style={{ textDecoration: "none" }}
            >
              <i className="fa fa-sliders fa-fw"></i>Manage Voucher Type
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/vouchers"} style={{ textDecoration: "none" }}>
              <i className="fa fa-sliders fa-fw"></i>Manage Voucher
            </NavLink>
          </li>
          <li>
            <a href="login.html">
              <i className="fa fa-eject fa-fw"></i>Sign Out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
