import express, {Request, Response, NextFunction, application} from 'express';
import bodyParser, { json } from 'body-parser';
import path from 'path'

const app = express()


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api", (req: Request, res: Response, next: NextFunction)=>{
    res.json({message: "Hello from server!"});
});

app.listen(3000, ()=>console.log('server up and running'));