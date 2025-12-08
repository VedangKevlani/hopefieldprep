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
          happening across Hopefield Preparatory School. Our newsletters provide
          insights into class activities, student achievements, and upcoming events.
        </p>
        <a
          href="#"
          className="inline-block mt-4 text-[#1E792C] font-bold underline hover:text-[#EAC30E]"
        >
          View Latest Newsletter
        </a>
      </section>

      {/* ===========================
          PTA
      ============================ */}
      <section id="pta" className="mb-16">
        <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">Parent Teacher Association (PTA)</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          The Hopefield Preparatory PTA works collaboratively with staff and parents
          to enhance the educational experience. Meetings, events, and volunteering 
          opportunities foster a strong community environment.
        </p>
      </section>

      {/* ===========================
          GALLERY (LINKS TO NEW PAGE)
      ============================ */}
      <section id="gallery" className="mb-16">
        <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">Gallery</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Explore photos of our vibrant classrooms, exciting events, and memorable
          moments at Hopefield Preparatory.
        </p>
        <a
          href="/campus-gallery"
          className="inline-block px-6 py-3 rounded-lg bg-[#1E792C] text-white font-semibold hover:bg-[#145820] transition"
        >
          Visit Full Gallery
        </a>
      </section>

      {/* ===========================
          SCHOOL CALENDAR
      ============================ */}
      <section id="schoolCalendar" className="mb-16">
        <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">School Calendar</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          The school calendar outlines important dates including term schedules, 
          holidays, examinations, and major school-wide activities.
        </p>
        <a
          href="#"
          className="inline-block mt-4 text-[#1E792C] font-bold underline hover:text-[#EAC30E]"
        >
          View School Calendar
        </a>
      </section>

      {/* ===========================
          EVENTS CALENDAR
      ============================ */}
      <section id="eventsCalendar" className="mb-16">
        <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">Events Calendar</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Follow our events calendar to stay informed about special programs,
          cultural activities, student showcases, and community events.
        </p>
        <a
          href="#"
          className="inline-block mt-4 text-[#1E792C] font-bold underline hover:text-[#EAC30E]"
        >
          View Events Calendar
        </a>
      </section>

      {/* ===========================
          GIFT OF HOPE CHARITY
      ============================ */}
      <section id="giftOfHope" className="mb-16">
        <h2 className="text-3xl font-bold text-[#EAC30E] mb-4">Gift of Hope Charity</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          The Gift of Hope initiative supports families in need through donations,
          outreach programs, and community support. Students and parents are invited
          to participate and give back.
        </p>
      </section>
      <BackToTopButton />
    </div>
    </>
      );
}
