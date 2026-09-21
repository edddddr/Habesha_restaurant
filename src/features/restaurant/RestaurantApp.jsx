import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { Header, Footer } from "../../components/layout";
import { formatBirr } from "../../utils/currency";
import SpecialsPage from "../../pages/SpecialsPage";
import MenuPage from "../../pages/MenuPage";
import DetailPage from "../../pages/DetailPage";
import CartPage from "../../pages/CartPage";
import AccountPage from "../../pages/AccountPage";
import CheckoutPage from "../../pages/CheckoutPage";
import NotFoundPage from "../../pages/NotFoundPage";
import { useRestaurantState } from "./useRestaurantState";
import { useMenuData } from "./useMenuData";

function PageContent({ state, menu, specials, error }) { const { page, add, detail, selectedDish, cart, change, go } = state; if (error) return <main className="page-main empty-state"><h2>We could not load the menu</h2><p>{error}</p><button className="button button-primary" onClick={() => window.location.reload()}>Try Again</button></main>; if (page === "specials") return <SpecialsPage dishes={specials} add={add} detail={detail} />; if (page === "menu") return <MenuPage dishes={menu} add={add} detail={detail} />; if (page === "detail") return <DetailPage dish={selectedDish} add={add} go={go} />; if (page === "cart") return <CartPage dishes={menu} cart={cart} change={change} go={go} />; if (page === "checkout") return <CheckoutPage go={go} />; if (page === "login") return <AccountPage go={go} />; if (page === "register") return <AccountPage register go={go} />; return <NotFoundPage go={go} />; }

export default function RestaurantApp() { const { menu, specials, status, error } = useMenuData(); const state = useRestaurantState(menu); const { page, go, itemCount, total } = state; return <div className="restaurant-shell"><Header page={page} go={go} count={itemCount} total={total} />{status === "loading" ? <main className="page-main empty-state"><h2>Preparing the table...</h2><p>Loading today's dishes from Mesob House.</p></main> : <PageContent state={state} menu={menu} specials={specials} error={error} />}<Footer />{status === "ready" && ["specials", "menu", "detail"].includes(page) && <aside className="floating-cart"><div className="floating-cart-icon"><FaShoppingBag /><span>{itemCount}</span></div><div><strong>Selected: {itemCount} items</strong><small>Communal injera included - Ready for banquet checkout</small></div><b>{formatBirr(total)}</b><button className="button button-primary" onClick={() => go("cart")}>Proceed to Cart <FaArrowRight /></button></aside>}</div>; }
