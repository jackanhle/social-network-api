const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then((user) => 
        !user
        ? res.status(404).json({ mess: 'No user with that ID' })
        :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser (req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
            .then((user) =>
                !user
                    ? res.stauts(404).json({ message: "No User found with this ID" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: "User and their thoughts successfully deleted." }))
            .catch((err) => res.status(500).json(err));
    },
    updateUser (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User found with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    
    createFriend (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then(user => {
            !user
                ? res.status(404).json({ message: "No User found with this ID" })
                : res.json(user)
        })
        .catch(err => res.status(500).json(err))
    },

    deleteFriend (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then(user => {
            !user
                ? res.status(404).json({ message: "No User found with this ID" })
                : res.json(user)
        })
        .catch(err => res.status(500).json(err))
    }
};
    


