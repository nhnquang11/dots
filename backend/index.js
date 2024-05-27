const config = require("./utils/config");
const { server } = require("./server");

server.listen(config.PORT || 3001, () => {
  console.log(`Server running on port ${config.PORT}`);
});
