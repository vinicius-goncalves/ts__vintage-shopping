const fc = new FontFace('showguide', "url('../dist/assets/fonts/showguide.TTF')", { display: 'auto' });
document.fonts.add(fc);
fc.load().then(font => {
    console.log(font)
})

// document.fonts.addEventListener('loading', (event) => {
//     // console.log(event);
// });

// const xhr = new XMLHttpRequest();

// xhr.addEventListener('load', async () => {


//     const blob = xhr.response as Blob;

//     const fc = new FontFace('showguide', await blob.arrayBuffer());
//     document.fonts.add(fc);

//     const res = document.fonts.has(fc);
//     console.log(res)    // fc.load().then(() => {
//     //     console.log('a')
//     // })

//     // fc.load().then(res => {
//     //      document.fonts.load(res.family).then(res => {
//     //         console.log(res)
//     //      })
//     // })
//     // fc.load().then(() => console.log('a'))
// });

// xhr.responseType = 'blob';
// xhr.open('GET', '../dist/assets/fonts/showguide.TTF');
// xhr.send();
// // const fc = new FontFace('showguide', )