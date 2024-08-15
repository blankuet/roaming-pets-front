// import { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import ImageForm from '../../components/ImageForm';

// function HostProfile() {
//   const { auth, logout } = useContext(AuthContext);
//   const [profileImage, setProfileImage] = useState('');
  

//   useEffect(() => {
//     if (auth.user) {
//       const user = localStorage.getItem('user');
//       setProfileImage(JSON.parse(user).imageUrl || '');
//     }
//   }, [auth.user]);

//   return (
//     <div className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
//          style={{ backgroundImage: "url('/public/animals.jpg')" }}>
      
//       {auth.user ? (
//         <>
//           <h1 className="text-5xl font-bold text-white text-center mb-6 w-full">Welcome, {auth.user.name}</h1>
//           <p className='text-white'>Name: {auth.user.name}</p>
//           <p className='text-white'>Last Name: {auth.user.lastName}</p>
//           <p className='text-white'>Email: {auth.user.email}</p>
//           <div className="flex flex-col items-start w-full max-w-2xl">
//             {/* Imagen de perfil */}
//             {profileImage && (
//               <img 
//                 src={profileImage.replace("/upload/", "/upload/w_300/")}
//                 alt="Profile"
//                 className="w-16 h-16 rounded-full object-cover mb-4"
//               />
//             )}
            
//             {/* Formulario de carga de imagen */}
//             <ImageForm setImage={setProfileImage} />
//           </div>
          
//           {/* Botón de logout */}
//           <button onClick={logout} className="text-xl text-center uppercase text-white mt-6">Logout</button>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default HostProfile;

import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ImageForm from '../../components/ImageForm';

function HostProfile() {
  const { auth, logout, deleteUser } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      const user = localStorage.getItem('user');
      setProfileImage(JSON.parse(user).imageUrl || '');
    }
  }, [auth.user]);

  // Función para navegar al formulario de edición
  const handleEditProfile = () => {
    navigate('/host/edit-profile'); // Asegúrate de tener una ruta configurada para '/edit-profile'
  };

  // Función para manejar la eliminación del perfil
  const handleDeleteProfile = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
    if (confirmed) {
      try {
        await deleteUser(auth.user.id); // Usar la función deleteUser del contexto
        logout(); // Cerrar sesión después de eliminar el perfil
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
         style={{ backgroundImage: "url('/public/animals.jpg')" }}>
      
      {auth.user ? (
        <>
          <h1 className="text-5xl font-bold text-white text-center mb-6 w-full">Welcome, {auth.user.name}</h1>
          <p className='text-white'>Name: {auth.user.name}</p>
          <p className='text-white'>Last Name: {auth.user.lastName}</p>
          <p className='text-white'>Email: {auth.user.email}</p>
          <div className="flex flex-col items-start w-full max-w-2xl">
            {/* Imagen de perfil */}
            {profileImage && (
              <img 
                src={profileImage.replace("/upload/", "/upload/w_300/")}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
            )}
            
            {/* Formulario de carga de imagen */}
            <ImageForm setImage={setProfileImage} />
          </div>

          {/* Botones para editar y eliminar el perfil */}
          <div className="flex justify-around w-full mt-4">
            <button onClick={handleEditProfile} className="text-xl text-center uppercase text-white bg-blue-500 px-4 py-2 rounded-lg">
              Edit Profile
            </button>
            <button onClick={handleDeleteProfile} className="text-xl text-center uppercase text-white bg-red-500 px-4 py-2 rounded-lg">
              Delete Profile
            </button>
          </div>
          
          {/* Botón de logout */}
          <button onClick={logout} className="text-xl text-center uppercase text-white mt-6">Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default HostProfile;


