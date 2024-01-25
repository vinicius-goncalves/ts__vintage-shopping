const BASE_URL: string = '../../dist/assets/fonts';

class Font {

    constructor(public name: string, public src: string) {
        this.name = name;
        this.src = src;
    }
}

const fonts: Array<Font> = [
    // new Font('showguide', `url('${BASE_URL}/showguide.ttf')`),
    new Font('monofonto', `url('${BASE_URL}/monofonto.otf')`),
    new Font('stengkol', `url('${BASE_URL}/stengkol.otf')`),
    new Font('duality', `url('${BASE_URL}/duality.otf')`)
];

function createFontFace(font: Font): FontFace {

    const fcOptions: FontFaceDescriptors = {
        style: 'normal',
        weight: '500'
    };

    const fc: FontFace = new FontFace(font.name, font.src, fcOptions);

    return fc;
}

function loadFontFace(font: Font): boolean {

    const fc: FontFace = createFontFace(font);

    try {
        document.fonts.add(fc);
    } catch(err: unknown) {
        console.log(err);
    }

    const hasFontFace: boolean = document.fonts.has(fc);
    return hasFontFace;
}

fonts.forEach((font: Font): boolean => loadFontFace(font));

export default {};