import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div>
      {auth.user ? (
        <div>
          <h1>Welcome, {auth.user.name}</h1>
          <p>Email: {auth.user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;