import { usePlacesWidget } from "react-google-autocomplete"

function GoogleMapInput() {
    const { ref } = usePlacesWidget({
        apiKey: "",
        onPlaceSelected: (place) => console.log(place)
    })
    return (
        <input ref={ref} />
    )
}
export default GoogleMapInput