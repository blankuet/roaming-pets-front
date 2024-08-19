import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ImageForm from '../../components/ImageForm';

function HostProfile() {
  const { auth, logout, deleteUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      const user = localStorage.getItem('user');
      setUser(JSON.parse(user));
      console.log(user)
      setProfileImage(JSON.parse(user).imageUrl || '');
    }
  }, [auth.user]);

  // Función para navegar al formulario de edición
  const handleEditProfile = () => {
    navigate('/host/edit-profile'); 
  };

  // Función para manejar la eliminación del perfil
  const handleDeleteProfile = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
    if (confirmed) {
      try {
        await deleteUser(auth.user.id); 
        logout(); 
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
          <h1 className="text-5xl font-bold text-lime-200 text-center mb-6 w-full">Welcome, {auth.user.name}</h1>
          <div className="bg-black bg-opacity-80 rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          {profileImage && (
            <img
              src={profileImage.replace("/upload/", "/upload/w_300/")}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
            />
          )}
          <p className="text-xl font-semibold text-lime-200 mb-2">Name: {user.name}</p>
          <p className="text-xl font-semibold text-lime-200 mb-2">Last Name: {user.lastname}</p>
          <p className="text-xl font-semibold text-lime-200 mb-2">Email: {user.email}</p>
          <ImageForm setImage={setProfileImage} />
        </div>

        <div className="flex justify-around w-full mt-4">
          <button
            onClick={handleEditProfile}
            className="text-lg font-semibold text-lime-200 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Edit Profile
          </button>
          <button
            onClick={handleDeleteProfile}
            className="text-lg font-semibold text-lime-200 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Delete Profile
          </button>
        </div>
      </div>
          
          {/* <button onClick={logout} className="text-lg font-semibold text-lime-200 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg shadow-md transition-all">Logout</button> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default HostProfile;


