import React from "react";
import SearchInput from "./SearchInput";

function Hero() {
  return (
    <div className=" text-center gradient-layer rounded-md wrapper flex flex-col items-center justify-center gap-y-10 max-w-4xl">
      <div className="y-margin ">
        <h1 className="textStyleHeroHeading text-white ">
          Find what you need,nearby
        </h1>
        <p className="textStyleDescription text-clr-white-off">
          Be Shure connects you with local stores, making it easy to find and
          purchase the products you're looking for.
        </p>
      </div>
      <div className="">
        <SearchInput />
      </div>
    </div>
  );
}

export default Hero;
