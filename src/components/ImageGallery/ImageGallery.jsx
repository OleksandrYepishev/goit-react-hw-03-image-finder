import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, onSelect }) => (
  <ImageGalleryList>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        onClick={() => onSelect({ largeImageURL, tags })}
      />
    ))}
  </ImageGalleryList>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      largeImageURL: PropTypes.string,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
  onSelect: PropTypes.func.isRequired,
};
