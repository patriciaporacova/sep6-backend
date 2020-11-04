import express from "express";

const router = express.Router();

router.get('/', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = 'SELECT * from test';
        connection.query(q, function (error, results, fields) {
            if (error) throw error;
            console.log("rendering home page . . .");
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

export default router;