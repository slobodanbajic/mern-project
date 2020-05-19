const app = require("./app");
const config = require("./config");

const { PORT } = config;

app.listen(PORT || 5000, () => console.log(`Server started on PORT ${PORT}`));