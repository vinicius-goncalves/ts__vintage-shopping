const BASE_URL = '../../dist/assets/fonts';
class Font {
    name;
    src;
    constructor(name, src) {
        this.name = name;
        this.src = src;
        this.name = name;
        this.src = src;
    }
}
const fonts = [
    new Font('showguide', `url('${BASE_URL}/showguide.ttf')`),
    new Font('monofonto', `url('${BASE_URL}/monofonto.otf')`),
    new Font('stengkol', `url('${BASE_URL}/stengkol.otf')`),
    new Font('duality', `url('${BASE_URL}/duality.otf')`)
];
function createFontFace(font) {
    const fcOptions = {
        style: 'normal',
        weight: '500'
    };
    const fc = new FontFace(font.name, font.src, fcOptions);
    return fc;
}
function loadFontFace(font) {
    const fc = createFontFace(font);
    try {
        document.fonts.add(fc);
    }
    catch (err) {
        console.log(err);
    }
    const hasFontFace = document.fonts.has(fc);
    return hasFontFace;
}
fonts.forEach((font) => loadFontFace(font));
export default {};
