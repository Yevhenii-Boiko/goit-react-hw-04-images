import { useState, useEffect } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { Layout } from './Layout';
import { Toaster, toast } from 'react-hot-toast';
import { getImages } from 'services/ApiService';
import { BtnContainer } from './Button/Button.styled';
import ImageGallery from './ImageGallery/ImagesList';
import Modal from './Modal';
import SearchBar from './SearchBar';
import Button from './Button';
import Spiner from './Loader/Loader';
import { nanoid } from 'nanoid';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [fotos, setFotos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [srcLarge, setSrcLarge] = useState('');
  const [altLarge, setAltLarge] = useState('');
  const [serchId, setSearchId] = useState(null);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setIsLoading(true);
    getImages(searchValue, page)
      .then(response => response.json())
      .then(({ total, totalHits, hits }) => {
        if (!hits.length) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again',
            {
              duration: 3000,
            }
          );
          return;
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        setFotos(prevFotos => [...prevFotos, ...hits]);
        setShowBtn(page < Math.ceil(total / 12));

        if (hits.length < 12 && page !== 1) {
          return toast.error(
            "We're sorry, but you've reached the end of search results"
          );
        }
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [page, searchValue, serchId]);

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
    setSearchId(nanoid());
    setPage(1);
    setFotos([]);
    setShowBtn(false);
    setError(null);
  };

  const toggleModal = event => {
    if (event !== null) {
      setSrcLarge(event.target.currentSrc);
      setAltLarge(event.target.alt);
    }

    setShowModal(prevState => !prevState);
  };

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
        {showBtn && <Button onLoadMoreClick={loadMoreImages} />}
      </BtnContainer>

      {isLoading && <Spiner />}

      {showModal && (
        <Modal
          srcLarge={srcLarge}
          altLarge={altLarge}
          onModalClick={toggleModal}
        />
      )}

      {error && error.message}
    </Layout>
  );
};

export default App;
