import { useNavigate } from "react-router-dom";
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main className="not-found page-main">
      <div className="empty-mesob">
        🍛<small>Empty Mesob</small>
      </div>
      <h1>404</h1>
      <p>Table not set · Error</p>
      <h2>
        Looks like this dish has already been enjoyed or never made it to the
        kitchen!
      </h2>
      <div>
        <button
          className="button button-primary"
          onClick={() => navigate("/specials")}
        >
          Return to Today's Specials
        </button>
        <button className="button button-soft" onClick={() => navigate("/menu")}>
          Explore Full Menu
        </button>
      </div>
    </main>
  );
}
