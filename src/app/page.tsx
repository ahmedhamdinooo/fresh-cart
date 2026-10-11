import HeroSlider from "@/components/home/HeroSlider";
import FeaturesBar from "@/components/home/FeaturesBar";
import CategorySlider from "@/components/home/CategorySlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandsStrip from "@/components/home/BrandsStrip";

export default function HomePage() {
  return (
    <div className="animate-fade-up">
      <HeroSlider />
      <FeaturesBar />
      <CategorySlider />
      <FeaturedProducts />
      <BrandsStrip />
    </div>
  );
}
