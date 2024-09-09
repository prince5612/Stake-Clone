const express = require('express');
const router = express.Router();
const Bets = require('../models/Bets');
const { authToken } = require('./userAuth');

// Create Bet
router.post('/bets',authToken,  async (req, res) => {
    try {
        const { bet_amount, payout_amount, outcome } = req.body;
        const {id} = req.headers;
        // const {g_id} =req.headers;

        const bet = new Bets(
            {
                user_id: id,
                // games_id: g_id,
                bet_amount,
                payout_amount,
                outcome
            }
        );

        await bet.save();
        res.status(201).json(bet);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get All Bets
router.get('/getallbets',authToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const bets = await Bets.find({ user_id: id }).populate('user_id');
        res.status(200).json(bets);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


// Delete Bet
router.delete('/bets', authToken, async (req, res) => {
    try {
        const {betid} = req.headers;
        if (!betid) {
            return res.status(400).json({ msg: "Bet ID is required" });
        }
        const bet = await Bets.findByIdAndDelete(betid);
        if (!bet){
            return res.status(404).json({msg: "Bet not found"});
        } 
        res.status(200).json({msg:"bet deleted successfully"});
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
