import { frame, furniture, houseDecor, painting } from "../assets";

interface Product {
  title: string;
  image: string;
  alt: string;
  url: string;
}

const products: Product[] = [
  {
    title: "Frame",
    image: frame,
    alt: "frame",
    url: "/frame",
  },
  {
    title: "Painting",
    image: painting,
    alt: "painting",
    url: "/painting",
  },
  {
    title: "Home Decor",
    image: houseDecor,
    alt: "decoration",
    url: "/home-decor",
  },
  {
    title: "Furniture",
    image: furniture,
    alt: "furniture",
    url: "/furniture",
  },
];

const ShopProductRange = () => {
  return (
    <section className="py-10 px-8 bg-white mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shop Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <a href={product.url}>
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
                <button className="bg-white text-black font-semibold px-5 py-2 rounded-full shadow-md hover:bg-gray-100">
                  {product.title}
                </button>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopProductRange;
