import React from "react";
import HeroSection from "../components/HeroSection";

const Homepage = () => {
  return (
    <div className="h-[100vh]">
      <HeroSection
        title="Model 3"
        info="Leasing starting at $349/mo"
        bgImg="bg-model3"
        buttonLeftText="Custom Order"
        buttonRightText="Demo Drive"
      />
      <HeroSection
        title="Model Y"
        bgImg="bg-modelY"
        buttonLeftText="Custom Order"
        buttonRightText="Demo Drive"
      />
      <HeroSection
        title="Model S"
        info="Schedule a Demo Drive"
        bgImg="bg-modelS"
        buttonLeftText="Custom Order"
        buttonRightText="View Inventory"
        underline="true"
      />
      <HeroSection
        title="Model X"
        info="Schedule a Demo Drive"
        bgImg="bg-modelX"
        buttonLeftText="Custom Order"
        buttonRightText="View Inventory"
        underline="true"
      />
      <HeroSection
        title="Solar Panels"
        info="Low Cost Solar Panels in America"
        bgImg="bg-solarPanels"
        buttonLeftText="Order Now"
        buttonRightText="Learn More"
      />
      <HeroSection
        title="Solar Roof"
        info="Produce Clean Energy From Your Roof"
        bgImg="bg-solarRoof"
        buttonLeftText="Order Now"
        buttonRightText="Learn More"
      />
      <HeroSection
        title="Accessories"
        bgImg="bg-accessories"
        buttonLeftText="Shop Now"
        i="7"
      />
    </div>
  );
};

export default Homepage;
