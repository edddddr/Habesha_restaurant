import DishImage from "./DishImage";
import DishDetails from "./DishDetails";
import DishActions from "./DishActions";

export default function DishCard({ dish, add, detail }) { return <article className="dish-card"><DishImage dish={dish} onSelect={() => detail(dish.id)} /><div className="dish-body"><DishDetails dish={dish} /><DishActions dish={dish} onAdd={() => add(dish.id)} /></div></article>; }
