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
  const { data: frameData } = useFetchProductsByTypeQuery("Frame");
  const { data: homeDecorData } = useFetchProductsByTypeQuery("Home Decor");
  const { data: furnitureData } = useFetchProductsByTypeQuery("Furniture");
  const { data: paintingData } = useFetchProductsByTypeQuery("Painting");

  const transformData = (data: BackendProduct[], tabs: string[]) => {
    const productData: Record<string, BackendProduct[]> = {};

    tabs.forEach((tab) => {
      productData[tab] = data
        .filter((product) => product.productTag === tab && product._id) // filter only valid products
        .map((product) => ({
          _id: product._id,
          title: product.title,
          image: product.image,
          price: product.price,
          productTag: product.productTag,
        }));
    });

    return { tabs, productData };
  };

  return (
    <div className="space-y-12">
      {showFrames && frameData && (
        <ProductTab
          title="Shop iPhone Cases"
          {...transformData(frameData, [
            "Acrylic",
            "Frameless",
            "Frame",
            "Wood",
          ])}
        />
      )}

      {showHomeDecor && homeDecorData && (
        <ProductTab
          title="Home Decor"
          {...transformData(homeDecorData, [
            "Wall Art",
            "Vases",
            "Candles",
            "Mirrors",
          ])}
        />
      )}

      {showFurniture && furnitureData && (
        <ProductTab
          title="Furniture"
          {...transformData(furnitureData, [
            "Chairs",
            "Tables",
            "Sofas",
            "Shelves",
          ])}
        />
      )}

      {showPainting && paintingData && (
        <ProductTab
          title="Paintings"
          {...transformData(paintingData, [
            "Oil",
            "Watercolor",
            "Acrylic",
            "Digital",
          ])}
        />
      )}
    </div>
  );
};

export default AllTab;
