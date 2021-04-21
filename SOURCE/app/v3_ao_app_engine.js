// A^O_APP_ENGINE .... V.3.

var AO_Engine = {
    //selector : "body",  //Feel free to change, try out something wild. :D
    elem: "",
    info: {
        name: "A^O Application Engine ver.1.4.20",
        description: "Will see to add more here. This is just a placeholder for something short that can explain what the hell is this thing."
    },
    data: {

    },
    conf: {
        debug: true,
        protocol: "http",
        origin: "localhost",
        port: "8080"
    },
    func: {
        render(){
            var ao = AO_Engine;
            if (ao.conf.debug){
                console.warn("Welcome to AO_APP_ENGINE. Hope you have fun!");
                console.error('[ Func_call >> AO_Engine.func.render() ]')
                console.trace();
                console.info(ao);
            }
        },
        loadApp(appURL){
            var script = document.createElement('script');
            script.onload = function () {
                //do stuff with the script
                console.log('appLoaded >> '+appURL);
            };
            script.src = appURL;
            
            document.body.appendChild(script);
        }
    },
    init() {
        if (this.conf.debug){
            this.func.loadApp('/v3_ao_debugger.js');
        };
        this.elem = document.querySelector(this.selector) || document.body;

        window.debugStarted = function(){
            console.log("SO >> window.debugStarted()");
            ao.func.render();
            console.warn("EO >> window.debugStarted() ");
        }
    }
}

var ao = AO_Engine;



// A^O_APP_ENGINE INIT

ao.init();