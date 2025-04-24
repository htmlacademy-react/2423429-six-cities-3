import {useEffect, useState, useRef, MutableRefObject} from 'react';
import {Map, TileLayer, LayerGroup} from 'leaflet';
import {City} from '../types/offer';

const TITLE_LAYER_URL_PATTERN = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  cityInfo: City
): {
  map: Map | null;
  addLayerToGroup: (layer: LayerGroup) => void;
  clearLayerGroup: () => void;
  } => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const layerGroupRef = useRef<LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const {latitude, longitude} = cityInfo.location;
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: 13
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

      layerGroupRef.current = new LayerGroup();
      instance.addLayer(layerGroupRef.current);

      return () => {
        if (map) {
          clearLayerGroup();
          map.remove(); 
        }
      };
    }
  }, [mapRef, cityInfo]);

  const addLayerToGroup = (layer: any): void => {
    layerGroupRef.current?.addLayer(layer);
  };

  const clearLayerGroup = (): void => {
    layerGroupRef.current?.clearLayers();
  };

  return { map, addLayerToGroup, clearLayerGroup };
};

export default useMap;
