
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/Camp-Scape', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Databse connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 500);
        const camp = new Campground({
            author: '668eb830b2ace37504d00807', 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos blanditiis minima recusandae soluta doloremque, eum aliquid vel reiciendis optio odit corrupti est natus inventore velit! Itaque, dolore nam? Possimus natus optio perferendis rerum velit incidunt minus ipsam.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/df2nbd3q3/image/upload/v1722668077/CampScape/ddcgy3xeocx6ckkqacsf.jpg',
                  filename: 'CampScape/ddcgy3xeocx6ckkqacsf'
                },
                {
                  url: 'https://res.cloudinary.com/df2nbd3q3/image/upload/v1722668082/CampScape/jjnznncro0yjyk5uevzn.jpg',
                  filename: 'CampScape/jjnznncro0yjyk5uevzn'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})