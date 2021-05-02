// dependencies
const express = require("express");
const htmlRoutes = require("./routes/viewRoutes")
const apiRoutes = require("./routes/apiRoutes")

// config port
const app = express();
const PORT = process.env.PORT || 4000;

// use 'public' folder content
app.use(express.static('public'));

// encrypt passed data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

// run server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
