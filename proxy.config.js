const PROXY_CONFIG = [
    {
      context: [
        "/api",
      ],
       target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      pathRewrite: function (path) {
      console.log("Server Rewrite Request received: " + path);
      var newUrl = path.replace("/api/", "/");
      console.log("Server Rewrite Request received newUrl: " + newUrl);
      return newUrl;
    },
      router: function (req) {
        console.log('Server Request received: ' + req.originalUrl);
        var target = 'http://localhost:8080'; // or some custom code
        return target;
      },
      logLevel: "debug",
    }
  ]
  module.exports = PROXY_CONFIG;