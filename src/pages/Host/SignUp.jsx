//  import { useState, useContext } from 'react';
//  import { AuthContext } from '../../context/AuthContext';

//  function SignUp() {
//    const { signup } = useContext(AuthContext);
//    const [formData, setFormData] = useState({ name: '', email: '', password: '', lastname: '' });

//    const handleChange = (e) => {
//      setFormData({ ...formData, [e.target.name]: e.target.value });
//    };

//    const handleSubmit = (e) => {
//      e.preventDefault();
//      signup(formData.name, formData.email, formData.password, formData.lastname);
//    };
//    return (
//     <div 
//       className="flex justify-center items-center min-h-screen bg-cover bg-center" 
//       style={{ backgroundImage: "url('/public/animals.jpg')" }}
//     >
//       <form 
//         onSubmit={handleSubmit} 
//         className="bg-black bg-opacity-75 p-6 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-400">Name:</label>
//           <input 
//             type="text" 
//             name="name" 
//             placeholder="Name" 
//             onChange={handleChange} 
//             required 
//             className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="lastname" className="block text-gray-400">Last Name:</label>
//           <input 
//             type="text" 
//             name="lastname" 
//             placeholder="Last name" 
//             onChange={handleChange} 
//             required 
//             className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-400">Email:</label>
//           <input 
//             type="email" 
//             name="email" 
//             placeholder="Email" 
//             onChange={handleChange} 
//             required 
//             className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-gray-400">Password:</label>
//           <input 
//             type="password" 
//             name="password" 
//             placeholder="Password" 
//             onChange={handleChange} 
//             required 
//             className="mt-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <button 
//           type="submit" 
//           className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
//  }

//  export default SignUp;


// // 1-agosto(token) min 20 aprox para sacan el mensaje de error del backend en el Front

import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function SignUp() {
  const { signup, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', lastname: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.name, formData.email, formData.password, formData.lastname);
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/public/animals.jpg')" }}
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
