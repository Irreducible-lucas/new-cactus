import ExploreGrid from "./ExploreGrid";
import { useFetchProductsByTypeQuery } from "../redux/features/product/productApi";

const ExploreHomeDecor = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useFetchProductsByTypeQuery("home decor");

  const homeDecorProducts = products?.filter(
    (product) => product.productType.toLowerCase() === "home decor"
  );

  // Sort by createdAt descending and take first 4
  const recentHomeDecor = homeDecorProducts
    ? [...homeDecorProducts]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4)
    : [];

  return (
    <ExploreGrid
      title="Home Decor"
      products={recentHomeDecor}
      seeMoreLink="/home-decor"
      loading={isLoading}
      error={isError}
    />
  );
};

export default ExploreHomeDecor;
