var express = require('express');
var router = express.Router();
var mongo = require('mongojs');
var config = require('../config.js');
var db = mongo('mongodb://'+config.username+':'+config.password+'@'+config.dbUrl+'/my_tasks', ['tasks']);

//Get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get a single tasks
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongo.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save a task
router.post('/task', function(req, res, next){
        var task = req.body;
        if(!task.title || !(task.isDone + ' ')){
            res.status(403);
            res.json({
                "error" : "Something went wrong"
            });
        } else{
            db.tasks.save(task, function(err, task){
                if(err){
                    res.send(err);
                }
                res.json(task);
            });
        }    
});

//Delete a task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongo.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Delete a task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updatedTask = {};

    if(task.isDone){
        updatedTask.isDone = task.isDone;
    }

    if(task.title){
        updatedTask.title = task.title;
    }

    if(!updatedTask){
        res.status(404);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({_id: mongo.ObjectId(req.params.id)}, updatedTask, {}, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;