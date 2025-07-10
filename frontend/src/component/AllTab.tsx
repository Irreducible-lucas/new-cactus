import React from "react";
import { useFetchProductsByTypeQuery } from "../redux/features/product/productApi";
import ProductTab from "./ProductTab";

interface BackendProduct {
  _id: string;
  title: string;
  image: string[];
  price: string;
  productTag: string;
}

type CategoryType = "frame" | "painting" | "decor" | "furniture";

interface Product extends BackendProduct {
  category: CategoryType;
}

interface AllTabProps {
  showFrames?: boolean;
  showHomeDecor?: boolean;
  showFurniture?: boolean;
  showPainting?: boolean;
}

const AllTab: React.FC<AllTabProps> = ({
  showFrames = false,
  showHomeDecor = false,
  showFurniture = false,
  showPainting = false,
}) => {
  const {
    data: frameData,
    isLoading: loadingFrames,
    error: frameError,
  } = useFetchProductsByTypeQuery("Frame");

  const {
    data: homeDecorData,
    isLoading: loadingHomeDecor,
    error: homeDecorError,
  } = useFetchProductsByTypeQuery("Home Decor");

  const {
    data: furnitureData,
    isLoading: loadingFurniture,
    error: furnitureError,
  } = useFetchProductsByTypeQuery("Furniture");

  const {
    data: paintingData,
    isLoading: loadingPainting,
    error: paintingError,
  } = useFetchProductsByTypeQuery("Painting");

  const transformData = (
    data: BackendProduct[],
    tabs: string[],
    category: CategoryType
  ) => {
    const productData: Record<string, Product[]> = {};

    tabs.forEach((tab) => {
      productData[tab] = data
        .filter((product) => product.productTag === tab && product._id)
        .map((product) => ({
          ...product,
          category,
        }));
    });

    return { tabs, productData };
  };

  if (!showFrames && !showHomeDecor && !showFurniture && !showPainting) {
    return (
      <p className="text-center text-gray-500 py-12">
        No category selected. Please enable a category to view products.
      </p>
    );
  }

  return (
    <div className="space-y-12">
      {showFrames && (
        <>
          {loadingFrames ? (
            <p className="text-center">Loading frames...</p>
          ) : frameError ? (
            <p className="text-center text-red-500">Error loading frames.</p>
          ) : (
            frameData && (
              <ProductTab
                title="Shop Frames"
                {...transformData(
                  frameData,
                  ["Acrylic", "Frameless", "Frame", "Wood"],
                  "frame"
                )}
              />
            )
          )}
        </>
      )}

      {showHomeDecor && (
        <>
          {loadingHomeDecor ? (
            <p className="text-center">Loading home decor...</p>
          ) : homeDecorError ? (
            <p className="text-center text-red-500">
              Error loading home decor.
            </p>
          ) : (
            homeDecorData && (
              <ProductTab
                title="Home Decor"
                {...transformData(
                  homeDecorData,
                  ["Wall Art", "Vases", "Candles", "Mirrors"],
                  "decor"
                )}
              />
            )
          )}
        </>
      )}

      {showFurniture && (
        <>
          {loadingFurniture ? (
            <p className="text-center">Loading furniture...</p>
          ) : furnitureError ? (
            <p className="text-center text-red-500">Error loading furniture.</p>
          ) : (
            furnitureData && (
              <ProductTab
                title="Furniture"
                {...transformData(
                  furnitureData,
                  ["Chairs", "Tables", "Sofas", "Shelves"],
                  "furniture"
                )}
              />
            )
          )}
        </>
      )}

      {showPainting && (
        <>
          {loadingPainting ? (
            <p className="text-center">Loading paintings...</p>
          ) : paintingError ? (
            <p className="text-center text-red-500">Error loading paintings.</p>
          ) : (
            paintingData && (
              <ProductTab
                title="Paintings"
                {...transformData(
                  paintingData,
                  ["Oil", "Watercolor", "Acrylic", "Digital"],
                  "painting"
                )}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default AllTab;
