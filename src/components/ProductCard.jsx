import React , {useContext} from "react";
import StoreContext from "../context";


const ProductCard = (props) => {
  const { data, addToCart = undefined, decreaseCount, increaseCount } = props;

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);



  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === data.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? data.images.length - 1 : prev - 1
    );
  };

  


  return (
    <div className="w-80 rounded-2xl shadow-lg overflow-hidden border bg-white ">
      <div className="relative h-64 bg-gray-100">
        <img
          src={data.images[currentImageIndex]}
          alt={data.title}
          className="object-cover h-full w-full transition duration-300"
        />
        <button
          onClick={prevImage}
          className="cursor-pointer absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
        >
        </button>
        <button
          onClick={nextImage}
          className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
        >
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{data?.title}</h2>
        <p className="text-xl font-bold text-indigo-600 mb-2">
          {data?.price} $
        </p>
        <p className="text-gray-700 text-sm">{data?.description}</p>
      { addToCart  && <button className="button1 my-2" onClick={() => addToCart(data)}>Add to cart</button>}
      {
        data?.units && <div className="flex flex-cols gap-5 justify-between items-center">
        
        <button className="button1 p-6" onClick={() => {decreaseCount(data)}}>-</button>
        <span className="text-dark-400">{data.units}</span>
        <button className="button1 p-6" onClick={() => {increaseCount(data)}}>+</button>
        
        </div>}
      </div>
    </div>
  );
};

export default ProductCard;
