import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          compact={true}
        />
      ))}
    </div>
  );
};

export default RelatedProducts;