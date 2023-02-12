import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export default async ()=>
{
    mongoose.set('strictQuery', false);
    const connect =  await mongoose.connect(process.env.DB_CONNECT)
    console.log(`DB connected sucessful ${connect.connection.host}`);
}
