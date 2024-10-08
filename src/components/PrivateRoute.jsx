import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  // const { auth } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  return token ? (
    children === "/host/login" ? <Navigate to="/host/dashboard" /> : children
  ) : (
    <Navigate to="/host/login" />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;



