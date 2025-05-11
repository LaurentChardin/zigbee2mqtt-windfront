import { memo } from "react";
import { LOG_LEVELS_CMAP } from "../../consts.js";
import type { LogMessage } from "../../types.js";

export type LastLogResultProps = {
    message: LogMessage;
};

const LastLogResult = memo((props: LastLogResultProps) => {
    const { message } = props;

    return (
        <div className="mockup-code w-full">
            <pre data-prefix="~" className={LOG_LEVELS_CMAP[message.level]}>
                <code>
                    [{message.timestamp}] {message.message}
                </code>
            </pre>
        </div>
    );
});

export default LastLogResult;
