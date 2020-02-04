const async = require('async');
const mongoose = require('mongoose');
const MenuDB = require('./server/models/MenuItem.js');
//const Seed = require('./MenuItem.json')

mongoose.connect('mongodb://localhost/menu', { useNewUrlParser: true }).then(() => console.log('db connected'));

/* Menu Names */
const menus = Array.from({ length: 100 }, (e, i) => i + 1);
const categories = [1, 2, 3];
const Model = MenuDB.MenuItem;

const menuNames = ['Burger', 'Chicken', 'Cheese', 'Nuggets', 'Sandwich', 'Big', 'Double', 'Triple', 'Mac', 'Swiss', 'BBQ', 'SweetNSour', 'Bacon', 'Chocolate', 'Spicy', 'Vanilla', 'Hot', 'Fish', 'Filet', 'Hotcakes', 'Muffin', 'Sausage', 'Tenders', 'Burrito', 'Strawberry', 'Egg', 'Parfait', 'Grand', 'Deluxe'];

/* Description Words */
const descriptionWords = ['Briny', 'Bitter', 'Bittersweet', 'Cooling', 'Acidic', 'Earthy', 'Fiery', 'Full-bodied', 'Herbal', 'Fresh', 'Robust', 'Spicy', 'Sweet', 'Tart', 'Airy', 'Buttery', 'Crunchy', 'Delicate', 'Crusty', 'Gooey', 'Juicy', 'Smooth', 'Velverty', 'Succulent', 'Baked', 'Braised', 'Caramelized', 'Charred', 'Fried', 'Roasted', 'Sauteed', 'Smoked', 'Aroma', 'Bold', 'Candied', 'Filled', 'Cheesy', 'Salty', 'Delicious', 'Garlicky', 'Glazed', 'HOT', 'Low-Fat', 'Luscious', 'Oniony', 'Peppery', 'Sizzling', 'Tender', 'Zesty'];

/* Possible Options */
const possibleOptions = ['Large Fry', 'Small Fry', 'Coke', 'Diet Coke', 'Orange Soda', 'Grape Soda', 'Small Cone', 'Cookie', 'Extra Onions', 'Extra Cheese', 'No Pickles', 'No Tomatoes', 'No Onions', 'No Cheese', 'Hashbrown', 'Extra Mayo', 'No Mustard', 'Milk', 'Coffee', 'Apple Slices', 'Ranch', 'BBQ Sauce', 'Honey Mustard', 'Apple Juice', 'Salad', 'Salt', 'Pepper', 'Ketchup', 'Mayo', 'McFlurry', 'Fruit Salad', 'Salad Dressing'];

/* Random Number */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* Random Menu Item Option Object */
function getRandomMenuItemOptions() {
  const results = {};
  for (let i = 0; i <= 6; i++) {
    randomOption = possibleOptions[getRandomInt(32)];
    results[randomOption] = false;
  }
  return results;
}

/* Random Description */
function getRandomDescription() {
  let result = '';
  for (let i = 0; i <= getRandomInt(8); i++) {
    result += ` ${descriptionWords[getRandomInt(descriptionWords.length)]}`;
  }
  return result;
}

/* Random Menu Item */
function getRandomMenuItem() {
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += ` ${menuNames[getRandomInt(menuNames.length)]}`;
  }
  return result;
}

/* Random Price */
function getRandomPrice() {
  const result = `${getRandomInt(15)}.${getRandomInt(9)}${getRandomInt(9)}`;
  return result;
}

/* New Menu Item*/
const randomItem = Model => ({
  name: getRandomMenuItem(),
  description: getRandomDescription(),
  price: getRandomPrice(),
  options: getRandomMenuItemOptions(),
});

// This script seeds a MongoDB collection with docs of the following format:
//
// collection = {
//   doc: {
//     name: String,
//     description: String,
//     price: String,
//     options: Object,
//     menu: Array,
//     category: Number,
//   }
// }
//
// Conceptually, the collection must conform to the following rules:
//   - Each menu from an array of possible menus of length M contains all categories in an array of possible categories of length P.
//   - Each category in each menu contains N docs sampled from an array of all docs of length Q.
//   - If Q < M * P * N, sampling docs is performed with replacement after all docs have been used to fill M menus.
//
// menus = [
//   {
//     category_1: [
//       doc_1, doc_2, doc_N
//     ],
//     category_2: [
//       doc_1, doc_2, doc_N
//     ],
//     category_P: [
//       doc_1, doc_2, doc_N
//     ]
//   }
// ]
function chunk(arr, chunk) {
  const r = [];
  for (var i=0; i<arr.length; i+=chunk)
    r.push(arr.slice(i, i+chunk));
  return(r)
}

async function qQuery(N, doc, Model) {
  const out = []
  const results = await Model.find({}, doc)
  const iter = Array.from({length:Math.ceil(results.length/N)})
  for(i in iter){
    out.push(chunk(results, N)[i].map(function(id, idx){
      return(id._id)
    }))
  }
  return(out)
}

async function * fieldGenerator(N, field, Model) {
  const fieldResults = await qQuery(N, field, Model)
  while(true){
    yield * fieldResults
  }
}

async function seed(n, Model, doc){
  // Seed a specified collection with N documents
  // @param n <Number> The total number of documents to seed
  // @param Model <mongoose.Model> The collection to seed
  // @param doc <Object> The doc to seed in the collection
  const results = []
  const M = Array.from({length: n}, function(e,i){ return( i+1 ) })
  for(m in M){
    const model = new Model(doc())
    const result = await model.save()
    results.push(result)
  }
  return(results)
}

async function updateMenus(n, categories, menus, Model){
  // The primary method used to seed categories and menus of each menu item
  // @param n <Number> The number of items in each category of a single menu
  // @param categories <Array> A list of all possible categories
  // @param menus <Array> A list of all possible menus
  // @param Model <mongoose.Model> The collection in which updates will be applied
  console.log('Seeding...')
  const results = []
  const idGenerator = fieldGenerator(n, '_id', Model)
  let chunk
  for(menu of menus){
    for(category of categories){
      chunk = await idGenerator.next()
      const field = {
        query: {
          _id: {
            $in: chunk.value
          }
        },
        update: {
          $push:{
            menu: menu
          },
          category: category
        }
      }
      const result = await Model.updateMany(field.query, field.update)
      results.push(result)
      if(category === 2 && menu===34){
        console.log(result)
        console.log('Menu: ', field.update.$push.menu)
        console.log('Category: ', field.update.category)
      }
    }
  }
  return(results)
}

async function _logger(menus, Model, log){
  // Log the model and check for conformity
  // @param menus <Array> An array of all menus to log
  // @param Model <mongoose.Model> The collection to log
  // @log log <Boolean> Log the output to console?
  const scaffold = []
  const messages = []
  let status = true
  console.log('Preparing summary...')
  for(let i=1; i<menus.length; i++){
    scaffold[i] = []
    const categories = []
    const menu_i = await Model.find({$where : 'this.menu.indexOf(' + i + ') != -1'})
    for(item_j of menu_i){
      const cat_k = parseInt(item_j.category)
      categories[cat_k] = categories[cat_k] ? categories[cat_k]+1 : 1
    }
    const substrings = categories.map(function(n,c){ return((parseInt(c)?'\b\b':'\b ') + n + ' docs in category ' + c + '\b\n\t') })
    const msg = 'Menu #' + i + ' has:\n\t' + substrings
    messages.push(msg)
    status = categories.every(function(val, i, arr){ val === arr[0] })
    scaffold[i].push(categories)
  }
  if(log){
    for(m of messages) console.log(m)
    if(!status){
      console.log('\All menus DO NOT contain the same number of items in each category. See \'scaffold\' in the return value for details.')
    }else{
      console.log('\nAll menus contain categories of sizes' + String(scaffold[scaffold.length-1]).replace(',', ' '))
    }
  }
  return(
    {
      scaffold: scaffold,
      messages: messages,
      status: status
    }
  )
}
function _sweep(Model){
  // Clear the collection before seeding
  // @param <mongoose.Model> The collection to seed
  console.log('Clearing collection...')
  return Model.deleteMany({})
}

_sweep(Model)
.exec(function(){
  seed(1000000, Model, randomItem)
  .catch(function(err){ console.error(err) })
  .then(function(){
    updateMenus(10, categories, menus, Model)
    .catch(function(err){ console.error(err) })
    .then(function(){
      _logger(menus, Model, true).then(function(res){
        process.exit()
      })
    })
  })
})
