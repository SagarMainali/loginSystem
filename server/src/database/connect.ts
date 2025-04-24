import mongoose from 'mongoose';

const makeConnection = async (uri: string) => {
    try{
        await mongoose.connect(uri);
        console.log('Database connection established!')
    }catch(error){
        console.log('Could not connect to database', error);
        process.exit(1);
    }
}

export default makeConnection