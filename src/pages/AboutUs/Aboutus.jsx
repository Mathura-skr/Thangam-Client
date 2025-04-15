import React from "react";
import toolsImage from "../../assets/images/tool_img1.png";  
import fertilizerImage from "../../assets/images/fer2.png";  
import Navigation from "../../components/Navbar/Navigation";


const Aboutus = () => {
  return (
    <>
     <Navigation/>
      <div className="bg-[#F5F5F5] lg:px-36 md:py-5 px-5">
     
        <section className="flex flex-col h-screen">
        <div className="flex container mx-auto">
          <div className="mx-auto max-w-[510px] text-center lg:mb-20 pt-20">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
              About Thangam Gardening Tools and Fertilizers
            </h2>
            <p className="text-lg text-gray-600">Your go-to place for all gardening needs!</p>
          </div>
        </div>

        <div className="container mx-auto text-center mb-12">
          <p className="text-xl text-gray-700 mb-4">
            Thangam offers a wide range of high-quality gardening tools and fertilizers for both sale and rent. 
            We aim to provide top-notch products that cater to gardening enthusiasts and professionals alike.
          </p>
          <p className="text-lg text-gray-600">
            Whether you're a home gardener or running a landscaping business, we have the right products for your needs. 
            Our mission is to make gardening easier and more enjoyable for everyone.
          </p>
        </div>
        </section>

        {/* Products Section */}
        <section className="flex flex-col h-screen">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8 align-center">
          {/* Gardening Tools */}
          <button type="button" className="group relative rounded-t-3xl shadow-2xl rounded-b-xl border-2">
            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-3xl lg:aspect-none group-hover:opacity-40 lg:h-80">
              <img
                src={toolsImage}
                alt="Gardening Tools"
                className="h-full w-full object-cover object-center rounded-3xl p-4 lg:h-full lg:w-full"
              />
            </div>
            <h3 className="text-2xl p-6 font-bold text-gray-700 text-center">Gardening Tools</h3>
          </button>

          {/* Fertilizers */}
          <button type="button" className="group relative rounded-t-3xl shadow-2xl rounded-b-xl border-2">
            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-3xl lg:aspect-none group-hover:opacity-40 lg:h-80">
              <img
                src={fertilizerImage}
                alt="Fertilizers"
                className="h-full w-full object-cover object-center rounded-3xl p-4 lg:h-full lg:w-full"
              />
            </div>
            <h3 className="text-2xl p-6 font-bold text-gray-700 text-center">Fertilizers</h3>
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            Ready to start your gardening journey? Explore our range of products and get started today!
          </p>
          <a
            href="/shop"
            className="bg-[#008080] text-white px-6 py-2 rounded-full hover:bg-[#004f4f] transition duration-300"
          >
            Shop Now
          </a>
        </div>
        </section>

      </div>
    </>
  );
};

export default Aboutus;
