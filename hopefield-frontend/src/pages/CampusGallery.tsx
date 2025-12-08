import ImageGallery from "../components/ImageGallery";
import Navbar from "../components/Navbar";

export default function CampusGallery() {
  return (
      <><Navbar />
      <div className="pt-32 px-6 md:px-16">
          <h1 className="text-4xl font-bold text-[#1E792C] mb-6">
              Campus Gallery
          </h1>
          {/* Your previous gallery content goes here */}
          <section id="campusGallery">
              <ImageGallery />
          </section>
      </div></>
  );
}
