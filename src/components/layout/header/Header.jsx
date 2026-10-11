"use client";

import { useRouter } from "next/navigation";
import Brand from "./Brand";
import PrimaryNavigation from "./PrimaryNavigation";
import CartSummary from "./CartSummary";
import ProfileButton from "./ProfileButton";

export default function Header({ count, total }) {
  const router = useRouter();
  return <header className="site-header"><Brand onClick={() => router.push("/specials")} /><PrimaryNavigation /><div className="header-actions"><CartSummary count={count} total={total} onClick={() => router.push("/cart")} /><ProfileButton onClick={() => router.push("/login")} /></div></header>;
}
