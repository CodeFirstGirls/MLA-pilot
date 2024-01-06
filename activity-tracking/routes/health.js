const express = require('express');
const router = express.Router();

// GET: Health
router.get('/', async (req, res) => {
    res.status(200).send(); // No content
});
  
// GET: Readiness
router.get('/ready', async (req, res) => {
    res.status(200).send(); // No content
});
  
module.exports = router;