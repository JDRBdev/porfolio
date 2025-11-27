// src/components/atoms/text/Poppins.tsx
import React, { type JSX } from "react";
import DOMPurify from "isomorphic-dompurify";

type Size =
  | "14|16"
  | "16|16"
  | "16|20"
  | "16|32"
  | "20|24"
  | "24|32"
  | "32|52"
  | "32|64"
  | "40|96";

type Style = "400" | "400-italic" | "500";

type Tag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props {
  text: string;
  size?: Size;
  style?: Style;
  tag?: Tag;
  className?: string;
}

export const Poppins: React.FC<Props> = ({
  text,
  size,
  style = "400",
  tag = "p",
  className = "",
}) => {
  const getSizeClass = (): string => {
    switch (size) {
      case "14|16":
        return "text-[14px] md:text-[16px] leading-[100%] md:leading-[100%] -tracking-[0.02em]";
      case "16|16":
        return "text-[16px] leading-[150%] md:leading-[19px] -tracking-[0.02em]";
      case "16|20":
        return "text-[16px] md:text-[20px] leading-[130%] md:leading-[19px] -tracking-[0.02em]";
      case "16|32":
        return "text-[16px] md:text-[32px] leading-[130%] md:leading-[34px] -tracking-[0.02em]";
      case "20|24":
        return "text-[20px] md:text-[24px] leading-[130%] md:leading-[19px] -tracking-[0.02em]";
      case "24|32":
        return "text-[24px] md:text-[32px] leading-[130%] md:leading-[34px] -tracking-[0.02em]";
      case "32|52":
        return "text-[32px] md:text-[52px] leading-[32px] md:leading-[64px] -tracking-[0.07em]";
      case "32|64":
        return "text-[32px] md:text-[64px] leading-[32px] md:leading-[64px] -tracking-[0.07em]";
      case "40|96":
        return "text-[40px] md:text-[96px] leading-[42px] md:leading-[102px] -tracking-[0.07em]";
      default:
        return "";
    }
  };

  const getStyleClass = (): string => {
    switch (style) {
      case "400":
        return "poppins";
      default:
        return "poppins";
    }
  };

  const Tag = tag as keyof JSX.IntrinsicElements;
  const sanitizedHTML = DOMPurify.sanitize(text);
  const globalClass = `${getSizeClass()} ${getStyleClass()} ${className} antialiased`;

  return (
    <Tag
      className={globalClass}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};
