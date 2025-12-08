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
        <p className="text-gray-900 md:text-lg leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        The children enter the Kindergarten department in the K1 class to begin the school’s curriculum. At this level the objective is to develop the children socially, emotionally, intellectually, physically, and spiritually.
        </p>
        <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
        The Kindergarten One programme concentrates on developing the following skills in preparation for the formal learning processes of reading and writing:
        </p>
        <ul className="list-disc list-inside text-gray-900 md:text-lg mb-4">
        <li>Auditory discrimination</li>
        <li>Visual discrimination</li>
        <li>Motor skills</li>
        <li>Language development</li>
        <li>Introduction to Phonics</li>
        <li>Introduction to numbers</li>
        <li>Reading</li>
        <li>Reading comprehension</li>
        <li>Reasoning</li>
        </ul>
        <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
        The programme develops and/or provides instruction in:
        </p>
        <ul className="list-decimal list-inside text-gray-900 md:text-lg mb-6">
        <li>Readiness for number work, reading and reasoning</li>
        <li>Initiative, independence</li>
        <li>Following instructions</li>
        <li>Socialization skills</li>
        </ul>
        <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
        Students matriculate from Kindergarten One to the Kindergarten Two class, which continues to focus on readiness skills for progression through Grades One to Six in a more structured environment. The subject areas of Reading, comprehension, phonics, writing, mathematics, science, and social studies are all included at this level in preparation for the Ministry’s Grade One curriculum.
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
        Children transition from the Kindergarten Department to Grade One at the age of six and ideally progress through each grade until Grade Six, at which point they graduate and move on to high school.
        </p>
        <p className="text-gray-900 md:text-lg leading-relaxed mb-4">
        Grades 1–6 follow the National Standards Curriculum, and students participate in the following national assessments:
        </p>
        <ul className="list-disc list-inside text-gray-900 md:text-lg mb-6">
        <li>Grade 1 – Readiness Test</li>
        <li>Grade 3 – Diagnostic Test</li>
        <li>Grade 4 – Performance Task</li>
        <li>Grade 5 – Performance Task</li>
        <li>Grade 6 – Abilities Test, Performance Task, and Curriculum-Based Examination</li>
        </ul>
    </div>
    </section>


      {/* Special Subjects Section */}
      <section id="specialSubjects" className="bg-[#1E792C] text-white py-12 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Special Subjects
        </h2>
        <p className="md:text-lg leading-relaxed">
          Our students benefit from a variety of special subjects to broaden their skills and creativity. These include Music, Art, Drama, Physical Education, and ICT. Small group instruction ensures each child receives attention and guidance.
        </p>
      </section>

      {/* After School Activities Section */}
      <section id="afterSchoolActivities" className="max-w-5xl mx-auto py-12 px-6 md:px-16">
        <h2
          className="text-3xl md:text-4xl font-bold text-[#1E792C] mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          After School Activities
        </h2>

        <p className="text-gray-900 md:text-lg leading-relaxed mb-6">
          For all extracurricular activities, parents are asked to collect children promptly at the end of the activity. If times and costs are not listed, please check with the activity leader.
        </p>

        {/* On-Campus Activities */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#EAC30E] mb-2">On-Campus Activities</h3>

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
              <tr className="even:bg-[#ffe6cc]">
                <td className="px-4 py-2">Smarty Pants</td>
                <td className="px-4 py-2">K1</td>
                <td className="px-4 py-2">Mrs. Harrison</td>
                <td className="px-4 py-2">Tue & Thu</td>
                <td className="px-4 py-2">$1,500/class</td>
              </tr>
              <tr className="even:bg-[#ffe6cc]">
                <td className="px-4 py-2">Artful Adventures in Reading</td>
                <td className="px-4 py-2">K1</td>
                <td className="px-4 py-2">Mrs. Harrison & Miss Harris</td>
                <td className="px-4 py-2">Monday</td>
                <td className="px-4 py-2">$20,000/term</td>
              </tr>
              <tr className="even:bg-[#ffe6cc]">
                <td className="px-4 py-2">Chess Club</td>
                <td className="px-4 py-2">K1 – Grade 6</td>
                <td className="px-4 py-2">Coach Pitterson</td>
                <td className="px-4 py-2">Tue (K1-K2 1:00-1:45pm, Grades 1-6 2:15-3:15pm)</td>
                <td className="px-4 py-2">$12,000/term</td>
              </tr>
              {/* Add the rest in same structure */}
            </tbody>
          </table>
        </div>

            {/* Off-Campus Activities */}
            <div className="mt-10 space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#EAC30E] mb-2">Off-Campus Activities</h3>
            <ul className="list-disc list-inside text-gray-900 md:text-lg">
                <li>
                <strong>Swimming:</strong> Aquaworx Swim School, 22 Hopefield Avenue, 876-291-0257, aquaworxjamaica@gmail.com
                </li>
                <li>
                <strong>Golf:</strong> Swing Solutions School of Golf, Constant Spring Golf Club, 876-469-2022
                </li>
                <li>
                <strong>Tennis:</strong> Russell Tennis Academy, Deep Dene, 36 Hopefield Avenue, 876-880-4337
                </li>
                <li>
                <strong>Football:</strong> Evon Morgan, Norbrook Football Academy, Shortwood Primary School Field, Saturdays, 876-294-9532
                </li>
                <li>
                <strong>Music:</strong> Miss Jillian Castle, Citi Music, 10 Phoenix Ave, Kingston 10, 876-359-9098, citimusic@gmail.com
                </li>
            </ul>
            </div>

            {/* On Campus Non-Hopefield */}
            <div className="mt-10 space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#EAC30E] mb-2">On-Campus Non-Hopefield Activities</h3>
            <ul className="list-disc list-inside text-gray-900 md:text-lg">
                <li>
                <strong>Ballet:</strong> Ballet Petit, Monday to Thursday, balletpetit.ja@gmail.com
                </li>
                <li>
                <strong>Indian Dance:</strong> Mudra Art Group, $18,000/term, Friday & Saturday, 876-447-8623
                </li>
            </ul>
            </div>
      </section>

      <BackToTopButton />
    </div>
  );
}
