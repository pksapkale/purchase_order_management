const express = require('express');
const router = express.Router();
var xlsx = require('node-xlsx');
const path = require('path');
const docketService = require('./docketService');


/*

    @ Pushpendra
    API Path - "/"
    Method Type - get
    Desc - Created api for testing whether server is working correctly
    Params -  {}
    Date - 23/10/23

*/


router.get('/', (req, res) => {
    res.send('Hello World!')
});


/*

    @ Pushpendra
    API Path - "/get_po_data"
    Method Type - get
    Desc - Created api for sending po_data.xlsx file's data
    Params -  {}
    Date - 23/10/23

*/


router.get('/get_po_data', (req, res) => {
    let filePath = path.join(__dirname, '../xlsx/po_data.xlsx'); // Getting file path
    let fileData = xlsx.parse(filePath); // parses file
    res.status(200).send({ status: true, message: 'Succussfully got data', data: fileData });
});


/*

    @ Pushpendra
    API Path - "/get_docket_list"
    Method Type - get
    Desc - Created api for getting dockets list
    Params -  {}
    Date - 23/10/23

*/


router.get('/get_docket_list', (req, res) => {
    try {
        docketService.get_docket_list(req, function (error, response) {
            if (error) {
                res.status(500).send({ status: false, message: 'Error in getting data', data: [] });
            }
            else {
                res.status(200).send({ status: true, message: 'Successfully got data', data: response });
            }
        });
    }
    catch (err) {
        console.log('Error in /get_docket_list ----->>>>>', err);
        res.status(500).send({ status: false, message: 'Error in getting data', data: [] });
    }
});


/*

    @ Pushpendra
    API Path - "/upsert_docket"
    Method Type - post
    Desc - Created api for upserting docket
    Params -  {
                docket_id?: number,
                name: string,
                start_time: string,
                end_time: string,
                no_of_hours_worked: number,
                rate_per_hour: number,
                supplier_name: string,
                purchase_order: string
            }
    Date - 23/10/23

*/


router.post('/upsert_docket', (req, res) => {
    try {
        docketService.upsert_docket(req, function (error, response) {
            if (error) {
                res.status(500).send({ status: false, message: 'Error in setting data', data: [] });
            }
            else {
                res.status(200).send({ status: true, message: 'Successfully upserted data', data: response });
            }
        });
    }
    catch (err) {
        console.log('Error in /upsert_docket ----->>>>>', err);
        res.status(500).send({ status: false, message: 'Error in setting data', data: [] });
    }
});


/*

    @ Pushpendra
    API Path - "/delete_docket"
    Method Type - delete
    Desc - Created api for removing docket
    Params -  {
                docket_id: number,
            }
    Date - 23/10/23

*/


router.post('/delete_docket', (req, res) => {
    try {
        docketService.delete_docket(req, function (error, response) {
            if (error) {
                res.status(500).send({ status: false, message: 'Error in deleting docket', data: [] });
            }
            else {
                res.status(200).send({ status: true, message: 'Successfully deleted docket', data: response });
            }
        });
    }
    catch (err) {
        console.log('Error in /delete_docket ----->>>>>', err);
        res.status(500).send({ status: false, message: 'Error in deleting docket', data: [] });
    }
});


module.exports = router