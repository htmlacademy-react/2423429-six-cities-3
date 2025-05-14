import cn from 'classnames';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';

type MapProps = {
  offers: Offer[];
  className: string;
  activeOfferId?: string;
};

const defaultMarkerIcon = new L.Icon({
  iconUrl: '../img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activeMarkerIcon = new L.Icon({
  iconUrl: '../img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ className, offers, activeOfferId }: MapProps): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const currentCity = offers[0].city;

  const { map, addMarkerToLayer, clearLayerGroup } = useMap(
    mapContainerRef,
    currentCity
  );

  useEffect(() => {
    if (map && currentCity) {
      map.setView(
        [currentCity.location.latitude, currentCity.location.longitude],
        currentCity.location.zoom
      );
    }
  }, [currentCity, map]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = L.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon:
              offer.id === activeOfferId ? activeMarkerIcon : defaultMarkerIcon,
          }
        );
        addMarkerToLayer(marker);
      });

      return () => {
        clearLayerGroup();
      };
    }
  }, [activeOfferId, map, offers, addMarkerToLayer, clearLayerGroup]);

  return <section className={cn(className, 'map')} ref={mapContainerRef} />;
}

export default Map;
