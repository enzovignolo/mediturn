import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
//
const port =
	process.env.ENV == 'dev'
		? process.env.PORT_dev
		: process.env.PORT_prod;

const dbServer =
	process.env == 'dev' ? process.env.DB_dev : process.env.DB_prod;

//Anonymous async function to connect to the DB
(async () => {
	try {
		//Wait to mongoose to resolve connection
		await mongoose.connect(`${dbServer}`, { useFindAndModify: false });
		//If connection with DB was possible
		console.log('[OK] DB Connected');
	} catch (err) {
		//Errors if we couldn't connect to DB
		console.error('[ERR] There was an error connecting to the DB');
		console.log(err);
		//TODO: CLOSE APPLICATION WHEN YOU COULDN'T CONNECT
	}
})();

const server = app.listen(port, () =>
	console.log(`Server Running on ${port}`)
);
