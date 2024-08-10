import { useContext } from 'react';
import { GuestContext } from '../../context/GuestContext';

function Dashboard() {
  const { auth, logout } = useContext(GuestContext);

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
