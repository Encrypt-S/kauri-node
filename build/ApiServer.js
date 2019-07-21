"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const controllers = require("./controllers");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
class ExampleServer extends core_1.Server {
    constructor() {
        super(true);
        this.SERVER_STARTED = 'Example server started on port: ';
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); //@TODO tighten this before production deployment
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })
        this.setupControllers();
    }
    setupControllers() {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = controllers[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }
    start(port) {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            logger_1.Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}
exports.default = ExampleServer;
