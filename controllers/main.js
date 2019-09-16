const  getTableData = (req, res, db) => {
    db.select('*').from('testtable')
        .then(items => {
            if (items.length){
                res.json(items)
            }else {
                res.json({dataExists: 'false'})
            }
        })
        .catch(err => console.log(err))
};
const postTableData = (req, res, db) => {
    const {freezer, chamber, rack, tray,box, box_label, sample_type, description, project, responsible_personel, box_barcode} = req.body;
    const added = new Date();
    db('testtable').insert({freezer, chamber, rack, tray, box,box_label, sample_type, description, project, responsible_personel, box_barcode})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => console.log(err))
};

const putTableData = (req, res, db) => {
    const {id, freezer, chamber, rack,tray, box, box_label,sample_type, description, project, responsible_personel, box_barcode} = req.body;
    db('testtable').where({id}).update({freezer, chamber, rack,tray, box_label,sample_type, description, project, responsible_personel, box_barcode})
        .returning('*')
        .then(item => {
            res.json(item)
        })
                .catch(err =>console.log(err))

};
const deleteTableData = (req, res,db) => {
    const {id} = req.body;
    db('testtable').where({id}).del()
        .then(() => {
            res.json({delete: 'true'})
        })
        .catch(err => console.log(err))
};

module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
};