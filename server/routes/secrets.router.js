const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.user:', req.user);
    if(req.isAuthenticated()) {
        let clearance = req.user.clearance_level;
        pool.query('SELECT * FROM "secret" WHERE secrecy_level <= $1;', [clearance])    
            .then(results => res.send(results.rows))
            .catch(error => {
                console.log('Error making SELECT for secrets:', error);
                res.sendStatus(500);
            });
    }
    else {
        res.sendStatus(403);
    }
});

router.get('/users', (req, res) => {
    switch (req.isAuthenticated()) {
        case true:
            let queryText = `SELECT username FROM person;`
            pool.query(queryText).then(response => {
                res.send(response.rows);
            }).catch(error => {
                console.log('error getting users', error);
                res.sendStatus(500);
            })
            break;
        case false:
            res.sendStatus(403);
            break;
        default:
            break;
    }
})

module.exports = router;