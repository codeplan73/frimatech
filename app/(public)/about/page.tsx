import Banner from "@/components/page-banner";
import React from "react";
import Image from "next/image";
import { GrUserExpert } from "react-icons/gr";
import { FaTools } from "react-icons/fa";
import Card from "@/components/about/AboutCard";
import ServiceCard from "@/components/about/ServiceCard";
import Service from "@/components/home/Service";

const services = [
  {
    title: "sales & accessories",
    text: "At Frima Technology, we offer computer sales and a vast range of accessories to meet all your computing needs. Our extensive collection includes the latest desktop computers, laptops...",
    image: "/img/sales.jpeg",
  },
  {
    title: "Computer Repair",
    text: "At Frima Technology, we specialize in providing exceptional computer repair services that cater to all your computer and PC needs be it hardware malfunction.",
    image: "/img/repair.jpeg",
  },
  {
    title: "Networking",
    text: "Frima Technology is a leading provider of computer repair and installation services, specializing in comprehensive networking solutions which plays a crucial role in today's world.",
    image: "/img/network.jpeg",
  },
  {
    title: "Hardware Upgrade",
    text: "Frima Technology specializes in expert hardware upgrades for computers and PCs, providing reliable and efficient solutions to enhance performance and extend the lifespan of PCs",
    image: "/img/hardware.jpeg",
  },
  {
    title: "Virus Removal",
    text: "Frima Technology specializes in comprehensive virus removal services, ensuring efficient and reliable solutions for computers and PCs.",
    image: "/img/virus.jpeg",
  },
  {
    title: "Software Installation",
    text: "Frima Technology specializes in providing comprehensive computer and PC repair services, including efficient software installation solutions..",
    image: "/img/software.jpeg",
  },
  {
    title: "Battery Replacement",
    text: "One crucial aspect of our comprehensive range of services is battery replacement which plays a vital role in powering portable devices.",
    image: "/img/battery.jpeg",
  },
  {
    title: "Date Recovery",
    text: "Frima Technology offers data recovery service, which ensures the retrieval and restoration of valuable information from damaged storage devices.",
    image: "/img/recovery.jpeg",
  },
];

const AboutPage = () => {
  return (
    <div>
      <Banner
        title="About Us"
        currentPage="About"
        link="/"
        style={{ backgroundImage: "url('/img/about.png')" }}
      />

      <section className="container flex flex-col-reverse w-full py-16 md:py-24 md:flex-row md:gap-20">
        <div className="flex flex-col w-full gap-6 p-8 md:w-6/12">
          <div className="flex items-end justify-start w-full gap-6">
            <Image
              src="/main.png"
              alt="image"
              width={1000}
              height={1000}
              className="w-12/12 md:h-[90vh]"
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-6 md:flex-row">
            <Image
              src="/repair.png"
              alt="image"
              width={1000}
              height={1000}
              className="w-full md:w-5/12 h-72"
            />
            <Image
              src="/sale.png"
              alt="image"
              width={1000}
              height={1000}
              className="w-full md:w-7/12 h-96"
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full gap-12 md:w-6/12">
          <h4 className="text-3xl font-semibold leading-snug capitalize text-start md:text-pretty md:text-5xl">
            We Offer Computer Repair & All Manner Of Technical Support...
          </h4>

          <div className="flex flex-col items-start gap-12">
            <Card
              icon={<GrUserExpert className="p-1 font-bold text-slate-200" />}
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
              icon={<FaTools className="p-1 font-bold text-slate-200" />}
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

      <div className="flex flex-col w-full md:w-12/12"></div>
      <Service />
    </div>
  );
};

export default AboutPage;
