import type { AttributeInfo } from "../components/device-page/AttributeEditor.js";
import type { ApiSendMessage } from "../hooks/useApiWebSocket.js";
import type { Attribute, Cluster, Endpoint, FriendlyName, IEEEEAddress } from "../types.js";

const toDeviceId = (friendlyNameOrIEEEAddress: FriendlyName | IEEEEAddress, endpoint: Endpoint): string => {
    if (endpoint) {
        return `${friendlyNameOrIEEEAddress}/${endpoint}`;
    }
    return friendlyNameOrIEEEAddress;
};

export async function renameDevice(sendMessage: ApiSendMessage, from: string, to: string, homeassistantRename: boolean): Promise<void> {
    await sendMessage("bridge/request/device/rename", { from, to, homeassistant_rename: homeassistantRename });
}

export async function removeDevice(sendMessage: ApiSendMessage, dev: string, force: boolean, block: boolean): Promise<void> {
    await sendMessage("bridge/request/device/remove", { id: dev, force, block });
}

export async function configureDevice(sendMessage: ApiSendMessage, name: string): Promise<void> {
    await sendMessage("bridge/request/device/configure", { id: name });
}

export async function interviewDevice(sendMessage: ApiSendMessage, name: string): Promise<void> {
    await sendMessage("bridge/request/device/interview", { id: name });
}

export async function setDeviceOptions(sendMessage: ApiSendMessage, id: string, options: Record<string, unknown>): Promise<void> {
    await sendMessage("bridge/request/device/options", { id, options });
}

export async function setDeviceDescription(sendMessage: ApiSendMessage, id: string, description: string): Promise<void> {
    await sendMessage("bridge/request/device/options", { id, options: { description } });
}

export async function readDeviceAttributes(
    sendMessage: ApiSendMessage,
    id: FriendlyName | IEEEEAddress,
    endpoint: Endpoint,
    cluster: Cluster,
    attributes: Attribute[],
    options: Record<string, unknown>,
): Promise<void> {
    await sendMessage(`${toDeviceId(id, endpoint)}/set`, { read: { cluster, attributes, options } });
}

export async function generateExternalDefinition(sendMessage: ApiSendMessage, id: FriendlyName | IEEEEAddress): Promise<void> {
    await sendMessage("bridge/request/device/generate_external_definition", { id });
}

export async function writeDeviceAttributes(
    sendMessage: ApiSendMessage,
    id: FriendlyName | IEEEEAddress,
    endpoint: Endpoint,
    cluster: Cluster,
    attributes: AttributeInfo[],
    options: Record<string, unknown>,
): Promise<void> {
    const payload = {};

    for (const attrInfo of attributes) {
        payload[attrInfo.attribute] = attrInfo.value;
    }

    await sendMessage(`${toDeviceId(id, endpoint)}/set`, { write: { cluster, payload, options } });
}

export async function executeCommand(
    sendMessage: ApiSendMessage,
    friendlyNameOrIEEEAddress: FriendlyName | IEEEEAddress,
    endpoint: Endpoint,
    cluster: Cluster,
    command: unknown,
    payload: Record<string, unknown>,
): Promise<void> {
    await sendMessage(`${toDeviceId(friendlyNameOrIEEEAddress, endpoint)}/set`, {
        command: { cluster, command, payload },
    });
}
