const express = require("express");
const fs = require("fs");
const { SmashDownloader } = require("@smash-sdk/downloader");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/download", async (req, res) => {
  const { transferId } = req.body;

  if (!transferId) {
    return res.status(400).json({ error: "Transfer ID is required." });
  }

  const filePath = `./downloads/${transferId}.pdf`;

  try {
    // Ensure downloads directory exists
    if (!fs.existsSync('./downloads')) {
      fs.mkdirSync('./downloads');
    }

    const downloader = new SmashDownloader({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVjZTExODk3LWU0YTYtNDljZS1iYTE1LWIzZjFiZjliNDE2NS1kdSIsInVzZXJuYW1lIjoiNjVhZjVkOGEtYzZlNS00NzI3LWFiZTgtZjI0MzgzOWE1ODA4IiwicmVnaW9uIjoiZXUtY2VudHJhbC0xIiwiaXAiOiIxMDMuNDEuMzYuMjA2Iiwic2NvcGUiOiJOb25lIiwiYWNjb3VudCI6IjFmODIyOWVhLTcxYzktNGIzNS1hMTMzLWYzNjE3MjM1ZWZlYS1kYSIsImlhdCI6MTc0MDE0NjUwMiwiZXhwIjo0ODk1OTA2NTAyfQ.Iq1gPaHO2C4e26S74xtUC38Ngso_YR7aBOytY14cG5E",
      transferId: transferId,
      path: filePath,
      enableOverride: true,
    });

    await downloader.download();

    res.download(filePath, `RapidDrop_${transferId}.pdf`, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return res.status(500).json({ error: "Failed to send the file." });
      }

      // Cleanup file after 1 minute
      setTimeout(() => {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error removing file:", err);
          else console.log("Temporary file deleted:", filePath);
        });
      }, 60000);
    });

  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download the file." });
    
    // Cleanup on error
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error removing file:", err);
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});