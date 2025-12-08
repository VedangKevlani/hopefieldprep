// src/components/UniformsSection.tsx
export default function UniformsSection() {
  return (
    <section
      id="uniforms"
      className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16"
    >
      <h2
        className="text-3xl md:text-5xl font-extrabold text-[#EAC30E] mb-12 text-center tracking-wide"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        School Uniforms
      </h2>

      {/* School Uniforms */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mb-16">
        {/* Girls Uniform */}
        <div className="bg-[#1E792C] text-white p-6 rounded-2xl shadow-lg">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Girls
          </h3>
          <p className="leading-relaxed mb-3">
            <strong>Kindergarten 1 – Grade 5:</strong> A gingham dress in pink or blue, complete with brown shoes and brown socks.
          </p>
          <p className="leading-relaxed mb-3">
            <strong>Grade 6:</strong> White shirts with a khaki skort. No skirts.
          </p>
        </div>

        {/* Boys Uniform */}
        <div className="bg-[#1E792C] text-white p-6 rounded-2xl shadow-lg">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Boys
          </h3>
          <p className="leading-relaxed mb-3">
            White shirts with the school emblem and khaki pants.  
            Boys up to Grade 2 wear short pants; Grades 3-6 wear long pants.  
            Brown shoes and brown socks.
          </p>
        </div>
      </div>

      {/* P.E. Uniform */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-[#1E792C] text-white p-6 rounded-2xl shadow-lg">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            P.E. Uniform
          </h3>
          <p className="leading-relaxed mb-3">
            Kindergarten 1 – Grade 6 (Boys and Girls): White shorts, P.E. House shirts, white socks, and white sneakers.
          </p>
          <p className="leading-relaxed mb-3">
            P.E. House shirts are obtainable from the school after students are placed in houses.  
            P.E. Uniforms are worn for Movement Class on Wednesdays and P.E. Class on Fridays.
          </p>
        </div>
      </div>

      {/* Where to Buy */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#1E792C] text-white p-6 rounded-2xl shadow-lg">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Where to Purchase
          </h3>
          <ul className="list-disc list-inside leading-relaxed space-y-2">
            <li>Club House Kids - Heather Daley-White: (876) 878-4300</li>
            <li>Althia Blagrove: (876) 788-4001 or (876) 896-2009 for boys' & girls' white shirts and girls’ gingham dresses</li>
            <li>CLING Ltd—Carol Laing: (876) 926-5841 for boys’ white shirts with crest</li>
            <li>Ammars: Boys’ khaki shorts & pants, white P.E. shorts, and brown & white socks</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
