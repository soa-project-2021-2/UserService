import { Client } from "pg"

const connectionString = "postgres://msxgdyayfdqhzd:a71ad2cb52afdaf472f83f84dd2e77d0fe6b04bdcf60c57eecb62fbadb6b76fb@ec2-54-147-36-107.compute-1.amazonaws.com:5432/d9rpkdgf4fl51r";

const db = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});



export default db;