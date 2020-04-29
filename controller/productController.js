const fs = require('fs');
const db = require('../database');
const { uploader } = require('../helper/uploader');

module.exports = {
    getProduct : async (req,res) => {
        let sql = `SELECT * FROM product`;
        try {
            let response = await db.query(sql);
            res.status(200).send(response);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    addProduct : (req,res) => {
        try {
            const path = '/images';
            const upload = uploader(path, 'PRD').fields([{name : 'image'}]);
            upload(req,res, (err) => {
                const { image } = req.files;
                const imagePath = image ? `${path}/${image[0].filename}` : null;
                let sql = `INSERT INTO product (nama, harga, imagePath) VALUES ('${req.body.nama}', ${req.body.harga}, '${imagePath}')`;
                db.query(sql, (err,results) => {
                    if (err) {
                        fs.unlinkSync(`./public${imagePath}`);
                        res.status(500).send(err.message);
                    }
                    res.status(200).send({
                        status : 'Created',
                        data : results,
                        message : 'Data Created'
                    });
                })
            })
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    editProduct : (req,res) => {
        let { id } = req.params;
        let sql = `SELECT * FROM product WHERE product_id = ${id}`;
        db.query(sql, (err,results) => {
            if (err) res.status(500).send(err.message);
            let oldImagePath = results[0].imagePath;
            try {
                const path = '/images';
                const upload = uploader(path, 'PRD').fields([{name : 'image'}]);
                upload(req,res,(err) => {
                    if (err) res.status(500).send(err.message);
                    const { image } = req.files;
                    const imagePath = image ? `${path}/${image[0].filename}` : oldImagePath;
                    let sql = `UPDATE product SET nama = '${req.body.nama}', harga = ${req.body.harga}, imagePath = '${imagePath}' where id = ${id}`;
                    db.query(sql, (err,results) => {
                        if (err) {
                            fs.unlinkSync(`./public${imagePath}`);
                            res.status(500).send(err.message);
                        }
                        if (image) {
                            fs.unlinkSync(`./public${oldImagePath}`);
                        }
                        res.status(200).send({
                            status : 'Success',
                            message : 'Edit data successfully'
                        });
                    })
                })
            } catch (err) {
                res.status(500).send(err.message);
            }
        })
    },
    deleteProduct : async (req,res) => {
        let { id } = req.params;
        let sql = `DELETE FROM product WHERE product_id = ${id}`;
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