// https://levelup.gitconnected.com/setup-express-with-typescript-in-3-easy-steps-484772062e01

import ApiServer from './ApiServer';
const apiServer = new ApiServer();
const port = process.env.PORT || '3000';
apiServer.start(Number(port)); 
