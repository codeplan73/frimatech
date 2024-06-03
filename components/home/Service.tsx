import Link from "next/link";
import React from "react";
import ServiceCard from "./services-card";

export const services = [
  {
    icon: "🛠",
    title: "Computer Repair",
    text: "Facing technical issues? Trust our expert technicians to diagnose and repair your computer swiftly and effectively, ensuring seamless performance.",
  },
  {
    icon: "🔒",
    title: "Security",
    text: "Protect your digital assets with our robust security solutions. From antivirus setup to malware removal, we've got you covered to safeguard your data.",
  },
  {
    icon: "📡",
    title: "Networking",
    text: "Enhance connectivity and streamline operations with our professional networking services. From setup to optimization, we ensure seamless communication.",
  },
  {
    title: "Sales",
    text: "Explore a wide range of cutting-edge tech products tailored to meet your needs. From laptops to peripherals, find the perfect solution for your requirements.",
    icon: "💻",
  },
  {
    title: "Onsite Support",
    text: "Experience personalized assistance right at your doorstep. Our onsite support team is dedicated to resolving your tech issues efficiently and promptly.",
    icon: "🚚",
  },
  {
    title: "Custom Solutions",
    text: "Empower your business with tailor-made tech solutions designed to optimize productivity and efficiency. Let us craft the perfect solution for your unique needs.",
    icon: "🔧",
  },
];

const Service = () => {
  return (
    <section className="w-full px-6 py-6 md:px-32">
      <div className="container flex flex-col items-center w-full gap-4 py-8">
        <h1 className="font-sans text-3xl font-semibold text-center md:text-6xl">
          Our Services
        </h1>
        <p className="text-justify text-gray-500 text-md">
          Discover unparalleled tech solutions with Frima Technology. Access
          reliable, secure remote assistance from our attentive and experienced
          team. With a track record of serving over 1000 computers in Benin City
          and across Nigeria, our commitment to excellence ensures your
          satisfaction.
        </p>

        <div className="grid gap-8 py-10 grid-col-1 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              text={service.text}
            />
          ))}
        </div>

        {/* <Link
          href="/about"
          className="px-6 py-3 font-sans font-semibold text-textPrimary bg-bgPrimary rounded-xl hover:text-white hover:bg-secondaryColor"
        >
          Learn More
        </Link> */}
      </div>
    </section>
  );
};

export default Service;
