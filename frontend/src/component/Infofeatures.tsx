import { decorIcon, frameIcon, furnitureIcon, paintingIcon } from "../assets";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: frameIcon,
    title: "Elegant Frames",
    description:
      "High-quality frames to complement your art and interior style",
  },
  {
    icon: paintingIcon,
    title: "Original Paintings",
    description: "Discover unique artworks crafted by talented artists",
  },
  {
    icon: decorIcon,
    title: "Chic Home Decor",
    description:
      "Modern and traditional pieces to personalize your living space",
  },
  {
    icon: furnitureIcon,
    title: "Stylish Furniture",
    description: "Functional and stylish furniture to enhance your home",
  },
];

const Infofeatures = () => {
  return (
    <section className="bg-gray-50 py-12 px-12">
      <div className="bg-white rounded shadow-sm p-6 sm:p-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="text-center px-4">
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-base font-semibold text-indigo-950">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Infofeatures;
