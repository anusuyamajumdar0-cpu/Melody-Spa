import React, { useState, useEffect } from 'react';
import { RefreshCw, Image as ImageIcon } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  aspectRatio?: string; // e.g., 'aspect-square', 'aspect-video', 'aspect-[3/4]', 'aspect-[4/3]'
  noCache?: boolean;
  onClick?: () => void;
  id?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  style,
  aspectRatio = 'aspect-auto',
  noCache = false,
  onClick,
  id,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setHasFailed(false);

    let finalSrc = src;
    if (noCache) {
      const separator = src.includes('?') ? '&' : '?';
      finalSrc = `${src}${separator}nc=${Date.now()}-${retryCount}`;
    }
    setImageSrc(finalSrc);
  }, [src, noCache, retryCount]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasFailed(false);
  };

  const handleError = () => {
    setHasFailed(true);
    setIsLoaded(false);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoaded(false);
    setHasFailed(false);
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div
      id={id}
      className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 select-none ${aspectRatio} ${className}`}
      style={style}
      onClick={onClick}
    >
      {/* Loading Shimmer Placeholder */}
      {!isLoaded && !hasFailed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 animate-pulse z-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] animate-shimmer" style={{ backgroundSize: '200% 100%', animationDuration: '1.5s' }} />
          <ImageIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-600 animate-bounce" />
        </div>
      )}

      {/* Error Fallback UI */}
      {hasFailed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 p-4 text-center z-10">
          <ImageIcon className="w-8 h-8 mb-2 text-neutral-400" />
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-2">Failed to load asset</p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-semibold rounded-full border border-gold/20 transition-all cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Load
          </button>
        </div>
      )}

      {/* Actual Image Element */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}
