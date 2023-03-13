import React, { Component } from 'react';
import { ImagesGallery, Message } from './ImagesGallery.styled';
import Spiner from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageItem';
import Button from 'components/Button';
import { getImages } from 'services/ApiService';
import { BtnContainer } from 'components/Button/Button.styled';

class ImageGallery extends Component {
  state = {
    fotos: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: 'pending' });

      getImages(this.props.searchValue.trim(), this.state.page)
        .then(response => response.json())
        .then(data => {
          this.setState({ fotos: data.hits, status: 'resolved' });
        });
    }
    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevState.page !== this.state.page
    ) {
      getImages(this.props.searchValue.trim(), this.state.page)
        .then(response => response.json())
        .then(data => {
          this.setState({
            fotos: [...this.state.fotos, ...data.hits],
            status: 'resolved',
          });
        });
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, fotos, status } = this.state;

    if (status === 'pending') {
      return <Spiner />;
    }

    if (status === 'rejected') {
      return <h2>{error}</h2>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <div>
            {fotos < 1 && (
              <Message>
                Can not find images with name {this.props.searchValue}...
              </Message>
            )}
          </div>
          <div>
            <ImagesGallery>
              {fotos?.map(photo => (
                <ImageGalleryItem
                  key={photo.id}
                  src={photo.largeImageURL}
                  alt={photo.id}
                  onClick={this.props.onImageClick}
                />
              ))}
            </ImagesGallery>
          </div>
          <BtnContainer>
            {fotos.length > 0 && status === 'resolved' && (
              <Button onLoadMoreClick={this.loadMoreImages} />
            )}
          </BtnContainer>
        </div>
      );
    }
  }
}

export default ImageGallery;
