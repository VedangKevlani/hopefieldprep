import AchievementsSection from "../components/AchievementsSection";
import InteractiveCalendar from "../components/InteractiveCalendar";
import SchoolStats from "../components/SchoolStats";
import AdmissionBanner from "../components/AdmissionBanner";

export default function Home() {
  return (
    <>
      {/* Achievements Section */}
      <AchievementsSection
      achievements={[
        { title: "Academic Excellence", description: "Top grades across subjects." },
        { title: "Creative Arts", description: "Fostering imagination and creativity." },
        { title: "Sports Achievements", description: "Winning in interschool competitions." },
      ]}
      icons={[
        "/images/puzzle.png",
        "/images/book.png",
        "/images/drawing.png",
        "/images/king.png",
        "/images/equality.png",
        "/images/mic.png",
      ]}
      />

      {/* Interactive Calendar Section */}
      <section id="calendar">
        <InteractiveCalendar />
      </section>

      {/* School Stats Section */}
      <section id="stats">
        <SchoolStats />
      </section>

      {/* Admission Banner Section */}
      <section id="admissions">
        <AdmissionBanner />
      </section>
    </>
  );
}
