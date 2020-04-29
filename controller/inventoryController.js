const db = require('../database');

module.exports = {
    getInventory : async (req,res) => {
        let sql = `SELECT 
            i.inventory_id AS 'Id',
            p.nama AS 'Product', 
            p.imagePath AS 'Image',
            s.branch_name AS 'Branch', 
            i.stock AS 'Stock' 
            FROM inventory i 
            JOIN product p ON i.product_id = p.product_id 
            JOIN store s ON i.store_id = s.store_id`;
        try {
            let response = await db.query(sql);
            res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    addInventory : async (req,res) => {
        try {
            let sql = `INSERT INTO inventory (product_id, store_id, stock) VALUES (${req.body.product_id}, ${req.body.store_id}, ${req.body.stock})`;
            await db.query(sql, (err,result) => {
                if (err) {
                    res.status(500).send(err.message);
                }
                res.status(200).send(result);
            })
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    editInventory : (req,res) => {
        let { id } = req.params
        let sql = `SELECT 
        i.inventory_id AS 'Id',
        p.nama AS 'Product', 
        p.imagePath AS 'Image',
        s.branch_name AS 'Branch', 
        i.stock AS 'Stock' 
        FROM inventory i 
        JOIN product p ON i.product_id = p.product_id 
        JOIN store s ON i.store_id = s.store_id
        WHERE i.inventory_id = ${id}`;
        db.query(sql, (err,result) => {
            if (err) {
                res.status(500).send(err.message);
            }
            try {
                let sql = `UPDATE inventory SET 
                product_id = ${req.body.product_id}, 
                store_id = ${req.body.store_id}, 
                stock = ${req.body.stock} 
                WHERE inventory_id = ${id}`;
                db.query(sql, (err,result) => {
                    if (err) {
                        res.status(500).send(err.message);
                    }
                    res.status(200).send({
                        status : 'Updated',
                        data : result[0],
                        message : 'Data Updated'
                    })
                })
            } catch (err) {
                res.status(500).send(err.message);
            }
        })
    },
    deleteInventory : async (req,res) => {
        let { id } = req.params;
        let sql = `DELETE FROM inventory WHERE inventory_id = ${id}`;
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
};