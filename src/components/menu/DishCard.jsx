import { FaPlus } from "react-icons/fa";
import { formatBirr } from "../../utils/currency";

export default function DishCard({ dish, add, detail }) { return <article className="dish-card"><button className="dish-image-button" onClick={() => detail(dish.id)}><div className="dish-image"><img src={dish.image} alt={dish.name} /><span className="dish-tag">{dish.tag}</span><span className="spice-pill">{dish.spice}</span></div></button><div className="dish-body"><h3>{dish.name}</h3><p>{dish.description}</p><div className="dish-footer"><strong>{formatBirr(dish.price)}</strong><button onClick={() => add(dish.id)}><FaPlus /> Add</button></div></div></article>; }
