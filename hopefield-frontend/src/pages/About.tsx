import Navbar from "../components/Navbar";
import StaffSection from "../components/StaffSection";
import ImageGallery from "../components/ImageGallery";
import BackToTopButton from "../components/BackToTopButton";
export default function About() {
  return (
    <div className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] w-full">
      <Navbar />

      {/* History Section */}
      <section id="history" className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] pt-48 py-20 px-6 md:px-16 space-y-8">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-[#EAC30E] mb-10 text-center tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >


        </h2>
        <p
          className="max-w-4xl mx-auto text-white md:text-lg leading-relaxed text-center bg-[#1E792C] p-8 rounded-2xl shadow-lg"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
        <h2
          className="text-3xl md:text-5xl font-extrabold text-[#EAC30E] mb-10 text-center tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Our History
        </h2>
          Hopefield Preparatory School was founded in 1959. It is one of the oldest private preparatory schools in the island and is situated on approximately half an acre property in the Liguanea Plain.<br /><br />
          The school motto is <span className="font-semibold">“Hope Begins with Us”</span> and the school colours are green and gold. Hopefield Prep. is a member of the Jamaica Independent Schools association and is registered with the Ministry of Education. There is an active Parent Teachers Association whose main role is fundraising and communication between school and home.<br /><br />
          The enrollment does not exceed 200 children and classes are composed of approximately 25 children. Kindergarten 1 through Grade 2 has a teacher and an assistant teacher, while Grades 3 to 6 have one main teacher. At Hopefield there is only one class in each grade.<br /><br />
          The school follows the curriculum of the Ministry of Education, integrated with our own curriculum, thereby providing the students with a solid foundation for lifelong learning.
        </p>
      </section>
     <div id="historyImage" className="pt-32 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] max-w-3xl mx-auto mb-12">
          <img
            src="/images/Hopefield.jpg" // replace with your actual image path
            alt="Hopefield School"
            className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] w-full h-auto rounded-2xl shadow-lg object-cover"
          />
      </div>
      {/* Mission & Vision Section */}
      <section id="missionVision" className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-[#EAC30E] mb-10 text-center tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Mission & Vision
        </h2>
        <div
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-gray-900"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          <div className="bg-[#1E792C] p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#EAC30E] mb-4">Mission</h3>
            <p className="md:text-3x1 leading-relaxed text-white">
              Our mission at Hopefield Prep. School is to cultivate a vibrant learning community where every child is inspired to reach their fullest potential. Through fostering a nurturing and inclusive environment, we strive to ignite a lifelong love for learning while equipping students with the knowledge, skills, and values to thrive academically, socially, and emotionally.
            </p>
          </div>
          <div className="bg-[#1E792C] p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#EAC30E] mb-4">Vision</h3>
            <p className="md:text-3x1 leading-relaxed text-white">
              Our vision at Hopefield Prep. is to create an engaging and inclusive learning environment where every child feels valued, empowered, and inspired to excel. We envision a place where curiosity is cultivated, creativity is celebrated, and diversity is embraced. Through collaborative partnerships with families and the community, we strive to provide innovative educational experiences that nurture the whole child academically, socially, and emotionally.
            </p>
          </div>
        </div>
      </section>

      { /* Image Gallery */}
      <ImageGallery />

      {/* Staff Section */}
      <StaffSection/>

      <BackToTopButton />
    </div>
  );
}
