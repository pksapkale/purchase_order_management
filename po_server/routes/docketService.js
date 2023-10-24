const connection = require('../db/connection')

const docketService = {


    get_docket_list: function (req, callback) {
        let query = 'SELECT * FROM dockets_data';
        connection.query(query, function (err, response) {
            if (err) {
                console.log('Error in getting docket data', err);
                callback(true);
            }
            else {
                callback(false, response);
            }
        });
    },


    upsert_docket: function (req, callback) {
        let body = req.body, docket_id = body.docket_id;
        const docketData = this.get_docket_data(body);    // Getting docket data in object format

        if (docket_id) {    // If there is a docket_id then it's the case of update
            let updateQuery = 'UPDATE dockets_data SET ';
            updateQuery += 'name = ?, start_time = ?, end_time = ?, no_of_hours_worked = ?, rate_per_hour = ?, supplier_name = ?, purchase_order = ? WHERE docket_id = ' + docket_id;
            connection.query(updateQuery, Object.values(docketData), (err) => {
                if (err) {
                    console.log('Error in setting docket data', err);
                    callback(true);
                }
                else {
                    callback(false, []);
                }
            });
        }
        else {     // Creating new docket
            let insertQuery = 'INSERT INTO dockets_data SET ? ';
            connection.query(insertQuery, docketData, (err) => {
                if (err) {
                    console.log('Error in setting docket data', err);
                    callback(true);
                }
                else {
                    callback(false, []);
                }
            });
        }
    },


    get_docket_data: function (body) {
        return {
            name: body.name,
            start_time: body.start_time,
            end_time: body.end_time,
            no_of_hours_worked: body.no_of_hours_worked,
            rate_per_hour: body.rate_per_hour,
            supplier_name: body.supplier_name,
            purchase_order: body.purchase_order
        }
    },


    delete_docket: function (req, callback) {
        const { docket_id } = req.body;
        let query = 'DELETE FROM dockets_data WHERE docket_id = ?';
        connection.query(query, docket_id, function (err, response) {
            if (err) {
                console.log('Error in deleting docket ', err);
                callback(true);
            }
            else {
                callback(false, []);
            }
        });
    }

}

module.exports = docketService