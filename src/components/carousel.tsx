import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface EmblaCarouselProps {
  slides: React.ReactNode[]; //passing components
}

export default function EmblaCarousel({ slides }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
  });
  const [isEnab, setEmb] = useState({
    isPrev: false,
    isNext: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollButtons = () => {
      setEmb({
        isPrev: emblaApi.canScrollPrev(),
        isNext: emblaApi.canScrollNext(),
      });
    };
    updateScrollButtons();

    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);

    // Cleanup on unmount
    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi]);
  //  console.log("embala api",isEnab)
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((component, index) => (
            <div
              className="flex-[0_0_50%] px-1 sm:flex-[0_0_25%] sm:px-2"
              key={index}
            >
              {component}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        disabled={!isEnab.isPrev}
        className={`w-10 h-10 grid place-content-center cursor-pointer rounded-full bg-gray-200  hover:bg-gray-300 absolute top-[35%] left-0 ${
          isEnab.isPrev ? "" : "hidden"
        }`}
      >
        <HiChevronLeft />
      </button>
      <button
        onClick={scrollNext}
        disabled={!isEnab.isNext}
        className={`w-10 h-10 grid place-content-center cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300 absolute top-[35%] right-0 ${
          isEnab.isNext ? "" : "hidden"
        }`}
      >
        <HiChevronRight />
      </button>
    </div>
  );
}
