import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaMapLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailUnread } from "react-icons/io5";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";

const socials = [
  { name: "Instagram", icon: <FaInstagram />, link: "https://instagram.com" },
  { name: "Twitter", icon: <FaXTwitter />, link: "https://twitter.com" },
  { name: "Facebook", icon: <FaFacebook />, link: "https://facebook.com" },
  { name: "Youtube", icon: <FaYoutube />, link: "https://youtube.com" },
  { name: "Linkedin", icon: <FaLinkedin />, link: "https://linkedin.com" },
];

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="flex flex-col p-4 container px-12 md:px-32 gap-8 py-20">
      <div className="flex flex-col md:flex-row items-start gap-12">
        <div className="flex flex-col space-y-2">
          <h4 className="text-xl font-semibold text-slate-600">Get In Touch</h4>
          {/* <Image
            alt="logo"
            className="h-24 w-36"
            src={"/img/frima-logo.png"}
            width={1000}
            height={1000}
          /> */}
          <p className="text-md text-bgPrimary flex space-x-2 justify-start items-center">
            <FaMapLocationDot className="text-2xl text-bgPrimary" />
            <span>
              15 Arala Street off Akenzuwa Opposite Keystone Bank,
              <br /> Airport Road, Benin City
            </span>
          </p>
          <p className="text-md text-bgPrimary flex space-x-2 justify-start items-center">
            <FiPhoneCall className="text-2xl text-bgPrimary" />
            <span>+234-706-048-2923</span>
          </p>
          <p className="text-md text-bgPrimary flex space-x-2 justify-start items-center">
            <IoMailUnread className="text-2xl text-bgPrimary" />
            <span>info@frimatechnology.com</span>
          </p>
        </div>

        <div className="flex items-start justify-start space-x-6">
          <div className="flex flex-col space-y-2">
            <h4 className="text-xl font-semibold text-slate-600">About</h4>
            <Link className="text-md text-slate-400" href="/blog">
              Blog
            </Link>
            <Link className="text-md text-slate-400" href="/blog">
              Meet the team
            </Link>
            <Link className="text-md text-slate-400" href="/blog">
              Shop
            </Link>
          </div>
          <div className="flex flex-col space-y-2 ">
            <h4 className="text-xl font-semibold text-slate-600">Support</h4>
            <Link className="text-md text-slate-400" href="/blog">
              Contact Us
            </Link>
            <Link className="text-md text-slate-400" href="/">
              Return
            </Link>
            <Link className="text-md text-slate-400" href="/blog">
              FAQ
            </Link>
            <Link className="text-md text-slate-400" href="/blog">
              Terms
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <h4 className="text-xl font-semibold text-slate-600 mb-4">
            Social Handle
          </h4>

          <div className="flex items-start space-x-6 w-full">
            {socials.map((social, index) => (
              <Link key={index} href={social.link}>
                <div className="flex items-center gap-2 text-4xl  text-bgPrimary">
                  {social.icon}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <hr className="" />

      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-4 ">
        <p className="text-sm text-slate-500 text-center">
          Copyright &copy; 2022 - {date}. All rights reserved. Powered by{" "}
          <Link
            target="_blank"
            className="font-bold text-bgPrimary"
            href={"https://globeraven.vercel.app/"}
          >
            Globe-Raven
          </Link>
        </p>
        <div className="space-x-8 text-sm font-semibold text-slate-500">
          <Link className="hover:text-bgPrimary" href="/terms">
            Terms of Service
          </Link>
          <Link className="hover:text-bgPrimary" href="/policy" target="blank">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
