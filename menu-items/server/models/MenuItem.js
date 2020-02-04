const mongoose = require('mongoose');

/* Schema */
const MenuItemSchema = mongoose.Schema({
  name: String,
  description: String,
  price: String,
  options: Object,
  menu: Array,
  category: Number,
});

/* Model */
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

/* Query */
const getMenu = params => MenuItem.find(params)
  .then(data => (JSON.stringify(data)))
  .catch((err) => { throw err; });

module.exports.MenuItem = MenuItem;
module.exports.getMenu = getMenu;
