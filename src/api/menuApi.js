const API_BASE_URL = "https://addis-eats-backend.onrender.com";
const fallbackImages = [
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=85&w=900",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=85&w=900",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=85&w=900",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=85&w=900",
];

function normalizeItem(item, index) {
  return { id: item.id, name: item.nameEn, short: item.nameEn, category: item.category, price: item.priceETB, tag: item.tagline || (item.isFasting ? "100% VEGAN / TSOM" : item.isSpecial ? "CHEF'S SPECIAL" : "HOUSE FAVORITE"), spice: item.spiceLevel, image: item.image || fallbackImages[index % fallbackImages.length], description: item.description, isFasting: item.isFasting, isSpecial: item.isSpecial, ingredients: item.ingredients || [], servings: item.servings || "Serves 1" };
}

async function request(path) { const response = await fetch(`${API_BASE_URL}${path}`); if (!response.ok) throw new Error(`Menu request failed with status ${response.status}`); const payload = await response.json(); if (!Array.isArray(payload.data)) throw new Error("The menu API returned an invalid response."); return payload.data; }
export async function fetchMenu() { return (await request("/menu/")).map(normalizeItem); }
export async function fetchSpecials() { return (await request("/menu/specials")).map(normalizeItem); }
