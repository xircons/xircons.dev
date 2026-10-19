import Image from "next/image";
import PrivateCover from "@/components/PrivateCover";
import { hasCover } from "@/data/projects";

interface ProjectCoverProps {
  name: string;
  imageSrc: string;
  images?: string[];
  alt: string;
  sizes: string;
  // Scale classes keyed to the parent's group state, e.g. "lg:group-hover:scale-[1.04]".
  hoverScale: string;
}

export default function ProjectCover({ name, imageSrc, images, alt, sizes, hoverScale }: ProjectCoverProps) {
  const zoom = `transition-transform duration-[600ms] ease-out ${hoverScale}`;
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      {images ? (
        <div className="flex h-full justify-center gap-3 lg:gap-4">
          {images.map((src) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={860}
              height={1860}
              sizes="(min-width: 1024px) 15vw, 30vw"
              className={`h-full w-auto border border-border object-cover object-top ${zoom}`}
            />
          ))}
        </div>
      ) : hasCover(imageSrc) ? (
        <>
          <div className="absolute inset-0 animate-pulse bg-fg/10" />
          <Image
            src={imageSrc}
            alt={alt}
            fill
            quality={100}
            sizes={sizes}
            className={`relative z-10 object-cover object-top ${zoom}`}
          />
        </>
      ) : (
        <PrivateCover name={name} />
      )}
    </div>
  );
}
