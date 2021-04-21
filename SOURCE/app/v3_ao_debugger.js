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
            const id = debug.data.logList.length;
            debug.data.logList.push({ id: id, msg: msg, type: type, date: Date.now()});
            debug.func.render();
        },
        addLogEvents(){

            window.console.info = debug.func.info_console;
            window.console.log = debug.func.log_console;
            window.console.warn = debug.func.warn_console;
            window.console.error = debug.func.error_console;

            console.info = debug.func.info_console;
            console.log = debug.func.log_console;
            console.warn = debug.func.warn_console;
            console.error = debug.func.error_console;

            console.trace = debug.func.trace_console;
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
        trace_console(msg) {
            debug.func.log(msg,"trace");
        },
        render(){
            debug.elem.innerHTML = "";
            (debug.data.logList).forEach(element => {
                var elemHelper = document.createElement("console_Log_Item");
                elemHelper.setAttribute('id',element.id)
                elemHelper.classList.add(element.type);
                var elemMsg = document.createElement("msg");
                var msgH = document.createTextNode(element.msg);
                elemMsg.appendChild(msgH);
                var elemTime = document.createElement("time");
                var timeH = document.createTextNode(element.date);
                elemTime.appendChild(timeH);
                elemHelper.appendChild(elemMsg);
                elemHelper.appendChild(elemTime);

                elemHelper.onclick = function () {
                  console.log("Event [Click] >> Log item id: { "+ this.id +" } type: " + this.classList);
                };

                debug.elem.appendChild(elemHelper);

               // debug.elem.innerHTML += "<console_Log_Item "+element.type+" style=''><msg>MSG: "+element.msg+"</msg><time>"+element.date+"</time></console_Log_Item>"
            
            });
        }
    },
    init(){
        
        this.func.addLogEvents();

        this.elem = document.querySelector(this.elemName);
        if (this.elem !== null){
            console.error('Found :: Removing Debug.elem : '+this.elem);
            this.elem.remove();
        };
        this.elem = document.createElement(this.elemName);
        ao.elem.appendChild(this.elem);
        this.func.render();

        //trigger "custom event" essensially....but through this custom function call.
        window.debugStarted();
    }
}

debug.init();
