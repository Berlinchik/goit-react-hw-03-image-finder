import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, openModal }) => {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={e => openModal({ image: largeImageURL, descr: tags })}
    >
      <img className={s.ImageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
