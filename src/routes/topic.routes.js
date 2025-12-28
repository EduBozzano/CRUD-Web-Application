const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topic.controller');

router.get('/topics', topicController.getAllTopics);
router.get('/topics/create', topicController.showCreateForm);
router.post('/topics', topicController.createTopic);

router.get('/topics/:id/edit', topicController.showEditForm);
router.post('/topics/:id', topicController.updateTopic);

router.post('/topics/:id/delete', topicController.deleteTopic);

module.exports = router;
