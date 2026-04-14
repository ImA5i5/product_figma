require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const dbConn=require("./app/config/db")
const cors = require("cors");            
const morgan = require("morgan");

const { auth } = require("./app/middlewares/auth.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./app/config/swagger");
const app = express();
dbConn()

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true               
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(auth);
const AuthRoutes=require("./app/routes/auth.routes")
app.use("/api/auth",AuthRoutes)

const AdminRoutes=require("./app/routes/admin.routes")
app.use("/api/admin",AdminRoutes)

const PublicRoutes=require("./app/routes/public.routes")
app.use("/api",PublicRoutes)

const UserRoutes=require("./app/routes/user.routes")
app.use("/api/user",UserRoutes)



app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));





module.exports=app