import { useAuth } from "../AuthContext";

function Logout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Redirect to the login page or another page
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Logout;
