import "../index.css";
import "../App.css";
import RestaurantApp from "../features/restaurant/RestaurantApp";

export const metadata = {
  title: "Mesob House | Ethiopian Dining",
  description: "Authentic Ethiopian and Eritrean heritage dining.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RestaurantApp>{children}</RestaurantApp>
      </body>
    </html>
  );
}
