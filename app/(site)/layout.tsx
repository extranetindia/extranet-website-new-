import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import MobileCtaBar from "@/components/MobileCtaBar";
import SectionNav from "@/components/SectionNav";
import BackToTop from "@/components/BackToTop";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <SectionNav />
      {/* Fixed chrome stack: announcement (0/40px) + navbar (56/72/108px) + 2px brand keyline */}
      <main className="flex-1 overflow-x-hidden" style={{ paddingTop: "calc(var(--announcement-bar-height, 0px) + var(--navbar-height, 3.5rem) + 2px)" }}>
        {children}
      </main>
      <Footer />
      <MobileCtaBar />
      <BackToTop />
    </>
  );
}
