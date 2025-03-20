const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Khai báo biến codes để lưu trữ mã
let codes = {};

app.use(express.json());

// Route cho đường dẫn gốc
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Endpoint để nhận mã từ máy A
app.post("/send-code/:profileId", (req, res) => {
  const profileId = req.params.profileId;
  const code = req.body.code;
  codes[profileId] = code;
  console.log(`Received code for profile ${profileId}: ${code}`);
  res.send("Code received");
});

// Endpoint để máy B lấy mã
app.get("/get-code/:profileId", (req, res) => {
  const profileId = req.params.profileId;
  const code = codes[profileId];

  if (code) {
    res.json({ code });
  } else {
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
