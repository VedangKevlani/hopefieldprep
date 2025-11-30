import React from "react";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import { achievements } from "../data/schoolData";
import AchievementsSection from "../components/AchievementsSection";
import SchoolStats from "../components/SchoolStats";
import InteractiveCalendar from "../components/InteractiveCalendar";
import AdmissionBanner from "../components/AdmissionBanner";
import SchoolNewsBanner from "../components/SchoolNewsBanner";
import { motion } from "framer-motion";

const icons = ["/images/puzzle.png", "/images/book.png", "/images/drawing.png", "/images/king.png", "/images/equality.png", "/images/mic.png"];

export default function Home() {
  return (
   <div className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] w-full h-screen overflow-y-scroll scroll-snap-y snap-mandatory">
  <section className="snap-start h-screen">
    <Navbar />
    <Slideshow />
  </section>
  <section className="snap-start h-screen">
    <AchievementsSection achievements={achievements} icons={icons} />
    <InteractiveCalendar />
    <SchoolStats />
    {/* <SchoolNewsBanner /> */}
    <AdmissionBanner />
  </section>
</div>

  );
}
