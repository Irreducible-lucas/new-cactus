import ExploreGrid from "./ExploreGrid";
import { useFetchProductsByTypeQuery } from "../redux/features/product/productApi";

const ExploreFrame = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useFetchProductsByTypeQuery("frame");

  // Filter only products with productType === "Frame"
  const frameProducts = products?.filter(
    (product) => product.productType.toLowerCase() === "frame"
  );

  // Sort by createdAt descending and take first 4
  const recentFrames = frameProducts
    ? [...frameProducts]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4)
    : [];

  return (
    <ExploreGrid
      title="Frame"
      products={recentFrames}
      seeMoreLink="/frame"
      loading={isLoading}
      error={isError}
    />
  );
};

export default ExploreFrame;
