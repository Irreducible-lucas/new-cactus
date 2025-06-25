import ExploreGrid from "./ExploreGrid";
import { useFetchProductsByTypeQuery } from "../redux/features/product/productApi";

const ExploreFurniture = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useFetchProductsByTypeQuery("furniture");

  const furnitureProducts = products?.filter(
    (product) => product.productType.toLowerCase() === "furniture"
  );

  // Sort by createdAt descending and take first 4
  const recentFurniture = furnitureProducts
    ? [...furnitureProducts]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4)
    : [];

  return (
    <ExploreGrid
      title="Furniture"
      products={recentFurniture}
      seeMoreLink="/furniture"
      loading={isLoading}
      error={isError}
    />
  );
};

export default ExploreFurniture;
