import {
  ExploreDesign,
  FeaturedProduct,
  HeroSection,
  Infofeatures,
  Nav,
  ShopProductRange,
  SignUpBanner,
} from "../component";

const Home = () => {
  return (
    <div>
      <Nav />
      <HeroSection />
      <ShopProductRange />
      <FeaturedProduct />
      <ExploreDesign />
      <Infofeatures />
      <SignUpBanner />
    </div>
  );
};

export default Home;
