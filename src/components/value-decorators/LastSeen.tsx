import { type JSX, memo } from "react";
import { useTranslation } from "react-i18next";
import { format } from "timeago.js";
import type { LastSeenConfig } from "../../types.js";

type LastSeenProps = {
    lastSeen: unknown;
    config: LastSeenConfig;
};

const getLastSeenDate = (lastSeen: unknown, lastSeenConfig: LastSeenConfig): Date | undefined => {
    if (!lastSeen) {
        return undefined;
    }

    switch (lastSeenConfig) {
        case "ISO_8601":
        case "ISO_8601_local":
            return new Date(Date.parse(lastSeen as string));

        case "epoch":
            return new Date(lastSeen as number);

        case "disable":
            return undefined;

        default:
            console.error(`Unknown last_seen type ${lastSeenConfig}`);
            return undefined;
    }
};

const LastSeen = memo(({ lastSeen, config }: LastSeenProps): JSX.Element => {
    const { i18n } = useTranslation();
    const lastSeenDate = getLastSeenDate(lastSeen, config);

    return lastSeenDate ? <span title={lastSeenDate.toLocaleString()}>{format(lastSeenDate, i18n.language)}</span> : <span>N/A</span>;
});

export default LastSeen;
