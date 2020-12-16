import express from "express";

const router = express.Router();

router.get('/flights', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "SELECT month, count(*) as 'number_of_flights' from `flights` group by month having COUNT(*)>=1 order by month";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/flights/origin', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "SELECT month, origin,  count(*) as 'number_of_flights' from flights where origin = 'JFK' or origin ='EWR' or origin='LGA' group by origin,month order by month";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/flights/top-10', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "SELECT  f.dest, f.origin, count(*) as 'number_of_flights'\n" +
            "FROM flights as f\n" +
            "INNER JOIN (\n" +
            "    select dest, count(*) 'no of flight'\n" +
            "    from flights\n" +
            "    group by dest\n" +
            "    having count(*)>1\n" +
            "    order by count(*) desc limit 10\n" +
            ") as `top10` on f.dest = top10.dest\n" +
            "group by f.dest,f.origin\n" +
            "order by f.dest, `no of flight`;";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/flights/origin/airtime', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select origin,  sum(air_time) as 'airtime' from flights where origin = 'JFK' or origin ='EWR' or origin='LGA' group by origin order by 'airtime' desc";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/weather/origin', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select origin, count(origin) as 'observation_count' from weather group by origin order by 'observation_count' desc";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/weather/origin/mean-temperature', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select origin, avg(temp) as 'mean_temperature', month, day from weather group by day, month, origin order by month,day";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/weather/temperature', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select origin, temp, month, day, hour from weather group by month, day, hour, origin, temp";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/weather/jfk/temperature', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select temp, month, day, hour from weather where origin = 'JFK' group by month, day, hour, temp";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/weather/jfk/highest-temp', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select temp, month, day, hour from weather where origin = 'JFK' group by month, day, hour, temp";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

//toto nejde
router.get('/weather/origin/mean-delay', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select origin, avg(dep_delay) as 'dep_delay', avg(arr_delay) as 'arr_delay' from flights where origin = 'JFK' or origin ='EWR' or origin='LGA' group by origin";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/manufactures', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select manufacturer, count(*) as 'plan' from planes group by manufacturer having count(*) >= 200;";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});

router.get('/manufactures/models', function (req, res) {
    req.getConnection(function (err, connection) {
        let q = "select manufacturer, count(*) as 'planes', model from planes where manufacturer like 'AIRBUS%' group by manufacturer, model";
        connection.query(q, function (error, results) {
            if (error) throw error;
            res.setHeader('content-type', 'application/json');
            res.send(results);
        });
    });
});


export default router;