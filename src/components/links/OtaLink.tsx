import { useTranslation } from "react-i18next";
import type { VendorProps } from "./index.js";

export default function OtaLink(props: VendorProps) {
    const { device } = props;
    const { t } = useTranslation("zigbee");
    let url = "";
    const title = device.software_build_id || t("unknown");

    switch (device?.definition?.vendor) {
        case "IKEA":
            url = "https://ww8.ikea.com/ikeahomesmart/releasenotes/releasenotes.html";
            break;

        case "Inovelli":
            url = "https://help.inovelli.com/en/articles/8503774-what-is-the-latest-firmware-version-for-your-device#h_b74c1e7dc6";
            break;

        case "Philips":
            url = `https://www.philips-hue.com/en-us/support/release-notes/${
                device.definition?.exposes.find((feature) => feature.type === "light") ? "lamps" : "accessories"
            }`;
            break;

        case "Ubisys":
            url = `https://www.ubisys.de/en/support/firmware/change-logs-${device.definition?.model?.replace(/[-]/g, "").toLowerCase()}/`;
            break;
    }

    if (url !== "") {
        return (
            <a target="_blank" rel="noopener noreferrer" href={url} className="link link-hover">
                {title}
            </a>
        );
    }
    return <>{title}</>;
}
