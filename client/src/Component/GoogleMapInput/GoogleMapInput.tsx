import React, { forwardRef } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";

import usePlacesAutocomplete, {
    RequestOptions,
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
            componentRestrictions: { country: "in", },
            // types: ["cities"],
        };
        const showAirport = {
            componentRestrictions: { country: "in" },
            // types: ["airport"],
        };
        // showPlaces.types = showPlaces.types.filter((type) => type === "airport");

        return (
            <div className={dClass}>
                {label ? <label>{label}</label> : null}
                <ReactGoogleAutocomplete
                    ref={ref}
                    apiKey={"AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40"}
                    onPlaceSelected={(e) => {
                        console.log(e);
                        if (e) {
                            onChenge(e.formatted_address?.toString());
                        }
                    }}
                    options={!airport ? showPlaces : showAirport}
                    className={className || "tabinput"}
                    placeholder={placeholder}
                />
            </div>
        );
    }
);

export default React.memo(GoogleMapInput);



export const PlacesAutocomplete = ({ lbclass, tweek, className, dClass, label, value, onChenge, placeholder, airport }: {
    dClass?: string;
    className?: string;
    value?: string;
    label?: string;
    airport?: boolean;
    placeholder: string;
    tweek?: string;
    lbclass?: string;
    onChenge: (val: any) => void;
}) => {
    const showPlaces: RequestOptions = {
        componentRestrictions: { country: "in" },
        types: ['(cities)'],
    };
    const showAirport: RequestOptions = {
        componentRestrictions: { country: "in" },
        types: ["(airport)"],

    };
    const {
        ready,

        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: airport ? showAirport : showPlaces,
        defaultValue: value || "",
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e: any) => {
        console.log("val=>" + e.target.value);

        onChenge(e.target.value);
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }: { description: any }) =>
            () => {
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();
                onChenge(description);
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
                <li className="cursor-pointer text-sm p-1 px-3 hover:bg-orange-200 border-t-2 border-orange-600" key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div ref={ref} className={`${dClass} w-full relative`} >
            <label className={lbclass} >{label}</label>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                className={className || "tabinput"}
                placeholder={placeholder || ""}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul className={`absolute top-[76px] border-2 border-orange-600 border-t-0 bg-orange-100 w-full max-h-52 overflow-y-scroll overflow-x-hidden z-50 ${tweek}`} >{renderSuggestions()}</ul>}
        </div>
    );
};

export const AirportAutocomplete = ({ lbclass, tweek, className, dClass, label, value, onChenge, placeholder }: {
    dClass?: string;
    className?: string;
    value?: string;
    label?: string;
    airport?: boolean;
    placeholder: string;
    tweek?: string;
    lbclass?: string;
    onChenge: (val: any) => void;
}) => {

    const showAirport: RequestOptions = {
        componentRestrictions: { country: "in" },
        types: ["airport"],
    };
    const {
        ready,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: showAirport,
        defaultValue: value || "",
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e: any) => {
        console.log("val=>" + e.target.value);

        onChenge(e.target.value);
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }: { description: any }) =>
            () => {
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();
                onChenge(description);
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
                <li className="cursor-pointer text-sm p-1 px-3 hover:bg-orange-200 border-t-2 border-orange-600" key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div ref={ref} className={`${dClass} w-full relative`} >
            <label className={lbclass} >{label}</label>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                className={className || "tabinput"}
                placeholder={placeholder || ""}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul className={`absolute top-[76px] border-2 border-orange-600 border-t-0 bg-orange-100 w-full max-h-52 overflow-y-scroll overflow-x-hidden z-50 ${tweek}`} >{renderSuggestions()}</ul>}
        </div>
    );
};


export const LocalAutocomplete = ({ lbclass, tweek, className, dClass, label, value, onChenge, placeholder }: {
    dClass?: string;
    className?: string;
    value?: string;
    label?: string;
    airport?: boolean;
    placeholder: string;
    tweek?: string;
    lbclass?: string;
    onChenge: (val: any) => void;
}) => {
    const showPlaces: RequestOptions = {
        componentRestrictions: { country: "in" },
        region: "in",
    };

    const {
        ready,

        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: showPlaces,
        defaultValue: value || "",
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e: any) => {
        console.log("val=>" + e.target.value);

        onChenge(e.target.value);
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }: { description: any }) =>
            () => {
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();
                onChenge(description);
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
                <li className="cursor-pointer text-sm p-1 px-3 hover:bg-orange-200 border-t-2 border-orange-600" key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div ref={ref} className={`${dClass} w-full relative`} >
            <label className={lbclass} >{label}</label>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                className={className || "tabinput"}
                placeholder={placeholder || ""}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <ul className={`absolute top-[76px] border-2 border-orange-600 border-t-0 bg-orange-100 w-full max-h-52 overflow-y-scroll overflow-x-hidden z-50 ${tweek}`} >{renderSuggestions()}</ul>}
        </div>
    );
};