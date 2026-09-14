export const fetchMenuData = async () => {
  try {
    const response = await fetch(
      "https://addis-eats-backend.onrender.com/menu/specia",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
};
