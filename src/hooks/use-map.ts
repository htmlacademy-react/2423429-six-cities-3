import {useEffect, useState, useRef, MutableRefObject} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../types/offer';
import { TILE_LAYER_ATTRIBUTION, TITLE_LAYER_URL_PATTERN } from '../const';

const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  cityInfo: City
): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const {latitude, longitude, zoom} = cityInfo.location;
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom,
      });

      const layer = new TileLayer(
        TITLE_LAYER_URL_PATTERN,
        {
          attribution: TILE_LAYER_ATTRIBUTION,
        },
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    } else {
      const {latitude, longitude, zoom} = cityInfo.location;
      map?.flyTo(
        {
          lat: latitude,
          lng: longitude,
        },
        zoom
      );
    }
  }, [mapRef, map, cityInfo]);

  return map;
};

export default useMap;