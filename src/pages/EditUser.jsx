import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles, { layout } from '../style';
import { libraWhite } from '../assets';
import AuthService from '../services/AuthService';
import { BackToTopButton, Footer } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is present
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for edit and delete

const EditUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
    passwordConfirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const user = await AuthService.getProfile(id);
        setUserData({
          username: user.username,
          email: user.email,
          firstName: user.profile?.first_name || "",
          lastName: user.profile?.last_name || "",
          role: user.role,
          password: "",
          passwordConfirmation: "",
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch user details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthService.updateUser(id, userData);
      toast.success('User updated successfully!');
      setTimeout(() => navigate('/users'), 5000);
    } catch (err) {
      toast.error(err.message || 'Failed to update user.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <ToastContainer />
      <div className={`flex flex-col items-center mb-2 md:ml-10 ml-0 md:mt-0 mt-2 relative bg-indigo-600 w-full min-h-screen`}>
        <form
          className="login-form w-[90%] max-w-[800px] backdrop-filter backdrop-blur-lg p-4 md:p-8 sm:p-10 ss:p-34 rounded-2xl border-2 border-indigo-600 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white mt-5"
          onSubmit={handleSubmit}
        >
          <h1 className='col-span-1 md:col-span-2 font-raleway font-semibold ss:text-[30px] text-[35px] ss:leading-[40px] leading-[45px] w-full p-2 text-center text-black'>
            Edit User
          </h1>
          
          {Object.entries(userData).map(([key, value]) => (
            <div className="form-group" key={key}>
              {key === 'role' ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="input-text"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="artist">Artist</option>
                  <option value="art_lover">Art Lover</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                <input
                  type={key.includes('password') ? 'password' : 'text'}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                  className="input-text"
                  value={value}
                  onChange={handleChange}
                  required={key === 'username' || key === 'email'}
                />
              )}
            </div>
          ))}

          <div className={`col-span-1 md:col-span-2 ${styles.flexCenter} p-4`}>
            <button type="submit" disabled={isLoading} className={`py-2 px-4 bg-blue-gradient font-raleway font-bold text-[16px] text-primary outline-none uppercase rounded-full`}>
              {isLoading ? <div className="loader"></div> : 'Update User'}
            </button>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className={`font-raleway font-normal text-[18px] leading-[30.8px] text-black`}>
              Want to view users?  
              <a className={`font-raleway font-normal text-[18px] leading-[30.8px] text-black hover:text-white underline`} href='/users'>View Users Here</a>
            </p>
          </div>
        </form>

        <div className={layout.sectionImg}>
          <img className='w-[100%] h-auto relative z-[2] p-2 md:px-20 sm:px-26 ss:px-34' src={libraWhite} alt="aura" />
        </div>
      </div>
      
      <BackToTopButton />
    </section>
  );
};

export default EditUser;