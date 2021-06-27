import { getConnection, createConnection} from 'typeorm';
import { connectionConfig } from '../common/ormconfig';



const connectToDB = async () => {
    let connection;

    try {
        connection = getConnection();
    } catch(err) {
         
    }

    try {
        if(connection) {
            if(!connection.isConnected) await connection.connect();
        } else {
            createConnection(connectionConfig);
        }
        console.log("Successfully connected")
    } catch(err) {
        console.error("Connection error: ", err)
    }
}

export const tryDBConnect = async (cb: () => void): Promise<void> => {
    try {
        await connectToDB();
        cb();
    } catch(err) {
        console.error("Connection error: ", err)
    }
} 