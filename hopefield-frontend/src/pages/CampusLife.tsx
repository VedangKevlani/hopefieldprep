import BackToTopButton from "../components/BackToTopButton";
import Navbar from "../components/Navbar";

export default function CampusLife() {
  return (
    <>
      <Navbar />

      <div className="pt-32 px-6 md:px-16 mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E792C] mb-10">
          Campus Life
        </h1>

        {/* ===========================
            NEWSLETTER
        ============================ */}
        <section id="newsletter" className="mb-16">
          <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">Newsletter</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Stay up to date with the latest updates, announcements, and activities
            happening across Hopefield Preparatory School.
          </p>
          <a
            href="/downloads/Hope-on-the-Horizon-Vol1.pdf" download
            className="inline-block mt-4 text-[#1E792C] font-bold underline hover:text-[#EAC30E]"
          >
            View Latest Newsletter
          </a>
        </section>

        {/* ===========================
            PTA
        ============================ */}
        <section id="pta" className="mb-16">
          <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">
            Parent Teacher Association (PTA)
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The Hopefield Preparatory PTA works collaboratively with staff and
            parents to enhance the educational experience.
          </p>
        </section>

        {/* ===========================
            IMAGE GALLERY (INLINE)
        ============================ */}
        <section id="imageGallery" className="mb-16">
          <h2 className="text-3xl font-bold text-[#EAC30E] mb-6">Gallery</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Enjoy a collection of moments captured across our campus—classroom life,
            school spirit, special events, and more.
          </p>

          {/* Simple grid gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <img
              src="/images/gallery1.jpg"
              className="rounded-lg shadow-lg object-cover w-full h-64 hover:scale-[1.03] transition"
              alt="Gallery 1"
            />
            <img
              src="/images/gallery2.jpg"
              className="rounded-lg shadow-lg object-cover w-full h-64 hover:scale-[1.03] transition"
              alt="Gallery 2"
            />
            <img
              src="/images/gallery3.jpg"
              className="rounded-lg shadow-lg object-cover w-full h-64 hover:scale-[1.03] transition"
              alt="Gallery 3"
            />
            <img
              src="/images/gallery4.jpg"
              className="rounded-lg shadow-lg object-cover w-full h-64 hover:scale-[1.03] transition"
              alt="Gallery 4"
            />
            <img
              src="/images/gallery5.jpg"
              className="rounded-lg shadow-lg object-cover w-full h-64 hover:scale-[1.03] transition"
              alt="Gallery 5"
            />
            <img
              src="/images/gallery6.jpg"
              className="rounded-lg shadow-lg object-cover w-full h-64 hover:scale-[1.03] transition"
              alt="Gallery 6"
            />
          </div>
        </section>

        {/* ===========================
            SCHOOL CALENDAR
        ============================ */}
        <section id="schoolCalendar" className="mb-16">
          <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">
            School Calendar
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            View all important school dates including terms, holidays, and exams.
          </p>
        </section>

        {/* ===========================
            EVENTS CALENDAR
        ============================ */}
        <section id="eventsCalendar" className="mb-16">
          <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">
            Events Calendar
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Stay updated on special programs, cultural events, and student showcases.
          </p>
        </section>

        {/* ===========================
            GIFT OF HOPE
        ============================ */}
        <section id="giftOfHope" className="mb-16">
          <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">
            Gift of Hope Charity
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Supporting families in need through community outreach and charitable initiatives.
          </p>
        </section>

        <BackToTopButton />
      </div>
    </>
  );
}
