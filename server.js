import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "./webpack.config.dev.js";

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    colors: true
  }
}).listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log('failed to start server');
    return;
  }
  console.log('server running on 0.0.0.0:3000');
  console.log('visit localhost:3000/example on your browser');
});
