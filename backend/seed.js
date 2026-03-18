const mongoose = require('mongoose');
require('dotenv').config();
const FoodItem = require('./models/FoodItem');

const initialItems = [
  { name: 'Maggi', image: '/images/maggi.jpg', modelUrl: '' },
  { name: 'Croissant', image: '/images/croissant.jpg', modelUrl: '' },
  { name: 'Signature Espresso', image: '/images/espresso.jpg', modelUrl: '' },
  { name: 'Berry Cake', image: '/images/berry-cake.jpg', modelUrl: '' },
  { name: 'Avocado Toast', image: '/images/avocado-toast.jpg', modelUrl: '' },
  { name: 'Iced Caramel Latte', image: '/images/iced-latte.jpg', modelUrl: '' }
];

const seedDB = async () => {
  try {
    const count = await FoodItem.countDocuments();
    if (count === 0) {
      console.log('Database empty. Seeding initial items...');
      await FoodItem.insertMany(initialItems);
      console.log('Seeding completed successfully!');
    } else {
      console.log('Database already has items. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arcafe')
    .then(() => seedDB())
    .then(() => {
        console.log('Seed process finished. Disconnecting from database...');
        mongoose.connection.close();
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

module.exports = seedDB;
