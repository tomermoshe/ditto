import { SimulatorConfigModel, SimulatorConfig } from "../models/SimulatorConfig";


const sc: SimulatorConfig = {
    id: {
        name: "Pasha",
        version: "3"
    }
}

const config = new SimulatorConfigModel(sc);


(async () => {
    try {
        await config.save();

    }
    catch (e) {
        console.log(e);
    }
})();