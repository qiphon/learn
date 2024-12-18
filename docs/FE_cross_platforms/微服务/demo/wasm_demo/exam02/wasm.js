const WASM_URL = "./exam.wasm"
const WASM_JS_URL = "./exam.js"


const getWASMModule = () => {
  return new Promise((resolve, reject) => {
    if (!("WebAssembly" in window)) {
        console.warn("doesn't support WASM");
        reject("doesn't support WASM");
    }
    fetch(WASM_URL).then(response => {
        return response.arrayBuffer();
    }).then(buffer => {
        const wasmModule = new WebAssembly.Module(buffer);
        const script = document.createElement("script");

        script.addEventListener("wasmDone", buildWam);
        script.src = WASM_JS_URL;

        window.wasmScript = script;

        window.wasmDoneEvent = new Event("wasmDone");
        document.body.appendChild(script);

        function buildWam() {
            Module.wasmBinary = buffer;
            const wasmMethods = {};
            wasmMethods["getSqrt"] = function(number) {
                return _getSqrt(number);
            };
                wasmMethods["getSqr"] = function(number) {
                return _getSqr(number);
            };
            resolve(wasmMethods);
        }
    });
  });
};