import React from 'react'
import { Sidebar } from '../components/dashboard'


const Trash = () => (
    <section>
    <div className='w-full h-screen flex flex-col md:flex-row'>
         <div className='w-1/5 h-screen bg-indigo-700 sticky top-0 hidden md:block'>
           <Sidebar />
         </div>
         {/* <MobileSidebar /> */}
         </div>
   
       </section>
)

export default Trash