import { useEffect, useState } from "react";
import { fetchMenu, fetchSpecials } from "../../api/menuApi";

export function useMenuData() {
  const [menu, setMenu] = useState([]);
  const [specials, setSpecials] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    Promise.all([fetchMenu(), fetchSpecials()])
      .then(([menuItems, specialItems]) => {
        if (!active) return;
        setMenu(menuItems);
        setSpecials(specialItems);
        setStatus("ready");
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError.message || "Unable to load the menu.");
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);
  return { menu, specials, status, error };
}
