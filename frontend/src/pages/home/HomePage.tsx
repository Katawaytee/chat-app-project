import { useEffect } from "react";
import phonePNG from "../../res/img/phone.png"

function HomePage() {
  
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="unpadding-page">
      <div className="flex w-full h-[calc(100vh-7rem)] bg-emerald-50">
        <div className="flex flex-col w-full md:w-[50%] h-full justify-center items-center gap-5">
          <span className="font-bold text-3xl">Let's Chat !!! </span>
          <span className="font-semibold text-2xl">
            You should try other apps
          </span>
        </div>
        <div className="hidden md:flex flex-col w-[50%] h-full justify-center items-center gap-5">
          <img src={phonePNG} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
