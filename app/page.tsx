import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import Features from "./components/Features";
import Coverage from "./components/Coverage";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Plans />
        <Features />
        <Coverage />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
