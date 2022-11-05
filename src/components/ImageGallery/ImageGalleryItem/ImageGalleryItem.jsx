import PropTypes from "prop-types"
import { GalleryItem, ImageItem } from "./ImageGalleryItem.styled";


function ImageGalleryItem({pictures, openModal}) {
  return pictures.map(({ id, webformatURL, largeImageURL }) => (
  <GalleryItem key={id}>
      <ImageItem
        src={webformatURL}
        alt={`img №${id}`}
        data-url={largeImageURL}
        onClick={openModal}
      />
  </GalleryItem>
  )) 
}

export default ImageGalleryItem;


ImageGalleryItem.propTypes = {
  pictures: PropTypes.array.isRequired,
  openModalIMG: PropTypes.func
} 