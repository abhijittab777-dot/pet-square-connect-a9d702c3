import { useEffect, useState, ReactNode } from 'react';

interface MapWrapperProps {
  children: ReactNode;
}

// This wrapper ensures the map only renders on the client side
const MapWrapper = ({ children }: MapWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-full w-full bg-muted/50 flex items-center justify-center rounded-2xl">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MapWrapper;
