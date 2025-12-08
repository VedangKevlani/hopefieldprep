import BackToTopButton from "../components/BackToTopButton";
import ImageGallery from "../components/ImageGallery";
import InteractiveCalendar from "../components/InteractiveCalendar";
import Navbar from "../components/Navbar";
import NewsletterSection from "../components/NewsletterSection";
import SchoolCalendarCard from "../components/SchoolCalendarCard";
import Calendar from "./Calendar";

export default function CampusLife() {
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] pt-32 px-6 md:px-16 mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#1E792C] mb-10">
          Campus Life
        </h1>

        {/* ===========================
            NEWSLETTER ARCHIVE
        =========================== */}
        <NewsletterSection />


        {/* ===========================
            PTA
        ============================ */}
        <section id="pta" className="mb-16">
          <h2 className="text-3xl text-center font-bold text-[#EAC30E] mb-4">
            Parent Teacher Association (PTA)
          </h2>
          <p className="text-lg text-center text-gray-700 leading-relaxed">
            The Hopefield Preparatory PTA works collaboratively with staff and
            parents to enhance the educational experience.
          </p>
        </section>

        {/* ===========================
            IMAGE GALLERY (INLINE)
        ============================ */}
        <section id="imageGallery" className="mb-16">
          <h2 className="text-3xl text-center font-bold text-[#EAC30E] mb-6">Gallery</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Enjoy a collection of moments captured across our campus—classroom life,
            school spirit, special events, and more.
          </p>

          <ImageGallery />
        </section>

        {/* ===========================
            SCHOOL CALENDAR
        ============================ */}
        <section id="schoolCalendar" className="mb-16">
            <h2 className="text-3xl text-center font-bold text-[#EAC30E] mb-4">
                School Calendar
            </h2>
          <SchoolCalendarCard />
        </section>

        {/* ===========================
            EVENTS CALENDAR
        ============================ */}
        <section id="eventsCalendar" className="mb-16">
          <InteractiveCalendar />
          <Calendar />
        </section>

        {/* ===========================
            GIFT OF HOPE
        ============================ */}
        <section id="giftOfHope" className="mb-16">
          <h2 className="text-3xl text-center font-bold text-[#EAC30E] mb-4">
            Gift of Hope Charity
          </h2>
          <p className="text-lg text-center text-gray-700 leading-relaxed">
            Supporting families in need through community outreach and charitable initiatives.
          </p>
        </section>

        <BackToTopButton />
      </div>
    </>
  );
}
