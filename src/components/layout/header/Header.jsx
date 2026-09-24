import { useNavigate } from "react-router-dom";
import Brand from "./Brand";
import PrimaryNavigation from "./PrimaryNavigation";
import CartSummary from "./CartSummary";
import ProfileButton from "./ProfileButton";

export default function Header({ count, total }) {
  const navigate = useNavigate();
  return <header className="site-header"><Brand onClick={() => navigate("/specials")} /><PrimaryNavigation /><div className="header-actions"><CartSummary count={count} total={total} onClick={() => navigate("/cart")} /><ProfileButton onClick={() => navigate("/login")} /></div></header>;
}
