import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Spinner = () => (
  <Loader type="Oval" color="#187c39" height={100} width={100} timeout={3000} />
);
