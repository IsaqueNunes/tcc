import { useEffect, useState } from 'react';

type ImageProps = {
  source: string;
  width: string;
  height: string;
  nameLazyLoad: string;
};

export default function Image({
  source,
  width,
  height,
  nameLazyLoad,
}: ImageProps) {
  const [imageSource, setImageSource] = useState();

  useEffect(() => {
    const mount = async () => {
      const result = await import(`../../../assets/${source}`);
      if (result) {
        setImageSource(result.default);
      }
    };

    mount();
  }, [source]);

  return <img src={imageSource} width={width} height={height} alt={nameLazyLoad} />;
}
