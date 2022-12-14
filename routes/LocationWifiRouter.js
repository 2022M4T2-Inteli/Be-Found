const router = require('express').Router();
var moment = require('moment');
moment.locale('pt-br');


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

router.get('/buzer/rec/:rec', async (req, res) => {
    const rec = req.params.rec;
    //const buz = req.body.buzer

    try {
        const checkBuz = await locationWifi.findOne({ rec: rec });
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
        locAnterior, 
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
        locAnterior:locAnterior, 
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

router.patch('/buzer/pat/:recc', async (req, res) => {
    const recc = req.params.recc;
    
    const { 
        modelo, 
        loc, 
        locAnterior, 
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
        locAnterior:locAnterior, 
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
        const updateLoc = await locationWifi.updateOne({ rec: recc }, buz);
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
        locAnterior, 
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
    
    const all = { 
        modelo, 
        loc, 
        locAnterior, 
        rec, 
        timestamp, 
        buzer,
        perm, 
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

router.patch('/rec/:rec', async (req, res) => {
    const rec = req.params.rec;
    
    const { 
        modelo, 
        loc, 
        locAnterior, 
        timestamp, 
        buzer,
        perm, 
        version, 
        beaconP, 
        status, 
        custody, 
        register
    } = req.body;
    
    const all = { 
        modelo, 
        loc, 
        locAnterior, 
        timestamp, 
        buzer,
        perm, 
        version, 
        beaconP, 
        status, 
        custody, 
        register
    };
    // const buz = buzer;
    try {
        const updateLoc = await locationWifi.updateOne({ rec: rec }, all);
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

router.patch('/timestamp/:id', async (req, res) => {
    const id = req.params.id;
    const timestamp = moment().calendar();
    
    const buz = { 
        timestamp:timestamp, 
    };
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
module.exports = router;

router.patch('/timeAlert/:id', async (req, res) => {
    const id = req.params.id;
    const timestamp = moment().calendar();
    
    const buz = { 
        timestamp:timestamp, 
    };
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
module.exports = router;

router.patch('/timeLocAnte/:id', async (req, res) => {
    const id = req.params.id;
    const timestamp = moment().calendar();
    
    const buz = { 
        timestamp:timestamp, 
    };
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

router.patch('/perm/pat/:perim', async (req, res) => {
    const perim = req.params.perim;
    
    const { 
        modelo, 
        loc, 
        locAnterior, 
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
        locAnterior:locAnterior, 
        rec:rec, 
        timestamp:timestamp, 
        buzer:buzer,
        perm,
        version:version, 
        beaconP:beaconP, 
        status:status, 
        custody:custody,
        register:register,
    };

    // const buz = buzer;
    try {
        const updateLoc = await locationWifi.updateOne({ rec: perim }, buz);
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

module.exports = router;
