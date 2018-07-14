var rp = require("request-promise");
require("log-timestamp");

(async () => {

    while(true){
        try {
            await (async () => {
                let options = {
                    method: "POST",
                    uri: `http://hello-world:3000/command`,
                    json: true,
                    timeout: 1000,
                    body: { name: "World" }
                };
                await rp(options);
                console.log("post succeded");
                
                
        })(); 
        } catch (error) {
            console.log(error);
        }
        await new Promise(done => setTimeout(done, 500));
    }
    
})();


