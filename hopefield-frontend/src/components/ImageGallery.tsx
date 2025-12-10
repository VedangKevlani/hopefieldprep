// src/components/ImageGallery.tsx
import AppImage from "./AppImage"; 

export default function ImageGallery() {
  const images = [
    "/images/Hopefield-sportsboys.jpg",
    "/images/Hopefield-sportsgirls.jpg",
    "/images/Hopefield-christmas.jpg",
    "/images/Hopefield-playground.jpg",
    "/images/Hopefield-mudra.jpg",
    "/images/Hopefield-jamaicaday.jpg",
  ];

  return (
    <section id="campusGallery imageGallery" className="py-10 px-6">
      <div
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {images.map((src, idx) => (
          <AppImage
            key={idx}
            src={src}
            alt={`Campus photo ${idx + 1}`}
            className="w-full h-64 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
          />
        ))}
      </div>
    </section>
  );
}
