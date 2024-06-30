const multer = require("multer");
const Stops = require("../models/Stops");
const GenerateImageUrl = require("../utils/GenerateImageUrl");
const fs = require("fs");

exports.getAllStops = (req, res, next) => {
  Stops.find({})
    .then((Stops) => {
      Stops.map(
        (stop) => (stop.imageUrl = GenerateImageUrl(req, stop.imageUrl))
      );
      res.send(Stops);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getStopsById = (req, res, next) => {
  const id = req.params.stopId;
  Stops.findById(id)
    .then((Stop) => {
      Stop.imageUrl = GenerateImageUrl(req, Stop.imageUrl);
      res.status(200).send({
        response: Stop,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Stops not Found",
      });
    });
};
const storage = multer.diskStorage({
  destination: function (red, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");
exports.createStop = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .send({ error: "an error ocured during file upload" });
    } else if (err) {
      return res.status(500).send({ error: err });
    }
    const body = req.body.stop;
    const imageUrl = req.file.filename;

    console.log("image url ", imageUrl);

    const StopNew = new Stops({
      ...JSON.parse(body),
      imageUrl: imageUrl,
    });

    StopNew.save()
      .then((response) => {
        response.imageUrl = GenerateImageUrl(req, response.imageUrl);
        res.status(200).send({
          message: "Stops successfully added",
          response:  response ,
        });
      })
      .catch((err) => {
        res.status(400).send({
          error: `error adding new Utilisateur' ${err}`,
        });
      });
  });
};

function removeBaseUrl(req, str) {
  return str.substring(
    [...`${req.protocol}://${req.get("host")}/uploads/`].length
  );
}

exports.updateStop = (req, res, next) => {
  const StopId = req.params.stopId;
  const updateBody = req.body;

  const bodyremovedUrl = {
    ...updateBody,
    imageUrl: removeBaseUrl(req, updateBody.imageUrl),
  };

  Stops.findOneAndUpdate({ _id: StopId }, bodyremovedUrl, {
    new: true,
    overwrite: true,
  })
    .then((updtatedStop) => {
      if (!updtatedStop) {
        return res.status(404).send({
          error: "Stop not found",
        });
      }
      updtatedStop.imageUrl = GenerateImageUrl(req, updtatedStop.imageUrl);
      res.status(200).send({
        message: "Sopts successfully updated",
        response: updtatedStop,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Utilisateur :${err}`,
      });
    });
};

exports.deleteStop = (req, res, next) => {
  const StopId = req.params.stopId;

  Stops.findOneAndDelete({ _id: StopId })
    .then((deletedStop) => {
      if (!deletedStop) {
        return res.status(404).send({
          error: "Stop not found",
        });
      }

      res.status(200).send({
        message: "Stop successfully deleted",
        remainingStop: deletedStop,
      });
      fs.unlinkSync(`./uploads/${deletedStop.imageUrl}`);
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Stop: ${err}`,
      });
    });
};
