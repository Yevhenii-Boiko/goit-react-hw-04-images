import React, { Component } from 'react';
import { ImagesGallery } from './ImagesGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageItem';

class ImageGallery extends Component {
  render() {
    const { items } = this.props;

    return (
      <div>
        <ImagesGallery>
          {items?.map(photo => (
            <ImageGalleryItem
              key={photo.id}
              src={photo.largeImageURL}
              alt={photo.id}
              onClick={this.props.onImageClick}
            />
          ))}
        </ImagesGallery>
      </div>
    );
  }
}

export default ImageGallery;
