import type { CompositeFeature, GenericFeature } from "../../types.js";
import type { BaseFeatureProps } from "./index.js";

export default function NoAccessError(props: BaseFeatureProps<GenericFeature | CompositeFeature>) {
    return (
        <div className="alert alert-warning" role="alert">
            Unknown access <pre>{props.feature.access}</pre>
        </div>
    );
}
