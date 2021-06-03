const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  // Nazwa przedmiotu
  name: {
    type: String,
    unique: true,
    required: true
  },
  // Data dodania
  created_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Miejsca użycia/przechowywania
  category: {
    type: String,
    required: true
  },
  // Ilość
  amount: {
    type: Number,
    required: true
  },
  // Szacowany czas zużycia jednej sztuki
  consumption_time: {
    type: String,
    required: true
  },
  // Szacowana data życia przechowywanych przedmiotów
  ends_in: {
    type: Date,
    required: true
  },
  // Cena za sztukę
  prize: {
    type: Number,
    required: true
  },
  // Miejsca gdzie można kupić przedmiot
  where_to_buy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("item", ItemSchema);
