/**
 * Safari WebAssembly wasm:js-string Built-in Polyfill
 * Fixes: "TypeError: import wasm:js-string:fromCharCode must be an object"
 * Strips unsupported builtins option to allow polyfill fallback
 */

(function() {
    'use strict';
    
    // Only apply patch on Safari/WebKit
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) return;
    
    function stripBuiltins(options) {
        if (!options?.builtins) return options;
        const { builtins, ...rest } = options;
        return Object.keys(rest).length > 0 ? rest : undefined;
    }
    
    const original = {
        compile: WebAssembly.compile,
        compileStreaming: WebAssembly.compileStreaming,
        instantiate: WebAssembly.instantiate,
        instantiateStreaming: WebAssembly.instantiateStreaming,
        validate: WebAssembly.validate
    };
    
    WebAssembly.compile = function(source, options) {
        return original.compile.call(this, source, stripBuiltins(options));
    };
    
    WebAssembly.compileStreaming = function(source, options) {
        return original.compileStreaming.call(this, source, stripBuiltins(options));
    };
    
    WebAssembly.instantiate = function(moduleObject, importObject, options) {
        return original.instantiate.call(this, moduleObject, importObject, stripBuiltins(options));
    };
    
    WebAssembly.instantiateStreaming = function(source, importObject, options) {
        return original.instantiateStreaming.call(this, source, importObject, stripBuiltins(options));
    };
    
    WebAssembly.validate = function(bytes, options) {
        return original.validate.call(this, bytes, stripBuiltins(options));
    };
    
})();
