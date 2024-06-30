const Users = require("../models/Users");

exports.getAllUsers = (req, res, next) => {
  Users.find({})
    .then((Users) => {
      res.send(Users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getUserById = (req, res, next) => {
  const id = req.params.UsersId;
  console.log(id);

  Users.findById(id)
    .then((User) => {
      res.status(200).send({
        response: User,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "User not Found",
      });
    });
};

exports.createUser = (req, res, next) => {
  const body = req.body;
  const UsersNew = new Users(body);
  UsersNew.save()
    .then((response) => {
      res.status(200).send("Users successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Users' ${err}`,
      });
    });
};

exports.updateUsers = (req, res, next) => {
  const UsersId = req.params.UsersId;
  const updateBody = req.body;

  Users.findOneAndUpdate({ _id: UsersId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedUsers) => {
      if (!updtatedUsers) {
        return res.status(404).send({
          error: "Users not found",
        });
      }
      res.status(200).send({
        message: "Users successfully updated",
        Users: updtatedUsers,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Users :${err}`,
      });
    });
};

exports.deleteUsers = (req, res, next) => {
  const UsersId = req.params.UsersId;

  Users.findOneAndDelete({ _id: UsersId })
    .then((deletedUsers) => {
      if (!deletedUsers) {
        return res.status(404).send({
          error: "Users not found",
        });
      }
      res.status(200).send({
        message: "Users successfully deleted",
        remainingUsers: deletedUsers,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Users: ${err}`,
      });
    });
};
