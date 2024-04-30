import React from "react";

const MapLocation = () => {
  return (
    <div className="hidden md:flex md:w-6/12 h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.84563292635593!2d5.6129152097409!3d6.3252724873043045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d3311a2e28bf%3A0xa2e7e1cc60bf2c91!2sFrima%20Techs%20%26%20Gadgets%20Enterprises!5e0!3m2!1sen!2sng!4v1714464460365!5m2!1sen!2sng"
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapLocation;
