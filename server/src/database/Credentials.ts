import { Schema, model } from 'mongoose';

type UserCredsType = {
    email: string;
    password: string;
}

// structure of docs in the collection
const userCredentialsSchema = new Schema<UserCredsType>({
    email: String,
    password: String
})

// model in mongoose is a interface that communicates with collection in mongodb
const UserCredentials = model<UserCredsType>('UserCredentials', userCredentialsSchema)

export default UserCredentials
