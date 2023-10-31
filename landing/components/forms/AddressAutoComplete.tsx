import React, { useState, useCallback } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface LocationSearchInputProps {
  onAddressSelect: (address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
  placeholder: string;
  address: string;
  setAddress: (address: string) => void;
}

function LocationSearchInput({
  onAddressSelect,
  placeholder,
  address,
  setAddress,
}: LocationSearchInputProps): JSX.Element {
  const handleChange = useCallback((address: string) => {
    setAddress(address);
  }, []);

  const handleSelect = useCallback(
    (address: string) => {
      geocodeByAddress(address)
        .then((results) => {
          const addressComponents = results[0].address_components;
          const streetAddress = `${addressComponents[0].long_name} ${addressComponents[1].long_name}`;
          // @ts-ignore
          const city = addressComponents?.find((component) =>
            component.types.includes("locality")
          ).long_name;
          // @ts-ignore
          const state = addressComponents?.find((component) =>
            component.types.includes("administrative_area_level_1")
          ).long_name;
          // @ts-ignore
          const zipCode = addressComponents?.find((component) =>
            component.types.includes("postal_code")
          ).long_name;
          const selectedAddress = { streetAddress, city, state, zipCode };
          if (onAddressSelect) {
            onAddressSelect(selectedAddress);
          }
          return getLatLng(results[0]);
        })
        .then((latLng) => console.log("Success", latLng))
        .catch((error) => console.error("Error", error));
    },
    [onAddressSelect]
  );

  const renderSuggestions = useCallback(
    ({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
      <div className="w-full relative">
        <input
          required
          {...getInputProps({
            placeholder,
            className:
              "location-search-input text-body-color placeholder:text-body-color/50 focus:border-primary w-full rounded border border-[#EBEBEB] bg-white py-3 px-[14px] text-base leading-relaxed outline-none focus-visible:shadow-none md:py-4 md:px-[18px]",
          })}
        />
        <div className="autocomplete-dropdown-container bg-white absolute shadow-card rounded top-[62px] z-50 [&>*]:p-2">
          {loading && <div className="text-body-color">Loading...</div>}
          {suggestions.map((suggestion: any) => {
            const className = suggestion.active
              ? "suggestion-item--active text-body-color"
              : "suggestion-item text-body-color";
            // inline style for demonstration purpose
            const style = suggestion.active
              ? { backgroundColor: "#fafafa", cursor: "pointer" }
              : { backgroundColor: "#ffffff", cursor: "pointer" };
            return (
              <div
                key={suggestion.description}
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style,
                })}
              >
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    ),
    []
  );

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {renderSuggestions}
    </PlacesAutocomplete>
  );
}

export default LocationSearchInput;

// className: 'location-search-input text-body-color focus:border-primary w-full rounded border border-[#EBEBEB] bg-white py-3 px-[14px] text-base leading-relaxed outline-none focus-visible:shadow-none md:py-4 md:px-[18px]',
