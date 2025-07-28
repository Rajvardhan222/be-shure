import React from "react";
import SearchInput from "./SearchInput";
import Button from "../shops/Button";


// type is either consumer or shop
function Hero({type}) {
  return (
    <div className={` text-center  rounded-md wrapper flex flex-col items-center justify-center gap-y-10  aspect-video  scale-90  ${type === "consumer" ? "gradient-layer-consumer" : "gradient-layer-shops"}`}>
      <div className="y-margin ">
        <h1 className="textStyleHeroHeading text-white ">
          { type=="consumer" ? "Find what you need,nearby" : "Join Be Shure and Connect with Local Shoppers"}
        </h1>
        <p className="textStyleDescription text-clr-white-off">
          {type === "consumer" ? "Be Shure connects you with local stores, making it easy to find and purchase the products you're looking for." : "Expand your reach and boost sales by listing your shop on our platform. Connect with customers in your community and beyond."}
        </p>
      </div>
      <div className="">
       { type === "consumer" ? <SearchInput /> : <button className="w-full bg-clr-orange-500 text-white textStyleBold22 py-3 px-6 rounded-lg hover:bg-clr-orange-600 transition-colors duration-200" type={type}>
            Add your shop
        </button>}
      </div>
    </div>
  );
}

export default Hero;
