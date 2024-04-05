import { tyProduct } from "../../pages/products/ProductsPage";
import ProductItem from "./ProductItem";

interface Props {
  products: tyProduct[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className='flex items-center gap-10 flex-wrap'>
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
