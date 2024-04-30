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
    <section className="py-6 w-full px-6 md:px-32">
      <div className="w-full container flex flex-col py-8 items-center gap-4">
        <h1 className="font-sans font-semibold text-3xl md:text-6xl text-center">
          Our Services
        </h1>
        <p className="text-gray-500 text-justify text-md">
          Discover unparalleled tech solutions with Frima Technology. Access
          reliable, secure remote assistance from our attentive and experienced
          team. With a track record of serving over 1000 computers in Benin City
          and across Nigeria, our commitment to excellence ensures your
          satisfaction.
        </p>

        <div className="grid grid-col-1 md:grid-cols-3 gap-8 py-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              text={service.text}
            />
          ))}
        </div>

        <Link
          href="/services"
          className="text-textPrimary bg-bgPrimary px-6 py-3 rounded-xl font-sans font-semibold hover:text-white hover:bg-secondaryColor"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default Service;
