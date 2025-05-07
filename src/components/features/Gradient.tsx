import convertColors from "color-convert";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { GradientFeature, RGBColor } from "../../types.js";
import Button from "../Button.js";
import ColorEditor from "../editors/ColorEditor.js";
import type { BaseFeatureProps } from "./index.js";

const hexToRGB = (hex: string): RGBColor => {
    hex = hex.replace("#", "");
    const bigint = Number.parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
};

const rgbToHex = (rgb: RGBColor): string => {
    const { r, g, b } = rgb;
    return `#${convertColors.rgb.hex([r, g, b])}`;
};

type GradientProps = BaseFeatureProps<GradientFeature>;

export function Gradient(props: GradientProps) {
    const {
        minimal,
        onChange,
        feature: { length_min, length_max },
        deviceState,
    } = props;
    const { t } = useTranslation(["gradient", "common"]);
    const [colors, setColors] = useState<Array<RGBColor>>(length_min > 0 ? Array(length_min).fill({ r: 255, g: 255, b: 255 }) : []);

    useEffect(() => {
        const { gradient: inputGradient } = deviceState as { gradient: string[] };

        if (inputGradient && inputGradient.length > 0) {
            setColors(inputGradient.map(hexToRGB));
        }
    }, [deviceState]);

    const setColor = useCallback(
        (idx: number, hex: string) => {
            const c = [...colors];
            c[idx] = hexToRGB(hex);
            setColors(c);
        },
        [colors],
    );

    const addColor = useCallback(() => {
        const c = [...colors];
        c.push({ r: 255, g: 255, b: 255 });
        setColors(c);
    }, [colors]);

    const removeColor = useCallback(
        (idx: number) => {
            const c = [...colors];
            c.splice(idx, 1);
            setColors(c);
        },
        [colors],
    );

    const [canAdd, setCanAdd] = useState(false);
    const [canRemove, setCanRemove] = useState(false);

    useEffect(() => {
        setCanAdd(colors.length < length_max);
        setCanRemove(colors.length > length_min);
    }, [colors, length_min, length_max]);

    return (
        <div className="flex flex-col gap-2">
            {colors.map((color, idx) => (
                <div key={`${color.r}${color.g}${color.b}-${idx}`} className="flex flex-row flex-wrap gap-2 items-center">
                    <ColorEditor
                        onChange={(ch) => {
                            setColor(idx, ch.hex);
                        }}
                        value={color}
                        format="color_rgb"
                    />
                    {canRemove && (
                        <Button<void> className="btn btn-error" onClick={() => removeColor(idx)}>
                            -
                        </Button>
                    )}
                </div>
            ))}
            {canAdd && (
                <div className="flex flex-row flex-wrap gap-2">
                    <Button<void> className="btn btn-success" onClick={addColor}>
                        +
                    </Button>
                </div>
            )}
            <div>
                <Button className={`btn btn-primary ${minimal ? " btn-sm" : ""}`} onClick={() => onChange({ gradient: colors.map(rgbToHex) })}>
                    {t("common:apply")}
                </Button>
            </div>
        </div>
    );
}
