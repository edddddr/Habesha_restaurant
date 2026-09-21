import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { dishes } from "../../data/menuData";
import { formatBirr } from "../../utils/currency";
import SpecialsPage from "../../pages/SpecialsPage";
import MenuPage from "../../pages/MenuPage";
import DetailPage from "../../pages/DetailPage";
import CartPage from "../../pages/CartPage";
import AccountPage from "../../pages/AccountPage";
import CheckoutPage from "../../pages/CheckoutPage";
import NotFoundPage from "../../pages/NotFoundPage";
import { useRestaurantState } from "./useRestaurantState";

function PageContent(state) { const { page, add, detail, selectedDish, cart, change, go } = state; if (page === "specials") return <SpecialsPage add={add} detail={detail} />; if (page === "menu") return <MenuPage add={add} detail={detail} />; if (page === "detail") return <DetailPage dish={selectedDish} add={add} go={go} />; if (page === "cart") return <CartPage dishes={dishes} cart={cart} change={change} go={go} />; if (page === "checkout") return <CheckoutPage go={go} />; if (page === "login") return <AccountPage go={go} />; if (page === "register") return <AccountPage register go={go} />; return <NotFoundPage go={go} />; }

export default function RestaurantApp() { const state = useRestaurantState(); const { page, go, itemCount, total } = state; return <div className="restaurant-shell"><Header page={page} go={go} count={itemCount} total={total} /><PageContent {...state} /><Footer />{["specials", "menu", "detail"].includes(page) && <aside className="floating-cart"><div className="floating-cart-icon"><FaShoppingBag /><span>{itemCount}</span></div><div><strong>Selected: {itemCount} items</strong><small>Communal injera included - Ready for banquet checkout</small></div><b>{formatBirr(total)}</b><button className="button button-primary" onClick={() => go("cart")}>Proceed to Cart <FaArrowRight /></button></aside>}</div>; }
