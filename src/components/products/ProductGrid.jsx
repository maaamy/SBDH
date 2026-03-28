import CatProducts from "./CatProducts";

const ProductGrid = ({ produits, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {produits.map((produit) => (
        <CatProducts
          key={produit.id}
          produit={produit}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;