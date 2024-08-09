import React from 'react';
import { useEffect, useState } from 'react';

const Modal_Detail_User = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50 ">
      <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg z-10">
     
       
        {children}
      </div>
    </div>
  );
};

export default Modal_Detail_User;
