import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { SearchBar } from '../Searchbar/Searchbar';
import { Container } from '../Container/Container';
import { fetchImages } from '../../services/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button.jsx';
import { Spinner } from '../Loader/Loader';
import { SpinnerContainer } from '../Loader/Loader.styled';
import { Modal } from '../Modal/Modal';

export class App extends Component {
  state = {
    imageName: null,
    selectedImage: null,
    images: [],
    reqStatus: 'idle',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    const shouldFetch =
      (prevState.imageName !== imageName && imageName !== '') ||
      prevState.page !== page;

    if (imageName === '') {
      return toast.error('U need to write a name of image!');
    }

    if (shouldFetch) {
      try {
        this.setState({ reqStatus: 'pending' });
        const images = await fetchImages(imageName, page);
        this.setState({ reqStatus: 'resolved' });

        if (images.length === 0) {
          return toast.error(`there is no image with that name  ${imageName}`);
        }
        this.setState({ images: [...this.state.images, ...images] });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (error) {
        this.setState({ reqStatus: 'rejected' });
      }
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  handleBtnLoadMore = () => {
    this.setState(p => ({ page: p.page + 1 }));
  };

  handleSelectedImg = selectedImage => {
    this.setState({ selectedImage });
  };

  closeModal = () => {
    this.setState(() => ({
      selectedImage: null,
    }));
  };

  render() {
    const { images, reqStatus, selectedImage } = this.state;
    const showButton = images.length >= 12 && reqStatus === 'resolved';

    return (
      <Container>
        <SearchBar onSearch={this.handleFormSubmit} />
        {reqStatus === 'pending' && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}
        <ImageGallery images={images} onSelect={this.handleSelectedImg} />
        {showButton && <Button onClick={this.handleBtnLoadMore} />}
        {selectedImage && (
          <Modal
            srcImg={selectedImage.largeImageURL}
            altImg={selectedImage.tags}
            onClose={this.closeModal}
          />
        )}
        <Toaster position="top-right" />
      </Container>
    );
  }
}
