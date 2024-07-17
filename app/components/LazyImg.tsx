import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Skeleton } from "./ui/skeleton";

export default function ImageWithPlaceholder({
  src,
  placeholderSrc,
  onLoad,
  ...props
}: {
  onLoad?: () => void;
  placeholderSrc?: string;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  const shouldShowSection = useImageLoaded(src || "");
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  // Store the onLoad prop in a ref to stop new Image() from re-running
  const onLoadRef = useRef(onLoad);

  useEffect(() => {
    onLoadRef.current = onLoad;
  }, [onLoad]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgSrc(src);
      if (onLoadRef.current) {
        onLoadRef.current();
      }
    };
    img.src = src || "";
  }, [src]);

  if (!shouldShowSection) return <Skeleton className={props.className} />;

  return <img src={imgSrc} alt={props.alt} {...props} />;
}

export function useImageLoaded(src: string) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = function () {
      setLoaded(true);
    };
  }, [src]);
  return loaded;
}
