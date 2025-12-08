import AchievementsSection from "../components/AchievementsSection";
import InteractiveCalendar from "../components/InteractiveCalendar";
import SchoolStats from "../components/SchoolStats";
import AdmissionBanner from "../components/AdmissionBanner";
import Slideshow from "../components/Slideshow";
import BackToTopButton from "../components/BackToTopButton";

export default function Home() {
  return (
    <>
    <div id="home">
    {/* Slideshow Section */}
    <Slideshow />

      {/* Achievements Section */}
      <AchievementsSection
      achievements={[
        { title: "PEP Performance", description:"In the 2025 PEP sitting, 70% of our Grade-4 students achieved “mastery” in Numeracy, and 67% achieved “mastery” in Literacy.",
        },
        { title: "First-Choice Secondary Placements", description:"Over 89% of our graduates were placed in one of their top-choice high schools after PEP.",
        },
        { title: "Academic Awards & Competitions", description: "Students have earned top positions in national math and science competitions, achieving distinctions at regional Olympiads and school challenge quizzes.",
        },
        { title: "Clubs & Extracurricular Life", description:     "From robotics, chess, art, music, drama, dance, homework, and sports, students actively participate in clubs that nurture creativity, teamwork, discipline, and real-world skills beyond academics.",
        },
        { title: "Diversity & Belonging", description:     "Hopefield fosters a community where every child feels welcomed, respected, and valued. We celebrate cultural diversity, personal identity, and encourage empathy, mutual respect, and collaboration.",
        },
        { title: "Holistic Personal Development", description:     "Our curriculum focuses not only on academic excellence, but on character, leadership, emotional well-being, confidence, and social responsibility — shaping students to thrive in every aspect of life.",
        }
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
      <section id="admissionBanner">
        <AdmissionBanner />
      </section>

      <BackToTopButton />
    </div>
    </>
  );
}
