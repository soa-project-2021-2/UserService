import User from "../models/user.model";
import db from "../routes/db";
import DatabaseError from "../models/errors/database.error.model";


class userRepository {

    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, name
            FROM application_user
        `;
        const { rows } = await db.query<User>(query);
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        try {
            const query = `
                SELECT uuid, name
                FROM application_user
                WHERE uuid = $1       
            `;
            const values = [uuid]
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user;
        } catch (error) {
            console.log(error);
            throw new DatabaseError('Erro na consulta por Id', error);
        }

    }

    async findByNameAndPassword(name: string, password: string): Promise<User | null> {
        try {
            const query = `
                SELECT uuid, name
                FROM applicantion_user
                WHERE name = $1
                AND password = crypt($2, 'my_salt')
        
        `;
            const values = [name, password];
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user || null;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por name e password', error);
        }


    }

    async create(user: User): Promise<string> {
        const script = `
            INSERT INTO application_user (
                name,
                email,
                password,
                sendemail,
                
            )
            VALUES ($1,$2, crypt($3, 'my_salt'),$4)
            RETURNING uuid
        `;
        const values = [user.name, user.email, user.password, user.sendemail];
        const { rows } = await db.query<{ uuid: string }>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const script = `
            UPDATE application_user
            SET
                name = $1,
                password = crypt($2, 'my_salt')
            
            WHERE uuid = $3
        `;
        const values = [user.name, user.password, user.uuid];
        await db.query<{ uuid: string }>(script, values);

    }

    async remove(uuid: string): Promise<void> {
        const script = `
            DELETE
            FROM application_user
            WHERE uuid = $1
        `;
        const values = [uuid];
        await db.query(script, values);

    }

}

export default new userRepository();