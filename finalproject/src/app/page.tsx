import HeroSection from '@/components/home/HeroSection';
import FeatureBoxSection from '@/components/home/FeatureBoxSection';
import PopularCategorySlider from "@/components/home/PopularCategorySlider";
import NewArrivalSlider from '@/components/home/NewArrivalSlider';
import HeroSlider from '@/components/home/HeroSlider';
import Advantages from '@/components/home/Advantages';
import DealsOfTheDay from '@/components/home/DealsOfTheDay';
import RecentlyLaunched from '@/components/home/RecentlyLaunched';
import PopularBrands from '@/components/home/PopularBrands';
import Articles from '@/components/home/Articles';
import PromotionSection from '@/components/home/PromotionSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureBoxSection />
      <PopularCategorySlider />
      <NewArrivalSlider />
      <HeroSlider />
      <Advantages />
      <DealsOfTheDay />
      <RecentlyLaunched />
      <PopularBrands />
      <Articles />
      <PromotionSection />



     
    </div>
  );
}
