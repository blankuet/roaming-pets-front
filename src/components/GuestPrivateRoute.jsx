import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  // const { auth } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  return token ? (
    children === "/guest/login" ? <Navigate to="/guest/dashboard" /> : children
  ) : (
    <Navigate to="/guest/login" />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
