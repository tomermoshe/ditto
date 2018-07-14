import rp from "request-promise";
import { Command } from "./Command";

export class RemoteCommandsExecutor {
    public static async execute(command: Command, simulatorExecutionName: string) {
        const options: rp.Options = {
            method: "POST",
            uri: `http://${simulatorExecutionName}:3000/command`,
            json: true,
            body: command
        };
        await rp(options);
    }
}