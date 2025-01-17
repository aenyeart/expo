import { useTheme } from '@expo/styleguide';

import { DotGrid } from './DotGrid';

type Props = {
  source: string;
  alt: string;
  darkSource?: string;
};

export const Diagram = ({ source, darkSource, alt }: Props) => {
  const { themeName } = useTheme();
  const isDark = themeName === 'dark';

  if (!source.match(/\.png$/)) {
    return (
      <div className="bg-default border relative border-default rounded-md overflow-hidden my-6 max-w-[750px] m-auto">
        <DotGrid />
        <picture className="relative">
          {isDark && darkSource && <source srcSet={darkSource} />}
          <img src={source} alt={alt} />
        </picture>
      </div>
    );
  }

  return (
    <div className="bg-default border relative border-default rounded-md overflow-hidden my-6 max-w-[750px] m-auto">
      <DotGrid />
      <picture className="relative">
        {!isDark && <source srcSet={source.replace('.png', '.avif')} type="image/avif" />}
        {darkSource && isDark && (
          <source srcSet={darkSource.replace('.png', '.avif')} type="image/avif" />
        )}
        {!isDark && <source srcSet={source.replace('.png', '.webp')} type="image/webp" />}
        {darkSource && isDark && (
          <source srcSet={darkSource.replace('.png', '.webp')} type="image/webp" />
        )}
        {darkSource && isDark && <source srcSet={darkSource} />}
        <img src={source} alt={alt} />
      </picture>
    </div>
  );
};
