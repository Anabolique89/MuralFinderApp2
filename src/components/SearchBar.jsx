import { useState, useEffect, useRef } from "react";
import styles from "../style";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import AuthService from "../services/AuthService";
import { ArtZoroLogoWhite } from "../assets";

const SearchBar = () => {

 
    const [searchExpanded, setSearchExpanded] = useState(false);
  
    const isAuthenticated = AuthService.isAuthenticated();
  
    const getUser = () => {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    };
    return(
        <section className={`${styles.paddingX} ${styles.flexCenter}`}>
            
              <a href="/">
              <img src={ArtZoroLogoWhite} alt="ArtZoroLogoWhite" className="w-[40px] h-auto" />
              </a>
            
        {/* Search Bar */}
        <div className={`w-[170px] 2xl:w-[200px] max-w-[100%] flex items-center gap-2 rounded-full bg-[#f3f4f6] ml-1 mr-1 mb-2 ${searchExpanded ? 'search-bar-expanded' : 'hide-on-small'}`}>
        <MdOutlineSearch className='text-gray-500 text-xl' onClick={() => setSearchExpanded(!searchExpanded)} />
        <input
          type='text'
          placeholder='Search....'
          className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
        />
      </div>
      {!searchExpanded && (
        <div className="search-icon" onClick={() => setSearchExpanded(true)}>
          <MdOutlineSearch className="text-white text-2xl cta-block rounded-full" />
        </div>
      )}
      </section>
    )
}

export default SearchBar