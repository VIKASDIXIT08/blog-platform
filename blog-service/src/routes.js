const express = require('express');
const pool = require('./db');

const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const result = await pool.query(
            'INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error creating blog post' });
    }
});

// Get all blog posts with pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const result = await pool.query(
            'SELECT * FROM blogs ORDER BY id ASC LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blog posts' });
    }
});

// Get a specific blog post
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blog post' });
    }
});

// Update a blog post
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const result = await pool.query(
            'UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating blog post' });
    }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog post' });
    }
});

module.exports = router;
