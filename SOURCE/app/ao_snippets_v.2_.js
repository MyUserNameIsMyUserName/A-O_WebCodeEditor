


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
      
      appRenderer.conf.inputElem = document.querySelector(appRenderer.conf.inputElemSel);

      appRenderer.func.getApplication();

      appRenderer.conf.inputElem.oninput = function () {
        //hljs.highlightElement(appRenderer.conf.inputElem);
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












/////////////////////////////////////////
//////// FILESYSTEM API PART ///////////
///////////////////////////////////////


// Allow for vendor prefixes.
window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

// Create a variable that will store a reference to the FileSystem.
var filesystem = null;

// Get references to the page elements.
var form = document.getElementById("file-form");
var filenameInput = document.getElementById("filename");
var contentTextArea = document.getElementById("content");

var fileList = document.getElementById("file-list");

var messageBox = document.getElementById("messages");

// A simple error handler to be used throughout this demo.
function errorHandler(error) {
  console.info(error.code);
  var message = "";

  switch (error.code) {
    case 18:
      message = "Security Error";
      break;
    case FileError.SECURITY_ERR:
      message = "Security Error";
      break;
    case FileError.NOT_FOUND_ERR:
      message = "Not Found Error";
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      message = "Quota Exceeded Error";
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      message = "Invalid Modification Error";
      break;
    case FileError.INVALID_STATE_ERR:
      message = "Invalid State Error";
      break;
    default:
      message = "Unknown Error";
      break;
  }

  console.log(message);
}

// Request a FileSystem and set the filesystem variable.
function initFileSystem() {
  navigator.webkitPersistentStorage.requestQuota(
    1024 * 1024 * 5,
    function (grantedSize) {
      // Request a file system with the new size.
      window.requestFileSystem(
        window.PERSISTENT,
        grantedSize,
        function (fs) {
          // Set the filesystem variable.
          filesystem = fs;

          // Setup event listeners on the form.
          setupFormEventListener();

          // Update the file browser.
          listFiles();
        },
        errorHandler
      );
    },
    errorHandler
  );
}

function loadFile(filename) {
  filesystem.root.getFile(
    filename,
    {},
    function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
          // Update the form fields.
          filenameInput.value = filename;
          contentTextArea.value = this.result;

          var event = new Event('input', {
              bubbles: true,
              cancelable: true,
          });
          
          contentTextArea.dispatchEvent(event);
        };

        reader.readAsText(file);
      }, errorHandler);
    },
    errorHandler
  );
}

function displayEntries(entries) {
  // Clear out the current file browser entries.
  fileList.innerHTML = "";

  entries.forEach(function (entry, i) {
    var li = document.createElement("li");


    var entryName = document.createElement("p");
    entryName.innerHTML = entry.name;
    li.appendChild(entryName);

    var delLink = document.createElement("button");
    delLink.innerHTML = "[x]";
    li.appendChild(delLink);

    fileList.appendChild(li);

    // Setup an event listener that will load the file when the link
    // is clicked.
    li.addEventListener("click", function (e) {
      e.preventDefault();
      loadFile(entry.name);
    });

    // Setup an event listener that will delete the file when the delete link
    // is clicked.
    delLink.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      deleteFile(entry.name);
    });
  });
}

function listFiles() {
  var dirReader = filesystem.root.createReader();
  var entries = [];

  var fetchEntries = function () {
    dirReader.readEntries(function (results) {
      if (!results.length) {
        displayEntries(entries.sort().reverse());
      } else {
        entries = entries.concat(results);
        fetchEntries();
      }
    }, errorHandler);
  };

  fetchEntries();
}

// Save a file in the FileSystem.
function saveFile(filename, content) {
  filesystem.root.getFile(
    filename,
    { create: true },
    function (fileEntry) {
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function (e) {
          // Update the file browser.
          listFiles();

          // Clean out the form field.
          filenameInput.value = "";
          contentTextArea.value = "";

          // Show a saved message.
          messageBox.innerHTML = "File saved!";
        };

        fileWriter.onerror = function (e) {
          console.log("Write error: " + e.toString());
          alert("An error occurred and your file could not be saved!");
        };

        var contentBlob = new Blob([content], { type: "text/plain" });

        fileWriter.write(contentBlob);
      }, errorHandler);
    },
    errorHandler
  );
}

function deleteFile(filename) {
  filesystem.root.getFile(
    filename,
    { create: false },
    function (fileEntry) {
      fileEntry.remove(function (e) {
        // Update the file browser.
        listFiles();

        // Show a deleted message.
        messageBox.innerHTML = "File deleted!";
      }, errorHandler);
    },
    errorHandler
  );
}

// Add event listeners on the form.
function setupFormEventListener() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the form data.
    var filename = filenameInput.value;
    var content = contentTextArea.value;

    // Save the file.
    saveFile(filename, content);
  });
}

// Start the app by requesting a FileSystem (if the browser supports the API)
if (window.requestFileSystem) {
  initFileSystem();
} else {
  alert("Sorry! Your browser doesn't support the FileSystem API :(");
}




/////////////////////////////////////////////////
////////EO!  FILESYSTEM API PART  !EO///////////
///////////////////////////////////////////////


//////////////////////
/// SOME ADDITIONAL TRIGGERING AND SHIT

appRenderer.func.init();

window.onload = function () {
  hljs.highlightElement(appRenderer.conf.inputElem);
  console.log("YEAA HAVING FUN! :D");
};