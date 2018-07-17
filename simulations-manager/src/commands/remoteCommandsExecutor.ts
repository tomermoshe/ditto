import rp from "request-promise";
import { Command } from "./Command";

export class RemoteCommandsExecutor {
    public static async execute(command: Command, simulatorExecutionName: string) {

        const options: rp.Options = {
            method: "POST",
            uri: `http://${simulatorExecutionName}:3000/command/${command.name}`,
            json: true,
            body: command.body
        };
        await rp(options);
    }
}