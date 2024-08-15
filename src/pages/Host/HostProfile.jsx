import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ImageForm from '../../components/ImageForm';

function HostProfile() {
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
          <p>Name: {auth.user.name}</p>
          <p>Last Name: {auth.user.lastName}</p>
          <p>Email: {auth.user.email}</p>
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

export default HostProfile;

// import { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import ImageForm from '../../components/ImageForm';

// function HostProfile() {
//   const { auth, logout } = useContext(AuthContext);
//   const [hostData, setHostData] = useState(null);
//   const [profileImage, setProfileImage] = useState('');

//   useEffect(() => {
//     if (auth.user) {
//       // Suponiendo que tienes el JWT en localStorage, puedes usarlo para autenticar la solicitud.
//       const fetchHostData = async () => {
//         try {
//           const response = await fetch(`http://localhost:5005/auth/host/verify`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//             },
//           });
//           const data = await response.json();
//           setHostData(data);
//           setProfileImage(data.imageUrl || '');
//         } catch (error) {
//           console.error('Error fetching host data:', error);
//         }
//       };
//       fetchHostData();
//     }
//   }, [auth.user]);

//   const handleDeleteClick = async () => {
//     if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
//       try {
//         await fetch(`/api/hosts/${auth.user._id}`, {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//           },
//         });
//         logout();
//       } catch (error) {
//         console.error('Error deleting account:', error);
//       }
//     }
//   };

//   const handleImageUpload = async (imageUrl) => {
//     try {
//       const response = await fetch(`/api/auth/upload`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//         },
//         body: JSON.stringify({ imageUrl }),
//       });
//       if (response.ok) {
//         setProfileImage(imageUrl);
//         setHostData((prevData) => ({ ...prevData, imageUrl }));
//       } else {
//         console.error('Error uploading image:', await response.json());
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   if (!auth.user || !hostData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="flex flex-col justify-start items-center min-h-screen bg-cover bg-center p-6"
//          style={{ backgroundImage: "url('/public/animals.jpg')" }}>
      
//       <h1 className="text-5xl font-bold text-white text-center mb-6 w-full">Welcome, {hostData.name}</h1>

//       <div className="flex flex-col items-start w-full max-w-2xl">
//         {/* Imagen de perfil */}
//         {profileImage && (
//           <img 
//             src={profileImage.replace("/upload/", "/upload/w_300/")}
//             alt="Profile"
//             className="w-16 h-16 rounded-full object-cover mb-4"
//           />
//         )}

//         {/* Mostrar los datos del Host */}
//         <p className="text-white mb-2"><strong>Name:</strong> {hostData.name}</p>
//         <p className="text-white mb-2"><strong>Email:</strong> {hostData.email}</p>
//         <p className="text-white mb-2"><strong>Accommodations:</strong> {hostData.accommodations?.length || 0}</p>

//         {/* Formulario de carga de imagen */}
//         <ImageForm setImage={handleImageUpload} />

//         {/* Botón para eliminar */}
//         <button 
//           onClick={handleDeleteClick} 
//           className="text-xl text-center uppercase text-white mt-6">
//           Delete Account
//         </button>
//       </div>
      
//       {/* Botón de logout */}
//       <button onClick={logout} className="text-xl text-center uppercase text-white mt-6">Logout</button>
//     </div>
//   );
// }

// export default HostProfile;
