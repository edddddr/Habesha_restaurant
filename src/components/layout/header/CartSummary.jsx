import { formatBirr } from "../../../utils/currency";

export default function CartSummary({ count, total, onClick }) { return <button className="cart-summary" onClick={onClick}><span className="cart-count">{count} items</span><strong>{formatBirr(total)}</strong></button>; }
