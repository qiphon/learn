declare module 'koa-swig' {
    function renderer(opts: renderer.defaultSettings): any;
    namespace renderer {
        interface defaultSettings {
            autoescape: boolean;
            root: string;
            cache: string | boolean;
            ext: string;
            writeBody: boolean;
        }
    }
    export default renderer;
}
