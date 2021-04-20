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
    apps: {
        
    },
    func: {
        render(){
            var ao = AO_Engine;
            if (ao.conf.debug){
                console.log('[ Func_call >> AO_Engine.func.render() ]')
                console.trace();
                console.log(this);
                console.log(ao);
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
            console.warn('Welcome to AO_APP_ENGINE. Hope you have fun!')
            this.func.loadApp('/v3_ao_debugger.js');
            //this.apps.debug.init();
            //this.apps.debug.func.log('Some Init Message to test this.')
        /*    this.apps.debug = {
                info : {
                    name: "AO_Engine.app.debug",
                    desc: "Some space for description"
                },
                conf: {
                    execTime: true,
                    network: true
                },
                data: {},
                func: {
                    log(msg = null){
                        console.log(msg);
                    }
                }
            } */
        };
        this.elem = document.querySelector(this.selector) || document.body;
        this.func.render();
    }
}

var ao = AO_Engine;



// A^O_APP_ENGINE INIT

ao.init();