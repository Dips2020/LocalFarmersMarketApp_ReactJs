import { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { ReactTyped } from "react-typed";

const FirstContainer = () => {
  const [currentSlideImage, setCurrentSlideImage] = useState(0);
  // slide images
  const slides = [
    {
      url: "https://images.pexels.com/photos/5677794/pexels-photo-5677794.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      url: "https://images.pexels.com/photos/5677628/pexels-photo-5677628.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      url: "https://images.pexels.com/photos/5326232/pexels-photo-5326232.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      url: "https://images.pexels.com/photos/708798/pexels-photo-708798.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      url: "https://images.pexels.com/photos/6129018/pexels-photo-6129018.jpeg",
    },
  ];
  const previousSlides = () => {
    const isFirstSlide = currentSlideImage === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlideImage - 1;
    setCurrentSlideImage(newIndex);
  };
  const nextSlides = () => {
    const isLastSlide = currentSlideImage === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlideImage + 1;
    setCurrentSlideImage(newIndex);
  };
  // for dots image slides
  const goToSlide = (slideIndex) => {
    setCurrentSlideImage(slideIndex);
  };
  const handleAutoPlay = () => {
    const interval = setInterval(() => {
      const nextSlideIndex = (currentSlideImage + 1) % slides.length;
      setCurrentSlideImage(nextSlideIndex);
    }, 4000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const stopAutoPlay = handleAutoPlay();
    return () => stopAutoPlay();
  });

  return (
    <div className="w-full h-[510px] mt-[92px] flex justify-between pt-2 border-b-2 border-gray-300 mb-[4px]">
      <div className="w-[360px] h-[500px]  ml-[12px]">
        <div className="bg-[#81C408] w-[360px] h-[50px] flex justify-center items-center rounded-t-lg">
          <h1 className="text-2xl font-bold">All Local Products</h1>
        </div>
        <div className="p-4 h-[425px] flex flex-col justify-around items-center text-[25px] font-semibold border-r-[1.5px] border-l-[1.5px] border-b-[1.5px] border-gray-500 bg-[#FBF9F4] rounded-b-lg">
          <h1 className="cursor-pointer border-b-[1.5px] border-t-[1.5px] border-gray-500 w-[200px] flex justify-start gap-6 items-center text-left rounded-b-md hover:border-blue-600 rounded-t-md h-[60px]">
            <VscDebugBreakpointData /> Vegetables
          </h1>
          <h1 className="cursor-pointer border-b-[1.5px] border-t-[1.5px] border-gray-500 w-[200px] flex justify-start gap-6 items-center text-left rounded-b-md hover:border-blue-600 rounded-t-md h-[60px]">
            <VscDebugBreakpointData /> Fruits
          </h1>
          <h1 className="cursor-pointer border-b-[1.5px] border-t-[1.5px] border-gray-500 w-[200px] flex justify-start gap-6 items-center text-left rounded-b-md hover:border-blue-600 rounded-t-md h-[60px]">
            <VscDebugBreakpointData /> Dried Fruits
          </h1>
          <h1 className="cursor-pointer border-b-[1.5px] border-t-[1.5px] border-gray-500 w-[200px] flex justify-start gap-6 items-center text-left rounded-b-md hover:border-blue-600 rounded-t-md h-[60px]">
            <VscDebugBreakpointData /> Local Eggs
          </h1>
          <h1 className="cursor-pointer border-b-[1.5px] border-t-[1.5px] border-gray-500 w-[200px] flex justify-start gap-6 items-center text-left rounded-b-md hover:border-blue-600 rounded-t-md h-[60px]">
            <VscDebugBreakpointData /> Fresh Meat
          </h1>
        </div>
      </div>
      <div className="w-[800px] h-[500px] mr-2 flex flex-col justify-center items-center relative">
        <div className="absolute z-10 font-bold text-white right-[30px] bottom-[100px] border-r-4 border-white border-b-[2px] p-2 rounded-lg">
          <h1 className="text-2xl">Agronomy Emporium</h1>
          <h1 className="text-3xl">GROWING WITH LOCAL PRODUCTS</h1>
          <ReactTyped
            className="text-2xl"
            strings={[
              "Local Farmers Market",
              "Sell Local Products",
              "Buy Local Products",
              "...World Wide",
              "Eat Healthy...",
            ]}
            typeSpeed={50}
            backSpeed={60}
            loop
          />
        </div>
        {/* Images slides */}
        <div
          style={{
            backgroundImage: `url(${slides[currentSlideImage].url})`,
          }}
          className="w-[800px] h-[475px] rounded-2xl bg-center bg-cover duration-500 group relative"
        >
          {/* left arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-4xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MdKeyboardArrowLeft onClick={previousSlides} size={50} />
          </div>
          {/* right arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-4xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <MdKeyboardArrowRight onClick={nextSlides} size={50} />
          </div>
        </div>
        {/* dots */}
        <div className="flex justify-center items-center py-[2px] w-full h-[25px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`text-[16px] cursor-pointer text-[#737272dd] transition-all duration-200 transform scale-125 ${
                index === currentSlideImage
                  ? "text-[22px] text-black transition-all duration-200 transform scale-125"
                  : ""
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstContainer;
