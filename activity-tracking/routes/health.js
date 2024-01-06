const express = require('express');
const router = express.Router();

// GET: Health
router.get('/', async (req, res) => {
    // TODO: Implement health endpoint
});
  
// GET: Readiness
router.get('/ready', async (req, res) => {
    // TODO: Implement readiness endpoint
});
  
module.exports = router;