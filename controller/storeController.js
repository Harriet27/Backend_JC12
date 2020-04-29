const db = require('../database');

module.exports = {
    getStore : async (req,res) => {
        let sql = `SELECT * FROM store`;
        try {
            let response = await db.query(sql);
            res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    addStore : async (req,res) => {
        let sql = `INSERT INTO store (branch_name) VALUES ('${req.body.branch_name}')`;
        try {
            await db.query(sql);
            let get = `SELECT * FROM store`;
            let response = await db.query(get);
            res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    editStore : async (req,res) => {
        let { id } = req.params;
        let sql = `UPDATE store SET branch_name = '${req.body.branch_name}' WHERE store_id = ${id}`;
        try {
            await db.query(sql);
            let get = `SELECT * FROM store`;
            let response = await db.query(get);
            res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    deleteStore : async (req,res) => {
        let { id } = req.params;
        let sql = `DELETE FROM store WHERE store_id = ${id}`;
        await db.query(sql, (err,result) => {
            if (err) {
                res.status(500).send(err.message);
            }
            res.status(200).send({
                status : 'Deleted',
                message : 'Data Deleted'
            })
        })
    }
}