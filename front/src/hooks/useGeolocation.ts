import { useState, useEffect } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: any) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      setLocation({
        latitude: 37.56676391118459,
        longitude: 126.97778196704319,
      });
    }
  }, [navigator.geolocation.getCurrentPosition]);

  return location;
}
