const express = require('express');
const bodyParser = require('body-parser');
const needle = require('needle');
const cheerio = require('cheerio');
const mysql = require("mysql");
const cors = require('cors')
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "eng"
});


const app = express();
app.use(cors())

app.use(bodyParser.json())
const port = 3000;


app.post("/articles", async (req, resp) => {
    const {
        url
    } = req.body
    needle.get(url, (err, res) => {
        if (err) throw (err)
        const $ = cheerio.load(res.body)
        const h2 = $('h2')
        const h3 = $('h3')
        // const tr = $('tbody tr').length

        const title = $('h1.p-ff-articles-article__pagetitle').text()
        const englist = $('table tbody tr td:first-child');
        const rusList = $('table tbody tr td:last-child');
        const table = $('table tbody tr td');
        const eng = []

        let s = 1;
        const obj = []
        const countStrog = table.text().length
        const count = $('table').length
        let e = 0;
        console.log($('table tbody tr td').text)
        const list = []
        h3.each(function (i, elem) {
            list[i] = $(elem).text();
        });

        while (e < count) {
            $('table tbody tr td').attr('data', e)
            //     obj.push({
            //         title: list[e]
            //     })
            // console.log(tr)
            console.log($('table [data=1]').text() + "===================")
            while (s < englist.length) {


                englist.each(function (i, elem) {
                    eng[i] = $(elem).text();
                });

                const ru = []
                rusList.each(function (i, elem) {
                    ru[i] = $(elem).text();
                });

                let sql = `INSERT INTO phrases(phrase_eng, phrase_ru) VALUES("${eng[s]}", "${ru[s]}")`;
                pool.getConnection((err, connection) => {
                    connection.query(sql,
                        (er, rows) => {
                            if (er) throw er;
                            else {}
                        }
                    );
                    connection.release();
                });

                s++;
                obj.push(`
            ${eng[s]}
            ${ru[s]}

            `)

            }
            console.log(list[e])

            e++;

        }
        // });


        return resp.status(200).send(obj)


    })


})

app.listen(port, () => {
    console.log(`Server is run at port: ${port}`)
})