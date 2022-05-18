import { Dropdown, DropdownProps } from "primereact/dropdown";
import { InputText, InputTextProps } from "primereact/inputtext";
import { MultiSelect, MultiSelectProps } from "primereact/multiselect";
import React from "react";
import { useControlContext } from "rectangular-forms";

export const WInputText = (custom: InputTextProps) => {
    const { validationErrors, control } = useControlContext();
    const { value, disabled, onChange, onBlur } = control;
    return (
        //     <InputTextReactPrime
        //     disabled={disabled}
        //     width={custom.width}
        //     height={custom.height}
        //     fontSize={custom.fontSize}
        //   >
        <InputText
            value={value || ""}
            disabled={disabled}
            className={
                validationErrors
                    ? "p-invalid input-text-react-prime"
                    : "input-text-react-prime"
            }
            onChange={onChange}
            onBlur={onBlur}
            placeholder={`${custom.placeholder ? custom.placeholder : "Placeholder"
                }`}
            {...custom}
        />
        // </InputTextReactPrime>
    );
};
export const WDropdown = (props: DropdownProps) => {
    const { validationErrors, control } = useControlContext();
    const { value, disabled, onChange, onBlur, load } = control;
    const data = load.data;
    return (
        <Dropdown
            value={value || ""}
            disabled={disabled}
            className={
                validationErrors
                    ? "p-invalid dropdown-react-prime"
                    : "dropdown-react-prime"
            }
            onChange={onChange}
            onBlur={onBlur}
            {...props}
            options={data || props.options}
        />
    );
};
export const WMultiSelect = (props: MultiSelectProps) => {
    const { validationErrors, control } = useControlContext();
    const { value, disabled, onChange, onBlur } = control;
    return (
        // <MultiSelectReactPrime
        //     disabled={disabled}
        //     width={props.width}
        //     height={props.height}
        //     fontSize={props.fontSize}
        // >
        <div className="multiselect-icon-chip">
            <MultiSelect
                value={value || ""}
                disabled={disabled}
                className={
                    validationErrors
                        ? "p-invalid multiselect-react-prime"
                        : "multiselect-react-prime"
                }
                onChange={onChange}
                onBlur={onBlur}
                filter={true}
                display="chip"
                {...props}
            />
        </div>
        // </MultiSelectReactPrime>
    );
};
