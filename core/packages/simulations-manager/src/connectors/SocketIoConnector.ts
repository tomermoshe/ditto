import { EventTypes } from "ditto-shared";
import socketIo from "socket.io";
import SocketIoEvents from "../events/SocketIoEvents";
import { TestPlayRequest } from "../tests/TestPlayRequest";
import { TestExecutor } from "../tests/TestExecutor";
import { createTest } from "../tests/Test";



class SocketIoConnector {
    server: any;
    constructor(server: any) {
        this.server = server;
    }
    connect() {
        const io = socketIo(this.server);

        io.on("connection", (socket) => {
            console.log("New client connected");

            socket.on(SocketIoEvents.PLAY_TEST, async (request: TestPlayRequest) => {
                const test = await createTest(request);
                const testExecutor = new TestExecutor(test);

                testExecutor.on(EventTypes.STEP_STARTED, (step: number) => {
                    socket.emit(EventTypes.STEP_STARTED, step);
                });
                testExecutor.on(EventTypes.STEP_FINISHED, (step: number) => {
                    socket.emit(EventTypes.STEP_FINISHED, step);
                });
                testExecutor.on(EventTypes.STEP_FAILED, (step: number, error) => {
                    socket.emit(EventTypes.STEP_FAILED, step, error);
                });
                testExecutor.on(EventTypes.ENVIRONMENT_EXECUTION_STARTED, () => {
                    socket.emit(EventTypes.ENVIRONMENT_EXECUTION_STARTED);
                });
                testExecutor.on(EventTypes.ENVIRONMENT_EXECUTION_FINISHED, () => {
                    socket.emit(EventTypes.ENVIRONMENT_EXECUTION_FINISHED);
                });
                testExecutor.on(EventTypes.ENVIRONMENT_EXECUTION_STATUS, (message) => {
                    socket.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, message);
                });
                testExecutor.on(EventTypes.ENVIRONMENT_EXECUTION_FAILED, (message) => {
                    socket.emit(EventTypes.ENVIRONMENT_EXECUTION_FAILED, message);
                });

                try {
                    socket.emit(EventTypes.SCENARIO_STARTED);
                    await testExecutor.execute();
                } catch (error) {
                    socket.emit(EventTypes.SCENARIO_STARTED, error);
                }

            });
            socket.on("disconnect", () => {
                console.log("Client disconnected");

            });
        });
        io.listen(8000);
    }
}
export default SocketIoConnector;