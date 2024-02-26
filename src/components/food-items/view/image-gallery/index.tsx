import Image from "next/image";
import { Image as FoodImage, FoodItem } from '../../types';

const ImageGallery = ({ foodItem }: {foodItem: FoodItem}) => {
  if(!foodItem) {
    return;
  }

  // The buttons ONLY show when viewed on desktop.
  // Use in mobile/responsive to use without buttons and WITH drag support.

  return (
    <div className="carousel w-full">
      {foodItem.images && foodItem.images.map((image, i) => {
        return (
          <div key={i} id={`slide${i}`} className="carousel-item relative w-full">
            <Image alt={foodItem.name} src={image.url} className="w-full" width="500" height="500" />    
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${i <= 0 ? foodItem.images.length - 1 : i - 1}`} className="btn btn-circle hidden lg:flex">❮</a>
              <a href={`#slide${i + 1 < foodItem.images.length ? i + 1 : 0}`} className="btn btn-circle hidden lg:flex">❯</a>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default ImageGallery;