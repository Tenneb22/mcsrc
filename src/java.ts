import { load } from "../java/build/generated/teavm/wasm-gc/java.wasm-runtime.js";
import indexerWasm from '../java/build/generated/teavm/wasm-gc/java.wasm?url';

type TeaVm = Awaited<ReturnType<typeof load>>;

export class JavaWasm {
    readonly teavm: TeaVm;
    readonly exports: JavaExports;

    private constructor(teavm: TeaVm, exports: JavaExports) {
        this.teavm = teavm;
        this.exports = exports;
    }

    static async create(): Promise<JavaWasm> {
        const teavm = await load(indexerWasm);
        const exports = teavm.exports as JavaExports;
        return new JavaWasm(teavm, exports);
    }

    async index(data: ArrayBufferLike): Promise<void> {
        this.exports.index(data);
    }

    async getUsage(key: string): Promise<[string]> {
        return this.exports.getUsage(key);
    }

    async getUsageSize(): Promise<number> {
        return this.exports.getUsageSize();
    }

    async getBytecode(classData: ArrayBufferLike[]): Promise<string> {
        return this.exports.getBytecode(classData);
    }
}

// Exported functions from the java code compiled to WebAssembly
interface JavaExports {
    index(data: ArrayBufferLike): void;
    getUsage(key: string): [string];
    getUsageSize(): number;
    getBytecode(classData: ArrayBufferLike[]): string;
}