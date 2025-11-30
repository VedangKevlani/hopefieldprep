import Navbar from "../components/Navbar";
import PdfPreview from "../components/PdfPreview";
import Extracurriculars from "../components/Extracurriculars";
import { onCampusActivities, offCampusActivities } from "../data/extracurriculars";
import { motion } from "framer-motion";

export default function Admissions() {
  return (
    <div className="w-full bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc]">
      <Navbar />

      {/* Header Section */}
      <section className="pt-48 pb-20 px-6 md:px-16 text-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-[#EAC30E] mb-6 tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Admissions
        </h1>
        <p
          className="max-w-3xl mx-auto text-gray-700 text-lg md:text-xl leading-relaxed"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          We welcome you to join the Hopefield family — where every child is
          nurtured, challenged, and inspired to become their best self.
        </p>
      </section>
      {/* Application Form Section */}
      <section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16 bg-white">
              <h2
          className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Apply for Admission
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#FF3B3B] text-white p-10 rounded-2xl shadow-xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Application Form
          </h3>
          <p className="text-lg mb-6">
            Download and complete the application form. Submit it along with
            supporting documents to the school office.
          </p>
          <a
            href="/downloads/Hopefield-Prep-Application-form.pdf"
            download
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Download Form
          </a>
        </motion.div>
      {/* PDF Preview (PUT THIS ABOVE THE RED CARDS) */}
      <div className="px-6 md:px-16 pt-10">
        <PdfPreview fileUrl="/downloads/Hopefield-Prep-Application-form.pdf" />
      </div>
      </section>
      {/* Handbook & Rules */}
      <section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16 bg-gray-50">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Handbook & Rules
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#FF3B3B] text-white p-10 rounded-2xl shadow-xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            School Handbook (Policies, Rules & Guidelines)
          </h3>
          <p className="text-lg mb-6">
            Learn more about the expectations, culture, and standards of
            Hopefield — everything you need to know as a parent or student.
          </p>
          <a
            href="/downloads/handbook-rules-revised-2024.pdf"
            download
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Download Handbook
          </a>
        </motion.div>
              {/* PDF Preview */}
      <div className="px-6 md:px-16 pt-10">
        <PdfPreview fileUrl="/downloads/handbook-rules-revised-2024.pdf" />
      </div>
      </section>
{/* School Magazine Section */}
      <section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16 bg-white">
              <h2
          className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          School Magazine - Hope on The Horizon
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#FF3B3B] text-white p-10 rounded-2xl shadow-xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            School Magazine
          </h3>
          <p className="text-lg mb-6">
Check out the school magazine/newsletter highlighting the best in our students, their pursuits, which become for all of us, our proudest moments and achievements.
          </p>
          <a
            href="/downloads/Hope-on-the-Horizon-Vol1.pdf"
            download
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Download Magazine
          </a>
        </motion.div>
      {/* PDF Preview (PUT THIS ABOVE THE RED CARDS) */}
      <div className="px-6 md:px-16 pt-10">
        <PdfPreview fileUrl="/downloads/Hope-on-the-Horizon-Vol1.pdf" />
      </div>
      </section>
{/* Uniforms */}
<section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16 bg-white">
  <h2
    className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    Uniforms
  </h2>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="max-w-5xl mx-auto bg-[#FF3B3B] text-white p-10 rounded-2xl shadow-xl"
  >
    {/* Dress Code Intro */}
    <div className="mb-8 text-center">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">Dress Code</h3>
      <p className="text-lg leading-relaxed">
        Hopefield uniforms instill pride, identity, and discipline. All students are required to adhere to the official dress code.
      </p>
    </div>
    {/* Girls Uniform */}
    <div className="mb-6">
      <h4 className="text-xl md:text-2xl font-bold mb-2 underline">GIRLS</h4>
      <ul className="list-disc list-inside text-lg leading-relaxed">
        <li>Kindergarten 1 – Grade 5: A gingham dress in pink or blue complete with brown shoes and brown socks.</li>
        <li>Grade 6: White shirts with a khaki skort. No skirts.</li>
      </ul>
    </div>
  {/* Optional Image Above the Card */}
  <div className="max-w-5xl mx-auto mb-8">
    {/* <img
      src="/images/hopefield-uniform-kindergarten.jpg" // replace with your image path
      alt="School Uniforms"
      className="w-full h-128 rounded-2xl shadow-lg object-cover"
    /> */}
  </div>
  {/* Boys Uniform */}
    <div className="mb-6">
      <h4 className="text-2xl md:text-2xl font-bold mb-2 underline">BOYS</h4>
      <ul className="list-disc list-inside text-lg leading-relaxed">
        <li>White shirts with the school emblem and khaki pants.</li>
        <li>Boys up to Grade 2 wear short pants; Grades 3-6 wear long pants. Brown shoes and brown socks.</li>
      </ul>
    </div>
  {/* Optional Image Above the Card */}
  <div className="max-w-5xl mx-auto mb-8">
    {/* <img
      src="/images/Hopefield-uniform.jpg" // replace with your image path
      alt="School Uniforms"
      className="w-full h-128 rounded-2xl shadow-lg object-cover"
    /> */}
  </div>
    {/* P.E. Uniform */}
    <div className="mb-6">
      <h4 className="text-xl md:text-2xl font-bold mb-2 underline">P.E. UNIFORM</h4>
      <ul className="list-disc list-inside text-lg leading-relaxed">
        <li>Kindergarten 1 – Grade 6 (Boys & Girls): White shorts, P.E. House shirts, white socks, and white sneakers.</li>
        <li>P.E. House shirts are obtainable from the school as soon as children have been assigned houses.</li>
        <li>Worn for Movement Class on Wednesdays and P.E. class on Fridays.</li>
      </ul>
    </div>

    {/* Suppliers */}
    <div>
      <h4 className="text-xl md:text-2xl font-bold mb-2 underline">Suppliers</h4>
      <ul className="list-disc list-inside text-lg leading-relaxed">
        <li>Club House Kids - Heather Daley-White: (876) 878-4300</li>
        <li>Althia Blagrove: (876) 788-4001 / (876) 896-2009 — Boys & Girls white shirts, girls’ gingham dresses</li>
        <li>CLING Ltd — Carol Laing: (876) 926-5841 — Boys white shirts with crest</li>
        <li>Ammars — Boys’ khaki shorts & pants, white P.E. shorts, and brown & white socks</li>
      </ul>
    </div>
  </motion.div>
</section>

{/* Academics */}
<section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16 bg-gray-50">
  <h2
    className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    Academics
  </h2>

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
  >
    {/* Kindergarten Department */}
    <div className="bg-[#FF3B3B] text-white rounded-2xl shadow-xl p-8 flex flex-col">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">Kindergarten (K1 & K2)</h3>
      <p className="text-lg mb-4">
        The children enter the Kindergarten department in the K1 class to begin the school’s curriculum.
        The objective at this level is to develop children socially, emotionally, intellectually, physically, and spiritually.
      </p>
      <h4 className="text-xl font-semibold mb-2">K1 Programme Focus:</h4>
      <ul className="list-disc list-inside mb-4 text-lg">
        <li>Auditory discrimination</li>
        <li>Visual discrimination</li>
        <li>Motor skills</li>
        <li>Language development</li>
        <li>Introduction to Phonics</li>
        <li>Introduction to numbers</li>
        <li>Reading & comprehension</li>
        <li>Reasoning</li>
      </ul>
      <p className="text-lg mb-4">
        The programme develops skills in readiness for number work, reading, reasoning, initiative, independence, following instructions, and socialization.
      </p>
      <p className="text-lg">
        Students matriculate from Kindergarten One to Kindergarten Two, which continues to focus on readiness skills for Grades One to Six.
      </p>
    </div>

    {/* Grades 1-6 */}
    <div className="bg-[#FF3B3B] text-white rounded-2xl shadow-xl p-8 flex flex-col">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">Grade 1 - Grade 6</h3>
      <p className="text-lg mb-4">
        Children transition from Kindergarten to Grade One at age six and progress through to Grade Six before moving on to high school. Grades 1–6 follow the National Standards Curriculum.
      </p>
      <h4 className="text-xl font-semibold mb-2">Subject Areas:</h4>
      <ul className="list-disc list-inside mb-4 text-lg">
        <li>Reading & comprehension</li>
        <li>Phonics & writing</li>
        <li>Mathematics</li>
        <li>Science</li>
        <li>Social Studies</li>
      </ul>
      <h4 className="text-xl font-semibold mb-2">National Assessments:</h4>
      <ul className="list-disc list-inside text-lg">
        <li>Grade 1 - Readiness Test</li>
        <li>Grade 3 - Diagnostic Test</li>
        <li>Grade 4 - Performance Task</li>
        <li>Grade 5 - Performance Task</li>
        <li>Grade 6 - Abilities Test, Performance Task, and Curriculum-Based Examination</li>
      </ul>
    </div>
  </motion.div>
</section>
<section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16 bg-gray-50">
   <Extracurriculars onCampus={onCampusActivities} offCampus={offCampusActivities} />
</section>
    </div>
  );
}
