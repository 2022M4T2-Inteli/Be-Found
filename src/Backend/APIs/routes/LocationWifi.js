const router = require('express').Router();

const mongoose = require('mongoose');
const locationRf = require('../models/LocationRF.js');

router.get('/:rec', async (req, res) => {
    const rec2 = req.params.rec;
    //const buz = req.body.buzer

    try {
        const checkBuz = await locationRf.findOne({ rec: rec2 });
        if (!checkBuz) {
            res.status(424).json({ msg: "Não encontrado" });
            return

        }
        res.status(200).json({
            buz: checkBuz.buzer
        });

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})



router.patch('/:rec', async (req, res) => {
    const rec1 = req.params.rec;
    const { modelo, localizacao, rec, data, buzer } = req.body;
    const buz = { modelo:modelo, localizacao:localizacao, rec:rec, data:data, buzer };

    // const buz = buzer;
    try {
        const updateLoc = await locationRf.updateOne({ rec: rec1 }, buz);
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
