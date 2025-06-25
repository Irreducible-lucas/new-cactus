import ExploreGrid from "./ExploreGrid";
import { useFetchProductsByTypeQuery } from "../redux/features/product/productApi";

const ExplorePainting = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useFetchProductsByTypeQuery("painting");

  const paintingProducts = products?.filter(
    (product) => product.productType.toLowerCase() === "painting"
  );

  // Sort by createdAt descending and take first 4
  const recentPainting = paintingProducts
    ? [...paintingProducts]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4)
    : [];

  return (
    <ExploreGrid
      title="Painting"
      products={recentPainting}
      seeMoreLink="/painting"
      loading={isLoading}
      error={isError}
    />
  );
};

export default ExplorePainting;
