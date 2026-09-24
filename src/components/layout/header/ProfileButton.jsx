import { FaUserCircle } from "react-icons/fa";

export default function ProfileButton({ onClick }) {
  return (
    <button className="profile" onClick={onClick}>
      <FaUserCircle />
      <span>
        <small>Welcome</small>Sign In
      </span>
    </button>
  );
}
