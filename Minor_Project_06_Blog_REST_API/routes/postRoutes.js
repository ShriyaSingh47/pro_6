const router = require('express').Router();
const c = require('../controllers/postController');
router.route('/').get(c.getAllPosts).post(c.createPost);
router.route('/:id').get(c.getPostById).put(c.updatePost).delete(c.deletePost);
module.exports = router;
