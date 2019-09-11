const  getTableData = (req, res, db) => {
    db.select('*').from('testtable1')
        .then(items => {
            if (items.length){
                res.json(items)
            }else {
                res.json({dataExsists: 'false'})
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}
const postTableData = (req, res, db) => {
    const {freezer, chamber, rack, tray,box, box_label, sample_type, description, project, responsible_personel, box_barcode} = req.body
    const added = new Date()
    db('testtable1').insert({freezer, chamber, rack, tray, box,box_label, sample_type, description, project, responsible_personel, box_barcode, added})
        .returning('x')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
    const {id, freezer, chamber, rack,tray, box, box_label,sample_type, description, project, responsible_personel, box_barcode} = req.body
    db('testtable1').where({id}).update({freezer, chamber, rack,tray, box_label,sample_type, description, project, responsible_personel, box_barcode})
        .returning('*')
        .then(item => {
            res.json(item)
        })
                .catch(err =>res.status(400).json({dbError: 'db error'}))

}
const deleteTableData = (req, res,db) => {
    const {id} = req.body
    db('testtable1').where({id}).del()
        .then(() => {
            res.json({delete: 'true'})
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
}