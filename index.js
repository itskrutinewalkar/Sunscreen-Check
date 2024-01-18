import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "";
const config = {
    headers: {
        'x-access-token' : '',
    }
};

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    try {
     const response = await axios.get( `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`, {
        headers: {
            'x-access-token' : apiKey,
        }
     });
    
      const uv_index = response.data.result.uv;
      res.render("result.ejs", {content: uv_index});
    }

    catch(error) {
        res.send(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
