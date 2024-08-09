import React from 'react';



const Modal_question = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center   mt-2 mb-2   z-50 ">
      <div  className="fixed inset-0    flex justify-center items-center"></div>
      <div className="bg-white p-6 rounded-lg w-2/4 z-20 ">
        {children}
      </div>
    </div>
  );
};

export default Modal_question ;
