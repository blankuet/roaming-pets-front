import { useState, useContext } from 'react';
import { GuestContext } from '../../context/GuestContext';

function SignUp() {
  const { signup, error } = useContext(GuestContext);
  const [formData, setFormData] = useState({ name: '', lastname: '', email: '', password: '', pets: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.name, formData.lastname, formData.email, formData.password, +formData.pets);
  };
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/public/animals.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f0f0f0",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-black bg-opacity-75 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-400">Last Name:</label>
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pets" className="block text-gray-400">Pets:</label>
          <input
            type="number"
            name="pets"
            placeholder="Pets"
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-400">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;


