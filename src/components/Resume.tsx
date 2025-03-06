"use client";

import { Timeline } from "@/components/ui/timeline";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { useState, useMemo } from "react";

const ImageWithModal = ({
  src,
  alt,
  onImageClick,
  priority = false,
  ...props
}: {
  src: string;
  alt: string;
  onImageClick: (src: string) => void;
  priority?: boolean;
  [key: string]: unknown;
}) => (
  <Image
    src={src}
    alt={alt}
    {...props}
    priority={priority}
    loading={priority ? "eager" : "lazy"}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    quality={85}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSUuJSEkLic1MC4mKC0wPDE+Oz5KPT49QU5RS1dWW11bR0ZkZmVobWVbW1v/2wBDARUXFx4aHh4lISUuW0hbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1v/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    onClick={() => onImageClick(src)}
    className={`${props.className} cursor-pointer transition-transform hover:scale-[1.02]`}
  />
);

function Resume() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const data = useMemo(
    () => [
      {
        title: "2024",
        subtitle: "Google Developer Groups on Campus Haliç",
        content: (
          <div>
            <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
              Currently serving as a Core Team Member & Project Team Lead at Google
              Developer Groups on Campus Haliç. It&apos;s been an incredible journey
              sharing knowledge and inspiring fellow developers through speaking
              engagements at Python101 and Github101 events. Leading project teams has
              taught me the delicate balance of technical excellence and effective team
              coordination.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <ImageWithModal
                src="/gdg-1.jpeg"
                alt="GDG First Event"
                width={500}
                height={500}
                priority={true}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/gdg-2.jpg"
                alt="Devfest 2024"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/gdg-6.jpg"
                alt="Github101 Event"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/gdg-4.JPG"
                alt="Coffetalks Event"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/gdg-5.jpg"
                alt="Github101 Event"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/gdg-3.JPG"
                alt="Python101 Event"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        ),
      },
      {
        title: "2023",
        subtitle: "Wincoi | React Native Developer",
        content: (
          <div>
            <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
              Embarked on my first professional adventure as a Volunteer React Native
              Developer at Wincoi for 6 months. This experience was transformative - from
              collaborating in a professional environment to contributing to real-world
              projects. It wasn&apos;t just about coding; it was about understanding the
              entire software development lifecycle and the importance of team synergy.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithModal
                src="/wincoi-1.jpeg"
                alt="Wincoi Event"
                width={500}
                height={500}
                priority={true}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/wincoi-2.jpg"
                alt="Wincoi Event"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        ),
      },
      {
        title: "2022",
        subtitle: "Codecademy | Data Science & AI Courses",
        content: (
          <div>
            <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
              Expanded my horizons through Codecademy&apos;s comprehensive curriculum.
              Dove deep into the fascinating worlds of Data Science and Artificial
              Intelligence. This period marked a significant shift in my understanding of
              how technology can solve complex real-world problems. Each course was a
              stepping stone toward becoming a more versatile developer.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithModal
                src="/2022-1.jpeg"
                alt="Studying on Codecademy"
                width={500}
                height={500}
                priority={true}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/2022-2.jpeg"
                alt="Studying on Codecademy"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/2022-3.jpeg"
                alt="Studying on Codecademy"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/2022-4.png"
                alt="Studying on Codecademy"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        ),
      },
      {
        title: "2021",
        subtitle: "Haliç University | Software Engineering",
        content: (
          <div>
            <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
              The beginning of my software development journey. Moved to the vibrant city
              of Istanbul to pursue my education at Haliç University. This was more than
              just a change of location - it was the first chapter of my tech story. The
              university environment opened my eyes to the vast possibilities in software
              development and set the foundation for my future endeavors.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithModal
                src="/2021-1.jpeg"
                alt="Istanbul City"
                width={500}
                height={500}
                priority={true}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/2021-2.jpeg"
                alt="First Setup"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/2021-3.jpeg"
                alt="Coding with atadanicen"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
              <ImageWithModal
                src="/2021-4.jpeg"
                alt="Halic University Welcoming"
                width={500}
                height={500}
                loading="lazy"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div id="resume" className="w-full">
      <Timeline data={data} />
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Enlarged view"
            width={1000}
            height={1000}
            className="rounded-lg max-h-[85vh] w-auto object-contain"
          />
        )}
      </Modal>
    </div>
  );
}

export default Resume;
