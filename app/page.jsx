"use client"
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";

export default function Home() {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 sm:p-6">
      <Navbar />
      <Banner />
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-5">
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
}
