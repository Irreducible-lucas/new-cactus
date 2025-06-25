import { benz, paintingBg } from "../assets";
import { CategoryBanner, Infofeatures, SignUpBanner } from "../component";
import AllTab from "../component/AllTab";
import ProductSlider from "../component/ProductSlider";
import { useFetchAllProductsQuery } from "../redux/features/product/productApi";

const Painting = () => {
  const { data: products, isLoading, isError } = useFetchAllProductsQuery();

  // Filter products of type "Painting"
  const paintingProducts =
    products?.filter((p) => p.productType.toLowerCase() === "painting") || [];

  // Shuffle and take first N
  const getRandomSubset = (arr: typeof paintingProducts, count: number) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
  };

  const randomBestSellers = getRandomSubset(paintingProducts, 6);

  return (
    <div>
      <CategoryBanner
        name=" Paintings"
        description="Add emotion, depth, and personality to your home with our curated selection of paintings. Whether you're drawn to abstract, realism, or cultural pieces, our artwork brings soul and sophistication to your walls."
        image={paintingBg}
        linkLabel="Shop Wall Art"
        className="bg-blue-800 text-white"
      />
      <AllTab showPainting={true} />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Failed to load products.</p>
      ) : (
        <ProductSlider
          title="Best Selling Paintings"
          products={randomBestSellers}
        />
      )}

      <Infofeatures />
      <SignUpBanner />
    </div>
  );
};

export default Painting;
