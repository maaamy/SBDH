import ProductCard from "./ProductCard";
import VoirPlus from "./VoirPlus";

const ProductRow = ({ title, products, onAddToCart}) => {

  return (

    <div className="border-2 border-black flex flex-col gap-1 px-4 py-4 w-full shrink-0">

      <h2 className="titleText text-black">
        {title}
      </h2>

      <div className="flex gap-3 items-start overflow-x-auto py-3 scrollbar-hide">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} onAddToCart={onAddToCart}/>
        ))}

        <VoirPlus />

      </div>
      
    </div>
  );
}

export default ProductRow;