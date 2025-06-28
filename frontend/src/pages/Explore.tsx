import { exploreBg } from "../assets";
import {
  CategoryBanner,
  ExploreFrame,
  ExploreFurniture,
  ExploreHomeDecor,
  ExplorePainting,
  Infofeatures,
  SignUpBanner,
} from "../component";

const Explore = () => {
  return (
    <div>
      <CategoryBanner
        name="Explore"
        description="Discover original logos, wall art, and more—designed by artists and made for you. Explore everything we offer to find the perfect fit for your brand or space."
        image={exploreBg}
        linkLabel="Explore Product"
        className="bg-blue-800 text-white"
      />
      <ExploreFrame />
      <ExploreFurniture />
      <ExploreHomeDecor />
      <ExplorePainting />
      <Infofeatures />
      <SignUpBanner />
    </div>
  );
};

export default Explore;
