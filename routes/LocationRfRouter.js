const router = require('express').Router();

const mongoose = require('mongoose');
const locationRf = require('../models/LocationRF.js')


//Get all
router.get('/find', async (req, res) => {

    try {
        const rfidLoc = await locationRf.find();
        if (!rfidLoc) {
            res.status(424).json({ msg: "Não encontrado" });
            return

        }
        res.status(200).json(rfidLoc);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})


//Post new rfid tag
router.post('/', async (req, res) => {

    const { modelo, beaconP, salaatt} = req.body;
    const location = { modelo, beaconP, salaatt};
    console.log(req.body);

    try {
        // if(!modelo){
        //     return
        // }
        await locationRf.create(location);
        res.status(201).json({ msg: "dado enviado com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Patch by id
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const {modelo, beaconP, salaatt} = req.body;
    const location = { modelo, beaconP, salaatt };
    try {
        const updateLoc = await locationRf.updateOne({ _id: id }, location);
        if (updateLoc.matchedCount === 0) {
            res.status(424).json({ msg: "Não encontrado" });
            return
        }
        res.status(200).json(location);

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})

//Delete all
router.delete('/del-all', async (req, res) => {
    try {
        const deleteLoc = await locationRf.deleteMany()
        if (deleteLoc.deletedCount === 0) {
            res.status(424).json({ msg: 'Não encontrado' })
            return
        }
        res.status(200).json({ msg: 'Deletado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router;