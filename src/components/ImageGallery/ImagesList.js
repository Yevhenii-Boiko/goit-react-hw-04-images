import { ImagesGallery } from './ImagesGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageItem';

const ImageGallery = ({ items, onImageClick }) => {
  return (
    <div>
      <ImagesGallery>
        {items?.map(photo => (
          <ImageGalleryItem
            key={photo.id}
            src={photo.largeImageURL}
            alt={photo.id}
            onClick={onImageClick}
          />
        ))}
      </ImagesGallery>
    </div>
  );
};

export default ImageGallery;
