import { lazy, Suspense, useState } from "react";
import Loader from "../Loader";
import StickyButton from "../StickyButton";
import UnderConstructionModal from "../UnderConstructionModal"; // Import the modal

const HeroSection = lazy(() => import("../HeroSection"));
const BrandDescription = lazy(() => import("../BrandDescription"));
const FeaturedCategory = lazy(() => import("../FeaturedCategory"));
const BestSeller = lazy(() => import("../BestSeller"));
const FeatureCards = lazy(() => import("../FeatureCards"));
const ProductReviews = lazy(() => import("../ProductReviews"));

function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative w-full overflow-x-hidden font-poppins">
      {/* Show the modal if it's open */}
      {isOpen && (
        <UnderConstructionModal setIsOpen={setIsOpen} isOpen={isOpen} />
      )}

      <Suspense fallback={<Loader />}>
        <HeroSection />
        <BrandDescription />
        {/* <FeaturedCategory /> */}
        <BestSeller />
        <FeatureCards />
        <ProductReviews />
      </Suspense>

      <StickyButton />
    </div>
  );
}

export default Home;
