import { FaArrowLeft, FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatBirr } from "../utils/currency";

export default function DetailPage({ dishes, add }) {
  const { dishId } = useParams();
  const navigate = useNavigate();
  const dish = dishes.find((item) => String(item.id) === dishId);
  if (!dish) return <main className="page-main empty-state"><h1>Dish unavailable</h1><Link className="button button-primary" to="/menu">Back to menu</Link></main>;
  return <main className="detail-page page-main"><button className="back-link" onClick={() => navigate("/menu")}><FaArrowLeft /> Home / Menu / {dish.name}</button><div className="detail-layout"><div><img className="detail-image" src={dish.image} alt={dish.name} /><div className="heritage-note"><p className="eyebrow">Heritage & lineage</p><h2>Royal Feast of the Highlands</h2><p>Traditionally reserved for festive holidays, this dish is simmered patiently with our hand-milled berbere spice blend and aromatic clarified butter.</p></div></div><section className="detail-panel"><p className="eyebrow">House signature</p><h1>{dish.short || dish.name} <span>{formatBirr(dish.price)}</span></h1><p>{dish.description}</p><div className="option-block"><h3>1. Heat & Spice Level</h3><div className="option-row"><button className="chosen">Traditional<br /><small>Berbere warmth</small></button><button>Mild<br /><small>Alitcha touch</small></button><button>Fiery Awaze<br /><small>Served with Awaze</small></button></div></div><div className="option-block"><h3>2. Traditional Injera Base</h3><button className="wide-option chosen"><b>Standard Teff & Barley Blend</b><span>Included</span></button><button className="wide-option"><b>100% Pure Organic Brown Teff</b><span>+ ETB 60</span></button></div><button className="button button-primary detail-add" onClick={() => add(dish.id)}><FaShoppingBag /> Add to Order · {formatBirr(dish.price)}</button><button className="text-action" onClick={() => navigate("/cart")}>View current order <FaArrowRight /></button></section></div></main>;
}
