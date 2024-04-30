import Banner from "@/components/page-banner";
import React from "react";
import { IoMdMail } from "react-icons/io";
import { PiPhoneCallBold } from "react-icons/pi";
import { FaMapLocation } from "react-icons/fa6";
import ContactForm from "./ContactForm";
import MapLocation from "./MapLocation";
import ContactCard from "@/components/ContactCard";

const page = () => {
  return (
    <div>
      <Banner
        title="Drop us a message"
        currentPage="Contact-Us"
        link="/"
        style={{ backgroundImage: "url('/img/contact.png')" }}
      />

      <section className="container py-10 md:py-20  md:px-20">
        <div className="flex flex-col items-center gap-12 md:gap-20">
          <h2 className="text-2xl font-semibold md:text-5xl capitalize text-center">
            We want to share our location <br /> to find us easily
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContactCard
              icon={<FaMapLocation className="" />}
              tittle="Office Address"
              text="15 Arala Street off Akenzuwa Opposite Keystone Bank,
              Airport Road, Benin City"
            />
            <ContactCard
              icon={<PiPhoneCallBold className="" />}
              tittle="Phone Number"
              text="+234-706-048-2923"
            />
            <ContactCard
              icon={<IoMdMail className="" />}
              tittle="Mail Address"
              text="info@frimatechnology.com"
            />
          </div>

          <div className="md:container flex flex-col-reverse md:flex-row gap-12 w-full items-start">
            <MapLocation />
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
