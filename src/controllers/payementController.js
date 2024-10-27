const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Order = require("../models/Order");
const Evenement = require("../models/Evenement");
const YOUR_DOMAIN = "http://localhost:5173/";

// Hello endpoint
exports.hello = (req, res) => {
  res.json({
    status_code: 200,
    status_message: "Hello world",
    data: {},
  });
};

// Stripe payment processing
exports.stripe = async (req, res) => {
  try {
    const { param, day, mail, typesEvenement, dateEvenement, prix, user_id } =
      req.body;

    const lineItems = [
      {
        price: param, // Price ID
        quantity: day,
      },
    ];

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: mail,
      line_items: lineItems,
      mode: "subscription",
      subscription_data: {
        trial_from_plan: true,
      },
      success_url: `${YOUR_DOMAIN}redirect/succes`,
      cancel_url: `${YOUR_DOMAIN}redirect/cancel`,
    });

    // Create an order record
    const order = new Order({
      status: "unpaid",
      event_types: typesEvenement,
      date_event: dateEvenement,
      total_price: prix,
      session_id: checkoutSession.id,
      user_id: user_id,
      user_mail: mail,
    });

    await order.save();

    // Send the checkout session URL to the frontend
    res.json({
      status_code: 200,
      status_message: "Session de paiement créée avec succès",
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Error creating payment session:", error.message);
    res.status(500).json({
      status_code: 500,
      status_message: "Erreur serveur: " + error.message,
    });
  }
};

// Success handling
exports.success = async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.redirect(`${YOUR_DOMAIN}redirect/cancel`);
    }

    const order = await Order.findOne({ session_id: session.id });

    if (!order) {
      return res.redirect(`${YOUR_DOMAIN}redirect/cancel`);
    }

    if (order.status === "unpaid") {
      order.status = "paid";
      await order.save();
    }

    // Create an event record
    const evenement = new Evenement({
      types: order.event_types,
      date_evenement: order.date_event,
      prix: order.total_price,
      validation: 1,
      client_id: order.user_id,
    });

    await evenement.save();

    return res.redirect(`${YOUR_DOMAIN}redirect/succes`);
  } catch (error) {
    console.error("Error processing success:", error.message);
    return res.redirect(`${YOUR_DOMAIN}redirect/cancel`);
  }
};

// Cancel handling
exports.cancel = (req, res) => {
  return res.redirect(`${YOUR_DOMAIN}redirect/cancel`);
};
