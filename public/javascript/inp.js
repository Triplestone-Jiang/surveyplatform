var Questionnaire = require('./dataBase.js');
Questionnaire.find(function(err, Questionnaire){
    if(Questionnaire.length) return;
    new Questionnaire({
        title:'This is a strange question',
        len:1,
        Q1:{
            choices:["c1","c2"],
            describe:"a strange question",
            type:"single"
        }
    }).save();
});