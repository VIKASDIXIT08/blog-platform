const express = require('express');
const pool = require('./db');

const router = express.Router();

// Add a comment
router.post('/', async (req, res) => {
    try {
        const { post_id, content } = req.body;
        const result = await pool.query(
            'INSERT INTO comments (post_id, content) VALUES ($1, $2) RETURNING *',
            [post_id, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error adding comment' });
    }
});

// Get comments for a specific blog post
router.get('/', async (req, res) => {
    try {
        const { post_id } = req.query;
        const result = await pool.query('SELECT * FROM comments WHERE post_id = $1', [post_id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments' });
    }
});

module.exports = router;
