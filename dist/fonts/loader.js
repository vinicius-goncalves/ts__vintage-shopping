const BASE_URL = '/dist/assets/fonts';
const fonts = [
    { name: 'showguide', src: `url('${BASE_URL}/showguide.ttf')` },
    { name: 'monofonto', src: `url('${BASE_URL}/monofonto.otf')` },
    { name: 'stengkol', src: `url('${BASE_URL}/stengkol.otf')` },
    { name: 'duality', src: `url('${BASE_URL}/duality.otf')` },
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
    document.fonts.add(fc);
    const hasFontFace = document.fonts.has(fc);
    return hasFontFace;
}
fonts.forEach(font => loadFontFace(font));
export default {};
