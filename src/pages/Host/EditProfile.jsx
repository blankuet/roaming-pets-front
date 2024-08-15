import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function EditProfile() {
  const { auth, updateUser } = useContext(AuthContext); // Suponiendo que tienes una función updateUser en AuthContext
  const navigate = useNavigate();

  // Estados para almacenar los datos del formulario
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar los datos del usuario en el formulario cuando se monta el componente
  useEffect(() => {
    if (auth.user) {
      setName(auth.user.name || '');
      setLastName(auth.user.lastName || '');
      setEmail(auth.user.email || '');
    }
  }, [auth.user]);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Crear un objeto con los datos actualizados del usuario
      const updatedUser = {
        id: auth.user.id,
        name,
        lastName,
        email,
      };

      // Llamar a la función updateUser del contexto para actualizar el perfil
      await updateUser(updatedUser);
      setSuccess('Profile updated successfully!');
      
      // Guardar el usuario actualizado en localStorage si es necesario
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Redirigir al perfil después de un breve tiempo
      setTimeout(() => {
        navigate('/host/profile');
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
         style={{ backgroundImage: "url('/public/animals.jpg')" }}>
      
      <h1 className="text-4xl font-bold text-white text-center mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex justify-between items-center mt-6">
          <button type="submit" className="text-xl text-center uppercase text-white bg-blue-500 px-4 py-2 rounded-lg">
            Save Changes
          </button>
          <button type="button" onClick={() => navigate('/profile')} className="text-xl text-center uppercase text-white bg-gray-500 px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;