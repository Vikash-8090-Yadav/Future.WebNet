import React from 'react';

function ImageUploader() {

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
    </div>
  );
}

export default ImageUploader;
