import React from "react";

const Modal = ({ project, onClose }) => {
  const handleClickOutside = (event) => {
    if (event.target.id === "modal") {
      onClose();
    }
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClickOutside}
    >
      <div className=" bg-slate-800/50 p-4 max-w-md max-h-3/4 overflow-auto rounded-md">
        <button className="float-right" onClick={onClose}>
          Close
        </button>
        <h2 className="font-bold text-2xl mb-2">{project.name}</h2>
        <img
          src={project.images.home}
          alt={project.name}
          className="w-full object-cover"
        />
        <p className="text-gray-700">{project.description}</p>
      </div>
    </div>
  );
};

export default Modal;
