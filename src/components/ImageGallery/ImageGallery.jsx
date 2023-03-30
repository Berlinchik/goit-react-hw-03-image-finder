import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import s from './ImageGallery.module.scss';

const ImageGallery = ({ items, openModal, imgItemRef, itemsAmount }) => {
  return (
    <div className={s.box}>
      <ul className={s.ImageGallery}>
        {items.map(({ id, webformatURL, largeImageURL, tags }, idx, arr) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            openModal={openModal}
            createRef={{ idx, arr, imgItemRef, itemsAmount }}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
