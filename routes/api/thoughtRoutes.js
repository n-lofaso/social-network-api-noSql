const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:_id').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:_id/reactions').post(createReaction)

router.route('/:_id/reactions/:reactionId').delete(removeReaction);

module.exports = router;