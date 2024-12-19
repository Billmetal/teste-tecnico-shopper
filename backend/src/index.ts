import { NextFunction, Request, Response } from 'express';
import routerEstimate from './routes/estimate';
import routerConfirm from './routes/confirm';
import routerTrips from './routes/trips';

const express = require("express");
const app = express();

// json
app.use(express.json());

// cors
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type");
    next();
});

// estimate route
app.use("/ride",routerEstimate);

// confirm route
app.use("/ride",routerConfirm);

// trips route
app.use("/ride",routerTrips);

// // get user by id
// app.get("/users/:id", async (req: Request, res: Response) => {
//     getUserById(Number(req.params.id)).then(user => {
//         res.status(200).json(user);
//     }).catch((error: Error) => {
//         res.status(500).json({ message: error.message });
//     });
// });

// // create user
// app.post("/users", async (req: Request, res: Response) => {
//     const body: User = req.body;
//     createUser(body).then(user => {
//         res.status(201).json(user);
//     }).catch((error: Error) => {
//         res.status(500).json({ message: error.message });
//     });
// });

// // update user
// app.patch("/users/:id", async (req: Request, res: Response) => {
//     const body: User = req.body;
//     updateUser(Number(req.params.id), body).then(user => {
//         res.status(200).json(user);
//     }).catch((error: Error) => {
//         res.status(500).json({ message: error.message });
//     });
// });

// // delete user
// app.delete("/users/:id", async (req: Request, res: Response) => {
//     deleteUser(Number(req.params.id)).then(user => {
//         res.status(200).json(user);
//     }).catch((error: Error) => {
//         res.status(500).json({ message: error.message });
//     });
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

