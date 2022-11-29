const router = require('express').Router();

const mongoose = require('mongoose');
const locationRf = require('../models/LocationRF.js')

router.post('/', async (req, res) => {

    const { modelo, localizacao, rec} = req.body;
    const location = { modelo, localizacao, rec};
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

router.get('/find', async (req, res) => {

    try {
        const rfidLoc = await locationRf.find();
        res.status(200).json(rfidLoc);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})

// get by location
router.get(':location', async (req, res) => {
    const { location } = req.params;

    try {
        const room = await locationRf.find({ localizacao: location });
        if (!room) {
            res.status(424).json({ msg: "Não encontrado" });
            return

        }
        res.status(200).json(room);

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})



router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { modelo, localizacao, rec, data } = req.body;
    const location = { modelo, localizacao, rec, data };
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