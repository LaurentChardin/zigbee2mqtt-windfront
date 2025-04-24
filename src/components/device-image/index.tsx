import genericDevice from "../../images/generic-zigbee-device.png";
import type { Device } from "../../types.js";
import { sanitizeZ2MDeviceName } from "../../utils.js";

type ImageGeneratorFn = (device: Device) => string | undefined;
const z2mBasePath = "https://www.zigbee2mqtt.io/images/devices/";

export const getZ2mDeviceImage = (device: Device): string => `${z2mBasePath}${sanitizeZ2MDeviceName(device?.definition?.model)}.png`;
const getConverterDeviceImage = (device: Device): string | undefined => device.definition?.icon;

/* prettier-ignore */
export const AVAILABLE_GENERATORS: ImageGeneratorFn[] = [getConverterDeviceImage, getZ2mDeviceImage, () => genericDevice];
