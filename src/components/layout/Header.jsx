import { FaUserCircle } from "react-icons/fa";
import { formatBirr } from "../../utils/currency";

export default function Header({ page, go, count, total }) {
  return <header className="site-header"><button className="brand brand-button" onClick={() => go("specials")}><span>Mesob</span><span>House</span></button><nav className="main-nav"><button className={page === "menu" ? "active" : ""} onClick={() => go("menu")}>Menu</button><button className={page === "specials" ? "active" : ""} onClick={() => go("specials")}>Featured<br />Dish</button><button className={page === "cart" ? "active" : ""} onClick={() => go("cart")}>Order &<br />Cart</button><button className={page === "checkout" ? "active" : ""} onClick={() => go("checkout")}>Delivery &<br />Checkout</button></nav><div className="header-actions"><button className="cart-summary" onClick={() => go("cart")}><span className="cart-count">{count} items</span><strong>{formatBirr(total)}</strong></button><button className="profile" onClick={() => go("login")}><FaUserCircle /><span><small>Welcome</small>Sign In</span></button></div></header>;
}
