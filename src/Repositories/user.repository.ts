import User from "../models/user.model";
import db from "../routes/db";
import DatabaseError from "../models/errors/database.error.model";
import { response } from "express";
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';


class userRepository {

    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT user_id, name, email
            FROM application_user
        `;
        const { rows } = await db.query<User>(query);
        return rows || [];
    }

    async findById(user_id: string): Promise<User> {
        try {
            const query = `
                SELECT user_id, name
                FROM application_user
                WHERE user_id = $1       
            `;
            const values = [user_id]
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user;
        } catch (error) {
            console.log(error);
            throw new DatabaseError('Erro na consulta por Id', error);
        }

    }

    async findByNameAndPassword(email: string, password: string): Promise<User | null> {
        try {
            const query = `
                SELECT user_id, name, password
                FROM application_user
                WHERE email = $1
        
        `;

            const values = [email];
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            const ispassword = await bcrypt.compare(password, user.password)
            if (ispassword) {
                return user
            }
            else return null
        } catch (error) {
            console.log(error)
            throw new DatabaseError('Erro na consulta por name e password', error);
        }


    }

    async create(user: User): Promise<User> {
        const script = `
            INSERT INTO application_user (
                name,
                password,
                email,
                sendemail
            )
            VALUES ($1,$2,$3,$4)
            RETURNING user_id, name, email, sendemail
        `;
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(user.password, salt)
        const values = [user.name, hash, user.email, user.sendemail];
        try {
            const { rows } = await db.query<User>(script, values);
            const [newUser] = rows;
            return newUser;
        } catch (error) {
            console.log(error)
            throw error
        }


    }

    async update(user: User): Promise<void> {
        try {
            const script = `
            UPDATE application_user
            SET
                name = $1,
                password = crypt($2, 'my_salt')
            
            WHERE user_id = $3
        `;
            const values = [user.name, user.password, user.user_id];
            await db.query<{ user_id: string }>(script, values);
        } catch (error) {
            throw new DatabaseError('Erro ao mudar usuario', error);
        }


    }

    async remove(user_id: string): Promise<void> {
        try {
            const script = `
            DELETE
            FROM application_user
            WHERE user_id = $1
        `;
            const values = [user_id];
            await db.query(script, values);
        } catch (error) {
            throw new DatabaseError('Erro ao deletar usuario', error);
        }
    }

}

export default new userRepository();