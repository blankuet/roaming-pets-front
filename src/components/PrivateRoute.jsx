import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.token ? (
    children === "/login" ? <Navigate to="/host/dashboard" /> : children
  ) : (
    <Navigate to="/login" />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

// import { useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({ children }) => {
//   const { auth } = useContext(AuthContext);
//   const location = useLocation();

//   // Si el usuario está autenticado y trata de acceder a /login, redirigirlo al dashboard
//   if (auth.token && location.pathname === "/login") {
//     return <Navigate to="/host/dashboard" replace />;
//   }

//   // Si el usuario no está autenticado, redirigirlo a /login
//   if (!auth.token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Si el usuario está autenticado y no trata de acceder a /login, mostrar el contenido protegido
//   return children;
// };

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default PrivateRoute;

