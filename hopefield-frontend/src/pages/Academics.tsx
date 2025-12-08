import Navbar from "../components/Navbar";
import BackToTopButton from "../components/BackToTopButton";

export default function AcademicsPage() {
  return (
    <div className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] w-full">
      <Navbar />

      {/* Page Header */}
      <section className="pt-28 py-16 px-6 md:px-16 text-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-[#EAC30E] mb-8"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Academics & Extracurriculars
        </h1>
        <p className="max-w-3xl mx-auto text-[#1E792C] md:text-xl leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Explore our academic programs, special subjects, and after-school activities that help students flourish.
        </p>
      </section>

      {/* Academics Section */}
      <section id="academics" className="max-w-5xl mx-auto py-12 px-6 md:px-16">
        <h2
          className="text-3xl md:text-4xl font-bold text-[#1E792C] mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Academics
        </h2>

{/* Kindergarten Department */}
<div className="mb-10">
  <h3
    className="text-2xl md:text-3xl font-semibold text-[#EAC30E] mb-4"
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    Kindergarten Department (K1 &amp; K2)
  </h3>

  <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
    The children enter the Kindergarten department in the K1 class to begin the
    school’s curriculum. At this level the objective is to develop the children
    socially, emotionally, intellectually, physically, and spiritually.
  </p>

  <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
    The Kindergarten One programme concentrates on developing the following
    skills in preparation for the formal learning processes of reading and writing:
  </p>

  {/* Skills Table */}
  <table className="w-full table-auto border-collapse mb-6">
    <thead>
      <tr className="bg-[#1E792C] text-white">
        <th className="px-4 py-2 text-left">Readiness Skill</th>
      </tr>
    </thead>
    <tbody className="text-gray-900">
      {[
        "Auditory discrimination",
        "Visual discrimination",
        "Motor skills",
        "Language development",
        "Introduction to Phonics",
        "Introduction to numbers",
        "Reading",
        "Reading comprehension",
        "Reasoning",
      ].map((item, i) => (
        <tr key={i} className="even:bg-[#ffe6cc]">
          <td className="px-4 py-2">{item}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
    The programme develops and/or provides instruction in:
  </p>

  {/* Programme Instruction Table */}
  <table className="w-full table-auto border-collapse mb-6">
    <thead>
      <tr className="bg-[#1E792C] text-white">
        <th className="px-4 py-2 text-left">Instructional Focus</th>
      </tr>
    </thead>
    <tbody className="text-gray-900">
      {[
        "Readiness for number work, reading and reasoning",
        "Initiative and independence",
        "Following instructions",
        "Socialization skills",
      ].map((item, i) => (
        <tr key={i} className="even:bg-[#ffe6cc]">
          <td className="px-4 py-2">{item}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
    Students matriculate from Kindergarten One to the Kindergarten Two class,
    which continues to focus on readiness skills for progression through Grades
    One to Six in a more structured environment. The subject areas of Reading,
    comprehension, phonics, writing, mathematics, science, and social studies
    are all included at this level in preparation for the Ministry’s Grade One
    curriculum.
  </p>
</div>

{/* Grades 1–6 */}
<div>
  <h3
    className="text-2xl md:text-3xl font-semibold text-[#EAC30E] mb-4"
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    Grades 1 - 6
  </h3>

  <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
    Children transition from the Kindergarten Department to Grade One at the age
    of six and ideally progress through each grade until Grade Six, at which
    point they graduate and move on to high school.
  </p>

  <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
    Grades 1–6 follow the National Standards Curriculum, and students participate
    in the following national assessments:
  </p>

  {/* National Assessments Table */}
  <table className="w-full table-auto border-collapse mb-6">
    <thead>
      <tr className="bg-[#1E792C] text-white">
        <th className="px-4 py-2 text-left">Grade</th>
        <th className="px-4 py-2 text-left">Assessment</th>
      </tr>
    </thead>
    <tbody className="text-gray-900">
      {[
        ["Grade 1", "Readiness Test"],
        ["Grade 3", "Diagnostic Test"],
        ["Grade 4", "Performance Task"],
        ["Grade 5", "Performance Task"],
        ["Grade 6", "Abilities Test, Performance Task, Curriculum-Based Examination"],
      ].map(([grade, assessment], i) => (
        <tr key={i} className="even:bg-[#ffe6cc]">
          <td className="px-4 py-2">{grade}</td>
          <td className="px-4 py-2">{assessment}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Special Subjects Table */}
      <section id="specialSubjects" className="py-12 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Special Subjects
        </h2>

        <table className="w-full table-auto border-collapse text-gray-900">
          <thead>
            <tr className="bg-[#145820] text-white">
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Grades</th>
              <th className="px-4 py-2 text-left">Instructor / Run By</th>
              <th className="px-4 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Music</td>
              <td className="px-4 py-2">K1 - Grade 6</td>
              <td className="px-4 py-2">Mrs. Jillian Castle</td>
              <td className="px-4 py-2">Group and individual lessons</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Art</td>
              <td className="px-4 py-2">K1 - Grade 6</td>
              <td className="px-4 py-2">Ms. Harris</td>
              <td className="px-4 py-2">Focus on creativity and expression</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Drama</td>
              <td className="px-4 py-2">Grades 2 - 6</td>
              <td className="px-4 py-2">Mr. Ramprashad</td>
              <td className="px-4 py-2">Weekly sessions + performances</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Physical Education</td>
              <td className="px-4 py-2">K1 - Grade 6</td>
              <td className="px-4 py-2">PE Staff</td>
              <td className="px-4 py-2">Fitness, coordination, and team sports</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">ICT</td>
              <td className="px-4 py-2">Grades 3 - 6</td>
              <td className="px-4 py-2">Miss Thompson</td>
              <td className="px-4 py-2">Computer skills, coding basics</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* After School Activities Table */}
      <section id="afterSchoolActivities" className="max-w-5xl mx-auto py-12 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E792C] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          After School Activities
        </h2>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#1E792C] text-white">
              <th className="px-4 py-2 text-left">Activity</th>
              <th className="px-4 py-2 text-left">Grades</th>
              <th className="px-4 py-2 text-left">Run By</th>
              <th className="px-4 py-2 text-left">Day/Time</th>
              <th className="px-4 py-2 text-left">Cost</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Football</td>
              <td className="px-4 py-2">K1 – Grade 6</td>
              <td className="px-4 py-2">Norbrook Football Academy</td>
              <td className="px-4 py-2">Wednesday</td>
              <td className="px-4 py-2">$10,000/term</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Tennis</td>
              <td className="px-4 py-2">K1 & K2</td>
              <td className="px-4 py-2">Russell Tennis Academy</td>
              <td className="px-4 py-2">Friday</td>
              <td className="px-4 py-2">$14,000/term</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Robotics</td>
              <td className="px-4 py-2">Grade 2 – 6</td>
              <td className="px-4 py-2">Miss Ramprashad</td>
              <td className="px-4 py-2">Thu (Grades 2-3), Fri (Grades 4-6) 2:00-3:15pm</td>
              <td className="px-4 py-2">$20,000/term</td>
            </tr>
            {/* add more rows as needed */}
          </tbody>
        </table>
      </section>

      {/* Off-Campus Activities Table */}
      <section id="offCampusActivities" className="max-w-5xl mx-auto py-12 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E792C] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Off-Campus Activities
        </h2>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#1E792C] text-white">
              <th className="px-4 py-2 text-left">Activity</th>
              <th className="px-4 py-2 text-left">Provider / Location</th>
              <th className="px-4 py-2 text-left">Contact</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Swimming</td>
              <td className="px-4 py-2">Aquaworx Swim School, 22 Hopefield Avenue</td>
              <td className="px-4 py-2">876-291-0257, aquaworxjamaica@gmail.com</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Golf</td>
              <td className="px-4 py-2">Swing Solutions School of Golf, Constant Spring Golf Club</td>
              <td className="px-4 py-2">876-469-2022</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Tennis</td>
              <td className="px-4 py-2">Russell Tennis Academy, Deep Dene, 36 Hopefield Avenue</td>
              <td className="px-4 py-2">876-880-4337</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Football</td>
              <td className="px-4 py-2">Evon Morgan, Norbrook Football Academy, Shortwood Primary School Field</td>
              <td className="px-4 py-2">Saturdays, 876-294-9532</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Music</td>
              <td className="px-4 py-2">Miss Jillian Castle, Citi Music, 10 Phoenix Ave, Kingston 10</td>
              <td className="px-4 py-2">876-359-9098, citimusic@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* On-Campus Non-Hopefield Table */}
      <section id="onCampusNonHopefield" className="max-w-5xl mx-auto py-12 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E792C] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          On-Campus Non-Hopefield Activities
        </h2>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#1E792C] text-white">
              <th className="px-4 py-2 text-left">Activity</th>
              <th className="px-4 py-2 text-left">Schedule / Details</th>
              <th className="px-4 py-2 text-left">Contact</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Ballet</td>
              <td className="px-4 py-2">Monday to Thursday</td>
              <td className="px-4 py-2">balletpetit.ja@gmail.com</td>
            </tr>
            <tr className="even:bg-[#ffe6cc]">
              <td className="px-4 py-2">Indian Dance</td>
              <td className="px-4 py-2">Friday & Saturday, $18,000/term</td>
              <td className="px-4 py-2">876-447-8623</td>
            </tr>
          </tbody>
        </table>
      </section>

      <BackToTopButton />
    </div>
  );
}
