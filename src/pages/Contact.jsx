import React, { useState } from 'react';
import styles from '../style';
import { fadeintoyouWhite } from '../assets';
import contactService from '../services/ContactService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPen } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { BackToTopButton } from '../components';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    content: ''
  });

  const [message, setMessage] = useState({
    type: '',
    content: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await contactService.sendMessage(formData);
      console.log(response);
      showMessage('success', 'Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        content: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      showMessage('error', 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type, content) => {
    setMessage({ type, content });
    setTimeout(() => {
      setMessage({ type: '', content: '' });
    }, 5000);
  };

  return (
    <section>
    <div className="relative bg-indigo-700 min-h-screen flex items-center justify-center font-raleway">
      <img className="absolute top-0 right-50 w-[70%] h-auto z-0" src={fadeintoyouWhite} alt="Background" />
      <form className=" backdrop-filter backdrop-blur-lg shadow-md rounded-2xl border-solid border-2 border-indigo-600 p-10 w-full max-w-xl h-auto z-10" onSubmit={handleSubmit}>
        <h1 className="text-center text-3xl text-white font-raleway font-semibold ss:text-[30px] text-[35px] ss:leading-[40px] leading-[45px] w-full p-2">Send us a message</h1>
        {message.type === 'success' && <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded-2xl w-50">{message.content}</div>}
        {message.type === 'error' && <div className="absolute top-0 right-0  bg-red-500 text-white px-4 py-2 rounded-2xl w-50">{message.content}</div>}
      
<div className="input-wrapper relative">
        
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="input-text w-full pl-10 border border-gray-300 p-2 rounded-2xl focus:outline-none focus:border-indigo-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-wrapper relative">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="input-text w-full pl-10 border border-gray-300 p-2 rounded-2xl focus:outline-none focus:border-indigo-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-wrapper relative">
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            className="input-text w-full pl-10 border border-gray-300 p-2 rounded-2xl focus:outline-none focus:border-indigo-500"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <textarea
            id="content"
            name="content"
            placeholder="Message"
            className="input-text w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500 resize-none"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
       
        <div className="flex justify-center">
          <button type="submit" disabled={isLoading} className={`py-2 px-4 bg-blue-gradient font-raleway font-bold text-[18px] text-primary uppercase rounded-full ${styles}`}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
        
      </form>

    </div>
    <BackToTopButton />
    <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
                <Footer />
            </div>
    </section>
  );
}

export default Contact;
