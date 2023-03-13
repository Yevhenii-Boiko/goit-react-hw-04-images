import React from 'react';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <GalleryItem>
      <Image src={src} alt={alt} onClick={onClick} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
