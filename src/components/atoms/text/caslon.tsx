import React, { type JSX } from "react";
import DOMPurify from "isomorphic-dompurify";

type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type Size =
  | "10|10"
  | "14|14"
  | "16|16"
  | "16|20"
  | "18|20"
  | "20|24"
  | "24|32"
  | "28|40"
  | "32|64"
  | "28|60|80"
  | "40|60|80"
  | "52|160"
  | "64|160";
type Style = "regular" | "italic" | "bold" | "bold-italic";

interface Props {
  text: string;
  tag?: Tag;
  size?: Size;
  style?: Style;
  className?: string;
}

export const Caslon: React.FC<Props> = ({
  text,
  tag = "p",
  size = "16|16",
  style = "regular",
  className = "text-soft-black",
}) => {
  const getSize = (): string => {
    switch (size) {
      case "10|10":
        return "text-[0.625rem]";
      case "14|14":
        return "text-[0.875rem]";
      case "16|16":
        return "text-[1rem]";
      case "16|20":
        return "text-[1rem] md:text-[1.25rem]";
      case "18|20":
        return "text-[1.125rem] md:text-[1.25rem]";
      case "20|24":
        return "text-[1.25rem] md:text-[1.5rem]";
      case "24|32":
        return "text-[1.5rem] lg:text-[2rem]";
      case "28|40":
        return "text-[1.75rem] md:text-[2.5rem]";
      case "32|64":
        return "text-[2rem] md:text-[3rem] lg:text-[4rem]";
      case "28|60|80":
        return "text-[1.75rem] md:text-[3.75rem] lg:text-[5rem]";
      case "40|60|80":
        return "text-[2.5rem] sm:text-[3.75rem] lg:text-[5rem]";
      case "52|160":
        return "text-[3.25rem] sm:text-[4.5rem] lg:text-[6rem] xl:text-[7.5rem]";
      case "64|160":
        return "text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem]";
      default:
        return "text-[1rem]";
    }
  };

  const getStyle = (): string => {
    switch (style) {
      case "regular":
        return "caslon";
      case "italic":
        return "font-normal italic";
      case "bold":
        return "font-bold";
      case "bold-italic":
        return "font-bold italic";
      default:
        return "font-normal";
    }
  };

  const sanitizedHTML = DOMPurify.sanitize(text);
  const Tag = tag as keyof JSX.IntrinsicElements;
  const fullClassName = `${getSize()} ${getStyle()} antialiased leading-[1.15] font-caslon ${className}`;

  return (
    <Tag
      className={fullClassName}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};
