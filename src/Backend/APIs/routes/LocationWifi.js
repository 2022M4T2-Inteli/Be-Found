const router = require('express').Router();

const mongoose = require('mongoose');
const locationRf = require('../models/LocationRF.js');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    //const buz = req.body.buzer

    try {
        const checkBuz = await locationRf.findOne({ _id: id });
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



router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { modelo, localizacao, rec, data, buzer } = req.body;
    const buz = { modelo:modelo, localizacao:localizacao, rec:rec, data:data, buzer };

    // const buz = buzer;
    try {
        const updateLoc = await locationRf.updateOne({ _id: id }, buz);
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

router.delete('/del/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleteLoc = await locationRf.deleteOne({_id:id})
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
