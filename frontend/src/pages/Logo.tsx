import { benz } from "../assets";
import { CategoryBanner } from "../component";

const Logo = () => {
  return (
    <div>
      <CategoryBanner
        name="Logo"
        description="Discover original logos, wall art, and more—designed by artists and made for you. Explore everything we offer to find the perfect fit for your brand or space."
        image={benz}
        linkLabel="Shop Wall Art"
        className="bg-blue-800 text-white"
      />
    </div>
  );
};

export default Logo;
