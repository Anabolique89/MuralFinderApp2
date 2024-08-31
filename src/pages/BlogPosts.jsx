// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import styles, { layout } from '../style';
// import axios from 'axios';
// import { blogEndpoints } from '../config/endpoints';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import DOMPurify from 'dompurify'; 



// const BlogPosts = () => {
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {

//     const cleanHTML = (content) => {
//       return DOMPurify.sanitize(content); 
//     };
    
//     const fetchBlogPosts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(blogEndpoints.getAllBlogPosts);
//         setBlogPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching blog posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogPosts();
//   }, []);

//   const trimContent = (content) => {
//     return content.length > 100 ? `${content.substring(0, 20)}...` : content;
//   };

//   return (
//     <div>
//       <h2 className={`${styles.heading2} ${styles.flexCenter} py-8`}>Blog Posts</h2>

//       {loading ? (
//         <div className="text-center mt-8">
//           <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//           <p className="mt-4">Loading...</p>
//         </div>
//       ) : (
//         <div className="container mx-auto py-2">
//           {blogPosts.length === 0 ? (
//             <h1 className="text-5xl text-center mx-auto mt-32">No Blog Posts Found</h1>
//           ) : (
//             <div className="flex flex-wrap gap-2">
//               {blogPosts.map(blogPost => (
//                 <div key={blogPost.id} className="blog-post">
//                   <h3 className="text-xl font-semibold">{blogPost.title}</h3>
//                   <p>
//                     <ReactQuill
//                       theme="snow"
//                       value={blogPost.content}
//                       readOnly
//                     />
//                   </p>
//                   <Link to={`/blog/${blogPost.id}`} className="text-blue-500 hover:underline">Read More</Link>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogPosts;
