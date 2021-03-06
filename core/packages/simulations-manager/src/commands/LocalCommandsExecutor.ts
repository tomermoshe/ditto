import { Command } from "ditto-shared";


export class LocalCommandsExecutor {
    public static async execute(command: Command) {
        switch (command.name) {
            case "wait":
                await new Promise(done => setTimeout(done, command.body.time));
                console.log(`waited for ${command.body.time} milliseconds`);
                break;

            default:
                break;
        }
    }
}