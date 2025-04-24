import type { LockFeature } from "../../../types.js";
import { Composite } from "../composite/Composite.js";
import type { BaseFeatureProps } from "../index.js";

type LockProps = BaseFeatureProps<LockFeature>;

export default function Lock(props: LockProps) {
    return <Composite type="lock" {...props} />;
}
