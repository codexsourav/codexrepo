
import React from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete"

function GoogleMapInput({ airport = false, label, onChenge, placeholder, value }: { value?: string, label: string, airport?: boolean, placeholder: string, onChenge: ((val: any) => void) },) {

    const showPlaces = { componentRestrictions: { country: "in" } };
    const showAirport = { componentRestrictions: { country: "in" }, "types": ["airport"] };

    return (
        <div>
            <label>{label}</label>
            <ReactGoogleAutocomplete
                defaultValue={value}
                apiKey={"AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40"}
                onPlaceSelected={onChenge}
                options={!airport ? showPlaces : showAirport}
                className={"tabinput"}
                placeholder={placeholder}
            />
        </div>
    )
}
export default React.memo(GoogleMapInput)