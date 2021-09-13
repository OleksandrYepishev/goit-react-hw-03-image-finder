import PropTypes from 'prop-types';
import { ImGItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, webformatURL, tags, onClick }) => (
  <ImGItem key={id} onClick={onClick}>
    <Image src={webformatURL} alt={tags} />
  </ImGItem>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.number,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
