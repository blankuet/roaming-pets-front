import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="password" onChange={handleChange} required />
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;