import React from "react";

const Photo = ({ src, alt, caption }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg px-4 py-6 max-w-6xl mx-auto">
      <div className="w-full aspect-video overflow-hidden rounded-lg">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      {caption && (
        <p className="mt-4 text-gray-700 text-center text-lg font-medium">
          {caption}
        </p>
      )}
    </div>
  );
};

export default Photo;
