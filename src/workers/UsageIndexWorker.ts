import { load } from "../../java/build/generated/teavm/wasm-gc/java.wasm-runtime.js";
import indexerWasm from '../../java/build/generated/teavm/wasm-gc/java.wasm?url';
import { JavaWasm } from "../java.js";
import type { UsageKey, UsageString } from "./UsageIndex.js";

let java: JavaWasm | null = null;

const getJava = async (): Promise<JavaWasm> => {
    if (!java) {
        java = await JavaWasm.create();
    }
    return java;
};

export const index = async (data: ArrayBufferLike): Promise<void> => {
    (await getJava()).index(data);
};

export const getUsage = async (key: UsageKey): Promise<[UsageString]> => {
    return await (await getJava()).getUsage(key) as [UsageString];
};

export const getUsageSize = async (): Promise<number> => {
    return (await getJava()).getUsageSize();
};