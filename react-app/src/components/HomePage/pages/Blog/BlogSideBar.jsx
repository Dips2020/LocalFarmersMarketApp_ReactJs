// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

function BlogSideBar() {
  return (
    <div className="w-[25%] flex-3 h-full  content-center mt-4 pb-30 bg-white rounded-lg flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <span className="m-10 p-5 w-auto border-t border-b border-gray-400 text-center font-semibold text-gray-700">ABOUT ME</span>
        <img src="https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className=" p-[10px] w-250 h-250" />
        <p className="p-[10px]">Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit amet ex esse.Sunt eu ut nostrud id quis proident.</p>
      </div>
      <div className="flex flex-col items-center mt-4 p-2 justify-center">
        <span className="m-4 w-auto border-t border-b h-[40px] border-gray-400 text-center font-semibold text-gray-700">NAVIGATION</span>
        <ul className="list-none mb-2 flex flex-col justify-center items-center">
          
          <Link to="/">Home</Link>
          <Link to="/contact">Contact Us</Link>
          
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <span className="m-10 p-5 w-auto border-t border-b border-gray-400 text-center font-semibold text-gray-700">FOLLOW US</span>
      </div>
    </div>
  );
}

export default BlogSideBar;
