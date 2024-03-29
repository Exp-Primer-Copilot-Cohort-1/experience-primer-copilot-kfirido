//Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set up the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

//get request
app.get('/comments', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file');
        }
        res.send(data);
    });
});

//post request
app.post('/comments', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file');
        }
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('data.json', JSON.stringify(comments), (err) => {
            if (err) {
                console.log('Error writing file');
            }
        });
        res.send(req.body);
    });
});