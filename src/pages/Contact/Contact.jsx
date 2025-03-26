import React from "react";
import contactImage from "../../assets/images/logo1.png"; // Replace with the actual contact image

const Contact = () => {
  return (
    <>
      <div className="bg-[#F5F5F5] lg:px-36 md:py-5 px-5">
        <div className="container mx-auto">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20 pt-20">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600">We'd love to hear from you!</p>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="container mx-auto text-center mb-12">
          <p className="text-xl text-gray-700 mb-4">
            Have any questions or need assistance? Reach out to us via the form or the contact information below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-800">Our Contact Details</h3>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Email:</strong> thangamtools@gmail.com
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Phone:</strong> +94 770 427 773
              </p>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Address:</strong> No:23, Dockyard Road, Trincomalee
              </p>
            </div>
            {/* Contact Form */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-800">Send Us a Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                />
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-2 rounded-md border border-gray-300"
                  rows="4"
                />
                <button
                  type="submit"
                  className="bg-[#008080] text-white px-6 py-2 rounded-full hover:bg-[#004f4f] transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Image Section */}
        <div className="container mx-auto text-center mb-12">
          <img
            src={contactImage}
            alt="Contact Us"
            className="w-full object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            We’re here to help! Feel free to get in touch with any inquiries you may have.
          </p>
          <a
            href="/shop"
            className="bg-[#008080] text-white px-6 py-2 rounded-full hover:bg-[#004f4f] transition duration-300"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;
