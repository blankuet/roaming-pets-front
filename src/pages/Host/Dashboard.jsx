// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import ImageForm from '../../components/ImageForm';

// function Dashboard() {
//   const { auth, logout } = useContext(AuthContext);

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
//         style={{ backgroundImage: "url('/public/animals.jpg')" }}>
//       {auth.user ? (
//         <div>
//           <ImageForm />
//           <h1 className="text-3xl font-bold text-white mb-6">Welcome, {auth.user.name}</h1>
//           <button onClick={logout} className="text-xl text-center uppercase text-white">Logout</button>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import ImageForm from '../../components/ImageForm';

// function Dashboard() {
//   const { auth, logout } = useContext(AuthContext);

//   return (
//     <div className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
//          style={{ backgroundImage: "url('/public/animals.jpg')" }}>
      
//       {/* Encabezado centrado arriba */}
//       {auth.user ? (
//         <>
//           <h1 className="text-5xl font-bold text-white text-center mb-6 w-full">Welcome, {auth.user.name}</h1>
          
//           <div className="flex flex-col items-start w-full max-w-2xl">
//             {/* Imagen de perfil */}
//             <img 
//               src={auth.user.profileImage || 'https://via.placeholder.com/150'}
//               alt="Profile"
//               className="w-16 h-16 rounded-full object-cover mb-4"
//             />
            
//             {/* Formulario de carga de imagen */}
//             <ImageForm />
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

// export default Dashboard;

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ImageForm from '../../components/ImageForm';

function Dashboard() {
  const { auth, logout } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (auth.user) {
      const user = localStorage.getItem('user');
      setProfileImage(JSON.parse(user).imageUrl || '');
    }
  }, [auth.user]);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
         style={{ backgroundImage: "url('/public/animals.jpg')" }}>
      
      {auth.user ? (
        <>
          <h1 className="text-5xl font-bold text-white text-center mb-6 w-full">Welcome, {auth.user.name}</h1>
          
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
          
          {/* Botón de logout */}
          <button onClick={logout} className="text-xl text-center uppercase text-white mt-6">Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;

