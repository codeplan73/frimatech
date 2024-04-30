import Banner from "@/components/page-banner";
import React from "react";
import Image from "next/image";
import Service from "@/components/home/Service";
import { GrUserExpert } from "react-icons/gr";
import { FaTools } from "react-icons/fa";
import Card from "@/components/about/AboutCard";

const AboutPage = () => {
  return (
    <div>
      <Banner
        title="About Us"
        currentPage="About"
        link="/"
        style={{ backgroundImage: "url('/img/about.png')" }}
      />

      <section className="container w-full py-16 md:py-32 flex flex-col-reverse md:flex-row md:gap-20">
        <div className="w-full md:w-6/12 flex flex-col gap-6 p-8">
          <div className="w-full flex items-end justify-start gap-6">
            <Image
              src="/img/about-1.jpg"
              alt="image"
              width={1000}
              height={1000}
              className="w-12/12 h-80"
            />
          </div>
          <div className="w-full flex items-start justify-start gap-6">
            <Image
              src="/img/about-2.jpg"
              alt="image"
              width={1000}
              height={1000}
              className="w-5/12 h-72"
            />
            <Image
              src="/img/frima-about.jpeg"
              alt="image"
              width={1000}
              height={1000}
              className="w-7/12 h-96"
            />
          </div>
        </div>

        <div className="w-full md:w-6/12 flex flex-col items-start justify-start gap-12">
          <h4 className="text-start md:text-pretty text-3xl md:text-5xl font-semibold leading-snug capitalize">
            We Offer Computer Repair & All Manner Of Technical Support...
          </h4>

          <div className="flex flex-col items-start gap-12">
            <Card
              icon={<GrUserExpert className="text-slate-200 p-1 font-bold" />}
              title=" Qualified & Expert Professionals"
              text=" At Frima Technology, our mission is to provide top-quality PC and
             laptop repair services that exceed customer expectations. We are
            committed to delivering prompt, reliable, and cost-effective
            solutions while maintaining the highest standards of professionalism
            and customer satisfaction.  Our team of skilled technicians is dedicated to diagnosing and
            resolving issues efficiently, ensuring that our clients devices are
            restored to optimal functionality. We strive to stay at the
            forefront of technological advancements, continuously expanding our
            knowledge and expertise to deliver innovative repair solutions."
            />

            <Card
              icon={<FaTools className="text-slate-200 p-1 font-bold" />}
              title="Modern Tools & Technology Use"
              text="  With a focus on transparent communication, integrity, and
            personalized service, we aim to build long-term relationships with
            our customers and be their trusted go-to partner for all their PC
            and laptop repair needs.  In todays technology-driven world, encountering computer issues can
            be a frustrating and time-consuming experience. That is where our
            Frima Technology comes in. We take pride in offering comprehensive
            computer repair and all manner of technical support services to
            individuals and businesses alike. Whether you are facing hardware
            malfunctions, software glitches, or network connectivity problems,
            we are here to help"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-100 mx-auto px-10 md:px-36 py-10 md:py-16">
        <div className="flex items-center justify">
          <h4>What we offer</h4>
          <p>
            {`Customer's`} satisfaction is our ultimate goal. Our specialist
            techies will diagnose and resolve your computer issues.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
