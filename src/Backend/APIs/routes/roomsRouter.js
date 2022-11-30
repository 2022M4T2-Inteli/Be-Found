const router = require('express').Router();

const mongoose = require('mongoose');
const roomRf = require('../models/RoomRfid')


//Get all
router.get('/find', async (req, res) => {
    try {
        const roomFind = await roomRf.find();
        res.status(200).json(roomFind);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})

//Get all from nameRoom
router.get('/:nameRoom', async (req, res) => {
    const { nameroom } = req.params;

    try {
        const room = await roomRf.find({ localizacao: nameroom });
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

//Post new room esp
router.post('/', async (req, res) => {

    const { infoCard, attLocRf, nameRoom} = req.body;
    const location = { infoCard, attLocRf, nameRoom};

    try {
        // if(!modelo){
        //     return
        // }
        await roomRf.create(location);
        res.status(201).json({ msg: "dado enviado com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Patch by id
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const {infoCard, attLocRf, nameRoom} = req.body;
    const location = { infoCard, attLocRf, nameRoom};
    try {
        const updateLoc = await roomRf.updateOne({ _id: id }, location);
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
        const deleteLoc = await roomRf.deleteMany()
        if (deleteLoc.deletedCount === 0) {
            res.status(424).json({ msg: 'Não encontrado' })
            return
        }
        res.status(200).json({ msg: 'Deletado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Delete by id
router.delete('/del/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleteLoc = await roomRf.deleteOne({_id:id})
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