import React, { forwardRef } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


const GoogleMapInput = forwardRef(
    (
        {
            airport = false,
            label,
            onChenge,
            placeholder,
            // value,
            className,
            dClass,
        }: {
            dClass?: string;
            className?: string;
            value?: string;
            label?: string;
            airport?: boolean;
            placeholder: string;
            onChenge: (val: any) => void;
        },
        ref: React.Ref<any>
    ) => {
        const showPlaces = {
            componentRestrictions: { country: "in" },
            types: ["establishment"],
        };
        const showAirport = {
            componentRestrictions: { country: "in" },
            types: ["airport"],
        };
        showPlaces.types = showPlaces.types.filter((type) => type === "airport");

        return (
            <div className={dClass}>
                {label ? <label>{label}</label> : null}
                <ReactGoogleAutocomplete
                    ref={ref}
                    apiKey={"AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40"}
                    onPlaceSelected={onChenge}
                    options={!airport ? showPlaces : showAirport}
                    className={className || "tabinput"}
                    placeholder={placeholder}
                />
            </div>
        );
    }
);

export default React.memo(GoogleMapInput);



export const PlacesAutocomplete = ({ className, dClass, label, }: {
    dClass?: string;
    className?: string;
    value?: string;
    label?: string;
    airport?: boolean;
    placeholder: string;
    onChenge: (val: any) => void;
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: "YOUR_CALLBACK_NAME",
        requestOptions: {
            componentRestrictions: { country: "in" },
            types: ["establishment"],
            language: "EN",

        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e: any) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }: { description: any }) =>
            () => {
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log("📍 Coordinates: ", { lat, lng });
                });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li className="cursor-pointer text-sm p-1 px-3 hover:bg-orange-300" key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div ref={ref} className={`${dClass} w-full relative`} >
            <label >{label}</label>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                className={className || "tabinput"}
                placeholder="Where are you going?"
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul className="absolute top-[75px] border-2 border-orange-600 bg-orange-100 w-full h-52 overflow-scroll" >{renderSuggestions()}</ul>}
        </div>
    );
};