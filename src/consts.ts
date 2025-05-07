export const LOG_LEVELS = ["all", "debug", "info", "warning", "error"];
export const LOG_LIMITS = [100, 200, 500, 1000];
export const LOG_LEVELS_CMAP = {
    error: "text-error",
    warning: "text-warning",
    info: "text-info",
    debug: "opacity-50",
};

export const SUPPORT_NEW_DEVICES_DOCS_URL = "https://www.zigbee2mqtt.io/advanced/support-new-devices/01_support_new_devices.html";
export const DEVICE_OPTIONS_DOCS_URL = "https://www.zigbee2mqtt.io/guide/configuration/devices-groups.html#common-device-options";
export const CONFIGURATION_DOCS_URL = "https://www.zigbee2mqtt.io/guide/configuration/";
export const NEW_GITHUB_ISSUE_URL = "https://github.com/Nerivec/zigbee2mqtt-windfront/issues/new";

export enum InterviewState {
    Pending = "PENDING",
    InProgress = "IN_PROGRESS",
    Successful = "SUCCESSFUL",
    Failed = "FAILED",
}
