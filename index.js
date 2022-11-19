import express from "express";
const app = express();
import cors from "cors";
import { Products } from "./products.js";
app.use(cors());

import livereload from "livereload";
import connectLiveReload from "connect-livereload";
const port = process.env.PORT || 5000

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 1000);
});

app.use(connectLiveReload());

app.get("/", (req, res) => {
    const { q } = req.query;
    console.log("🚀 ~ file: index.js ~ line 9 ~ app.get ~ q", q)

    const keys = ["title", "category", "description"];

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    // console.log(search(Products));

    q ? res.json(search(Products)) : res.json(Products.slice(0, 15));
});

app.get("/filter", (req, res) => {
    const { q } = req.query;
    console.log("🚀 ~ file: index.js ~ line 9 ~ app.get ~ q", q)

    const categories = q.split(",");
    console.log("🚀 ~ file: index.js ~ line 30  ~ categories", categories)


    const search = (data) => {
        return data.filter((item) =>
            categories.some((key) => item.category === key)
        );
    };

    // console.log(search(Products));

    q ? res.json(search(Products)) : res.json(Products.slice(0, 10));
    // 
});

app.get("/categories", (req, res) => {

    const categories = [...new Set(Products.map((itam) => itam.category))]
    console.log("🚀 ~ file: index.js ~ line 61 ~ app.get ~ categories", categories)

    res.json(categories)
});
app.listen(port, () => console.log("API is working!"));
