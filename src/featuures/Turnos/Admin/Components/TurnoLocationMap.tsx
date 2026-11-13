import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface TurnoLocationMapProps {
  latitude: string;
  longitude: string;
  radiusMeters: number;
  onLocationChange: (latitude: string, longitude: string) => void;
}

const DEFAULT_CENTER: [number, number] = [7.8939, -72.5028];

const markerIcon = L.divIcon({
  className: "",
  html: '<span style="display:block;width:20px;height:20px;border-radius:9999px;background:#00776f;border:3px solid #ffffff;box-shadow:0 1px 6px rgba(0,0,0,0.35)"></span>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const toPosition = (
  latitude: string,
  longitude: string,
): [number, number] | null => {
  if (!latitude.trim() || !longitude.trim()) return null;
  const lat = Number(latitude);
  const lng = Number(longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return [lat, lng];
};

const MapClickHandler = ({
  onPick,
}: {
  onPick: (latitude: number, longitude: number) => void;
}) => {
  useMapEvents({
    click: (event) => onPick(event.latlng.lat, event.latlng.lng),
  });
  return null;
};

const ViewportSync = ({ position }: { position: [number, number] | null }) => {
  const map = useMap();
  const lastPosition = useRef(position);

  useEffect(() => {
    if (!position) return;
    const previous = lastPosition.current;
    if (previous && previous[0] === position[0] && previous[1] === position[1])
      return;
    lastPosition.current = position;
    map.setView(position, map.getZoom());
  }, [map, position]);

  return null;
};

// Leaflet no observa el tamaño del contenedor: sin esto el centro se desplaza
// cuando el formulario cambia de ancho.
const MapResizeHandler = () => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);

  return null;
};

const TurnoLocationMap = ({
  latitude,
  longitude,
  radiusMeters,
  onLocationChange,
}: TurnoLocationMapProps) => {
  const position = useMemo(
    () => toPosition(latitude, longitude),
    [latitude, longitude],
  );

  const handlePick = (lat: number, lng: number) => {
    onLocationChange(lat.toFixed(6), lng.toFixed(6));
  };

  return (
    <div className="space-y-2">
      <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-300">
        Haz clic en el mapa o arrastra el marcador para fijar la ubicación de la
        sede. También puedes escribir las coordenadas.
      </p>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-gray-700">
        <MapContainer
          center={position ?? DEFAULT_CENTER}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full"
          style={{ height: 420 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onPick={handlePick} />
          <ViewportSync position={position} />
          <MapResizeHandler />
          {position ? (
            <>
              <Marker
                position={position}
                draggable
                icon={markerIcon}
                eventHandlers={{
                  dragend: (event) => {
                    const { lat, lng } = (event.target as L.Marker).getLatLng();
                    handlePick(lat, lng);
                  },
                }}
              />
              {radiusMeters > 0 ? (
                <Circle
                  center={position}
                  radius={radiusMeters}
                  interactive={false}
                  pathOptions={{
                    color: "#00776f",
                    fillColor: "#00776f",
                    fillOpacity: 0.15,
                    weight: 2,
                  }}
                />
              ) : null}
            </>
          ) : null}
        </MapContainer>
      </div>
    </div>
  );
};

export default TurnoLocationMap;
