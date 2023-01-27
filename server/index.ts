import express, {Request, Response, NextFunction} from 'express';
// import express, {RequestHandler} from 'express';
import {json} from 'body-parser';
const app = express();

app.use(json());

app.get("/api", (req: Request, res: Response, next: NextFunction)=>{
    res.json({message: "Hello from server!"});
});

// app.use((err: Error, req: Request, res: Response)=>{
//     res.json({message: err.message})
// });

app.listen(3001, ()=>console.log('Server is running'));