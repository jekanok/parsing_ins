const needle = require('needle');
const cheerio = require('cheerio');

const url = "https://skyeng.ru/articles/300-poleznyh-anglijskih-slov-i-fraz--dlya-turistov"
needle.get(url, (err, res) => {
    if (err) throw (err)
    const $ = cheerio.load(res.body)

    const title = $('h1.p-ff-articles-article__pagetitle').text()
    const tab = $('h3');
    const englist = $('table tbody tr td:first-child');
    const rusList = $('table tbody tr td:last-child');
    const table = $('table tbody tr td');


    console.log(title)

    let min = [];
    let q = 0;
    let s = 0;
    const listminTitle = []

    // tab.each(function (t, elem) {
    //     listminTitle[t] = $(elem).text();


    while (s < englist.length) {
        const tw = []
        tab.each(function (i, elem) {
            tw[i] = $(elem).text();
            console.log(`tile:${tw[i]}`)
        });

        const eng = []
        englist.each(function (i, elem) {
            eng[i] = $(elem).text();
        });

        const ru = []
        rusList.each(function (i, elem) {
            ru[i] = $(elem).text();
        });
        // console.log(`${eng[s]} - ${ru[s]}`)

        s++;

    }

    // });




})