import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { Header, Footer } from "../../components/layout";
import { formatBirr } from "../../utils/currency";
import { useMenuData } from "./useMenuData";
import { useCartStore } from "../../stores/cartStore";

const SpecialsPage = lazy(() => import("../../pages/SpecialsPage"));
const MenuPage = lazy(() => import("../../pages/MenuPage"));
const DetailPage = lazy(() => import("../../pages/DetailPage"));
const CartPage = lazy(() => import("../../pages/CartPage"));
const CheckoutPage = lazy(() => import("../../pages/CheckoutPage"));
const AccountPage = lazy(() => import("../../pages/AccountPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

function Loading() { return <main className="page-main empty-state"><h2>Preparing the table...</h2><p>Loading today's dishes from Mesob House.</p></main>; }

export default function RestaurantApp() {
  const { menu, specials, status, error } = useMenuData();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cart = useCartStore((state) => state.items);
  const add = useCartStore((state) => state.addItem);
  const change = useCartStore((state) => state.changeQuantity);
  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = menu.reduce((sum, dish) => sum + (cart[dish.id] || 0) * dish.price, 0);
  const detail = (id) => navigate("/menu/" + id);

  if (status === "loading") return <div className="restaurant-shell"><Loading /></div>;
  if (error) return <div className="restaurant-shell"><main className="page-main empty-state"><h2>We could not load the menu</h2><p>{error}</p><button className="button button-primary" onClick={() => window.location.reload()}>Try Again</button></main></div>;

  return (
    <div className="restaurant-shell">
      <Header count={itemCount} total={total} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/specials" replace />} />
          <Route path="/specials" element={<SpecialsPage dishes={specials} add={add} detail={detail} />} />
          <Route path="/menu" element={<MenuPage dishes={menu} add={add} detail={detail} />} />
          <Route path="/menu/:dishId" element={<DetailPage dishes={menu} add={add} />} />
          <Route path="/cart" element={<CartPage dishes={menu} cart={cart} change={change} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<AccountPage />} />
          <Route path="/register" element={<AccountPage register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
      {["/specials", "/menu"].some((path) => pathname === path) && <aside className="floating-cart"><div className="floating-cart-icon"><FaShoppingBag /><span>{itemCount}</span></div><div><strong>Selected: {itemCount} items</strong><small>Communal injera included - Ready for banquet checkout</small></div><b>{formatBirr(total)}</b><button className="button button-primary" onClick={() => navigate("/cart")}>Proceed to Cart <FaArrowRight /></button></aside>}
    </div>
  );
}
