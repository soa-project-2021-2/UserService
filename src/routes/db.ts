import { Client } from "pg"

const connectionString = "postgres://cbgleasdgfpbzi:a9df5df24eeff3e8c9d5fa826dba3b794f6cab59cd7d55bffbb3e9838e09ca1b@ec2-44-199-9-102.compute-1.amazonaws.com:5432/d6ca4703cur2pm";

const db = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});



export default db;