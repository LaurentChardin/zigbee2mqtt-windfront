import {
    faBatteryEmpty,
    faBatteryFull,
    faBatteryHalf,
    faBatteryQuarter,
    faBatteryThreeQuarters,
    faLeaf,
    faPlug,
    faPlugCircleExclamation,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import snakeCase from "lodash/snakeCase.js";
import { useTranslation } from "react-i18next";
import type { Device, DeviceState } from "../../types.js";
import type { PowerSource as TPowerSource } from "../../types.js";

interface PowerSourceProps {
    device?: Device;
    deviceState?: DeviceState;
    showLevel?: boolean;
}

export default function PowerSource(props: PowerSourceProps) {
    const { device, deviceState, showLevel, ...rest } = props;
    const { t } = useTranslation("zigbee");
    let source: TPowerSource | undefined = undefined;

    if (device?.power_source) {
        source = device.power_source;
    }

    switch (source) {
        case "Battery": {
            let title = t("battery");
            let batteryFormatted = "";
            let batteryIcon = faBatteryFull;
            let batteryPercent: number | undefined = undefined;
            let batteryState: string | undefined = undefined;
            let batteryLow: boolean | undefined = undefined;
            let fade = false;

            if (deviceState !== undefined) {
                if (deviceState?.battery != null) {
                    batteryPercent = deviceState.battery as number;
                }
                if (deviceState?.battery_state != null) {
                    batteryState = deviceState.battery_state as string;
                }
                if (deviceState?.battery_low != null) {
                    batteryLow = deviceState.battery_low as boolean;
                }
            }

            // Some devices do not use the standardized feature `battery` to report power level.
            if (batteryPercent !== undefined) {
                batteryFormatted = `${batteryPercent}%`;

                if (batteryPercent >= 85) {
                    batteryIcon = faBatteryFull;
                } else if (batteryPercent >= 65) {
                    batteryIcon = faBatteryThreeQuarters;
                } else if (batteryPercent >= 40) {
                    batteryIcon = faBatteryHalf;
                } else if (batteryPercent >= 20) {
                    batteryIcon = faBatteryQuarter;
                } else if (batteryPercent >= 10) {
                    batteryIcon = faBatteryEmpty;
                    fade = true;
                } else {
                    return (
                        <span className="animate-pulse text-error" role="alert">
                            {batteryPercent}%
                        </span>
                    );
                }
            } else if (batteryState !== undefined) {
                batteryFormatted = batteryState;

                switch (batteryState) {
                    case "high":
                        batteryIcon = faBatteryFull;
                        break;
                    case "medium":
                        batteryIcon = faBatteryHalf;
                        break;
                    case "low":
                        batteryIcon = faBatteryEmpty;
                        fade = true;
                        break;
                }
            } else if (batteryLow !== undefined) {
                batteryFormatted = batteryLow ? "LOW" : "OK";
                batteryIcon = batteryLow ? faBatteryEmpty : faBatteryFull;
            }

            // If battery warning triggered: add blink independent of power_level source.
            if (batteryLow === true) {
                fade = true;
            }

            if (batteryFormatted !== "") {
                title += `, ${t("power_level")}: ${batteryFormatted}`;
            }

            return (
                <>
                    <FontAwesomeIcon icon={batteryIcon} fade={fade} title={title} className={fade ? "text-error" : ""} {...rest} />
                    {showLevel && <span className="ps-2">{batteryFormatted}</span>}
                </>
            );
        }
        case "Mains (single phase)":
        case "Mains (3 phase)":
        case "DC Source": {
            return <FontAwesomeIcon icon={faPlug} title={t(snakeCase(source))} {...rest} />;
        }
        case "Emergency mains and transfer switch":
        case "Emergency mains constantly powered": {
            return <FontAwesomeIcon icon={faPlugCircleExclamation} title={t(snakeCase(source))} {...rest} />;
        }
        default: {
            if (device?.type === "GreenPower") {
                return <FontAwesomeIcon icon={faLeaf} title={"Green"} {...rest} />;
            }

            return <FontAwesomeIcon icon={faQuestion} title={source ? t(snakeCase(source)) : undefined} {...rest} />;
        }
    }
}
