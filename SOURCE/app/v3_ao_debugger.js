var debug = {
    elem: "",
    elemName: "app_debug_container",
    info : {
        name: "AO_Engine.app.debug",
        desc: "Some space for description"
    },
    conf: {
        execTime: true,
        network: true
    },
    data: {
        logList: [],
    },
    func: {
        log(msg = null, type = null){
            //console.log(msg);   
            debug.data.logList.push({ msg: msg, type: type, date: Date.now()});
            //debug.elem.innerHTML += "<consoleLogItem "+type+"><msg>MSG: "+msg+"</msg><br><time>"+ (Date()).toString()+"</time><</consoleLogItem>"
        },
        addLogEvents(){
            console.log('Func.call >> debug.func.addLogEvents()')

            window.console.info = debug.func.info_console;
            window.console.log = debug.func.log_console;
            window.console.warn = debug.func.warn_console;
            window.console.error = debug.func.error_console;

            console.info = debug.func.info_console;
            console.log = debug.func.log_console;
            console.warn = debug.func.warn_console;
            console.error = debug.func.error_console;
        },
        info_console(msg) {
            debug.func.log(msg,"info");
        },
        log_console(msg) {
            debug.func.log(msg)
        },
        warn_console(msg) {
            debug.func.log(msg,"warn")
        },
        error_console(msg) {
            debug.func.log(msg,"error")
        },
        render(){
            console.log("Debugger >> RENDER()");
            (debug.data.logList).forEach(element => {
                debug.elem.innerHTML += "<console_Log_Item "+element.type+" style='border:1px solid orange; margin: 5px;display: flex; flex-direction: column;'><msg>MSG: "+element.msg+"</msg><time>"+element.date+"</time></console_Log_Item>"
            });
        }
    },
    init(){
        console.log("AO_Engine.apps.debug >> init()");
        this.func.addLogEvents();

        this.elem = document.querySelector(this.elemName);
        if (this.elem){
            console.log('Found Debug.elem : '+this.elem);
        } else {
            console.log('Adding Debug.elem : '+this.elem);
            this.elem = document.createElement(this.elemName)
            AO_Engine.elem.appendChild(this.elem);
        }
        this.func.render();
    }
}

if (AO_Engine){    
    AO_Engine.apps.debug = debug;
    debug.init();
} else {
    alert("System Error: Missing AO_Engine. Check your browser logs for more info.")
}