"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrimaryNavigation() {
  const pathname = usePathname();
  const navClass = (href) => (pathname === href ? "active" : "");
  return (
    <nav className="main-nav">
      <Link href="/menu" className={navClass("/menu")}>Menu</Link>
      <Link href="/specials" className={navClass("/specials")}>
        Featured
        <br />
        Dish
      </Link>
      <Link href="/cart" className={navClass("/cart")}>
        Order &<br />
        Cart
      </Link>
      <Link href="/checkout" className={navClass("/checkout")}>
        Delivery &<br />
        Checkout
      </Link>
    </nav>
  );
}
