// src/components/AdmissionBanner.tsx
import { motion } from "framer-motion";

export default function AdmissionBanner() {
  return (
    <section id="admissionbanner" className="py-16 bg-[#1E792C] text-white mt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 text-center"
      >
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Ready to Start Your Hopefield Journey?
        </h2>

        <p className="text-lg md:text-xl text-[#FFF6D4] mx-auto max-w-3xl leading-relaxed">
          Join a nurturing learning environment where children learn, grow, and excel.  
          Discover what makes Hopefield Preparatory a leading choice in holistic education.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="/admissions"
            className="bg-white text-[#FF3B3B] px-10 py-4 rounded-full font-bold shadow-xl border-4 border-white 
                       hover:bg-[#1E792C] hover:text-white transition-all duration-300"
          >
            Apply for Admission
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="/downloads/Hope-on-the-Horizon-Vol1.pdf" download
            className="bg-transparent border-4 border-white px-10 py-4 rounded-full font-bold shadow-xl
                       hover:bg-white hover:text-[#FF3B3B] transition-all duration-300"
          >
            View School Magazine
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
