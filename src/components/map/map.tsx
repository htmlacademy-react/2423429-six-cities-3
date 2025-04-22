import cn from 'classnames';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../../types/offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';

type MapProps = {
  className: string;
  City: City;
  offers: Offer[];
  activeOfferId?: string | null;
};

const defaultMarkerIcon = new L.Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeMarkerIcon = new L.Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({
  className,
  City,
  offers,
  activeOfferId,
}: MapProps): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // Передаём два аргумента: ссылку на контейнер и информацию о городе
  const map = useMap(mapContainerRef, City);

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
