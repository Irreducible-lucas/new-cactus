import React from "react";

interface CategoryBannerProps {
  name: string;
  description: string;
  image: string; // image URL
  linkLabel?: string;
  className?: string; // Custom Tailwind classes
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  name,
  description,
  image,
  linkLabel = "Shop Now",
  className = "",
}) => {
  return (
    <div className="flex justify-center">
      <div
        className={`relative flex flex-col lg:flex-row w-full  overflow-hidden  h-[28rem] ${className}`}
      >
        {/* Background image for small devices */}
        <div
          className="absolute inset-0 lg:hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        {/* Text Section */}
        <div className="relative z-10 lg:z-0 lg:w-1/2 p-8 flex flex-col justify-center text-center lg:text-left bg-transparent lg:bg-blue-600 text-white lg:text-white">
          <h2 className="text-4xl font-bold mb-4">{name}</h2>
          <p className="text-lg mb-6">{description}</p>
          <button className="font-semibold text-base inline-flex items-center gap-2 hover:underline">
            {linkLabel}
            <svg
              className="w-4 h-4 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Image Section - visible only on large devices */}
        <div className="hidden lg:block lg:w-1/2 h-full">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
