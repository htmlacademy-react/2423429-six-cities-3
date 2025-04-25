import {useEffect, useState, useRef, MutableRefObject, useCallback, useMemo} from 'react';
import {Map, TileLayer, LayerGroup, Marker} from 'leaflet';
import {City} from '../types/offer';

const TITLE_LAYER_URL_PATTERN = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const CURRENT_ZOOM = 13;

const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  cityInfo: City
): {
  map: Map | null;
  addMarkerToLayer: (marker: Marker) => void;
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
        zoom: CURRENT_ZOOM
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
    }
  }, [mapRef, cityInfo]);

  const addMarkerToLayer = useCallback((marker: Marker) => {
    if (layerGroupRef.current) {
      marker.addTo(layerGroupRef.current);
    }
  }, []);

  const clearLayerGroup = useCallback(() => {
    layerGroupRef.current?.clearLayers();
  }, []);

  const values = useMemo(() => ({
    map,
    addMarkerToLayer,
    clearLayerGroup
  }), [map, addMarkerToLayer, clearLayerGroup]);

  return values;
};

export default useMap;
