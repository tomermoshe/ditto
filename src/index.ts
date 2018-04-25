import { SimulatorExecutor } from "./controllers/simulatorExecutor";

(async () => {
    // const id = await SimulatorExecutor.execute(
    // {
    //     id: {
    //         name: "nginx",
    //         version: "latest"
    //     }
    // });

    await SimulatorExecutor.stop("khfix5gvgk0amzkzsmtmr91t7");
}
)();