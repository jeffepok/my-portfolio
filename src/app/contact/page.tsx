import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfoPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="border-2 border-transparent border-t-green-400 p-8 md:p-16 max-w-md md:max-w-lg w-full bg-[#15212d] text-white">
        <h2 className="text-2xl font-bold text-center mb-8">Contact Me</h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaPhone className="text-green-400" />
            <div className=" border-bottom-red">
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-sm text-gray-400">+233 (54) 847-0769</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-green-400" />
            <div>
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-sm text-gray-400">jeffepok@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-green-400" />
            <div>
              <h3 className="text-lg font-medium">Address</h3>
              <p className="text-sm text-gray-400">Ghana, Kumasi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPage;
