import { BsChevronDown } from "react-icons/bs";

export const ScrollArrow = () => {
  const scrollToResume = () => {
    const resumeSection = document.getElementById("resume");
    resumeSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToResume}
      className="absolute bottom-8 animate-bounce hover:text-white"
    >
      <BsChevronDown className="text-neutral-400 w-6 h-6 transition-colors duration-300" />
    </button>
  );
};
