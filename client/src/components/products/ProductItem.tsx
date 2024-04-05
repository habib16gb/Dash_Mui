import { tyProduct } from "../../pages/products/ProductsPage";
import Rating from "@mui/material/Rating";

interface Props {
  product: tyProduct;
}

const ProductItem = ({ product }: Props) => {
  return (
    <div className='shadow-lg relative w-72 h-72 p-2 cursor-pointer hover:scale-105 transition-all duration-300 flex flex-col'>
      <div
        className='
      absolute top-2 left-2 flex items-center justify-between'
      >
        {product.stock > 0 ? (
          product.discount > 0 && (
            <div
              style={{
                color: "rgb(149, 222, 100)",
                backgroundColor: "rgb(246, 255, 237)",
                borderColor: "rgb(246, 255, 237)",
              }}
              className='discount px-3 py-1 border-2'
            >
              {product.discount}%
            </div>
          )
        ) : (
          <div className='text-xs text-red-500  font-semibold'>
            out of stock
          </div>
        )}
      </div>
      <div
        style={{
          backgroundImage: `url(${product.imageUrl})`,
          backgroundRepeat: "no-repeat",
          width: "250px",
          height: "200px",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          opacity: product.stock > 0 ? 1 : 0.5,
          filter: product.stock > 0 ? "grayscale(0%)" : "grayscale(100%)",
        }}
        className='image'
      ></div>
      <div className='title mt-2 border-t-2 border-t-slate-200 pt-2'>
        <h2 className='text-md font-semibold'>{product.title}</h2>
        <h5 className='text-xs text-gray-500 font-medium'>{product.brand}</h5>
      </div>
      <div className='bottom mt-4 flex items-center justify-between'>
        <div className='left'>
          <div className='price flex items-center gap-2'>
            {product.discount > 0 && (
              <span className={`text-md font-semibold`}>
                ${product.price - (product.price * product.discount) / 100}
              </span>
            )}
            <span
              className={` ${
                product.discount > 0
                  ? "line-through text-xs text-gray-500"
                  : "font-semibold text-md"
              }`}
            >
              ${product.price}
            </span>
          </div>
          <div className='rating flex items-center justify-center gap-2'>
            <Rating
              size='small'
              name='read-only'
              value={product.rating}
              readOnly
            />

            <span>({product.rating})</span>
          </div>
        </div>
        <div className='right'>
          <button
            className={`px-2 py-1 capitalize rounded-sm text-sm font-medium ${
              product.stock > 0
                ? " bg-blue-500 text-white  hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed opacity-50"
            }`}
            disabled={product.stock === 0}
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
