import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const loadMapScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        script.onload = initializeMap;
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      const jodTechLocation = { lat: 9.919524, lng: 78.134193 }; // Replace with correct coords
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: jodTechLocation,
        zoom: 17,
      });

      // Red marker with label
      new window.google.maps.Marker({
        position: jodTechLocation,
        map,
        title: "JodTech IT Solutions",
        label: {
          text: "JodTech IT Solutions",
          color: "white",
          fontWeight: "bold",
        },
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
      });
    };

    loadMapScript();
  }, []);

  return (
    <div className="w-full h-64 md:h-96 rounded-xl shadow-lg overflow-hidden" id="map"></div>
  );
};

export default Map;