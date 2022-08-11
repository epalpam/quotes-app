
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;

const PORT = 3000;

require('dotenv').config();


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'quotesApp';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    });
    
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (request, response) => {
    const quoteItems = await db.collection('quotes').find().toArray();
    response.render('index.ejs', { info: quoteItems });    
});



app.post('/addQuote', (request, response) => {
    db.collection('quotes').insertOne( {author: request.body.quoteName, content: request.body.quoteContent, like: false } )
    .then(result => {
        console.log('Quote Added');
        response.redirect('/');
    })
    .catch(error => console.error(error));
});



app.delete('/deleteItem', (request, response) => {
    const str = request.body.itemFromJS.trim();
    console.log(str);
    db.collection('quotes').deleteOne( {content: str.substring(1, str.length-1)} )
    .then(result => {
        console.log(result);
        console.log('Quote Deleted');
        response.json('Quote Deleted');
    })
    .catch(error => console.error(error));
});



app.put('/likeItem', (request, response) => {
    const str = request.body.itemFromJS.trim();
    db.collection('quotes').updateOne( {content: str.substring(1, str.length-1)}, {
        $set: {
            like: true
        }
    })
    .then(result => {
        console.log('Like Complete');
        response.json('Like Complete');
    })
    .catch(error => console.error(error));
});



app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}. Betta go catch it bastard..`);
});
