import cn from 'classnames';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';

type MapProps = {
  className: string;
  offers: Offer[];
  activeOfferId?: string;
};

const defaultMarkerIcon = new L.Icon({
  iconUrl: '../img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const activeMarkerIcon = new L.Icon({
  iconUrl: '../img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

function Map({ className, offers, activeOfferId }: MapProps): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const city = offers[0].city;
  const map = useMap(mapContainerRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        L.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon:
              offer.id === activeOfferId ? activeMarkerIcon : defaultMarkerIcon,
          }
        ).addTo(map);
      });
    }
  }, [activeOfferId, map, offers]);

  return <section className={cn(className, 'map')} ref={mapContainerRef} />;
}

export default Map;
