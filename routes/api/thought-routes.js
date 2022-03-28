const router = require('express').Router();
const { 
    addThought, 
    removeThought, 
    addReaction, 
    removeReaction 
} = require('../../controllers/thought-controller');

// /api/comments/<userId>
router.route('/:userId').post(addThought);

// /api/comments/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;