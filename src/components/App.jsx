import React, { Component } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { Layout } from './Layout';
import { Toaster } from 'react-hot-toast';
import ImageGallery from './ImageGallery/ImagesList';
import Modal from './Modal';
import SearchBar from './SearchBar';

class App extends Component {
  state = {
    searchValue: '',
    showModal: false,
    url: {
      srcLarge: '',
      altLarge: '',
    },
  };

  toggleModal = event => {
    if (event !== null) {
      this.setState({
        url: {
          srcLarge: event.target.currentSrc,
          altLarge: event.target.alt,
        },
      });
    }

    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    const { searchValue, page, showModal, url } = this.state;

    return (
      <Layout>
        <GlobalStyle />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1500,
          }}
        />
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchValue={searchValue}
          page={page}
          onImageClick={this.toggleModal}
        />

        {showModal && (
          <Modal
            srcLarge={url.srcLarge}
            altLarge={url.altLarge}
            onModalClick={this.toggleModal}
          />
        )}
      </Layout>
    );
  }
}

export default App;
