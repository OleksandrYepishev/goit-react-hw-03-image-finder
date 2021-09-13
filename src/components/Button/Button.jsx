import PropTypes from 'prop-types';
import { BtnLoadMore } from './Button.js';

export const Button = ({ onClick }) => (
  <BtnLoadMore type="button" onClick={onClick}>
    Load more
  </BtnLoadMore>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
