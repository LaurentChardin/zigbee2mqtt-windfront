import {
    type AnySubFeature,
    type BasicFeature,
    type Device,
    type DeviceState,
    FeatureAccessMode,
    type FeatureWithAnySubFeatures,
    type FeatureWithSubFeatures,
    type Group,
    type Scene,
} from "../../types.js";

import { isDevice } from "../../utils.js";

export const isValidSceneId = (id: number, existingScenes: Scene[] = []): boolean => {
    return id >= 0 && id <= 255 && !existingScenes.find((s) => s.id === id);
};

export function getScenes(target: Group | Device): Scene[] {
    if (isDevice(target)) {
        const scenes: Scene[] = [];

        for (const key in target.endpoints) {
            const ep = target.endpoints[key];

            for (const scene of ep.scenes) {
                scenes.push({ ...scene });
            }
        }

        return scenes;
    }

    return (target as Group).scenes as Scene[];
}

const BLACKLISTED_FEATURE_NAMES = ["effect"];

const WHITELIST_FEATURE_NAMES = ["state", "color_temp", "color", "transition", "brightness"];

const isValid = (name: string | undefined, access: FeatureAccessMode): boolean => {
    if (name) {
        if (WHITELIST_FEATURE_NAMES.includes(name)) {
            return true;
        }

        if (BLACKLISTED_FEATURE_NAMES.includes(name)) {
            return false;
        }
    }

    if (access === FeatureAccessMode.ALL || access === FeatureAccessMode.SET || access === FeatureAccessMode.STATE_SET) {
        return true;
    }

    return false;
};

export function getScenesFeatures(
    feature: BasicFeature | FeatureWithSubFeatures,
    deviceState: DeviceState = {} as DeviceState,
): FeatureWithAnySubFeatures | undefined {
    const { property, name, access } = feature;

    if ("features" in feature && feature.features && feature.features.length > 0) {
        const features: AnySubFeature[] = [];
        const state = property ? (deviceState[property] as DeviceState) : deviceState;

        for (const subFeature of feature.features) {
            const validFeature = getScenesFeatures(subFeature, state);

            if (validFeature && !features.some((f) => f.property === validFeature.property)) {
                features.push(validFeature);
            }
        }

        return features.length > 0 || isValid(name, access) ? { ...feature, features } : undefined;
    }

    return isValid(name, access) ? { ...feature } : undefined;
}
