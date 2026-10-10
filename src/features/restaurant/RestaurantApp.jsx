"use client";

import { cloneElement } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { Header, Footer } from "../../components/layout";
import { formatBirr } from "../../utils/currency";
import { useMenuData } from "./useMenuData";
import { useCartStore } from "../../stores/cartStore";

function Loading() { return <main className="page-main empty-state"><h2>Preparing the table...</h2><p>Loading today's dishes from Mesob House.</p></main>; }

export default function RestaurantApp({ children }) {
  const { menu, specials, status, error } = useMenuData();
  const router = useRouter();
  const pathname = usePathname();
  const cart = useCartStore((state) => state.items);
  const add = useCartStore((state) => state.addItem);
  const change = useCartStore((state) => state.changeQuantity);
  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = menu.reduce((sum, dish) => sum + (cart[dish.id] || 0) * dish.price, 0);
  const detail = (id) => router.push("/menu/" + id);

  if (status === "loading") return <div className="restaurant-shell"><Loading /></div>;
  if (error) return <div className="restaurant-shell"><main className="page-main empty-state"><h2>We could not load the menu</h2><p>{error}</p><button className="button button-primary" onClick={() => window.location.reload()}>Try Again</button></main></div>;

  return (
    <div className="restaurant-shell">
      <Header count={itemCount} total={total} />
      {cloneElement(children, { menu, specials, cart, add, change, detail })}
      <Footer />
      {["/specials", "/menu"].some((path) => pathname === path) && <aside className="floating-cart"><div className="floating-cart-icon"><FaShoppingBag /><span>{itemCount}</span></div><div><strong>Selected: {itemCount} items</strong><small>Communal injera included - Ready for banquet checkout</small></div><b>{formatBirr(total)}</b><button className="button button-primary" onClick={() => router.push("/cart")}>Proceed to Cart <FaArrowRight /></button></aside>}
    </div>
  );
}
