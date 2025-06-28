import { useFetchAllProductsQuery } from "../redux/features/product/productApi";
import { CategoryBanner, Infofeatures, SignUpBanner } from "../component";
import AllTab from "../component/AllTab";
import ProductSlider from "../component/ProductSlider";
import { frameBg } from "../assets";

const Frame = () => {
  const { data: products, isLoading, isError } = useFetchAllProductsQuery();

  // Filter products of type "Frame"
  const frameProducts =
    products?.filter((p) => p.productType.toLowerCase() === "frame") || [];

  // Shuffle and map to match ProductSlider type
  const getRandomSubset = (arr: typeof frameProducts, count: number) => {
    return [...arr]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map((product) => ({
        id: product._id, // assuming _id is string
        title: product.title,
        image: Array.isArray(product.image) ? product.image[0] : product.image,
        price: product.price,
      }));
  };

  const randomBestSellers = getRandomSubset(frameProducts, 6);

  return (
    <div>
      <CategoryBanner
        name="Frames"
        description="Elevate your photos, art prints, and memories with our handcrafted frames. From modern minimalism to timeless elegance, our collection ensures your walls tell your story beautifully. Built with premium materials to complement every space."
        image={frameBg}
        linkLabel="Shop Frame"
        className="bg-blue-800 text-white"
      />

      <AllTab showFrames={true} />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Failed to load products.</p>
      ) : (
        <ProductSlider
          title="Best Selling Frames"
          products={randomBestSellers}
        />
      )}

      <Infofeatures />
      <SignUpBanner />
    </div>
  );
};

export default Frame;
