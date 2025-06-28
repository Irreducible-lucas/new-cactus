import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export type Product = {
  id: string; // Changed from number to string
  title: string;
  image: string;
  price: string;
};

type ProductSliderProps = {
  title: string;
  products: Product[];
};

const ProductSlider: React.FC<ProductSliderProps> = ({ title, products }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 5,
          spacing: 16,
        },
      },
    },
  });

  return (
    <section className="w-full px-4 md:px-8 my-14">
      <h2 className="text-xl md:text-2xl font-bold mb-6">{title}</h2>

      <div ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <div
            key={product.id}
            className="keen-slider__slide bg-white rounded shadow-md"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-cover rounded-t"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold h-12 line-clamp-2">
                {product.title}
              </h3>
              <p className="mt-1 font-bold text-blue-700">
                From {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSlider;
