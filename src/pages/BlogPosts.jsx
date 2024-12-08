import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify'; 
import { BackToTopButton, CommunityBlogSection } from '../components';
import styles, { layout } from '../style';
import Footer from '../components/Footer';


const BlogPosts = () => {

  useEffect(() => {

    const cleanHTML = (content) => {
      return DOMPurify.sanitize(content); 
    };
    

  }, []);

  const trimContent = (content) => {
    return content.length > 100 ? `${content.substring(0, 20)}...` : content;
  };

  return (
    <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
   <CommunityBlogSection />
      <BackToTopButton />
     
                    <Footer />
                    </div>
  );
};

export default BlogPosts;
