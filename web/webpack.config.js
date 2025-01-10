const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

module.exports = {
  // ใช้ glob เพื่อจับไฟล์ JavaScript ทั้งหมดในโฟลเดอร์ scripts
  entry: glob.sync("./scripts/*.js").reduce((entries, entry) => {
    const entryName = path.basename(entry, path.extname(entry)); // ใช้ชื่อไฟล์เป็นชื่อ entry
    entries[entryName] = `./scripts/${entryName}`;
    return entries;
  }, {}),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/[name].js", // ใช้ชื่อ entry เป็นชื่อไฟล์ที่คอมไพล์
  },

  module: {
    rules: [
      {
        test: /\.js$/, // ใช้ Babel คอมไพล์ไฟล์ .js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  plugins: [
    // ใช้ HtmlWebpackPlugin สำหรับแต่ละไฟล์ HTML ในโฟลเดอร์ pages
    ...glob.sync("./pages/*.html").map(
      (file) =>
        new HtmlWebpackPlugin({
          template: file,
          filename: path.basename(file), // ใช้ชื่อไฟล์ HTML เป็นชื่อที่ออกมาใน dist
        })
    ),
  ],
};
