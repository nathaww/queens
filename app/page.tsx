import Collections from "@/components/section/Collection";
import Gallery from "@/components/section/Gallery";
import Hero from "@/components/section/Hero";
import Location from "@/components/section/Location";
import OurStory from "@/components/section/OurStory";
import Portfolio from "@/components/section/Portfolio";

export default function Home() {
  return (
    <>
      <Hero />
      <OurStory />
      <Collections />
      <Gallery/>
      <Portfolio />
      <Location />
    </>
  );
}
