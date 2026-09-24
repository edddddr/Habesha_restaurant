import { NavLink } from "react-router-dom";

export default function PrimaryNavigation() {
  return (
    <nav className="main-nav">
      <NavLink
        to="/menu"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Menu
      </NavLink>
      <NavLink
        to="/specials"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Featured
        <br />
        Dish
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Order &<br />
        Cart
      </NavLink>
      <NavLink
        to="/checkout"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Delivery &<br />
        Checkout
      </NavLink>
    </nav>
  );
}
