import './image.css';

interface ImageProps {
  source: string;
  width: string;
  height: string;
  nameLazyLoad: string;
}

export default function Image({
  source,
  width,
  height,
  nameLazyLoad = '',
}: ImageProps) {
  return (
    <img
      className="image"
      src={`../../../assets/${source}`}
      width={width}
      height={height}
      alt={nameLazyLoad}
    />
  );
}
