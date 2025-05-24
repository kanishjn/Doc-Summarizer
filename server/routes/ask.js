const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question) {
            return res.status(400).json({ message: 'No prompt added' });
        }

        // Create form data for FastAPI
        const formData = new URLSearchParams();
        formData.append('question', question);

        // Forward to FastAPI
        const fastApiResponse = await axios.post('https://doc-summarizer-kmc0.onrender.com/ask', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Handle FastAPI response
        const fastApiData = fastApiResponse.data;
        
        if (fastApiData.error) {
            return res.status(400).json({
                message: 'Error from AI service',
                error: fastApiData.error,
                details: fastApiData.details
            });
        }
        
        // Return the answer from FastAPI
        res.status(200).json({
            message: 'Question processed successfully',
            answer: fastApiData.answer
        });

    } catch (error) {
        console.error('Error forwarding question to FastAPI:', {
    message: error.message,
});

res.status(500).json({
    message: 'Error processing question',
    error: error.response?.data || error.message
});
    }
});

module.exports = router;