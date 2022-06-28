const mongoose = require("mongoose");
const Joi = require('joi');

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    
  },
  { timestamps: true }
  
);

const Card = mongoose.model('Card', CardSchema);

function validateCard(card) {

  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    desc: Joi.string().min(2).max(1024).required(),
    address: Joi.string().min(2).max(400).required(),
    phone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),

  });

  return schema.validate(card);
}

exports.Card = Card;
module.exports = mongoose.model("Card", CardSchema);
exports.validateCard = validateCard;