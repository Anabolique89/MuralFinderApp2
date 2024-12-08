import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles, { layout } from '../style';
import { libraWhite } from '../assets';
import AuthService from '../services/AuthService';
import { BackToTopButton, Footer } from '../components';
import SocialLogin from '../components/SocialLogin';

const IndexSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await AuthService.signup(username, email, role, password, passwordConfirmation);

      // console.log(response.message);
      navigate('/login');
    } catch (err) {
      if (err.message && Array.isArray(err.message)) {
        const errorString = err.message.join(' ');
        setError(errorString);
      } else {
        const errorString = err.message || JSON.stringify(err);
        setError(errorString);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
    <div className={`flex-1 flex ${styles.flexCenter} mb-2 md:ml-10 ml-0 md:mt-0 mt-2 relative bg-indigo-600 w-full min-h-screen`}>
      <form className="login-form absolute z-[5] backdrop-filter backdrop-blur-lg p-4 md:p-8 sm:p-10 ss:p-34 rounded-2xl border-solid border-2 border-indigo-600" onSubmit={handleSubmit}>
        <h1 className='font-raleway font-semibold ss:text-[30px] text-[35px] text-white ss:leading-[40px] leading-[45px] w-full p-2'>Create Your Account.</h1>
        <div>
          {error && (
            <div className="error-message mt-2 text-red-500">
            <i className="fas fa-exclamation-circle p-2" ></i> {/* Replace with the appropriate Font Awesome icon class */}
            <p>{error}</p>
          </div>
          )}
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input-text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <select
              name="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="input-text"
              required
            >
              <option value="">Select a role</option>
              <option value="artist">Artist</option>
              <option value="art_lover">Art Lover</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="password"
              name="password_confirmation"
              placeholder="Repeat Password"
              className="input-text"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={`${styles.flexCenter} p-4`}>
        <button type="submit" disabled={isLoading} className={`py-2 px-4 bg-blue-gradient font-raleway font-bold text-[16px] text-primary outline-none uppercase rounded-full ${styles}`}>
            {isLoading ? <div className="loader"></div> : 'Create Account'}
          </button>
          {/* <Link to={'/Login'} className="bg-red-500 text-white px-4 py-2 rounded-xl">Close</Link> */}
         
        </div>
        <SocialLogin />
        <div>
          <p className={`font-raleway font-normal text-[18px] leading-[30.8px] text-black`}>Already have an account?  
            <a className={`font-raleway font-normal text-[18px] leading-[30.8px] text-black hover:text-white underline`} href='/login'>Login Here</a>
          </p>
        </div>
      </form>
      <div className={layout.sectionImg}>
        <img className='w-[90%] h-auto relative z-[2] p-2 md:px-20 sm:px-26 ss:px-34' src={libraWhite} alt="aura" />
      </div>
     
    </div>
          <BackToTopButton />
        
                  </section>
    
  );
};

export default IndexSignup;