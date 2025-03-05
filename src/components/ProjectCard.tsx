import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string; // Make optional
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  gradientColors?: {
    firstColor?: string;
    secondColor?: string;
    thirdColor?: string;
  };
}

function ProjectCard({
  title,
  description,
  imageUrl,
  githubUrl,
  liveUrl,
  technologies,
  gradientColors = {
    firstColor: "18, 113, 255",
    secondColor: "221, 74, 255",
    thirdColor: "100, 220, 255",
  },
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm text-white shadow-lg w-full h-[400px] md:h-[420px] flex flex-col group hover:border-neutral-700 transition-colors">
      <div className="relative h-36 md:h-44 w-full shrink-0 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <BackgroundGradientAnimation
            containerClassName="rounded-t-lg"
            gradientBackgroundStart="rgb(17, 17, 17)"
            firstColor={gradientColors.firstColor}
            secondColor={gradientColors.secondColor}
            thirdColor={gradientColors.thirdColor}
            size="100%"
            key={`gradient-${title}-${Math.random()}`}
            className="opacity-90"
          />
        )}
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-semibold text-white line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-neutral-400 mt-2 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto pt-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
              Source Code
            </a>
          )}
          {liveUrl && liveUrl !== "#" && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <FaExternalLinkAlt size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
