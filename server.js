const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3333;

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/mermaid.js', express.static(path.resolve(__dirname, './node_modules/mermaid/dist/mermaid.min.js')));

app
	.get('/:file', (req, res)=>{
    const filePath = `./chart/${req.params.file}`;

    if (!fs.existsSync(filePath)) {
      res.send(404);
    } else {
      res.render('index', {
        mermaid: fs.readFileSync(filePath)
      });
    }
	});

app.listen(port);
