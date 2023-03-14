import { Component } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { Layout } from './Layout';
import { Toaster } from 'react-hot-toast';
import { getImages } from 'services/ApiService';
import { BtnContainer } from './Button/Button.styled';
import ImageGallery from './ImageGallery/ImagesList';
import Modal from './Modal';
import SearchBar from './SearchBar';
import Button from './Button';
import Spiner from './Loader/Loader';

class App extends Component {
  state = {
    searchValue: '',
    fotos: [],
    error: null,
    status: 'idle',
    page: 1,
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
    this.setState({ searchValue, page: 1, fotos: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.setState({ status: 'pending' });

      getImages(this.state.searchValue.trim(), this.state.page)
        .then(response => response.json())
        .then(data => {
          this.setState({ fotos: data.hits, status: 'resolved' });
        });
    }
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      getImages(this.state.searchValue.trim(), this.state.page)
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
    const { searchValue, page, showModal, url, error, fotos, status } =
      this.state;

    if (status === 'pending') {
      return <Spiner />;
    }

    if (status === 'rejected') {
      return <h2>{error}</h2>;
    }

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
          items={this.state.fotos}
          searchValue={searchValue}
          page={page}
          onImageClick={this.toggleModal}
        />
        <BtnContainer>
          {fotos.length > 0 && status === 'resolved' && (
            <Button onLoadMoreClick={this.loadMoreImages} />
          )}
        </BtnContainer>

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
