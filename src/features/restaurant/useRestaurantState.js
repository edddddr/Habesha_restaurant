import { useState } from "react";
import { dishes } from "../../data/menuData";

export function useRestaurantState() {
  const [page, setPage] = useState("specials");
  const [selectedId, setSelectedId] = useState(1);
  const [cart, setCart] = useState({ 1: 1, 5: 1, 8: 1 });
  const add = (id) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const change = (id, amount) => setCart((current) => { const next = { ...current, [id]: Math.max(0, (current[id] || 0) + amount) }; if (!next[id]) delete next[id]; return next; });
  const go = (nextPage) => { setPage(nextPage); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const detail = (id) => { setSelectedId(id); go("detail"); };
  const itemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const total = dishes.reduce((sum, dish) => sum + (cart[dish.id] || 0) * dish.price, 0);
  return { page, go, detail, selectedDish: dishes.find((dish) => dish.id === selectedId) || dishes[0], cart, add, change, itemCount, total };
}
