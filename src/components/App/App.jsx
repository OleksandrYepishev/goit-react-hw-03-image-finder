import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { SearchBar } from './Searchbar/Searchbar';
import { Container } from '../Container/Container';
import { fetchImages } from '../../services/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button.jsx';
import { Spinner } from '../Loader/Loader';
import Modal from '../Modal/modal';

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
    const shouldFetch = prevState.imageName !== imageName && imageName !== '';

    if (imageName === '') {
      return toast.error('U need to write a name of image!');
    }

    if (shouldFetch || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const images = await fetchImages(imageName, page);
        this.setState({ status: 'resolved' });

        if (images.length === 0) {
          return toast.error(`there is no image with that name  ${imageName}`);
        }
        this.setState({ images: [...this.state.images, ...images] });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
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
    const { images, status, selectedImage } = this.state;
    const showButton = images.length > 0;

    return (
      <Container>
        <SearchBar onSearch={this.handleFormSubmit} />
        {status === 'pending' && <Spinner />}
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
