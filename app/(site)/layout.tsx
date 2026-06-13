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
      {/* Padding accounts for fixed navbar (responsive: 56px on mobile, 64px on sm+) + dynamic announcement bar (0-48px) */}
      <main className="flex-1 overflow-x-hidden" style={{ paddingTop: "calc(var(--announcement-bar-height, 0px) + var(--navbar-height, 3.5rem))" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
