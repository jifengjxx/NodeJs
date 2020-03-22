const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const read = require('node-readability')
const Article = require('./db').Article;

app.set('port',process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

Article.create(
    {title:'12465451235485',content:'5dfasdfasdfasdfdsfasf'},
    (err,article)=>{
        
    }
);


// app.get('/',(req,res)=>{
//     res.send(`hello world articles:${articles.length}`);
// });

app.get('/articles',(req,res,next)=>{
    Article.all((err,article)=>{
        if(err){
            console.log('数据为空')
            return next(err);
        } 
        res.send(article);
    });
    
});

app.post('/articles',(req,res,next)=>{
    const url = req.body.url;
    read(url,(err,result)=>{
        if(err||!result) res.status(500).send('error downloading article');
        Article.create(
            {title:result.title,content:result.content},
            (err,article)=>{
                if(err) return next(err);
                res.send({message:'ok'});
            }
        );
    })
});

app.get('/articles/:id',(req,res,next)=>{
    const id = req.params.id;
    Article.find(id,(err,article)=>{
        if(err) return next(err);
        res.send(article);
    });
});

app.delete('/articles/:id',(req,res,next)=>{
    const id = req.params.id;
    Article.delete(id,(err)=>{
        if(err) return next(err);
        res.send({message:'delete'});
    });
 });


app.listen(app.get('port'),()=>{
    console.log(`express web app available at localhost:3000`);
});

module.exports = app;