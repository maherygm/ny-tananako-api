const Evenement = require("../models/Evenement");

// Get all events
exports.getAllEvenements = async (req, res) => {
  try {
    const evenements = await Evenement.find();
    res.json({
      status_code: 200,
      status_message: "Tous les événements récupérés",
      data: evenements,
    });
  } catch (error) {
    res.status(500).json({ status_code: 500, status_message: error.message });
  }
};

// Get event by ID
exports.getEvenementById = async (req, res) => {
  try {
    const evenement = await Evenement.findById(req.params.id);
    if (!evenement) {
      return res.status(404).json({
        status_code: 404,
        status_message: "Événement non trouvé",
      });
    }
    res.json({
      status_code: 200,
      status_message: "Événement récupéré avec succès",
      data: evenement,
    });
  } catch (error) {
    res.status(500).json({ status_code: 500, status_message: error.message });
  }
};

// Create a new event
exports.createEvenement = async (req, res) => {
  try {
    const evenement = new Evenement(req.body);
    await evenement.save();
    res.status(201).json({
      status_code: 201,
      status_message: "Événement créé avec succès",
      data: evenement,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, status_message: error.message });
  }
};

// Update an event
exports.updateEvenement = async (req, res) => {
  try {
    const evenement = await Evenement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!evenement) {
      return res.status(404).json({
        status_code: 404,
        status_message: "Événement non trouvé",
      });
    }
    res.json({
      status_code: 200,
      status_message: "Événement mis à jour avec succès",
      data: evenement,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, status_message: error.message });
  }
};

// Delete an event
exports.deleteEvenement = async (req, res) => {
  try {
    const evenement = await Evenement.findByIdAndDelete(req.params.id);
    if (!evenement) {
      return res.status(404).json({
        status_code: 404,
        status_message: "Événement non trouvé",
      });
    }
    res.json({
      status_code: 200,
      status_message: "Événement supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({ status_code: 500, status_message: error.message });
  }
};
