const router = require('express').Router();

const mongoose = require('mongoose');
const locationWifi = require('../models/LocationWifi.js')

// Get by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    //const buz = req.body.buzer

    try {
        const getId = await locationWifi.findOne({ _id: id });
        if (!getId) {
            res.status(424).json({ msg: "Não encontrado" });
            return

        }
        res.status(200).json(getId);
        }

    catch (error) {
        res.status(500).json({ error: error });
    }
})

//Get all
router.get('/', async (req, res) => {

    try {
        const wifiAll = await locationWifi.find();
        if (!wifiAll) {
            res.status(424).json({ msg: "Não encontrado" });
            return

        }
        res.status(200).json(wifiAll);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})

//Get buzer status by id
router.get('/buzer/:id', async (req, res) => {
    const id = req.params.id;
    //const buz = req.body.buzer

    try {
        const checkBuz = await locationWifi.findOne({ _id: id });
        if (!checkBuz) {
            res.status(424).json({ msg: "Não encontrado" });
            return

        }
        res.status(200).json({
            buzer: checkBuz.buzer
        });

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})

//Post new device
router.post('/', async (req, res) => {

    const { 
        modelo, 
        loc, 
        locAnterior, 
        rec, 
        version, 
        beaconP, 
        status, 
        custody, 
        register
    } = req.body;
    
    const location = { 
        modelo, 
        loc,
        locAnterior, 
        rec, 
        version, 
        beaconP, 
        status, 
        custody,
        register,
    };
    console.log(req.body);

    try {
        // if(!modelo){
        //     return
        // }
        await locationWifi.create(location);
        res.status(201).json({ msg: "dado enviado com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error })
    }

})


//Patch buzer status by id
router.patch('/buzer/:id', async (req, res) => {
    const id = req.params.id;
    
    const { 
        modelo, 
        loc, 
        locAnteiror, 
        rec, 
        timestamp, 
        buzer,
        perm, 
        version, 
        beaconP, 
        status, 
        custody, 
        register
    } = req.body;
    
    const buz = { 
        modelo:modelo, 
        loc:loc,
        locAnteiror:locAnteiror, 
        rec:rec, 
        timestamp:timestamp, 
        buzer,
        perm:perm,
        version:version, 
        beaconP:beaconP, 
        status:status, 
        custody:custody,
        register:register,
    };

    // const buz = buzer;
    try {
        const updateLoc = await locationWifi.updateOne({ _id: id }, buz);
        if (updateLoc.matchedCount === 0) {
            res.status(424).json({ msg: "Não encontrado" });
            return
        }
        res.status(200).json(buz);

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    
    const { 
        modelo, 
        loc, 
        locAnteiror, 
        rec, 
        timestamp, 
        buzer, 
        version, 
        beaconP, 
        status, 
        custody, 
        register
    } = req.body;
    
    const all = { 
        modelo, 
        loc, 
        locAnteiror, 
        rec, 
        timestamp, 
        buzer, 
        version, 
        beaconP, 
        status, 
        custody, 
        register
    };
    // const buz = buzer;
    try {
        const updateLoc = await locationWifi.updateOne({ _id: id }, all);
        if (updateLoc.matchedCount === 0) {
            res.status(424).json({ msg: "Não encontrado" });
            return
        }
        res.status(200).json(all);

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})

//Delete by id
router.delete('/del/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleteLoc = await locationWifi.deleteOne({_id:id})
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
