import { CategoryBanner, Infofeatures, SignUpBanner } from "../component";
import { furnitureBg } from "../assets";
import AllTab from "../component/AllTab";
import ProductSlider from "../component/ProductSlider";
import { useFetchAllProductsQuery } from "../redux/features/product/productApi";

const Furniture = () => {
  const { data: products, isLoading, isError } = useFetchAllProductsQuery();

  // Filter products of type "Furniture"
  const furnitureProducts =
    products?.filter((p) => p.productType.toLowerCase() === "furniture") || [];

  // Shuffle and take first N
  const getRandomSubset = (arr: typeof furnitureProducts, count: number) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
  };

  const randomBestSellers = getRandomSubset(furnitureProducts, 6);

  return (
    <div>
      <CategoryBanner
        name="Furniture"
        description="Discover furniture that combines comfort, style, and durability. From cozy sofas to elegant dining sets and versatile storage solutions, each piece is thoughtfully designed to make everyday living effortlessly stylish."
        image={furnitureBg}
        linkLabel="Shop Wall Art"
        className="bg-blue-800 text-white"
      />
      <AllTab showFurniture={true} />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Failed to load products.</p>
      ) : (
        <ProductSlider
          title="Best Selling Furniture"
          products={randomBestSellers}
        />
      )}

      <Infofeatures />
      <SignUpBanner />
    </div>
  );
};

export default Furniture;
