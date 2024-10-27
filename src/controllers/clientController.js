const Client = require("../models/Client");

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json({
      status_code: 200,
      status_message: "Tous les clients récupérés",
      data: clients,
    });
  } catch (error) {
    res.status(500).json({ status_code: 500, status_message: error.message });
  }
};

// Get client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({
        status_code: 404,
        status_message: "Client non trouvé",
      });
    }
    res.json({
      status_code: 200,
      status_message: "Client récupéré avec succès",
      data: client,
    });
  } catch (error) {
    res.status(500).json({ status_code: 500, status_message: error.message });
  }
};

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json({
      status_code: 201,
      status_message: "Client créé avec succès",
      data: client,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, status_message: error.message });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!client) {
      return res.status(404).json({
        status_code: 404,
        status_message: "Client non trouvé",
      });
    }
    res.json({
      status_code: 200,
      status_message: "Client mis à jour avec succès",
      data: client,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, status_message: error.message });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({
        status_code: 404,
        status_message: "Client non trouvé",
      });
    }
    res.json({
      status_code: 200,
      status_message: "Client supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({ status_code: 500, status_message: error.message });
  }
};
