import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  openModal,
  createRef,
}) => {
  const { idx, arr, imgItemRef, itemsAmount } = createRef;
  return (
    <li
      ref={arr.length - itemsAmount === idx && idx !== 0 ? imgItemRef : null}
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
