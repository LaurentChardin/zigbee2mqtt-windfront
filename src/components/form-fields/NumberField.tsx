import { type ChangeEvent, type DetailedHTMLProps, type InputHTMLAttributes, memo, useCallback, useEffect, useState } from "react";

type NumberFieldProps = Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onSubmit" | "defaultValue" | "value" | "min" | "max"
> & {
    name: string;
    label?: string;
    detail?: string;
    min?: number;
    max?: number;
    defaultValue?: number | "";
    value?: number | "";
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (value: number | "", valid: boolean) => void;
};

const NumberField = memo((props: NumberFieldProps) => {
    const { label, detail, onChange, onSubmit, defaultValue, value, ...rest } = props;
    const [currentValue, setCurrentValue] = useState<number | "">(defaultValue || value || props.min || "");

    useEffect(() => {
        setCurrentValue(defaultValue || value || props.min || "");
    }, [defaultValue, value, props.min]);

    const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(e.target.value ? e.target.valueAsNumber : "");
            onChange?.(e);
        },
        [onChange],
    );

    const onSubmitHandler = useCallback(
        (e) => {
            onSubmit?.(currentValue, !e.target.validationMessage);
        },
        [onSubmit, currentValue],
    );

    return (
        <fieldset className="fieldset">
            {label && <legend className="fieldset-legend">{label}</legend>}
            {props.min != null && props.max != null && (
                <div className="w-full max-w-xs">
                    <input
                        className="range range-xs range-primary"
                        onChange={onChangeHandler}
                        onTouchEnd={onSubmitHandler}
                        onMouseUp={onSubmitHandler}
                        {...rest}
                        type="range"
                        value={currentValue}
                    />
                    <div className="flex justify-between px-1 mt-1 text-xs">
                        <span>|</span>
                        <span>|</span>
                    </div>
                    <div className="flex justify-between px-1 mt-1 text-xs">
                        <span>{props.min}</span>
                        <span>{props.max}</span>
                    </div>
                </div>
            )}
            <input
                className={`input${props.pattern || props.required ? " validator" : ""}`}
                onChange={onChangeHandler}
                onBlur={onSubmitHandler}
                {...rest}
                type="number"
                value={currentValue}
            />
            {detail && <p className="label whitespace-normal">{detail}</p>}
        </fieldset>
    );
});

export default NumberField;
