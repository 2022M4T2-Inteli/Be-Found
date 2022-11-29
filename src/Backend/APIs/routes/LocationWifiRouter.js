const router = require('express').Router();

const mongoose = require('mongoose');
const locationWifi = require('../models/LocationWifi.js')

// Get by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    //const buz = req.body.buzer

    try {
        const getId = await locationWifi.findOne({ _id: id });
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

    const { modelo, localizacao, rec, timestamp, buzer, version, beaconP, idd, idp} = req.body;
    const location = { 
        modelo, 
        localizacao, 
        rec, 
        timestamp, 
        buzer, 
        version, 
        beaconP, 
        idd, 
        idp
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
    const { modelo, localizacao, rec, timestamp, buzer, version, beaconP, idd, idp} = req.body;
    const buz = { 
        modelo:modelo, 
        localizacao:localizacao, 
        rec:rec, 
        timestamp:timestamp, 
        buzer, version:version, 
        beaconP:beaconP, 
        idd:idd, 
        idp:idp,
        buzer
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
    const { modelo, localizacao, rec, timestamp, buzer, version, beaconP, idd, idp} = req.body;
    const all = { modelo, localizacao, rec, timestamp, buzer, version, beaconP, idd, idp}
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
