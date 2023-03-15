import { useState, useEffect } from 'react';
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

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [fotos, setFotos] = useState([]);
  // const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState({ currentPage: 1, nextPage: 1 });
  const [showModal, setShowModal] = useState(false);
  const [srcLarge, setSrcLarge] = useState('');
  const [altLarge, setAltLarge] = useState('');

  const toggleModal = event => {
    if (event !== null) {
      setSrcLarge(event.target.currentSrc);
      setAltLarge(event.target.alt);
    }

    setShowModal(prevState => !prevState);
  };

  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setFotos([]);
  };

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setStatus('pending');

    if (setSearchValue !== searchValue || setPage !== page) {
      getImages(searchValue, page)
        .then(response => response.json())
        .then(data => {
          setFotos(data.hits);
          setStatus('resolved');
        });
    }

    // if (setSearchValue !== searchValue || setPage !== page) {
    //   getImages(searchValue, page)
    //     .then(response => response.json())
    //     .then(data => {
    //       setFotos(prevFotos => [...prevFotos, ...data.hits]);
    //       setStatus('resolved');
    //     });
    // }
  }, [page, searchValue]);

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === 'pending') {
    return <Spiner />;
  }

  // if (status === 'rejected') {
  //   return <h2>{error}</h2>;
  // }

  return (
    <Layout>
      <GlobalStyle />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
        }}
      />
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery
        items={fotos}
        searchValue={searchValue}
        page={page}
        onImageClick={toggleModal}
      />
      <BtnContainer>
        {fotos.length > 0 && status === 'resolved' && (
          <Button onLoadMoreClick={loadMoreImages} />
        )}
      </BtnContainer>

      {showModal && (
        <Modal
          srcLarge={srcLarge}
          altLarge={altLarge}
          onModalClick={toggleModal}
        />
      )}
    </Layout>
  );
};

export default App;
