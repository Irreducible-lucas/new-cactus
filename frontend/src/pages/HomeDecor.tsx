import { CategoryBanner, Infofeatures, SignUpBanner } from "../component";
import { homedecorBg } from "../assets";
import AllTab from "../component/AllTab";
import ProductSlider from "../component/ProductSlider";
import { useFetchAllProductsQuery } from "../redux/features/product/productApi";

const HomeDecor = () => {
  const { data: products, isLoading, isError } = useFetchAllProductsQuery();

  // Filter for "home decor" products
  const homeDecorProducts =
    products?.filter((p) => p.productType.toLowerCase() === "home decor") || [];

  // Randomize and pick a few
  const getRandomSubset = (arr: typeof homeDecorProducts, count: number) => {
    return [...arr]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map((product) => ({
        ...product,
        id: product._id, // Map _id → id
      }));
  };

  const randomBestSellers = getRandomSubset(homeDecorProducts, 6);

  return (
    <div>
      <CategoryBanner
        name="Home Decor"
        description="Transform your house into a home with our unique home decor collection. From statement pieces to subtle accents, explore decor items that reflect your style and enhance your living space’s charm and warmth."
        image={homedecorBg}
        linkLabel="Shop Wall Art"
        className="bg-blue-800 text-white"
      />
      <AllTab showHomeDecor={true} />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Failed to load products.</p>
      ) : (
        <ProductSlider
          title="Best Selling Home Decor"
          products={randomBestSellers}
        />
      )}

      <Infofeatures />
      <SignUpBanner />
    </div>
  );
};

export default HomeDecor;
