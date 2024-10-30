"use client"

import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const useCloudinaryImageUploader = () => {

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const [image, setImage] = useState(null);           // Holds the selected image file
  const [previewUrl, setPreviewUrl] = useState(null); // Holds the preview URL
  const [uploading, setUploading] = useState(false);  // Indicates if the image is uploading
  const [error, setError] = useState(null);           // Holds error messages

  // Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName
    }
  });

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async () => {
    if (!image) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", `${upload_preset}`);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed.");
      }

      const data = await response.json();
      setPreviewUrl(data.secure_url);
      return data// Cloudinary URL for the uploaded image
    } catch (err) {
      setError(err.message);
      throw err
    } finally {
      setUploading(false);
    }
  };

  return {
    previewUrl,
    uploading,
    error,
    handleImageChange,
    uploadImage,
    AdvancedImage: (props) => <AdvancedImage cldImg={cld.image(props.publicId)} {...props} />
  };
};

export default useCloudinaryImageUploader;
