import type { JSX } from "react";
import { useTranslation } from "react-i18next";

type DisplayValueProps = {
    name: string;
    value: unknown;
};
function BooleanValueView(props: DisplayValueProps) {
    const { value, name } = props;
    const { t } = useTranslation("values");

    switch (name) {
        case "contact": {
            return value ? t("closed") : t("open");
        }
        case "occupancy": {
            return value ? t("occupied") : t("clear");
        }
        case "water_leak": {
            return value ? <span className="text-error animate-ping">{t("leaking")}</span> : t("clear");
        }
        case "tamper": {
            return value ? <span className="text-error animate-ping">{t("tampered")}</span> : t("clear");
        }
        case "supported": {
            return value ? t("supported") : t("not_supported");
        }
        default: {
            return value ? t("true") : t("false");
        }
    }
}

export function DisplayValue(props: DisplayValueProps): JSX.Element {
    const { t } = useTranslation("values");
    const { value } = props;

    switch (typeof value) {
        case "boolean":
            return (
                <>
                    <BooleanValueView {...props} />
                </>
            );
        case "undefined":
            return <>N/A</>;
        case "object":
            return <>{value === null ? t("null") : JSON.stringify(value)}</>;
        case "string":
            return <>{value === "" ? <span className="text-xs opacity-50">{t("empty_string")}</span> : value}</>;
        default:
            return <>{JSON.stringify(value)}</>;
    }
}
