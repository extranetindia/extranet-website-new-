import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {/* Padding accounts for fixed navbar (56px on mobile, 64px on desktop) + dynamic announcement bar (0-48px) */}
      <main className="flex-1 overflow-x-hidden" style={{ paddingTop: "calc(var(--announcement-bar-height, 0px) + 3.5rem)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
