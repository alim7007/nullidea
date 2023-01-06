const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Post = require("../models/idea");

mongoose.connect(
  "mongodb+srv://alimkhan:krasnaya7007m@cluster1.8j4zv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Post.deleteMany({});
  for (let i = 0; i < 150; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Post({
      //YOUR USER ID
      author: "60fee6176dc94b0ff5c4758d",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      // images: [
      //   {
      //     url: "https://source.unsplash.com/collection/483251",
      //     filename: "https://source.unsplash.com/collection/483251",
      //   },
      //   {
      //     url: "https://source.unsplash.com/collection/483251",
      //     filename: "https://source.unsplash.com/collection/483251",
      //   },
      // ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
