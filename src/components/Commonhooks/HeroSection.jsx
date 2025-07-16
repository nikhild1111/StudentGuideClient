import React from "react";
import { useSelector } from "react-redux";
import CTAButton from "../core/HomePage/Button"

const HeroSection = ({
  title = "Your Perfect",
  highlight = "Guide",
  subtitle = "Connect with experienced seniors and guides for your academic journey",
  buttonText = "Become a Guide",
  linkIfToken = "/guideapplication",
  linkIfNotToken = "/login",
}) => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        {title} <span className="text-yellow-400">{highlight}</span>
      </h1>
      {/* <p className="text-gray-300 text-base md:text-lg">
        {subtitle}
      </p> */}

      <div className="flex justify-center mt-6">
        <CTAButton
          active={true}
          linkto={token ? linkIfToken : linkIfNotToken}
        >
          {buttonText}
        </CTAButton>
      </div>
    </div>
  );
};

export default HeroSection;




