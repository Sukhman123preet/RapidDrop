const fs = require("fs");
const { SmashDownloader } = require("@smash-sdk/downloader");

const sd1 = new SmashDownloader({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVjZTExODk3LWU0YTYtNDljZS1iYTE1LWIzZjFiZjliNDE2NS1kdSIsInVzZXJuYW1lIjoiNjVhZjVkOGEtYzZlNS00NzI3LWFiZTgtZjI0MzgzOWE1ODA4IiwicmVnaW9uIjoiZXUtY2VudHJhbC0xIiwiaXAiOiIxMDMuNDEuMzYuMjA2Iiwic2NvcGUiOiJOb25lIiwiYWNjb3VudCI6IjFmODIyOWVhLTcxYzktNGIzNS1hMTMzLWYzNjE3MjM1ZWZlYS1kYSIsImlhdCI6MTc0MDE0NjUwMiwiZXhwIjo0ODk1OTA2NTAyfQ.Iq1gPaHO2C4e26S74xtUC38Ngso_YR7aBOytY14cG5E",
    transferId: "mcgmD1GADa-dt",
    path: "ans.pdf",
    enableOverride: true,
});

sd1.download().then(downloadedItem => {
    console.log("Download", downloadedItem);
}).catch(error => {
    console.log("Error", error);
});