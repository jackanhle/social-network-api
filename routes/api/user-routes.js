const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;