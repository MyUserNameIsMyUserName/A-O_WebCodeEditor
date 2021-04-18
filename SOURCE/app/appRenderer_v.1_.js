//╔═══════════════════════════════════════════════════════════════════════════════╗
//║ ♠ File Name: app.js                                                           ║
//║ ↔ Location: <: public_root :>/ app.js                                         ║
//║ Σ Description:                                                                ║
//║     → In case this lives more than few days, better have something prepared   ║
//╟       than few days, better have something prepared have as   ╔═══════════════╣
//║       than few days, better have something prepared.          ║ √ 23.01.2021. ║
//╚═══════════════════════════════════════════════════════════════╩═══════════════╝

var appRenderer = {
  info: {
    id: "mainAppRenderer",
    description: "This one is actually doing the render.",
  },
  conf: {
    inputElemSel: "editor_side pre",
    inputElem: "",
  },
  data: {
    editors: [
      {
        id: "fa11cs",
        editing: [
          {
            fileName: "newAppDemo.js",
            fileLoc: "/e/_DEV_/_YEA/",
          },
        ],
      },
    ],
  },
  func: {
    init() {
      console.log("[ appRenderer.func.init() ]");
      
      appRenderer.conf.inputElem = document.querySelector(
        appRenderer.conf.inputElemSel
      );

      appRenderer.func.getApplication();

      appRenderer.conf.inputElem.oninput = function () {
        hljs.highlightElement(appRenderer.conf.inputElem);
        appRenderer.func.getApplication();
      };

      document.getElementById("downloadCodeButton").onclick = function () {
        console.log("[ downloadCodeButton .onclick -> function() ]");
        appRenderer.func.downloadCode();
      };

    },

    getApplication() {
      var stringJS = appRenderer.conf.inputElem.innerText;

      console.log(stringJS);

      console.log(typeof stringJS);

      eval(stringJS);
    },

    downloadCode() {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(
            document.querySelector("editor_side pre").innerText
          )
      );
      element.setAttribute("download", "DEMO.js");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};

appRenderer.func.init();

window.onload = function () {
  hljs.highlightElement(appRenderer.conf.inputElem);
  console.log("YEAA HAVING FUN! :D");
};

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//▌   ! END OF FILE !            ▐▀▀▀         ▐▀▀▀             ! END OF FILE !    ▐
//▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄      ▐▀▀▀  ▐▀▀▀▀▌ ▐▀▀▀         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▐
//▌ ♠ File Name: app.js   ▐      ▐▄▄▄  ▐▄▄▄▄▌ ▐            ▌  ☺ Author: Slavko V. ▐
//▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
