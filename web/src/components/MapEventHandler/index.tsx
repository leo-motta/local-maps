import { useMapEvent } from "react-leaflet";

export default function MapEventHandler(props: any) {

    const map = useMapEvent('click', (e) => {
        props.setFormValues((prev: any) => ({...prev, coords:[e.latlng.lat,e.latlng.lng]}));
    })

    return null;
}