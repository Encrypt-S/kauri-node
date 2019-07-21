"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiServer_1 = require("./ApiServer");
const apiServer = new ApiServer_1.default();
apiServer.start(3000);
