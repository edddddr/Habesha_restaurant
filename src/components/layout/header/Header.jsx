import Brand from "./Brand";
import PrimaryNavigation from "./PrimaryNavigation";
import CartSummary from "./CartSummary";
import ProfileButton from "./ProfileButton";

export default function Header({ page, go, count, total }) { return <header className="site-header"><Brand onClick={() => go("specials")} /><PrimaryNavigation page={page} go={go} /><div className="header-actions"><CartSummary count={count} total={total} onClick={() => go("cart")} /><ProfileButton onClick={() => go("login")} /></div></header>; }
