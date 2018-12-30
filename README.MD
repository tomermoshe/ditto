# Ditto

## Simulator Requirements 

### Configuration Schema

Json schema that represents the environment configuration that the simulator will get as environment variables from the simulators manager.

Example: Say your simulator needs to get *wheatherApiUrl*, *weatherApiPort*. the schema will look like:
```
{
"type": "object",
"properties": {
    "wheatherApiUrl": {
    "type": "string"
    },
    "weatherApiPort": {
    "type": "integer"
    }
},
"required": [
    "wheatherApiUrl",
    "weatherApiPort"
]
}
```

Those variables will be available to you as environment variables. 
In node.js you can access them as the following:
```
const watherApiUrl = process.env.watherApiUrl;
const weatherApiPort = process.env.weatherApiPort;
```

### Commands Definition

Commands definition is a Json configuration file that will document the commands your simulator supports in the following form:
```
[
    {
        "commandName"   : "name-of-your-first-command",
        "commandSchema" : "json-schema-of-you-first-command" 
    },
    {
        "commandName"   : "name-of-your-second-command",
        "commandSchema" : "json-schema-of-you-second-command" 
    },
    ...
]
```

Example: 
```
[
    {
        "commandName" : "setWeatherInC",
        "commandSchema" : 
        {
            "type": "object",
            "properties": {
                "degrees": {
                "type": "integer"
                }
            },
            "required": [
                "degrees"
            ]
        }
    },
    {
        "commandName" : "setWeatherInF",
        "commandSchema" : 
        {
            "type": "object",
            "properties": {
                "degrees": {
                "type": "integer"
                }
            },
            "required": [
                "degrees"
            ]
        }
    }
]
```

### Http Paths

Your simulator needs to listen for port 3000:

#### GET /ready

Returns code 200 when the simulator is ready to get commands. This is important because the simulation manager will check that all the simulators are ready before starting the scenario execution.

#### POST /command/your-command-name

For each command that your simulator supports (which are described in the Commands Definition section) you should should expose POST /command/your-command-name.

Let's continue tiniue the example above: 

Our simulator will expose POST /command/setWeatherInC and the json he will get like the following (as described in his commandSchema):

```
{
  "degrees" : 15
}
```

### Docker

Your simulator has to run in docker.
When you deploy your simulator it should be in the following format:

A sim.tar file like follows:
```
.
├── your-project-folders        
├── your-project-files 
├── .dockerignore                  
└── Dockerfile 
```
Simulation Manager will build your image after deployment according to the Dockerfile.
