import { memo, useCallback, useMemo } from "react";
import type { AnyColor, ColorFeature } from "../../types.js";
import ColorEditor from "../editors/ColorEditor.js";
import type { BaseFeatureProps } from "./index.js";

type ColorProps = BaseFeatureProps<ColorFeature>;

const Color = memo((props: ColorProps) => {
    const { deviceValue, feature, onChange, minimal } = props;

    const value = useMemo(() => {
        const val = {} as AnyColor;

        for (const innerFeature of feature.features) {
            val[innerFeature.name] = deviceValue?.[innerFeature.property] ?? 0;
        }

        return val;
    }, [deviceValue, feature]);

    const onEditorChange = useCallback((color: AnyColor | { hex: string }) => onChange({ color }), [onChange]);

    return <ColorEditor onChange={onEditorChange} value={value} format={feature.name} minimal={minimal} />;
});

export default Color;
