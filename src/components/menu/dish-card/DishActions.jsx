import { FaPlus } from "react-icons/fa";
import Price from "../../shared/Price";

export default function DishActions({ dish, onAdd }) { return <div className="dish-footer"><strong><Price value={dish.price} /></strong><button onClick={onAdd}><FaPlus /> Add</button></div>; }
