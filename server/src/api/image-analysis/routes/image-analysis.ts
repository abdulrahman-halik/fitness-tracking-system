import path from "path";
import { Routes } from "react-router-dom";

export default{
    routes:[
        {
            method: "POST",
            path: "/image-analysis",
            handler: "image-analysis.analyze",
            config: {auth: false}
        }
    ]
}