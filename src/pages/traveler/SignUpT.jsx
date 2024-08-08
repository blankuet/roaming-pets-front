import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function SignUp() {
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.name, formData.email, formData.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="password" onChange={handleChange} required />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default SignUp;