// Load additional files via Chilipeppr's require.js
requirejs.config({
    paths: {
        //jqueryui: '//chilipeppr.com/js/jquery-ui-1.10.4/ui/minified/jquery.ui.core.min',
        //jqueryuiResizeable: '//chilipeppr.com/js/jquery-ui-1.10.4/ui/minified/jquery.ui.resizable.min',
        jqueryui: '//i2dcui.appspot.com/js/jquery-ui-1.10.4/ui/jquery.ui.core',
        jqueryuiWidget: '//i2dcui.appspot.com/js/jquery-ui-1.10.4/ui/jquery.ui.widget',
        jqueryuiMouse: '//i2dcui.appspot.com/js/jquery-ui-1.10.4/ui/jquery.ui.mouse',
        jqueryuiResizeable: '//i2dcui.appspot.com/js/jquery-ui-1.10.4/ui/jquery.ui.resizable',
        waypoints: '//cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.4/waypoints.min',
        //jqueryWaypointsInfinite: '//cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.4/waypoints-infinite.min'
    },
    shim: {
        //jqueryWaypointsInfinite: ['waypoints']
        //jqueryui: ['jquery'],
        jqueryuiWidget: ['jqueryui'],
        jqueryuiMouse: ['jqueryuiWidget'],
        jqueryuiResizeable: ['jqueryui', 'jqueryuiMouse']
    }
});

// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:com-chilipeppr-widget-gcode"], function (gcode) {
    console.log("test running of " + gcode.id);

    //console.log(gcode);
    /*
     gcode.gcodeLoad(function() {
     console.log("done loading gcode data...");
     //console.log(gcode.gcodeData);
     });
     */

    /*
     cprequire(["inline:com-chilipeppr-elem-gcodedata"], function (gcd) {
     console.log("inside the cprequire which i think is getting called too fast.");
     console.log(gcd.gcode);
     //console.log(gcode);
     //console.log(gcode.gcode());
     });
     */

    // add flash msg
    chilipeppr.load(
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light",
        function() {
            cprequire(
                ['inline:com-chilipeppr-elem-flashmsg'],
                function(flash) {
                    flash.init();
                    //chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "title from pub no dismiss", "body from pub", 1000, true);
                }
            );
        }
    );

    // create a div to hold dragdrop
    // Element / Drag Drop
    // http://jsfiddle.net/jlauer/Q654J/

    chilipeppr.load("dragdrop",
        "http://fiddle.jshell.net/jlauer/Z9F6G/show/light/", function () {
            require(["inline:com-chilipeppr-elem-dragdrop"], function (dd) {
                console.log("inside require of dragdrop");
                dd.init();
                dd.bind("body", null);
                //$(".com-chilipeppr-elem-dragdrop").popover('show');
                //dd.bind("#pnlWorkspace", null);
                console.log(dd);
            });
        });

    var testPlannerPause = function() {
        setTimeout(function() {chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/plannerpause', "");}, 5000);
        setTimeout(function() {chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/plannerresume', "");}, 10000);
        setTimeout(function() {chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/plannerpause', "");}, 15000);
        setTimeout(function() {chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/plannerresume', "");}, 20000);
        setTimeout(function() {chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/plannerpause', "");}, 25000);
        setTimeout(function() {chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/plannerresume', "");}, 30000);
    }
    //testPlannerPause();

    // mimic recving 3dobject
    chilipeppr.subscribe("/com-chilipeppr-widget-3dviewer/request3dObject", function() {
        var obj = {
            userData: {
                lines: [
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}
                    },
                    {"p2":{"x":2,"y":0,"z":0,"e":0,"f":0,"arci":null,"arcj":-2,"arck":null,"arcr":null,"arc":true,"clockwise":true,"g2":true},"args":{"cmd":"G2","text":"G2  X2 Y0  I0 J-2.0","origtext":"G02 X2Y0 I0J-2.0","indx":1,"isComment":false,"x":2,"y":0,"i":0,"j":-2}},
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}},
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}},
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}},
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}},
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}},
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}},
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}},
                    {"p2":{"x":0,"y":234.234245,"z":0,"e":0,"f":0,"g0":true, timeMinsSum: 68.42445},"args":{"cmd":"G0","text":"G0  X0 Y2","origtext":"G0 X0Y2","indx":0,"isComment":false,"x":0,"y":2}}
                ]
            }
        };
        chilipeppr.publish("/com-chilipeppr-widget-3dviewer/recv3dObject", obj);
    });
    gcode.init();
    //gcode.init({lineNumbersOnByDefault: true});
    //gcode.showOptionsModal();
    //gcode.setupInfiniteScroll();

    //var txt = gcode.fileLines.join('\n');
    //window.open('data:text/csv;charset=utf-8,' + escape(txt));
    
    // test a fake receiving of an onQueue msg
    var testOnQueue = function() {
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-widget-serialport/onQueue", { Id: "g2" });   
        }, 2000);
    };
    var testOnWrite = function() {
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-widget-serialport/onWrite", { Id: "g2" });   
        }, 3000);
    };
    var testOnComplete = function() {
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-widget-serialport/onComplete", { Id: "g2" });   
        }, 4000);
    };
    var testOnExecute = function() {
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-interface-cnccontroller/onExecute", { line: 2 });   
        }, 5000);
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-interface-cnccontroller/onExecute", { line: 4 });   
        }, 6000);
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-widget-serialport/onComplete", { Id: "g3" });   
        }, 7000);
    };
    var testOnError = function() {
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-widget-serialport/onError", { Id: "g3" });   
        }, 7000);
    }
    // testOnQueue();
    // testOnWrite();
    // testOnComplete();
    // testOnExecute();
    //testOnError();

    var testPublishGcode = function() {
        setTimeout(function() {
        chilipeppr.publish("/com-chilipeppr-widget-gcode/requestGcode", "");
        }, 5000);
    }
    //testPublishGcode();
    
    var testJumpToLine = function() {
        setTimeout(function() {
        chilipeppr.publish("/com-chilipeppr-widget-gcode/jumpToLine", 5);
        }, 6000);
    }
    //testJumpToLine();
    
    // force widget to set width to test css
    $('#com-chilipeppr-widget-gcodeviewer').css('width', '350px');
    $('body').css('padding', '20px');
    
    // test out the /onPlay and interrupting it
    var testOnPlayInterrupt = function() {
        var isDoInterrupt = true;
        chilipeppr.subscribe("/com-chilipeppr-widget-gcode/onplay", this, function(event) {
            console.log("got onPlay pubsub test for interrupt. event: ", event);
            
            if (isDoInterrupt) {
            
                console.log("onPlay pubsub test. CANCELLING EVENT.");
                // then send a new /play about 5 seconds later to mimic an async interrupt
                setTimeout(function() {
                    // pretend we threw up a dialog box, let the user choose stuff, and then they move along
                    // we have to mimic the user is hitting play to start the process again
                    chilipeppr.publish("/com-chilipeppr-widget-gcode/play", event);
                }, 5000);
                
                // set to false so next time in, we don't cancel
                isDoInterrupt = false;
            
                // return false to cancel all subsequent calls
                return false;
            } else {
                
                // we get here after we resend the /play signal to the Gcode widget. when it gets that
                // it starts the process again of a play and we should let it continue on since we already
                // did our important work
                console.log("onPlay pubsub test. Now allowing play to continue on.")
                return true;
            }
        });
    };
    // testOnPlayInterrupt();

} /*end_test*/ );


cpdefine("inline:com-chilipeppr-widget-gcode", ["chilipeppr_ready", "waypoints", "jqueryuiResizeable", "jquerycookie"], function () {
    return {
        id: "com-chilipeppr-widget-gcode",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Widget / Gcode v8",
        desc: "The Gcode widget shows you the Gcode loaded into your workspace, lets you send it to the serial port, get back per line status, see an estimated length of time to execute the Gcode, navigate to the XYZ position of a specific line, and much more.",
        publish: {
            // '/onplay': "When user hits play button",
            '/onplay': "When user hits play button. This is fired before this widget starts playing to give subscribers a chance to cancel the play, or delay it, or interrupt it. Payload contains {gcodeLines:(array of gcode lines)}. For example, the Cayenn widget listens for this signal and interrupts you if there are Cayenn commands in your Gcode so it can send a ResetCtr to all Cayenn devices. The Cayenn widget needs to send all the resets before ChiliPeppr is allowed to play to make sure everything is in sync. Return a false from your subscribe callback to cancel the play.",
            '/onpause': "When user hits pause button. The payload is a true/false boolean indicating whether it is a pause or an unpause. This event also fires if a pause is triggered for a different reason like from an M6 command. In that case the 2nd paramater of the payload contains a string of \"m6\".",
            '/onstop': "When user hits stop button",
            '/resize' : "When we resize in case any other widget wants to listen to that so it can resize itself.",
            '/done' : "When we are done sending all gcode. We send a payload of how many lines sent and time for job.",
            '/recvGcode' : 'We publish this signal after you send in a /requestGcode signal. We will send you the Gcode in this widget including metadata. The payload contains { lines: [(your lines as a 0-based array)], metadata: [{isSent: bool, isQueued: bool, isWritten: bool, isComplete: bool}] }. The lines are a 0-based array so if you are trying to line them up with the numbers in the Gcode widget, line 1 corresponds to lines[0] in the array. The metadata is an array that matches the lines array but contains data on the send state of each line. You are being sent an exact reference to that array so if you modify it, you are modifying the actual Gcode and Metadata in this widget. You have been warned.',
            '/onChiliPepprPause' : 'This event is published during the play operation when the chilipeppr_pause string is found inside the Gcode. You can place a chilipeppr_pause string anywhere in the Gcode inside a comment and it will tell ChiliPeppr to pause sending when it hits that line. <br><br>The pause acts much like the M6 tool change pause but it is a pause just for ChiliPeppr to interpret and not the CNC controller. This technique was implemented for synchronizing a secondary microcontroller that could trigger an out-of-band event like a laser solderer, or a solder paste dispenser, or some other control that had to trigger at a specific Gcode line. This specific event is not very helpful to subscribe to because it does not have as much meaning as onChiliPepprPauseOnComplete or onChiliPepprPauseOnExecute. Those two events are triggered when the CNC controller actually gets to the specifically paused line and that is where you would synchronize from. <br><br>The onChiliPepprPauseOnComplete is triggered by all CNC controllers but is not a very accurate event as most controllers have a planner buffer which means this line is not really what is being executed but will be executed in the very near future at an unknown time. The onChiliPepprPauseOnExecute is a highly accurate event currently only available from TinyG that tells you the CNC controller is exactly executing this line at this moment.<br><br>A sample macro is available that shows how to use the onChiliPepprPause events.',
            '/onChiliPepprPauseOnExecute' : 'This event is published when the line that contained the chilipeppr_pause command inside a comment has actually executed in the CNC controller. This is currently supported by TinyG. Grbl does not support this.<br><br>The payload of the event includes the line number and the line of gcode that was just executed like { line: 8, gcode: "(chilipeppr_pause solder drop 4)" }',
            '/onChiliPepprPauseOnComplete' : 'This event is published when the line that contained the chilipeppr_pause command inside a comment has been actually sent to the CNC controller. If your controller supports onExecute events then it is recommended you use onChiliPepprPauseOnExecute instead because it is much more accurate.<br><br>To help explain the difference between onChiliPepprPauseOnExecute and onChiliPepprPauseOnComplete, for the onChiliPepprPauseOnComplete event if 1000 lines were buffered to SPJS and this is the 1000th line that this event will only trigger as the 1000th line is dished up to the CNC controller. This gives an event that can be pivoted off of. If the CNC controller has a planner buffer that can hold around 8 moves, you will get this event only when this line of gcode enters the planner buffer. So you are getting the event 8 moves ahead. To make this work in the real world you should likely pause by a length of time to ensure all commands are done or issue a double check command to your CNC controller that sends you back a response where you can ensure the controller is in the correct state.<br><br>The payload of the event includes the line number and the line of gcode that was just completed like { line: 8, gcode: "(chilipeppr_pause solder drop 4)" }'
        },
        subscribe: {
            '/requestGcode' : 'Send in this signal and we will publish back out a /recvGcode signal. See /recvGcode for further info.',
            '/stop' : 'Send in this signal to stop the gcode playing. Equivalent to hitting the stop button.',
            '/play' : 'Send in this signal to play the gcode. Equivalent to hitting the play button.',
            '/pause' : 'Send in this signal to pause/unpause the gcode. Equivalent to hitting the pause button.',
            '/jumpToLine' : "Send in an integer of what line to jump to in the Gcode widget. The index you send it should match what visually shows in the Gcode widget, i.e. line 1 should be sent as a 1 (even though the backing array is index 0).",
        },
        foreignSubscribe: {
            "/com-chilipeppr-elem-dragdrop/ondropped" : "We watch for a drag drop event of the Gcode file. The payload of the signal contains the localStorage object which is just the string representing the entire Gcode file.",
            '/com-chilipeppr-interface-cnccontroller/plannerpause' : "We need to pause when planner tells us.",
            '/com-chilipeppr-interface-cnccontroller/plannerresume' : "We need to resume when planner tells us.",
            "/com-chilipeppr-interface-cnccontroller/feedhold" : "We need to place a manual pause if we see the e-stop hit. That way user can start where they left off.",
            "/com-chilipeppr-interface-cnccontroller/onExecute" : "This signal is sent to us by the CNC controller widget. The payload looks like { line: 234 }. It is ONLY sent if the CNC controller widget is able to determine an executed state. Please refer to your CNC controller's publish documenation to determine if this signal will be published and thus whether this Gcode widget will see these events."
        },
        foreignPublish: {
            '/com-chilipeppr-widget-3dviewer/gcodeline': "When a user clicks a line of gcode. We'll send the gcode and the line number so the subscriber can sync to what we're sending, i.e. a 3D viewer that wants to hilite the line representing this command. The format of the signal data is something like {line: 12, gcode: \"G1 F300.0 Z0.0\"}.",
            "/com-chilipeppr-elem-flashmsg/flashmsg" : "Send a flash message on certain events. In particular, we send a flash message when a comment line is hit. We also send a flash message when the gcode is done sending."
        },
        fileLines: [], // contains the gcode file as array per line
        metaLines: [], // stores meta data related to each line in fileLines
        metaObj: { // Default meta data object
    	    isSent: false,
            isQueued: false,
            isWritten: false,
            isCompleted: false, // whether onComplete has processed it
            isError: false,
            isExecuted: false, // whether onExecute has processed it
    	    isDisplayed: false // whether onComplete or onExecute has reacted to it
        },
        linesComplete: [],
        linesToShow: 50, // how many lines to show in the infinite scroll area
        linesToShowMax: 200, // how many max before we start unloading
        delayPerLine: 1000, // ms delay between the send of each line to serial port
        lineNumbersOnByDefault: false,
        isDirtyUnits: false, //track if user had to specify a unit of measurement and whether we need to reload the gcode file to add a UOM.
        init: function (settings) {
            console.log("init called. settings:", settings);
            
            // You can pass in a settings object. Supported settings are:
            /*
            {lineNumbersOnByDefault: true})
            */

            if (settings && 'lineNumbersOnByDefault' in settings) {
                console.log("init called. we were passed in settings");
                // the workspace wants lineNumbersOnByDefault
                this.lineNumbersOnByDefault = settings.lineNumbersOnByDefault;
                if (this.lineNumbersOnByDefault) {
                    console.log("init called. showing default msg. el:", $('.com-chilipeppr-widget-gcode-option-addlinenums-default'));
                    $('.com-chilipeppr-widget-gcode-option-addlinenums-default').removeClass('hidden');
                }
                    
            }
            
            // Added on 1/2/17 by JLauer so we can allow onPlay to get interrupted
            // subscribe to our own /onPlay event at lowest priority so we get it last
            // setting priority to 11 because default is 10 and lower values have higher priority
            chilipeppr.subscribe("/com-chilipeppr-widget-gcode/onplay", this, this.onPlayAfter, 11);
            
            this.setupOptionsModal();

            // this is async, so hopefully it completes before the user drags a file
            // this loads all our tooltip popout info
            // to describe the g commands
            this.gcodeLoad();
            
            // subscribe to all callback events from serial port widget
            // so we know when our gcode is executed by spjs
            this.setupOnQueueWriteCompletePubSub();

            // load jquery-ui css, but make sure nobody else loaded it
            if (!$("link[href='//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css']").length)
                $('<link>')
                    .appendTo('head')
                    .attr({type : 'text/css', rel : 'stylesheet'})
                    .attr('href', '//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css');

            // load local file
            //localStorage.removeItem('last-imported');
            var lastImported = localStorage.getItem('last-imported');
            var lastLoaded = localStorage.getItem('last-loaded');
            if (lastImported) {
                console.log("loading text from local storage");
                this.onFileLoaded(lastImported);
            } else {
                console.log("gcode viewer loading from path lastLoaded or 15mm_cube.gcode");
                var that = this;
                if (!lastLoaded) lastLoaded = 'http://www.chilipeppr.com/3d/chilipepprlogo.nc';
                $.get(lastLoaded, null, function (data) {
                    localStorage.setItem('last-loaded', lastLoaded);
                    localStorage.removeItem('last-imported');
                    // load gcode file, true: skip local store cuz i want a path
                    // stored instead for default file so it reloads when i change it
                    that.onFileLoaded(data, null, true);
                }, 'text')
                    .error(function () {
                        console.log("error loading default file");
                    });
            }
            // subscribe to file load events
            // do it a a stronger priority than default so we get this first
            // before the 3d viewser since we modify gcode and may have
            // to re-issue it
            chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", this, this.onFileLoaded, 9);

            // subscribe to pause/resume events
            chilipeppr.subscribe("/com-chilipeppr-interface-cnccontroller/plannerpause", this, this.onPlannerPause);
            chilipeppr.subscribe("/com-chilipeppr-interface-cnccontroller/plannerresume", this, this.onPlannerResume);
            chilipeppr.subscribe("/com-chilipeppr-interface-cnccontroller/feedhold", this, this.onFeedhold);

            // setup buttons in top toolbar
            this.btnSetup();

            // get a trigger per row so we can hilite it
            this.setupRowTrigger();
            //this.createGcodeDesc();
            //console.log(gcode);
            this.parseGcode();
            //console.log(window.location);

            // Make widget resizeable
            this.setupResizeable();

            this.setupFeedrateAdjust();
            this.forkSetup();
            this.setupToolChangeModal();
            
            // setup pubsub for sending users our gcode
            this.setupSendGcodePubSub();

            //this.showToolChangeModal();
            
            // setup play/pause/stop subscribe signals so other code
            // can control the playing/pausing/stopping of gcode
            this.setupPlayPauseStopPubSub();
            
            // setup subscribe to jumpToLine
            chilipeppr.subscribe("/" + this.id + "/jumpToLine", this, this.gotoLine);
            
            // setup popover for status items
            this.setupStatusSteps();
            
            this.setupJumpToLine();
            
            this.setupSecondaryButtons();
            
            // get estimated time duration. request this after a few
            // seconds to give best chance of 3d viewer being loaded
            setTimeout(this.getEstimates.bind(this), 5000);

            console.log(this.name + " done loading.");
        },
        /**
         * Configure the "Feed Rate Override" button and the "Tool Changes" pulldown
         */
        setupSecondaryButtons: function() {
            
            // setup Feed Rate Override to toggle the actual region
            $('.com-chilipeppr-widget-gcode-showfr').click(this.onToggleShowFeedRateOverride.bind(this));
        },
        onToggleShowFeedRateOverride: function() {
            var btnEl = $('.com-chilipeppr-widget-gcode-showfr');
            var regionEl = $('#com-chilipeppr-widget-gcode-feedrate');
            if (btnEl.hasClass("active")) {
                // it's showing, so hide it
                regionEl.addClass("hidden");
                // remove our active tag
                btnEl.removeClass("active");
            } else {
                // it's hidden, so show it
                regionEl.removeClass("hidden");
                // show us as pressed in
                btnEl.addClass("active");
            }
        },
        /**
         * This method scans the Gcode for tool changes and then populates the pulldown menu so
         * you can easily jump to the changes in the file and continue where you left off.
         */
        toolChanges: {},
        toolChangesKeys: [], // need to store keys in own array cuz keys in javascript are strings and we wants ints
        toolComments: {},
        setupToolChanges: function() {
            
            // scan gcode for tool change info
            
            console.log("about to look for tool changes in this.fileLines. lines:", this.fileLines.length);
            
            this.toolComments = {};
            this.toolChanges = {};
            this.toolChangesKeys = [];
            
            for (var i = 0; i < this.fileLines.length; i++) {
                var line = this.fileLines[i];
                
                // see if we have line where comment starts with
                // look for something like:
                // (T1 D=3.175 CR=0. - ZMIN=-4.2 - FLAT END MILL)
                if (line.match(/\(T(\d+)\s+(.*)\)/i)) {
                    var toolNum = parseInt(RegExp.$1);
                    var toolComment = "T" + toolNum + " " + RegExp.$2;
                    console.log("found tool comment. lineNum:", i, "toolNum:", toolNum, "comment:", toolComment, "line:", line);
                    this.toolComments[toolNum] = {
                        lineNum: i+1,
                        toolNum: toolNum,
                        toolComment: toolComment,
                    }
                }
                
                // look for M6 line
                if (line.match(/M6|M06|M006/i)) {
                    var toolNum;
                    if (line.match(/T(\d+)/i)) {
                        toolNum = parseInt(RegExp.$1);
                    }
                    this.toolChanges[(i+1)] = {
                        lineNum: i+1,
                        toolNum: toolNum,
                    };
                    this.toolChangesKeys.push(i+1);
                    console.log("found tool change. lineNum:", i, "line:", line);
                }
            }
            
            console.log("this.toolComments:", this.toolComments);
            console.log("this.toolChanges:", this.toolChanges);
            
            // now look for a comment up to 10 lines above the M6 tool change line to see if any comments are there
            var keys = this.toolChangesKeys; //Object.keys(this.toolChanges).sort();
            console.log("looking for comments above m6 to get a label for this tool change. keys:", keys);
            for (var i = 0; i < keys.length; i++) {
                var toolChangeLineNum = keys[i];
                var lookBackToLineNum = toolChangeLineNum - 10;
                if (lookBackToLineNum < 1) lookBackToLineNum = 1; // first line
                
                // now look backwards until we've seen just 1 comment
                for (var lineNum = toolChangeLineNum; lineNum >= lookBackToLineNum; lineNum--) {
                    var line = this.fileLines[lineNum - 1]; // index of array is 1 less than lineNum
                    console.log("looking at lineNum:", lineNum, "line:", line);
                    // see if comment
                    if ( line.match(/\((.*?)\)/) || line.match(/;(.*)/) ) {
                        var comment = RegExp.$1;
                        console.log("found comment:", comment);
                        
                        // stick comment into toolChanges
                        this.toolChanges[toolChangeLineNum].sectionComment = comment;
                        
                        // break since we found one
                        break;
                    }
                }
            }
            
            console.log("after adding section comments. this.toolChanges:", this.toolChanges);
            
            // now populate the pulldown
            var keys = this.toolChangesKeys; //Object.keys(this.toolChanges).sort();
            var ddEl = $('.com-chilipeppr-widget-gcode-menuToolChange');
            
            // wipe menu
            ddEl.html('<li role="presentation" class="dropdown-header com-chilipeppr-widget-gcode-toolchanges-hdr">Click the item below to jump to the line in the Gcode so you can start playing from there.</li>');
            
            if (keys.length == 0) {
                // insert that no tool changes
                var menuEl = $('<li role="presentation" class="dropdown-header com-chilipeppr-widget-gcode-toolchanges-hdr">(No Tool Changes in Gcode)</li>');
            
                ddEl.append(menuEl);   
            }
            
            for (var i = 0; i < keys.length; i++) {
                var toolChange = this.toolChanges[keys[i]];
                var tool = this.toolComments[toolChange.toolNum];
                
                var str = "";
                
                if ('sectionComment' in toolChange) {
                    str = str + '<span class="small" style="font-weight:bold;">' + toolChange.sectionComment + '</span><br>';
                }

                
                str = str + "Tool " + toolChange.toolNum + " on line " + toolChange.lineNum;
                
                if (tool != null) {
                    str = str + "<br>" + tool.toolComment;
                }
                
                
                var menuEl = $('<li><a class="" style="cursor:pointer;">' + str + '</a></li>');
                menuEl.click(toolChange, this.onToolChangesSelectMenu.bind(this));
                ddEl.append(menuEl);   
                console.log("added Tool Changes menu item:", menuEl);
            }
            
        },
        /**
         * Called when user clicks a Tool Changes menu item. They want to jump to that line.
         */
        onToolChangesSelectMenu: function(data) {
            console.log("got click on Tool Changes menu. data:", data.data);
            var toolInfo = data.data;
            // u get data like: {lineNum: 11, toolNum: 1}
            this.jumpToLine(toolInfo.lineNum);
            
        },
        /**
         * This method is called after the Gcode file is loaded so you can do some post-processing.
         */
        onAfterGcodeFileLoaded: function() {
            this.setupToolChanges();
        },
        setupJumpToLine: function() {
            $('#com-chilipeppr-widget-gcode-jumptoline').click(this.onJumpToLine.bind(this));
            
        },
        onJumpToLine: function(evt) {
            console.log("got onJumpToLine. evt:", evt);
            console.log("this.lastLineMarkedExecuted:", this.lastLineMarkedExecuted);
            
            var lastLine = "";
            if (this.lastLineMarkedExecuted && this.lastLineMarkedExecuted > 0)
                lastLine = this.lastLineMarkedExecuted;
            
            var line = prompt("Please enter the line number to jump to.", lastLine);
            var lineNum = parseInt(line);
            if (lineNum > 0)
                chilipeppr.publish("/com-chilipeppr-widget-gcode/jumpToLine", lineNum);
            else
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Error on Line Jump", "We had a problem parsing the line number you gave us.", 1000, true);
        },
        getEstimates: function() {
            var that = this;
            this.get3dObj(function() {
                // when we get this callback, we should have a 3dobj
                console.log("getEstimates got obj3d:", this.obj3d);
                if (this.obj3d && this.obj3d.userData && this.obj3d.userData.lines) {
                    var lastLine = this.obj3d.userData.lines[this.obj3d.userData.lines.length - 1];
                    if ('p2' in lastLine && 'timeMinsSum' in lastLine.p2) {
                        console.log("we got a timeMinsSum:", lastLine.p2.timeMinsSum);
                        var estDurMins = lastLine.p2.timeMinsSum;
                        var str = this.toHHMMSS(estDurMins * 60); // expect seconds
                        $('#com-chilipeppr-widget-gcodeviewer #gcode-time-est').text(str);
                    }
                }
            });
        },
        setupStatusSteps: function() {
            var html = 
                "<div id=\"com-chilipeppr-widget-gcodeviewer-popover-steps\" >Your Gcode moves through 5 steps from ChiliPeppr all the way through execution." +
                "<table class=\"table table-condensed table-striped\"><tr><th>Step&nbsp;</th><th>Status</th><th>Description</th></tr>" + 
                "<tr><td>1</td><td><span class=\"glyphicon glyphicon-ok gcode-sent\"></span> Sent</td><td>Your Gcode has been sent to the Serial Port JSON Server by the Serial Port Widget.</td></tr>" + 
                "<tr><td>2</td><td><span class=\"glyphicon glyphicon-ok gcode-queued\"></span> Queued</td><td>Gcode is queued inside the Serial Port JSON Server and waiting to be sent to the CNC controller's serial buffer.</td></tr>" + 
                "<tr><td>3</td><td><span class=\"glyphicon glyphicon-ok gcode-written\"></span> Written</td><td>Gcode has been written to the serial buffer of your CNC controller and removed from SPJS's buffer. </td></tr>" + 
                "<tr><td>4</td><td><span class=\"glyphicon glyphicon-ok gcode-completed\"></span>&nbsp;Completed&nbsp;</td><td>Gcode is completed when the CNC controller tells us it read the Gcode from its serial buffer and placed the Gcode into its planner buffer (this means the Gcode may only get executed seconds into the future as the planner buffer works its way through lines.) </td></tr>" + 
                "<tr><td>5</td><td><span class=\"glyphicon glyphicon-ok gcode-executed\"></span> Executed</td><td>Optional. The CNC controller tells us that your Gcode was actually executed. This is the final step. On controllers like TinyG this data only comes back if line numbers are in your Gcode.</td></tr>" +
                "<tr><td>6</td><td><span class=\"glyphicon glyphicon-ok gcode-error\"></span> Error/Unsupported Command</td><td>Optional. The CNC controller failed to execute the line of gcode.  This could indicate a problem with your gcode syntax, or that your CNC controller does not understand a particular gcode command.</td></tr>" +
                "</table></div>";
            $("#com-chilipeppr-widget-gcodeviewer .stats-hdr").popover({
                content: html
            })
            .on("show.bs.popover", function(){ $(this).data("bs.popover").tip().css("max-width", "600px"); });
        },
        setupPlayPauseStopPubSub: function() {
            var that = this;
            /*chilipeppr.subscribe("/" + this.id + "/play", this, function() { that.onPlay(true); } );
            chilipeppr.subscribe("/" + this.id + "/pause", this, function() { that.onPause(true); } );
            chilipeppr.subscribe("/" + this.id + "/stop", this, function() { that.onStop(true); } );*/
            chilipeppr.subscribe("/" + this.id + "/play", this, function() { that.onPlay({}); } );
            chilipeppr.subscribe("/" + this.id + "/pause", this, function() { that.onPause({}); } );
            chilipeppr.subscribe("/" + this.id + "/stop", this, function() { that.onStop({}); } );

        },
        setupSendGcodePubSub: function() {
            chilipeppr.subscribe("/" + this.id + "/requestGcode", this, this.publishGcode);
        },
        publishGcode: function() {
            var gcode = {
                lines: this.fileLines,
                metadata: this.metaLines
            }
            chilipeppr.publish("/" + this.id + "/recvGcode", gcode);
        },
        // options: stores the cookie settings for the user
        // example: {whenPlay: "serial", perRow: "3d", perRow3dType: "goto"}
        // it is set during the setupOptionsModal()
        options: null,
        setupOptionsModal: function() {
            console.log("setupOptionsModal");
            // read vals from cookies
            var options = $.cookie('com-chilipeppr-widget-gcode-options');

            if (true && options) {
                options = $.parseJSON(options);
                console.log("just evaled options: ", options);
                if (!('removeemptylines' in options))
                    options.removeemptylines = true;
                // only addlinenumbs by default if workspace asked us to
                if (this.lineNumbersOnByDefault) {
                    if (!('addlinenums' in options))
                        options.addlinenums = true;
                }
                // Default new options for backwards compatibility
                if (!('sendOnM6' in options)) {
                    options.sendOnM6 = "";
                }
                if (!('sendOffM6' in options)) {
                    options.sendOffM6 = "";
                }
                if (!('probeCmd' in options)) {
                    options.probeCmd = "G28.2 Z0";
                }
                
            } else {
                options = {whenPlay: "serial", perRow: "3d", perRow3dType: "goto", delayPerLine: this.delayPerLine, pauseOnM6: true, preUpload: 'none', multiLineMode: 'yes', multiLines: 50, ppsOnPlayFlush: false, ppsOnStopFeedhold: false, ppsOnPauseFeedhold: false, ppsOnUnpauseResume: false, removeemptylines: true, addlinenums: true, sendOnM6: "", sendOffM6: "", probeCmd: "G28.2 Z0"};
            }
            this.options = options;
            console.log("options:", options);

            // setup the correct radio buttons in dialog
            if (this.options.whenPlay == "serial")
                $('#com-chilipeppr-widget-gcode-option-whenplay-serial').prop('checked', true);
            else
                $('#com-chilipeppr-widget-gcode-option-whenplay-3d').prop('checked', true);
            if (this.options.perRow == "serial")
                $('#com-chilipeppr-widget-gcode-option-perrow-serial').prop('checked', true);
            else
                $('#com-chilipeppr-widget-gcode-option-perrow-3d').prop('checked', true);
            if (this.options.perRow3dType == "goto")
                $('#com-chilipeppr-widget-gcode-option-perrow-3d-goto').prop('checked', true);
            else
                $('#com-chilipeppr-widget-gcode-option-perrow-3d-anim').prop('checked', true);

            if (this.options.pauseOnM6) {
                $('#com-chilipeppr-widget-gcode-option-pauseOnM6').prop('checked', true);
                $('#com-chilipeppr-widget-gcode-option-pauseOnM6-alt').prop('checked', true);
            }
            $('#com-chilipeppr-widget-gcode-option-sendonM6').val(this.options.sendOnM6);
            $('#com-chilipeppr-widget-gcode-option-sendoffM6').val(this.options.sendOffM6);
            $('#com-chilipeppr-widget-gcode-option-probe-cmd').val(this.options.probeCmd);

            if (this.options.preUpload) {
                var opt = ["none", "100", "1000", "10000", "20000"];
                var that = this;
                opt.forEach(function(item,indx) {
                    console.log("indx:", indx, "item:", item, "preUpload:", that.options.preUpload);
                    if (that.options.preUpload == item) {
                        $('#com-chilipeppr-widget-gcode-option-upload-' + item ).prop('checked', true);
                    } else {
                        $('#com-chilipeppr-widget-gcode-option-upload-' + item).prop('checked', false);
                    }
                });
            }

            if (this.options.multiLineMode) {
                if (this.options.multiLineMode == "yes") {
                    $('#com-chilipeppr-widget-gcode-option-multilinemode-yes').prop('checked', true);
                    this.isInMultiLineMode = true;
                } else {
                    $('#com-chilipeppr-widget-gcode-option-multilinemode-no').prop('checked', true);
                    this.isInMultiLineMode = false;
                }
                this.options.multiLines = parseInt(this.options.multiLines);
                if (this.options.multiLines < 1) this.options.multiLines = 1;
                $('#com-chilipeppr-widget-gcode-option-multiline').val(this.options.multiLines);
                this.multiLines = this.options.multiLines;
            }

            // setup play/pause/stop options
            if (this.options.ppsOnPlayFlush)
                $('#com-chilipeppr-widget-gcode-option-ppsOnPlayFlush').prop('checked', true);
            if (this.options.ppsOnStopFeedhold)
                $('#com-chilipeppr-widget-gcode-option-ppsOnStopFeedhold').prop('checked', true);
            if (this.options.ppsOnPauseFeedhold)
                $('#com-chilipeppr-widget-gcode-option-ppsOnPauseFeedhold').prop('checked', true);
            if (this.options.ppsOnUnpauseResume)
                $('#com-chilipeppr-widget-gcode-option-ppsOnUnpauseResume').prop('checked', true);


            // setup delay per line
            if (this.options.delayPerLine) {
                this.delayPerLine = parseInt(this.options.delayPerLine);
                $('#com-chilipeppr-widget-gcode-option-delayPerLine').val(this.delayPerLine);
            }
            
            if (this.options.removeemptylines) {
                $('#com-chilipeppr-widget-gcode-option-removeemptylines').prop('checked', true);
            }
            if (this.options.addlinenums) {
                $('#com-chilipeppr-widget-gcode-option-addlinenums').prop('checked', true);
            }

            // setup "save changes" button
            var that = this;
            $("#com-chilipeppr-widget-gcode-modal .optionsbtnsave").click(function(evt) {
                console.log("Got save changes on gcode options dialog. evt:", evt);
                that.saveOptionsModal();
                that.hideOptionsModal();
            });

            // also, if ANYTHING is clicked, just go ahead and save all options
            $("#com-chilipeppr-widget-gcode-modal input").click(function(evt) {
                console.log("got click on evt:", evt);
                that.saveOptionsModal();
            });
            $("#com-chilipeppr-widget-gcode-modal #com-chilipeppr-widget-gcode-option-multiline").blur(function(evt) {
                console.log("got blur on evt:", evt);
                that.saveOptionsModal();
            });
            $("#com-chilipeppr-widget-gcode-modal #com-chilipeppr-widget-gcode-option-delayPerLine").blur(function(evt) {
                console.log("got blur on evt:", evt);
                that.saveOptionsModal();
            });

            // not the best place, but since this is reading the options settings, might
            // as well decide whether to show body here or not
            if (!this.options.showBody) {
                that.hideBody();
            }

            // attach event to onhide
            $('#com-chilipeppr-widget-gcode-modal').on('hidden.bs.modal', function () {
                // publish flash msgs that changes saved. Allow immediate dismiss.
                // do with delay to perform after modal hide animation
                setTimeout(function() { chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Options Saved", "Gcode Widget Options Saved", 1000, true); }, 10);
            });
        },
        saveOptionsModal: function() {
            var that = this;
            console.log("saveOptionsModal");

            var whenPlay, perRow, perRow3dType, delayPerLine, pauseOnM6, sendOnM6, sendOffM6, probeCmd, showBody, preUpload, multiLineMode, multiLines, ppsOnPlayFlush, ppsOnStopFeedhold, ppsOnPauseFeedhold, ppsOnUnpauseResume, removeemptylines, addlinenums;
            if ($('#com-chilipeppr-widget-gcode-option-whenplay-serial').is(':checked'))
                whenPlay = "serial";
            else if ($('#com-chilipeppr-widget-gcode-option-whenplay-3d').is(':checked'))
                whenPlay = "3d";
            if ($('#com-chilipeppr-widget-gcode-option-perrow-serial').is(':checked'))
                perRow = "serial";
            else if ($('#com-chilipeppr-widget-gcode-option-perrow-3d').is(':checked'))
                perRow = "3d";
            if ($('#com-chilipeppr-widget-gcode-option-perrow-3d-goto').is(':checked'))
                perRow3dType = "goto";
            else if ($('#com-chilipeppr-widget-gcode-option-perrow-3d-anim').is(':checked'))
                perRow3dType = "anim";
            if ($('#com-chilipeppr-widget-gcode-option-pauseOnM6').is(':checked'))
                pauseOnM6 = true;
            else
                pauseOnM6 = false;
            sendOnM6 = $('#com-chilipeppr-widget-gcode-option-sendonM6').val();
            sendOffM6 = $('#com-chilipeppr-widget-gcode-option-sendoffM6').val();
            probeCmd = $('#com-chilipeppr-widget-gcode-option-probe-cmd').val();
        
            if ($('#com-chilipeppr-widget-gcode-option-removeemptylines').is(':checked'))
                removeemptylines = true;
            else
                removeemptylines = false;
            if ($('#com-chilipeppr-widget-gcode-option-addlinenums').is(':checked'))
                addlinenums = true;
            else
                addlinenums = false;

            // on play/pause/stop
            ppsOnPlayFlush = ppsOnStopFeedhold = ppsOnPauseFeedhold = ppsOnUnpauseResume = false;
            if ($('#com-chilipeppr-widget-gcode-option-ppsOnPlayFlush').is(':checked')) ppsOnPlayFlush = true;
            if ($('#com-chilipeppr-widget-gcode-option-ppsOnStopFeedhold').is(':checked')) ppsOnStopFeedhold = true;
            if ($('#com-chilipeppr-widget-gcode-option-ppsOnPauseFeedhold').is(':checked')) ppsOnPauseFeedhold = true;
            if ($('#com-chilipeppr-widget-gcode-option-ppsOnUnpauseResume').is(':checked')) ppsOnUnpauseResume = true;

            // pre-Upload
            preUpload = $("#com-chilipeppr-widget-gcode-modal input:radio[name ='grpUpload']:checked").val();

            // multi line mode
            multiLineMode = $("#com-chilipeppr-widget-gcode-modal input:radio[name ='grpMultiLineMode']:checked").val();
            multiLines = parseInt($('#com-chilipeppr-widget-gcode-option-multiline').val());
            if (multiLines < 1) {
                multiLines = 1;
            }
            this.isInMultiLineMode = multiLineMode == "yes" ? true : false;
            that.multiLines = multiLines;

            // delay per line
            that.delayPerLine = parseInt($('#com-chilipeppr-widget-gcode-option-delayPerLine').val());

            // show body
            showBody = ! ($('#com-chilipeppr-widget-gcode-body-2col').hasClass('hidden'));

            var options = {
                whenPlay: whenPlay,
                perRow: perRow,
                perRow3dType: perRow3dType,
                delayPerLine: that.delayPerLine,
                pauseOnM6: pauseOnM6,
                sendOnM6: sendOnM6,
                sendOffM6: sendOffM6,
                probeCmd: probeCmd,
                showBody: showBody,
                preUpload: preUpload,
                multiLineMode: multiLineMode,
                multiLines: multiLines,
                ppsOnPlayFlush: ppsOnPlayFlush,
                ppsOnStopFeedhold: ppsOnStopFeedhold,
                ppsOnPauseFeedhold: ppsOnPauseFeedhold,
                ppsOnUnpauseResume: ppsOnUnpauseResume,
                removeemptylines: removeemptylines,
                addlinenums: addlinenums
            };
            var optionsStr = JSON.stringify(options);
            console.log("saving options:", options, "json.stringify:", optionsStr);
            // store cookie
            $.cookie('com-chilipeppr-widget-gcode-options', optionsStr, {
                expires: 365 * 10,
                path: '/'
            });
            that.options = options;

            // publish flash msgs that changes saved. Allow immediate dismiss.
            chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Options Saved", "Gcode Widget Options Saved", 1000, true);

        },
        showOptionsModal: function() {
            $('#com-chilipeppr-widget-gcode-modal').modal('show');
        },
        hideOptionsModal: function() {
            $('#com-chilipeppr-widget-gcode-modal').modal('hide');
            // publish flash msgs that changes saved. Allow immediate dismiss.
            // do with delay to perform after modal hide animation
            //setTimeout(function() { chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Options Saved", "Gcode Widget Options Saved", true); }, 500);
        },
        setupToolChangeModal: function() {
            var that = this;
            $('#com-chilipeppr-widget-gcode-toolchange-modal').on('hidden.bs.modal', function () {
                // save the setting. mimic click of save in main options modal
                if ($('#com-chilipeppr-widget-gcode-option-pauseOnM6-alt').is(':checked'))
                    $('#com-chilipeppr-widget-gcode-option-pauseOnM6').prop('checked', true);
                else
                    $('#com-chilipeppr-widget-gcode-option-pauseOnM6').prop('checked', false);
                //$('#com-chilipeppr-widget-gcode-modal .optionsbtnsave').trigger( "click" );
                that.saveOptionsModal();
                // unpause the sending
                //that.onPlayNextLine();
            });

            // attach to buttons in tool change div
            // '/com-chilipeppr-interface-cnccontroller/energizeMotors'
            $('.com-chilipeppr-widget-gcode-toolchange-energize').click(function() {
                chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/energizeMotors', "");
            });
            $('.com-chilipeppr-widget-gcode-toolchange-unenergize').click(function() {
                chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/unEnergizeMotors', "");
            });
            $('.com-chilipeppr-widget-gcode-toolchange-probe').click(function() {
                chilipeppr.publish("/com-chilipeppr-widget-serialport/send", that.options.probeCmd + '\n');
            });
            $('.com-chilipeppr-widget-gcode-toolchange-sendgcode').click(function() {
                chilipeppr.publish("/com-chilipeppr-widget-serialport/send", that.toolChangeRepositionCmd + '\n');
            });
            $('.com-chilipeppr-widget-gcode-toolchange-g43').click(function() {
                chilipeppr.publish("/com-chilipeppr-widget-serialport/send", that.toolChangeCmd + '\n');
            });
            $('.com-chilipeppr-widget-gcode-toolchange-spindlestop').click(function() {
                chilipeppr.publish("/com-chilipeppr-widget-serialport/send", 'M5\n');
            });
            $('.com-chilipeppr-widget-gcode-toolchange-spindlestart').click(function() {
                chilipeppr.publish("/com-chilipeppr-widget-serialport/send", 'M3\n');
            });

            // close btn
            $('.com-chilipeppr-widget-gcode-toolchange .close').click(this.hideToolChangeDiv.bind(this, false));

        },
        isInToolChangeMode: false, // track whether we're showing tool change div
        toolChangeRepositionCmd: null, // gcode to reposition to prior location before tool change (in case they jog)
        toolChangeCmd: null, // G43 command to change tool length offset
        showToolChangeModal: function(linegcode, source) {

	    var toolNumber = linegcode.match(/T\d+/ig)[0]
            console.log("Switching to tool ",toolNumber);
            if (!toolNumber)
            {
                toolNumber = "Unknown Tool";
                this.toolChangeCmd = "G49";
            }
            else
            {
                this.toolChangeCmd = "G43 " + toolNumber.replace("T","H");
            }
            $('#com-chilipeppr-widget-gcode-toolnumber1').text(toolNumber);
            $('#com-chilipeppr-widget-gcode-toolnumber2').text(toolNumber);
            $('#com-chilipeppr-widget-gcode-g43-cmd').text(this.toolChangeCmd);
            

            if ($('#com-chilipeppr-widget-gcode-option-pauseOnM6').is(':checked'))
                $('#com-chilipeppr-widget-gcode-option-pauseOnM6-alt').prop('checked', true);
            else
                $('#com-chilipeppr-widget-gcode-option-pauseOnM6-alt').prop('checked',false);

	    if (false)
		$('#com-chilipeppr-widget-gcode-toolchange-debug').text("Source: " +source);
	    
            $('#com-chilipeppr-widget-gcode-toolchange-modal').modal('show');

            // setup div in main widget for when modal dismisses
            this.isInToolChangeMode = true;
            //gcode-short-mode
            $('#com-chilipeppr-widget-gcode-body').addClass('gcode-short-mode');
            $('.com-chilipeppr-widget-gcode-toolchange').removeClass('hidden');
            $(window).trigger('resize');
            
            // get active coords system and last position
            var line = this.currentLine;
            this.getXyzCoordsForLine(line, function(pos) {
                console.log("getXyzCoordsForLine returned pos ", pos);

                this.getCoordFromController(function(coords) {
                    console.log("getCoordFromController returned coords ", coords);

                    // now assemble the reposition command
                    if (coords.coord)
                    {
                        this.toolChangeRepositionCmd = coords.coord;
                    }
                    else
                    {
                        this.toolChangeRepositionCmd = "";
                    }
                    this.toolChangeRepositionCmd = this.toolChangeRepositionCmd + " G0 X" + pos.x + " Y" + pos.y + " Z" + pos.z;
                    
                    $('.com-chilipeppr-widget-gcode-toolchange-reposition1').text(this.toolChangeRepositionCmd);
                    $('.com-chilipeppr-widget-gcode-toolchange-reposition2').text(this.toolChangeRepositionCmd);

                    // Send gcode if defined
                    var sendOnM6 = $('#com-chilipeppr-widget-gcode-option-sendonM6').val();
                    if (sendOnM6)
                    {
                        console.log("SendOnM6: ",sendOnM6);
                        chilipeppr.publish("/com-chilipeppr-widget-serialport/send", sendOnM6 + '\n');
                    }   
                });
            });

            // get the current motor config, when we get callback, setup the "set motors to prev setting" btn

        },
        hideToolChangeModal: function() {
            $('#com-chilipeppr-widget-gcode-toolchange-modal').modal('hide');
            $(window).trigger('resize');
        },
        hideToolChangeDiv: function(wasPaused) {
            console.log("hideToolChangeDiv");
            if (this.isInToolChangeMode) {
                console.log("was in toolChangeMode");
                this.isInToolChangeMode = false;
                
                if (wasPaused)
                {
                    // Send gcode if defined
                    // @todo Should NOT do this if we stopped rather than paused
                    var sendOffM6 = $('#com-chilipeppr-widget-gcode-option-sendoffM6').val();
                    if (sendOffM6)
                    {
                        console.log("SendOffM6: ",sendOffM6);
                        chilipeppr.publish("/com-chilipeppr-widget-serialport/send", sendOffM6 + '\n');
                    }
                }

                $('#com-chilipeppr-widget-gcode-body').removeClass('gcode-short-mode');
                $('.com-chilipeppr-widget-gcode-toolchange').addClass('hidden');
                $(window).trigger('resize');
            }
        },
        //shows/hides the units of measurements modal when no units are found in the gcode file.
        showUOMModal: function(txt, info, skipLocalStore){
            console.log("showUOMModal");
            that = this;
            $('#com-chilipeppr-widget-gcode-uom-modal #inches-button').click(function(){ that.setUOM(txt,info,skipLocalStore, "inches")});
            $('#com-chilipeppr-widget-gcode-uom-modal #mm-button').click(function(){ that.setUOM(txt,info,skipLocalStore, "mm")});
            $('#com-chilipeppr-widget-gcode-uom-modal').modal('show');
            $(window).trigger('resize');
        },
        hideUOMModal: function(){
            console.log("hideUOMModal");
            $('#com-chilipeppr-widget-gcode-uom-modal').modal('hide');
            $(window).trigger('resize');
        },
        setUOM: function(txt, info, skipLocalStore, units){
            this.hideUOMModal();
            if (units === "inches")
                txt = "G20\n"+txt; //add G20 to first line of gcode file
            else if (units === "mm")
                txt = "G21\n"+ txt; //add G21 to first line of gcode file
            this.isDirtyUnits = true;
            this.onFileLoaded(txt,info,skipLocalStore); //send new txt to onFileLoaded
        },
        getCoordFromControllerRecvCallback: null,
        getCoordFromController: function(callback) {
            this.getCoordFromControllerRecvCallback = callback;
            console.log("getCoordFromController");
	    
            chilipeppr.subscribe("/com-chilipeppr-interface-cnccontroller/coords",
				 this, this.getCoordFromControllerRecv);
            chilipeppr.publish("/com-chilipeppr-interface-cnccontroller/requestCoords", "");
        },
        getCoordFromControllerRecv: function(coords) {
            // unsub so we don't get anymore callbacks on this
            chilipeppr.unsubscribe("/com-chilipeppr-widget-cnccontroller/coords",
				   this.getCoordFromControllerRecv);

            if (this.getCoordFromControllerRecvCallback)
            {
                // call the callback and then null it so we only call it once
                console.log("getCoordFromControllerRecv ", coords);
                this.getCoordFromControllerRecvCallback(coords);
                this.getCoordFromControllerRecvCallback = null;
            }
            else
            {
                console.log("GetCoordFromControllerRecv called with null callback... shouldn't happen")
            }
        },
        getMotorConfigCallback: function(data) {
        },
        getXyzCoordsForLineRecv3dObjCallback: null,
        getXyzCoordsForLineRecv3dObjLine: null,
        obj3d: null,
        getXyzCoordsForLine: function(line, callback) {
            console.log("getXyzCoordsForLine. line:", line);
            this.getXyzCoordsForLineRecv3dObjLine = line;
            this.getXyzCoordsForLineRecv3dObjCallback = callback;
            chilipeppr.subscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this, this.getXyzCoordsForLineRecv3dObj);
            chilipeppr.publish("/com-chilipeppr-widget-3dviewer/request3dObject", "");
        },
        getXyzCoordsForLineRecv3dObj: function(obj3d) {
            this.obj3d = obj3d;
            var x,y,z;
            var indx = this.getXyzCoordsForLineRecv3dObjLine - 1;
            x = obj3d.userData.lines[indx].p2.x;
            y = obj3d.userData.lines[indx].p2.y;
            z = obj3d.userData.lines[indx].p2.z;

            // unsub so we don't get anymore callbacks on this
            chilipeppr.unsubscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this.getXyzCoordsForLineRecv3dObj);

            this.getXyzCoordsForLineRecv3dObjCallback({index: indx, x: x, y: y, z: z });
        },
        /*
         initControllerSpecific: function(controllerId) {
         // This is the init section specific to a controller, that way we can support different controllers
         // in the future like GrblShield, etc.

         if (controllerId == "tinyg" || controllerId == null) {
         // subscribe to the TinyG plannerresume/plannerpause signals so we know when to slow
         // down on our sending

         } else {
         console.error("Being asked to init controller we have no code for.");
         }
         },
         */
        btnSetup: function() {

            // chevron hide body
            var that = this;
            $('#com-chilipeppr-widget-gcodeviewer .hidebody').click(function(evt) {
                console.log("hide/unhide body");
                if ($('#com-chilipeppr-widget-gcode-body-2col').hasClass('hidden')) {
                    // it's hidden, unhide
                    that.showBody(evt);
                } else {
                    // hide
                    that.hideBody(evt);
                }
            });

            // setup buttons
            $('#com-chilipeppr-widget-gcode-play').click(this.onPlay.bind(this));
            $('#com-chilipeppr-widget-gcode-pause').click(this.onPause.bind(this));
            $('#com-chilipeppr-widget-gcode-stop').click(this.onStop.bind(this));
            $('#com-chilipeppr-widget-gcode-stepback').click(this.onStepBack.bind(this));
            $('#com-chilipeppr-widget-gcode-stepfwd').click(this.onStepFwd.bind(this));
            $('#com-chilipeppr-widget-gcode-btnoptions').click(this.showOptionsModal.bind(this));

            // setup planner indicator icon
            $('#com-chilipeppr-widget-gcodeviewer div.plannerpause').popover({
                html: true,
                delay: 200,
                animation: true,
                trigger: 'hover',
                placement: 'auto',
                container: 'body'
            });
        },
        onFeedhold: function() {
            if (! (this.isPaused)) {
                this.onPause();
            }
            //this.isPaused = true;
        },
        pauseBtnIcon: null,
        onPlannerPause: function() {
            console.log("gcode being asked to pause.");
            if (this.pauseBtnIcon == null)
                this.pauseBtnIcon = $('#com-chilipeppr-widget-gcodeviewer div.plannerpause');

            if (!this.isPausedByPlanner) {
                // we are not paused, so go ahead and pause
                this.onPauseByPlanner();
                // visuall indicate we were paused by planner, not by a human
                this.pauseBtnIcon.addClass('btnIconWarning');
            } else {
                console.log("got planner pause, but we're already paused");
            }
        },
        onPlannerResume: function() {
            console.log("gcode being asked to resume.");
            if (this.pauseBtnIcon == null)
                this.pauseBtnIcon = $('#com-chilipeppr-widget-gcodeviewer div.plannerpause');

            if (this.isPausedByPlanner) {
                // we are currently paused, so calling onPause will unpause (as if the user was toggling
                // pause button)
                this.onPauseByPlanner();
                this.pauseBtnIcon.removeClass('btnIconWarning');
            } else {
                console.log("got planner resume, but we're already resumed which is weird. maybe user did it.");
            }
        },
        isBodyShowing: true,
        showBody: function(evt) {
            $('#com-chilipeppr-widget-gcode-body-2col').removeClass('hidden');
            $('#com-chilipeppr-widget-gcode-feedrate').removeClass('hidden');
            $('#com-chilipeppr-widget-gcode-footer').removeClass('hidden');
            $('#com-chilipeppr-widget-gcodeviewer .hidebody span').addClass('glyphicon-chevron-up');
            $('#com-chilipeppr-widget-gcodeviewer .hidebody span').removeClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = true;
                this.saveOptionsModal();
            }
            this.isBodyShowing = true;
            $(window).trigger('resize');
        },
        hideBody: function(evt) {
            $('#com-chilipeppr-widget-gcode-body-2col').addClass('hidden');
            $('#com-chilipeppr-widget-gcode-feedrate').addClass('hidden');
            $('#com-chilipeppr-widget-gcode-footer').addClass('hidden');
            $('#com-chilipeppr-widget-gcodeviewer .hidebody span').removeClass('glyphicon-chevron-up');
            $('#com-chilipeppr-widget-gcodeviewer .hidebody span').addClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = false;
                this.saveOptionsModal();
            }
            this.isBodyShowing = false;
            $(window).trigger('resize');
        },
        forkSetup: function () {
            var topCssSelector = '#com-chilipeppr-widget-gcodeviewer';
            //$(topCssSelector + ' .fork').prop('href', this.fiddleurl);
            //$(topCssSelector + ' .standalone').prop('href', this.url);
            //$(topCssSelector + ' .fork-name').html(this.id);
            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 200,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });

            // load the pubsub viewer / fork element which decorates our upper right pulldown
            // menu with the ability to see the pubsubs from this widget and the forking links
            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .panel-heading .pubsub-dropdown-menu'), that);
                });
            });

        },
        setupResizeable: function () {
            //$( "#com-chilipeppr-widget-gcode-body" ).resizable({
            var that = this;
            $("#com-chilipeppr-widget-gcodeviewer").resizable({
                //alsoResize: "#com-chilipeppr-widget-gcode-body-2col > td:first"
                alsoResize: "#com-chilipeppr-widget-gcode-body",
                //ndex:1
                //handles: "s",

                //maxHeight:1000,
                resize: function (evt) {
                    console.log("resize resize", evt);
                    //$( "#com-chilipeppr-widget-gcodeviewer" ).removeAttr("style");
                    $("#com-chilipeppr-widget-gcodeviewer").css('height', 'initial');
                    $('#com-chilipeppr-widget-gcode-body').css('width', 'initial');
                },
                start: function (evt) {
                    console.log("resize start", evt);
                },
                stop: function (evt) {
                    console.log("resize stop", evt);
                    //$( "#com-chilipeppr-widget-gcodeviewer" ).removeAttr("style");
                    $("#com-chilipeppr-widget-gcodeviewer").css('height', 'initial');
                    $('#com-chilipeppr-widget-gcode-body').css('width', 'initial');
                    // publish that we just resized ourselves in case any other widget cares
                    chilipeppr.publish("/" + that.id + "/resize", "");
                }
            });
        },
        setupFeedrateAdjust: function () {
            $('#com-chilipeppr-widget-gcode-feedrate-up').click(this.feedrateUp.bind(this));
            $('#com-chilipeppr-widget-gcode-feedrate-down').click(this.feedrateDown.bind(this));
            $('#com-chilipeppr-widget-gcode-feedrate-reset').click(this.feedrateReset.bind(this));
            $('#com-chilipeppr-widget-gcode-feedrate-adjust').click(this.feedrateAdjust.bind(this));
            
            // attach to any keypress
            $('#com-chilipeppr-widget-gcode-feedrate-val').keyup(this.feedrateAdjust.bind(this));
            //this.feedrateDisable();
            //setTimeout(this.feedrateEnable, 5000);
            //alert("fr disable");
        },
        feedrateDisable: function() {
        	$('#com-chilipeppr-widget-gcode-feedrate').attr('disabled', true);
          $('#com-chilipeppr-widget-gcode-feedrate-up').attr('disabled', true);
          $('#com-chilipeppr-widget-gcode-feedrate-down').attr('disabled', true);
          $('#com-chilipeppr-widget-gcode-feedrate-reset').attr('disabled', true);
          $('#com-chilipeppr-widget-gcode-feedrate-adjust').attr('disabled', true);
          $('#com-chilipeppr-widget-gcode-feedrate-val').attr('disabled', true);

        },
        feedrateEnable: function() {
        	$('#com-chilipeppr-widget-gcode-feedrate').attr('disabled', false);
          $('#com-chilipeppr-widget-gcode-feedrate-up').attr('disabled', false);
          $('#com-chilipeppr-widget-gcode-feedrate-down').attr('disabled', false);
          $('#com-chilipeppr-widget-gcode-feedrate-reset').attr('disabled', false);
          $('#com-chilipeppr-widget-gcode-feedrate-adjust').attr('disabled', false);
          $('#com-chilipeppr-widget-gcode-feedrate-val').attr('disabled', false);

        },
        feedrateUp: function () {
            //console.log("feed up", this);
            var frdom = $('#com-chilipeppr-widget-gcode-feedrate-val');
            frdom.val((parseFloat(frdom.val()) + 0.1).toFixed(2));
            this.feedrateUpdateDom();
        },
        feedrateDown: function () {
            //console.log("feed down", this);
            var frdom = $('#com-chilipeppr-widget-gcode-feedrate-val');
            var val = (parseFloat(frdom.val()));
            
            if (val <= 0.01) return;
            if (val <= 0.1) val -= 0.01;
            else val -= 0.1;
            frdom.val(val.toFixed(2));
            this.feedrateUpdateDom();
        },
        feedrateReset: function () {
            console.log("feed reset", this);
            var frdom = $('#com-chilipeppr-widget-gcode-feedrate-val');
            frdom.val("1.00");
            this.feedrateUpdateDom();
        },
        feedrateAdjust: function () {
            console.log("feed adjust", this);
            //var frdom = $('#com-chilipeppr-widget-gcode-feedrate-val');
            //frdom.val("1.00");
            this.feedrateUpdateDom();
        },
        feedrateUpdateDom: function () {
            var frdom = $('#com-chilipeppr-widget-gcode-feedrate-val');
            var val = parseFloat(frdom.val());
            if (isNaN(val)) frdom.addClass("alert-danger");
            else frdom.removeClass("alert-danger");
            var that = this;
            $('#com-chilipeppr-widget-gcode-tbl .g').each(function (index, td) {
                //console.log("i:", i, "td:", td);
                var origline = that.fileLines[index];
                var tdDom = $(td);
                origline = that.getFeedrateMarkup(origline);
                origline = that.getCommentMarkup(origline);

                tdDom.html(origline);
                /*
                 //var html = tdDom.html();
                 //console.log("html:", html);
                 //var curF = html.match(/(F)(\d+\.{0,1}\d*?)([\s$])/g);
                 var curF = origline.match(/(F)(\d+\.{0,1}\d*)/g);
                 if (curF) {
                 //console.log("origline:", origline, "curF:", curF);
                 //console.log("original file line:", origline);
                 for (var i = 0; i < curF.length; i++) {
                 var item = curF[i];
                 var fval = parseFloat(item.replace(/F/i, ""));
                 //console.log("fval:", fval);
                 fval = val * fval;
                 //console.log("new fval:", fval);
                 origline = origline.replace(item, "<span class=\"feedrate-adjust\">F" + fval.toFixed(2) + "</span>");
                 }
                 tdDom.html(origline);
                 }
                 //curF = parseFloat(curF);
                 //console.log("curF:", curF);
                 */
            });
        },
        onRecv3dObjectPerRowTd: null, // this is set before calling onRecv3dObjectPerRow()
        //obj3d: null,
        isShowingCoords: false, // boolean to track if we're showing coords right now
        isInsideCoords: false, // bool of whether user mouse is inside coords to not hide it
        onRecv3dObjectPerRow: function(obj3d) {
            console.log("got onRecv3dObjectPerRow. obj3d:", obj3d, "onRecv3dObjectPerRowTd:", this.onRecv3dObjectPerRowTd);

            /*
             // this lets us cache the obj3d so we don't have to keep pubsubbing
             // if we were passed in the obj3d, set it to global propertry
             if (obj3d) this.obj3d = obj3d;
             // else set obj3d from global property
             else obj3d = this.obj3d;
             */

            var that = this;
            this.isShowingCoords = true;
            //var td = this.onRecv3dObjectPerRowTd;
            var tr = this.onRecv3dObjectPerRowTd.parent();
            var td = tr.find('.gtools');
            var indx = parseInt(tr.find(".indx").text());
            //console.log("td:", td, "tr:", tr, "indx:", indx);

            var x,y,z,a,x2,y2,z2,a2;
            if (indx-2 < 0) {
                x = y = z = a = 0;
            } else {
                x = obj3d.userData.lines[indx-2].p2.x;
                y = obj3d.userData.lines[indx-2].p2.y;
                z = obj3d.userData.lines[indx-2].p2.z;
            }
            x2 = obj3d.userData.lines[indx-1].p2.x;
            y2 = obj3d.userData.lines[indx-1].p2.y;
            z2 = obj3d.userData.lines[indx-1].p2.z;
            //var offset = td.offset();
            var offset = td.position();
            var coordsEl = $(
                    '<div class="com-chilipeppr-widget-gcodeviewer-coords-wrapper" style="left:' + (offset.left - 10) + 'px;top:' + offset.top + 'px;">' +
                    '<div class="com-chilipeppr-widget-gcodeviewer-coords">' +
                    '<div class="com-chilipeppr-widget-gcodeviewer-coords-start">' +
                    '<span class="coords-lbl">Start</span><span class="coords-axis">X</span><span>' + x + '</span><span class="coords-axis">Y</span><span>' + y + '</span><span class="coords-axis">Z</span><span>' + z + '</span>' +
                    '</div>' +
                    '<div class="com-chilipeppr-widget-gcodeviewer-coords-end">' +
                    '<span class="coords-lbl">End</span><span class="coords-axis">X</span><span>' + x2 + '</span><span class="coords-axis">Y</span><span>' + y2 + '</span><span class="coords-axis">Z</span><span>' + z2 + '</span>' +
                    '</div>' +
                    '<div class="btnMoveToThisPos">' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            );
            // send to btn
            var btnEl = $('<div><button class="btn btn-xs btn-default" style="width:100%">Send Gcode to Move to This Position</button></div>')
            btnEl.click(function() {
                chilipeppr.publish("/com-chilipeppr-widget-serialport/send", "G0 X" + x2 + " Y" + y2 + " Z" + z2 + "\n");
            });
            coordsEl.find('.btnMoveToThisPos').append(btnEl);

            // new start pos
            btnEl = $('<div><button class="btn btn-xs btn-default" style="width:100%">Set as New Start Position</button></div>')
            btnEl.click(function(evt) {
                
                // call our method that will correctly set new start position
                that.setNewStartPosition(indx, tr);
            });
            coordsEl.find('.btnMoveToThisPos').append(btnEl);

            $('#com-chilipeppr-widget-gcode-body-wrapper').prepend(coordsEl);
            coordsEl.on('mouseover', function(evt) {
                console.log("isInsideCoords mouseenter");
                that.isInsideCoords = true;
            });
            coordsEl.on('mouseleave', function(evt) {
                console.log("isInsideCoords mouseleave");
                that.isInsideCoords = false;
                $('.com-chilipeppr-widget-gcodeviewer-coords-wrapper').remove();
                that.isShowingCoords = false;
            });

            // unsubscribe from receiving pubsub again
            chilipeppr.unsubscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this, this.onRecv3dObjectPerRow);
        },
        setNewStartPosition: function(indx, tr) {
            
            console.group("gcode widget - setNewStartPosition");
            //console.log("new start pos indx:", indx, "evt.target:", evt.target);
            console.log("new start pos indx:", indx);

            // let's use metadata
            // indx we have is UI indx which is 1-based, metaLines is 0-based
            //that.metaLines[indx - 1].isNewStartPos = true;
            
            // reset meta data for all lines after me
            // this method wants 1-based index
            this.resetMetaDataQueueWriteComplete(indx);            
            
            console.log("tr:", tr);
            // remove other hilites
            //tr.parent().find('td').removeClass('alert-danger').css('background-color', 'none');
            tr.find('.glyphicon-ok').css('color', '#a94442').parent().css('background-color', '#f2dede');
            this.currentLine = indx - 1;
            
            console.groupEnd();

        },
        showXyzCoordsForRow: function(td) {
            if (!this.isShowingCoords) {
                this.onRecv3dObjectPerRowTd = td;

                // see if we have cached 3d object
                chilipeppr.subscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this, this.onRecv3dObjectPerRow);
                chilipeppr.publish("/com-chilipeppr-widget-3dviewer/request3dObject", "");
            }
        },
        setupRowTrigger: function () {
            var that = this;
            $('#com-chilipeppr-widget-gcode-tbl')
                .on("mouseover", 'tr', function (evt) {
                    //stuff to do on mouseover
                    var td = $(evt.currentTarget).children(".g");
                    //console.log("got mouseover on tr:", evt, evt.currentTarget, td);
                    if (td.hasClass("g")) {
                        //console.log("calling parse");
                        that.parseGcodeForDomElem(td, true);

                        // show xyz value
                        $('.com-chilipeppr-widget-gcodeviewer-coords-wrapper').remove();
                        that.isShowingCoords = false;
                        that.showXyzCoordsForRow(td);
                    }
                });


            $('#com-chilipeppr-widget-gcode-tbl')
                .on("mouseout", 'tr', function (evt) {
                    console.log("got mouseout on tr");
                    /*
                     setTimeout(function() {
                     if (that.isShowingCoords && !that.isInsideCoords) {
                     $('.com-chilipeppr-widget-gcodeviewer-coords-wrapper').remove();
                     that.isShowingCoords = false;
                     }
                     }, 5);
                     */
                });



            $('#com-chilipeppr-widget-gcode-tbl')
                .on("mouseleave", function (evt) {
                    console.log("got mouseout on table");
                    //$('.com-chilipeppr-widget-gcodeviewer-coords-wrapper').remove();
                    //that.isShowingCoords = false;
                    setTimeout(function() {
                        if (that.isShowingCoords && !that.isInsideCoords) {
                            $('.com-chilipeppr-widget-gcodeviewer-coords-wrapper').remove();
                            that.isShowingCoords = false;
                        }
                    }, 5);
                });


            /*
             $('#com-chilipeppr-widget-gcode-tbl')
             .on("mouseout", function() {
             that.cleanupHilites();
             });
             */

            /*
             $('#com-chilipeppr-widget-gcode-tbl')
             .on("mouseout", 'tr', function (evt) {
             console.log("got mouseout on tr:", evt);
             var td = $(evt.currentTarget).children(".g");
             if (td) {
             that.cleanupDomElem(td);
             //td.html(td.text());
             //that.parseGcodeForDomElem(td, false);
             }
             $(".com-chilipeppr-widget-gcode .popover").remove();
             });
             */

            $('#com-chilipeppr-widget-gcode-tbl')
                .on("click", 'tr', function (evt) {
                    //stuff to do on click
                    console.log("got click on tr:", evt);
                    var tr = $(evt.currentTarget);
                    if (tr.hasClass("gcode-rowhilite")) tr.removeClass("gcode-rowhilite");
                    else tr.addClass("gcode-rowhilite");

                    /*
                     var td = tr.children(".g");
                     console.log(td);
                     var gcodehtml = td.html();
                     // remove divs and spans
                     console.log("gcode html", gcodehtml);

                     var tmp = $('#com-chilipeppr-widget-gcode-tmparea');
                     tmp.html(gcodehtml);
                     tmp.children(".popover").remove();
                     var gcode = tmp.text();
                     var rowind = td[0].parentNode.rowIndex;
                     */
                    var rowind = tr.children('.indx').text();
                    var indx = parseInt(rowind) - 1;
                    var gcode = that.fileLines[indx];
                    console.log("rowindex:", rowind, "indx:", indx, "gcode is:", gcode);

                    // publish to other widgets that a gcode line got hit so, for example,
                    // the 3D viewer could jump the toolhead to this point and hilite the line
                    if (that.options.perRow == "serial") {
                        // send this command to serial port instead
                        chilipeppr.publish("/com-chilipeppr-widget-serialport/send", gcode);
                    } else {
                        // send this command to 3d viewer
                        chilipeppr.publish("/com-chilipeppr-widget-3dviewer/gotoline", {
                            line: indx - 1,
                            //gcode: gcode,
                            anim: that.options.perRow3dType
                        });
                    }
                });

        },
        timeStart: null,
        timeEnd: null,
        isPlayStep: false,
        isPlaying: false,
        isPaused: false,
        isPausedByPlanner: false,
        preUploadRemainder: 0,
        currentLine: null,    // 0-based index of what gcode line we're playing
        onPauseByPlanner: function (event) {
            if (this.isPausedByPlanner) {
                console.log("onPauseByPlanner. was previously paused by planner, unpausing");
                //this.isPaused = false;
                this.isPausedByPlanner = false;
                if (this.isInMultiLineMode) {
                    console.log("in multi line send mode");
                    this.onPlayMultiLine();
                } else {
                    // do single line mode
                    this.onPlayNextLine();
                }
                //this.onPlayNextLine();
            } else {
                console.log("onPauseByPlanner. was previously unpaused by planner, pausing from planner");
                //this.isPaused = true;
                this.isPausedByPlanner = true;
            }
        },
        onStepBack: function(evt) {
            console.log("onStepBack. ");
            if (evt) this.hideToolChangeDiv(false);
            this.currentLine = this.currentLine - 2;
            if (this.currentLine < 0) this.currentLine = 0;
            this.isPlayStep = true;
            this.onPlayNextLine();
        },
        onStepFwd: function(evt) {
            console.log("onStepFwd");
            if (evt) this.hideToolChangeDiv(false);
            this.isPlayStep = true;
            this.onPlayNextLine();
        },
        onPause: function (event, isFromM6, isFromCpPause) {
            if (this.isPaused) {
                console.log("onPause. was previously paused by user, unpausing");
                this.isPaused = false;
                $('#com-chilipeppr-widget-gcode-pause').removeClass("active");

                if (event) this.hideToolChangeDiv(true);

                if (event && this.options.ppsOnUnpauseResume)
                    chilipeppr.publish("/com-chilipeppr-widget-serialport/send", "~\n");

                if (this.isInMultiLineMode) {
                    console.log("in multi line send mode");
                    this.onPlayMultiLine();
                } else if (this.preUploadRemainder > 0){
                    this.onPreUpload(this.preUploadRemainder);
                } else {
                    // do single line mode
                    this.onPlayNextLine();
                }
                //this.onPlayNextLine();
            } else {
                console.log("onPause. pausing at request of user");
                console.log(event);
                this.isPaused = true;
                $('#com-chilipeppr-widget-gcode-pause').addClass("active");

                if (event && this.options.ppsOnPauseFeedhold)
                    chilipeppr.publish("/com-chilipeppr-widget-serialport/send", "!\n");
            }
            
            // fire off pubsub signal for others to watch the pause btn
            var metaData = null;
            if (isFromM6) metaData = "m6";
            if (isFromCpPause) metaData = "chilipeppr_pause";
            chilipeppr.publish("/com-chilipeppr-widget-gcode/onpause", this.isPaused, metaData);
            
        },
        // pass in 0-based array index cuz this is manipulating array meta data
        resetMetaDataQueueWriteComplete: function(indexToStartAfter) {
            console.group("gcode widget - resetMetaDataQueueWriteComplete");
            console.log("indexToStartAfter:", indexToStartAfter);
            var that = this;
            var indx = 0;
            if (indexToStartAfter != null && indexToStartAfter > 0 ) indx = indexToStartAfter;
            for (; indx < this.metaLines.length; indx++) {
                if (that.metaLines[indx] != null) {
                    console.log("found metaLine. resetting. indx:", indx);
		    that.metaLines[indx] = $.extend({}, that.metaObj);
                    // this will update the UI, but only for showing lines
                    that.updateRowQueueStats(indx + 1);
                }
            }
            console.groupEnd();
        },
        onStop: function (event) {

            if (event && ('viaOnExecute' in event || 'viaOnComplete' in event)) {
                // this was triggered after seeing the last onExecute cmd
                $('#com-chilipeppr-widget-gcode-play').prop("disabled", false);
                $('#com-chilipeppr-widget-gcode-stop').prop("disabled", true);
                $('#com-chilipeppr-widget-gcode-pause').prop("disabled", true);
                this.hideToolChangeDiv(false);

                this.isPlaying = false;
                this.isPaused = false;
                this.currentLine = 0; 
                this.isResetMetaBeforePlay = true;
            } else {
                
                if (event) {
                    $('#com-chilipeppr-widget-gcode-play').prop("disabled", false);
                    $('#com-chilipeppr-widget-gcode-stop').prop("disabled", true);
                    $('#com-chilipeppr-widget-gcode-pause').prop("disabled", true);
                    this.hideToolChangeDiv(false);
                }
                
                this.isPlaying = false;
                
                if (event)
                    this.isResetMetaBeforePlay = true;
                
                if (event)
                    this.currentLine = 0;
                
                // wipe metadata of isQueue,isWritten,isComplete
                if (event)
                    this.resetMetaDataQueueWriteComplete();
                // update UI?
                
                if (event && this.options.ppsOnStopFeedhold)
                    chilipeppr.publish("/com-chilipeppr-widget-serialport/send", "!\n%\n");
                
                /*
             $('#com-chilipeppr-widget-gcode-tbl tr').each(function (i, tr) {
             $(tr).children("td:first").children("span").css("color", "");
             });
             */
                
                // fire off pubsub signal for others to watch the stop btn
                var meta = { isStopByUser: event ? true : false };
                chilipeppr.publish("/com-chilipeppr-widget-gcode/onstop", meta);
            }
            
            this.feedrateEnable();
            
        },
        /**
         * The onPlay is called from the Play button (or other mechanism) and as of 1/2/17 it
         * now fires off the /onPlay pubsub so that a Play can get interrupted. It then listens to it's own
         * /onPlay publish event at the lowest priority so that it can play as the last step in the pubsub chain.
         * This gives other widgets a chance to interrupt the play event.
         */
        onPlay: function(event) {
            
            console.log("got onPlay. this:", this, "event:", event);
            
            // indicate we're starting play in the UI
            $('.com-chilipeppr-widget-gcode-startindicator').removeClass("hidden");
            
            // fire off pubsub signal for others to watch the play btn
            var meta = { isPlayByUser: event ? true : false };
            meta.gcodeLines = this.fileLines;
            chilipeppr.publish("/com-chilipeppr-widget-gcode/onplay", meta);

        },
        isResetMetaBeforePlay: false, // this is set to true after a play has been completed and done all the way to the end. usually we reset the meta data when user hits stop, but we want to let the user know all lines were completed after their job was done so we don't reset. however, if they hit play again we need to reset
        isJobDonePubSubSent: false, // track this so that we don't fire the end of job pubsub event more than once. this was needed because you could sleep your laptop after a job done, then unsleep, reconnect to cnc controller, get the line complete status again, and think the job just got done when it clearly didn't
        /**
         * This is now called from pubsub, which means we publish our own /onPlay event when user hits button and then listen
         * for the callback so that other widgets can interrupt the /onPlay if they have to. We get called last because
         * we subscribe at the lowest priority.
         */
        onPlayAfter: function (event) {
            // loop thru each line and send gcode
            console.log("got onPlayAfter. this:", this, "event:", event);
            //console.log(event);

            $('.com-chilipeppr-widget-gcode-startindicator').addClass("hidden");

            // this is set to true after a play has been completed and done 
            // all the way to the end. usually we reset the meta data when 
            // user hits stop, but we want to let the user know all lines 
            // were completed after their job was done so we don't reset.
            // however, if they hit play again we need to reset
            if (this.isResetMetaBeforePlay) {
                this.resetMetaDataQueueWriteComplete();
                this.isResetMetaBeforePlay = false;
            }
            // set back to false in case user changed modes to remove
            // line numbers. this will get set back to true on the first
            // onExecuted() encountered, so we're safe putting this to false
            // on each play
            this.isInExecuteScrollToMode = false;
            
            // set back to false so we get job done pubsub
            this.isJobDonePubSubSent = false;
            
            // track time for job
            this.timeStart = new Date().getTime();
            $('#gcode-time-start').text(new Date().toLocaleTimeString());

            // configure buttons
            $('#com-chilipeppr-widget-gcode-play').prop("disabled", true);
            $('#com-chilipeppr-widget-gcode-pause').prop("disabled", false);
            $('#com-chilipeppr-widget-gcode-stop').prop("disabled", false);

						this.feedrateDisable();
            
            this.isPlaying = true;
            this.isPaused = false;
            
            // reset onExecuted's last ctr (need to do this since
            // we could start from middle position). also when this val
            // is null it means we won't track onExecuted, i.e. if user
            // types a command from serial port console we can ignore
            if (this.currentLine != null)
                this.lastLineMarkedExecuted = this.currentLine;
            else
                this.lastLineMarkedExecuted = 0;      
            
            $('#com-chilipeppr-widget-gcode-pause').removeClass("active");

            if (event && this.options.ppsOnPlayFlush)
                chilipeppr.publish("/com-chilipeppr-widget-serialport/send", "%\n");


            // start from scratch. this is the same method
            // that the jumpscroll uses to go to top
            //this.jumpToTop();

            //this.currentLine = 0;

            // do pre-Upload
            if (this.options.preUpload && this.options.preUpload != 'none') {
                // TODO. double check if in send to 3d viewer mode
                // to skip this

                var numToUpload = parseInt(this.options.preUpload);

                console.log("user wants a preload. N lines:", numToUpload);
                if (numToUpload > this.fileLines.length) {
                    numToUpload = this.fileLines.length - 1;
                }
                
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Pre-Uploading Gcode", "Pre-Uploading " + numToUpload + " lines. This may take a while. This message will dismiss when completed.", 3000);
                
                this.onPreUpload(numToUpload);

            }

            if (this.isInMultiLineMode) {
                console.log("in multi line send mode");
                this.onPlayMultiLine();
            } else {
                // do single line mode
                this.onPlayNextLine();
            }

            // commented out on 1/2/17 by JLauer because we now fire this off before any play action occurs
            // so others can interrupt
            /*
            // fire off pubsub signal for others to watch the play btn
            var meta = { isPlayByUser: event ? true : false };
            chilipeppr.publish("/com-chilipeppr-widget-gcode/onplay", meta);
            */
            
            return true;
        },
        isInMultiLineMode: true, // are we in single line play mode or multiline mode?
        multiLines: 1, // how many lines to send each multi call
        onPlayMultiLine: function() {
            // In this strategy we will play multiple lines at a time
            // Since we call onPreUpload() which plays as many lines as we went
            // and uses step mode, there's no auto setTimeout to play next line
            // so we must mimic that

            if (this.isPaused) {
                console.log("onPlayMultiLine. we're now paused by user, so exiting. you can unpause and call me again.");
                return;
            }
            if (!this.isPlaying) {
                console.log("onPlayMultiLine. we're being asked to stop, so exiting.");
                return;
            }

            if (this.isPausedByPlanner) {
                console.log("onPlayMultiLine: we are paused by planner, so exiting.");
                return;
            }

            var numToUpload = this.multiLines;
            console.log("user wants a multiplay of. N lines:", numToUpload);
            if (numToUpload > this.fileLines.length - this.currentLine) {
                numToUpload = this.fileLines.length - this.currentLine;
                console.log("multilines to play is too long. shortening to:", numToUpload);

                if (numToUpload == 0) {
                    console.log("Done playing multiline. Playing one additional onPlayNextLine() to trigger end.");
                    this.onPlayNextLine();
                    return;
                }
            }
            
            this.onPreUpload(numToUpload);

            // Just use the delayPerLine setting for now. Could make this a seperate setting
            setTimeout(this.onPlayMultiLine.bind(this), this.delayPerLine);
        },
        onPreUpload: function(numToUpload) {
            console.log("inside onPreUpload. user wants N lines uploaded:", numToUpload);

            // tell onPlayNextLine() to not scroll
            this.isPlayNextLineNoScroll = true;
            // let playNextLine() know we're in pre-upload mode
            // so it can do some intelligent decision making
            this.isInPreUploadMode = true;
            
            // send a feedhold command to SPJS
            //chilipeppr.publish("/com-chilipeppr-widget-serialport/send", linegcode + "\n");
           
            // we know onPlayNextLine() publishes here
            // so steal the publish by subscribing at top priority
            // and returning false so other subscribes don't get
            // the call. gang up the lines.
            // unsubscribe from the publish. then send
            // the lines ourself
            this.preUploadGang = ""; // clear preupload string
            this.preUploadGangArr = []; // clear preupload array
            // subscribe at priority 1 better than default of 10
            //chilipeppr.subscribe("/com-chilipeppr-widget-serialport/send", this, this.onPreUploadCallback, 9);
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/jsonSend", this, this.onPreUploadCallback, 1);
            
            //set boolean for whether the preload gets cancelled (due to M6) and needs to resume with remaining lines.
            //var isCancelled = false;

            for(var ctr = 0; ctr < numToUpload; ctr++) {
                console.log("ganging line:", ctr);
                // use step mode as our technique
                // as if we're stepping thru all these lines
                // just really fast
                if (ctr == numToUpload - 1) {
                    // last line, so do want to jump to line in scroll area
                    console.log("onPreUpload. last line so asking to jump to line in scroll area. ctr:", ctr);
                    this.isPlayNextLineNoScroll = false;
                    this.preUploadRemainder = 0; //set to zero once all preupload lines have been sent.
                }
                this.isPlayStep = true;
                var cancelled = this.onPlayNextLine();
                if (cancelled) {
                    this.preUploadRemainder = (numToUpload - (ctr+1)); //store the number of lines remaining.
                    console.log("we were cancelled with our preupload by onPlayNextLine(), so exit the preUpload: " + (numToUpload - (ctr+1)));
                    break;
                }
            }

            // remove step mode
            this.isPlayStep = false;

            // unsubscribe
            //chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/send", this.onPreUploadCallback);
            chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/jsonSend", this.onPreUploadCallback);

            // since this can be a slow process, alert the user this will take a while
            
            
            // send actual ganged lines
            //chilipeppr.publish("/com-chilipeppr-widget-serialport/send", this.preUploadGang);
            chilipeppr.publish("/com-chilipeppr-widget-serialport/jsonSend", this.preUploadGangArr);

            //chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Pre-Uploading Gcode", "Done pre-uploading " + amtLinesToUpload + " lines.", 3000);
            
            
            // set currentLine which is 0 based to number of lines
            // we uploaded, i.e. if we upload 1, index should now
            // be 1 which is next line, cuz index 0 was the line
            // we uploaded
            //this.currentLine = numToUpload;

            // send cycle resume command to SPJS

            this.statEls.sent.text(this.currentLine);
            this.statEls.remaining.text(this.fileLines.length - this.currentLine);
            //this.statEls.timeStart.text(this.timeStart);
            var dur = new Date().getTime() - this.timeStart;
            dur = this.toHHMMSS(parseInt(dur / 1000));
            this.statEls.timeDur.text(dur);
            
            // tell onPlayNextLine() to scroll again
            // only run these commands if the preload was not cancelled due to an M6, otherwise we will re-enter this loop after the pause to complete preload.
            if(this.preUploadRemainder === 0){
                this.isPlayNextLineNoScroll = false;
                this.isInPreUploadMode = false;
            }
        },
        preUploadGang: "", // was used for stringing together strings
        preUploadGangArr: [], // now we're using an array since using jsonSend
        onPreUploadCallback: function(data) {
            console.log("onPreUploadCallback. data:", data);
            //this.preUploadGang += data;
            this.preUploadGangArr.push(data);
            return false; // so other subscribes don't get this
        },
        statEls: null,
        isPlayNextLineNoScroll: false, // whether we scroll (preupload asks us not to)
        onPlayNextLine: function() {

            // if this is a single step, ignore the pause and playing params
            if (this.isPlayStep) {
                console.log("this is a single step");
            } else {
                if (this.isPaused) {
                    console.log("onPlayNextLine. we're now paused by user, so exiting. you can unpause and call me again.");
                    return;
                }
                if (!this.isPlaying) {
                    console.log("onPlayNextLine. we're being asked to stop, so exiting.");
                    return;
                }
            }
            if (this.isPausedByPlanner) {
                console.log("onPlayNextLine: we are paused by planner, so exiting.");
                return;
            }

            console.log("this.currentLine:", this.currentLine);
            var ctr = this.currentLine != null ? this.currentLine : 0;

            if (ctr >= this.fileLines.length) {
                console.log("at end of buffering gcode. exiting.");
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Gcode Sender", "Done buffering Gcode.", 3000, true);
                chilipeppr.publish("/com-chilipeppr-widget-gcode/doneBuffering", "Duration " + this.statEls.timeDur.text() + " Lines " + this.fileLines.length);
                // mimic pressing stop
                //this.onStop();
                return;
            }

            var linegcode = this.fileLines[ctr];
            //console.log("    orig gcode:", linegcode);

            // we need to apply the feedrate multiplier
            linegcode = this.getFeedrateMarkup(linegcode, true);
            //console.log("after feedrate:", linegcode);

            //console.log("onPLay. line:", ctr, " gcode:", linegcode);

            // publish to serial port to send to cnc controller
            if (this.options.whenPlay == "serial") {
                //chilipeppr.publish("/com-chilipeppr-widget-serialport/send", linegcode + "\n");
                // use the new jsonSend
                var json = {
                    D: linegcode + "\n",
                    Id: "g" + (ctr + 1)  // use 1-based index, not 0-based cuz UI shows 1-based
                }
                chilipeppr.publish("/com-chilipeppr-widget-serialport/jsonSend", json);

            }

            // we should mark this off as checked since it's sent
            // that doesn't mean it's executed yet, but that's proving to be really hard
            // to know exactly when our gcode command is executed
            // ACTUALLY just pass in "markSent" to gotoLine below

            // publish to 3d viewer so it syncs to us
            if (this.options.whenPlay == "3d")
                chilipeppr.publish("/com-chilipeppr-widget-3dviewer/gotoline", { line: ctr, gcode: linegcode });

            // sync gcode list view
            /* we are no longer scrolling on queue, but on complete, so its done
               outside of this onPlayNextLine() method
            if (!this.isPlayNextLineNoScroll)
                this.gotoLine(ctr + 1, true);
             */
            this.currentLine++;

            if (this.statEls == null) {
                //console.log("lazy loading statEls");
                this.statEls = {
                    sent: $('#gcode-lines-sent'),
                    remaining: $('#gcode-lines-remaining'),
                    timeStart: $('#gcode-time-start'),
                    timeDur: $('#gcode-time-dur')
                }
            }
            
            // update DOM to show how many lines are sent
            if (!this.isInPreUploadMode) {
                
                //console.log("udpating stats. statEls:", this.statEls);
                this.statEls.sent.text(this.currentLine);
                this.statEls.remaining.text(this.fileLines.length - this.currentLine);
                //this.statEls.timeStart.text(this.timeStart);
                var dur = new Date().getTime() - this.timeStart;
                dur = this.toHHMMSS(parseInt(dur / 1000));
                this.statEls.timeDur.text(dur);
            }

            if (linegcode.match(/M0?6/i)) {
                // yes, it's m6
                // see if they want pause
                if (this.options.pauseOnM6) {
                    this.gotoLine(this.currentLine, true);
                    // pass a null event, but true for the isFromM6 parameter
                    this.onPause(null, true);
                    //this.showToolChangeModal(linegcode,"onplay");
                    // sync gcode list view
                    //if (!this.isPlayNextLineNoScroll)
                    // dont' go to next line, just return
                    return true;
                } else {
                    console.log("got m6 but user does not want pause. continuing.");
                }
            }
            
            //console.log("testing for chilipeppr_pause");
            if (linegcode.match(/chilipeppr_pause/i)) {
                // yes, it's chilipeppr_pause which simply
                // means we stop buffering up gcode to SPJS, fire off
                // an event to let anybody else know, and they have to ask us
                // to unpause
                
                console.log("got chilipeppr_pause. linegcode:", linegcode);
                
                this.gotoLine(this.currentLine, true);
                
                this.onChiliPepprPause({ line: ctr, gcode: linegcode });
                
                // dont' go to next line, just return
                return true;
                
            }
            
            // delay next line
            if (this.isPlayStep) {
                // don't queue up next line, just mark we're done with step
                this.isPlayStep = false;
            } else {
                // queue up next line
                setTimeout(this.onPlayNextLine.bind(this), this.delayPerLine);
            }
        },
        onChiliPepprPause: function(meta) {
            console.log("onChiliPepprPause");
            
            // pass a null event, but false for the isFromM6 parameter,
            // but true for isFromCpPause so user knows the pause event
            // was from the chilipeppr_pause command inside the gcode
            this.onPause(null, false, true);
            
            chilipeppr.publish("/com-chilipeppr-widget-gcode/onChiliPepprPause", meta);
            
        },
        onChiliPepprPauseOnComplete: function(meta) {
            console.log("onChiliPepprPauseOnComplete");
            chilipeppr.publish("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnComplete", meta);
        },
        onChiliPepprPauseOnExecute: function(meta) {
            console.log("onChiliPepprPauseOnExecute");
            chilipeppr.publish("/com-chilipeppr-widget-gcode/onChiliPepprPauseOnExecute", meta);
        },
        toHHMMSS: function (secs) {
            var sec_num = parseInt(secs, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = hours+':'+minutes+':'+seconds;
            return time;
        },
        // linenum is 1-based
        gotoLine: function(linenum, isMarkSent) {

            //console.log("gotoLine:", linenum);

            // linenum is 1-based (not 0-based) since table is 1-based
            if (linenum < this.showingStartIndex || linenum > this.showingEndIndex) {
                // we are needing to show a line way ahead of where we're being asked to show
                console.log("We are being asked to scroll to a line that does not exist so rendering new. linenum:", linenum);
                this.jumpToLine(linenum);
                //return;
            }

            var container = $('#com-chilipeppr-widget-gcode-body');
            // figure out correct index from this.showingStartIndex and linenum
            var indx = linenum - this.showingStartIndex;
            var tr = $('#com-chilipeppr-widget-gcode-tbl tbody tr').eq(indx);

            this.updateRowQueueStatsEl(tr);
            /*
            if (isMarkSent) {
                var check = tr.find('.glyphicon-ok');
                //console.log("marking as sent. black checkbox. checkDom:", check, "tr:", tr);
                check.css('color', 'black');
            }
            */
            var scrollTo = tr;
            console.log("indx:", indx, "scrollTo:", scrollTo);


            container.scrollTop(
                    scrollTo.offset().top - container.offset().top + container.scrollTop()
            );


            // Or you can animate the scrolling:
            /*
             container.animate({
             scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
             });
             */

        },
        fileInfo: null, // stores the info for the file drag/dropped
        onFileLoaded: function (txt, info, skipLocalStore) {
            console.log("Got onFileLoaded. txt.length:", txt.length, "info:", info, "skipLocalStore", skipLocalStore);
            this.fileInfo = info;
            
            //Check for G20 or G21 command. Exit onFileLoaded and prompt user to specify
            if (this.isDirtyUnits === false && txt.match(/(G20|G21)/i) === null ) {
                //no units command found.  prompt user to select units.
                //this could also exit the onFileLoaded function, but failsafe would be to let this method continue in background and reissue once units selected by user.
                this.showUOMModal(txt,info, skipLocalStore);
            }
            
            // create flag to know if we did anything in this method
            // where we actually added/removed any lines of gcode cuz
            // then at end of method we need to re-send the gcode back
            // to the workspace as if it were drag/dropped by the user
            // as if the modified gcode we created was in the original
            // file.
            var isDirty = false;
            
            //if G20 or G21 was added manually, mark as dirty to re-issue to workspace.
            if (this.isDirtyUnits === true) {
                isDirty = true;
                this.isDirtyUnits = false;
            }
            
            var that = this;
            //console.log(arguments);
            //console.log(txt);
            // parse the text file and generate rows
            $('#com-chilipeppr-widget-gcode-tbl > tbody').html("");
            
            this.fileLines = txt.split(/\r{0,1}\n/);
            //this.fileLines = txt.split(/\n/);
            
            // see if last line is empty and if so, drop it
            if (this.fileLines[this.fileLines.length - 1].length == 0) {
                this.fileLines.pop();
            }
            
            // do some pre-processing
            // make all %!~ characters on their own line become a comment
            // swap in %!~ inside comments to words as well
            var didWeRemoveAnyEmptyLines = false;
            var newFileLines = [];
            for (var idx = 0; idx < this.fileLines.length; idx++) {
                var fileLine = this.fileLines[idx];
                if (fileLine.match(/^\s*[%!~]/)) {
                    console.log("found line that had %!~ in it. line:", fileLine);
                    fileLine = fileLine.replace(/%/, ";percent not allowed");
                    fileLine = fileLine.replace(/!/, ";exclamation not allowed");
                    fileLine = fileLine.replace(/~/, ";tilde not allowed");
                    this.fileLines[idx] = fileLine;
                }
                // also check for !~% inside comments and swap
                if (fileLine.match(/\(.*[!~%]/)) {
                    fileLine = fileLine.replace(/!/, "exclamation");
                    fileLine = fileLine.replace(/~/, "tilde");
                    fileLine = fileLine.replace(/%/, "percent");
                    this.fileLines[idx] = fileLine;
                }
                
                // trim
                fileLine = fileLine.trim();
                
                // remove line numbers
                if (this.options.addlinenums) {
                    if (fileLine.match(/N\d/i)) {
                        // candidate, but could be a comment
                        //console.warn("got line num removal candidate. line:", fileLine);
                        // see if we have whole line comment
                        if (fileLine.match(/^;|^\(.*\)$/)) {
                            //console.warn("we have whole line comment, ignore");
                        } else {
                            // we have real gcode
                            //console.warn("we have real gcode:", fileLine);
                            var myFileLine = fileLine.replace(/N\s*\d+/ig, "");
                            // comments removed
                            // now we can see what the number is
                            fileLine = myFileLine;
                        }
                        //console.warn("line at end:", fileLine);
                    }
                }
                
                // remove empty lines (problem is we won't line up with
                // 3d viewer lines anymore)
                if (this.options.removeemptylines) {
                    if (fileLine.match(/^\s*$/)) {
                        //console.warn("got empty line:", fileLine);
                        didWeRemoveAnyEmptyLines = true;
                    } else {
                        newFileLines.push(fileLine);
                    }
                } else {
                    newFileLines.push(fileLine);
                }
                
            }
            this.fileLines = newFileLines;
            
            // create array to store meta data for each line
            // this will hold onSent, onQueue, onWritten, onCompleted,
            // onExecuted statuses. It also holds whether this is a comment
            // so we know whether onExecute will ever get called for this line.
            // It could hold other meta data in the future too like feedrate
            // overrides, etc.
            this.metaLines = [];
            
            // if adding line nums, do it here temporarily
            if (this.options.addlinenums) {
                for (var idx = 0; idx < this.fileLines.length; idx++) {
                    /*if (this.fileLines[idx].match(/^;|^\(.*\)$/)) {
                        // don't add line num
                        //console.warn("we have whole line comment, ignore");
                        this.metaLines[idx] = { isComment: true }
                    } else {*/
                        this.fileLines[idx] = "N" + (idx + 1) + " " + this.fileLines[idx];
                    //}
                }
            } /*else {
                // still parse for comments cuz need those for knowing
                // whether onExecute will come back or not
                
            }*/
            
            // see if we removed/added lines and mark as isDirty
            // so we know at end of this open method to re-send the Gcode
            // file back into the workspace
            if (didWeRemoveAnyEmptyLines) {
                isDirty = true;
            }
            
            //this.metaLines = [this.fileLines.length];
            

            // test code where we set some different statuses
            /*
            this.metaLines[0] = { isQueued: true, isWritten: true, isCompleted: true };
            this.metaLines[1] = { isQueued: true, isWritten: true };
            this.metaLines[2] = { isQueued: true };
            */

            // update dom to show lines
            $('#com-chilipeppr-widget-gcode-footer #gcode-lines').text(this.fileLines.length);
            $('#com-chilipeppr-widget-gcode-footer #gcode-lines-sent').text("0");
            $('#com-chilipeppr-widget-gcode-footer #gcode-lines-remaining').text(this.fileLines.length);

            this.appendRows(1);

            //this.setupInfiniteScroll();
            this.setupJumpScroll();

            // now format the gcode
            console.log("going to parse gcode to hilite it.");
            this.parseGcode();
            if (skipLocalStore != undefined && skipLocalStore == true) {
                console.log("skipping storing local file to retain url path load");
            } else {
                // we can get a QuotaExceededError here, so catch it
                try {
                    // remove old 1st to perhaps make more room for quota check
                    localStorage.removeItem('last-imported');
                    // now set
                    localStorage.setItem('last-imported', txt);
                    console.log("stored gcode view file in local store as text");

                } catch(e) {
                    if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name == "QuotaExceededError" || e.code == 22 || e.name == "NS_ERROR_DOM_QUOTA_REACHED" || e.code == 1014) {
                        //this.sceneRemove(this.object);
                        // show err dialog
                        // $('#com-chilipeppr-widget-gcode-outofspace').modal();
                        console.error("Gcode Widget. out of local storage space, but letting user proceed. err:", e);
                        
                    } else {
                        console.error("Gcode Widget. got generic uncaught err with localStorage:", e);
                    }
                }
                //localStorage.setItem('last-imported', txt);
                localStorage.removeItem('last-loaded');
            }
            
            // if we did anything that changed how many gcode lines there
            // are we need to re-send to the workspace to reset all
            // other widgets that subscribe to onDropped
            if (isDirty) {
                // Let's do this in setTimeout to put it later in the stack
                // so that other widgets can process the initial /onDropped
                // and then we'll get put way later in stack to run afterwards
                setTimeout(this.resendGcodeToWorkspace.bind(this), 200);
                
                // get estimated time duration. request this after a few
                // seconds to give best chance of 3d viewer being loaded
                setTimeout(this.getEstimates.bind(this), 1000);
                
                // now call our post opening call
                console.log("tool change will get called in 3.5secs");
                setTimeout(this.onAfterGcodeFileLoaded.bind(this), 1500);

                // we return false to tell pubsub that no further
                // listeners should parse this onDropped because we just
                // reissued it
                return false;
            } else {
            
                // get estimated time duration. request this after a few
                // seconds to give best chance of 3d viewer being loaded
                setTimeout(this.getEstimates.bind(this), 1000);
                
                // now call our post opening call
                console.log("tool change will get called in 3.5secs");
                setTimeout(this.onAfterGcodeFileLoaded.bind(this), 1500);
            }
        },
        resendGcodeToWorkspace: function() {
            // we need to send this gcode file back to the workspace
            // however, we don't want to get it back ourself, so unsubscribe
            // from the drag/drop event. then send. the re-subscribe.
            chilipeppr.unsubscribe("/com-chilipeppr-elem-dragdrop/ondropped",  this.onFileLoaded);
            var obj = {
                gcode: this.fileLines.join("\n"),
                info: this.fileInfo
            };
            chilipeppr.publish("/com-chilipeppr-elem-dragdrop/loadGcodeDoNotCreateRecentFileEntry", obj);
            chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", this, this.onFileLoaded);
            
        },
        jumpToTop: function() {

            this.infiniteScrollDestroy();
            this.removeAllRows();
            this.appendRows(1);
            /*
             var elem = $('#com-chilipeppr-widget-gcode-tbl');
             console.log("elem.height():", elem.height());
             */
            $('#com-chilipeppr-widget-gcode-body').scrollTop(0);
        },
        // linenum is 1-based
        jumpToLine: function(linenum) {

            this.infiniteScrollDestroy();
            this.removeAllRows();
            this.appendRows(linenum);
            /*
             var elem = $('#com-chilipeppr-widget-gcode-tbl');
             console.log("elem.height():", elem.height());
             */
            $('#com-chilipeppr-widget-gcode-body').scrollTop(0);
        },
        setupJumpScroll: function () {
            var that = this;
            $('.com-chilipeppr-gcode-jumpscroll .paginator-first').click(function () {
                console.log("jump scroll to end");
                that.jumpToTop();

            });
            $('.com-chilipeppr-gcode-jumpscroll .paginator-last').click(function () {
                console.log("jump scroll to end");
                that.infiniteScrollDestroy();
                that.removeAllRows();
                that.appendRows(that.fileLines.length - that.linesToShow + 1);
                var elem = $('#com-chilipeppr-widget-gcode-tbl');
                console.log("elem.height():", elem.height());
                $('#com-chilipeppr-widget-gcode-body').scrollTop(elem.height() + 10);
            });
            // loop thru div 2 thru 8 to attach
            var rowsPerJump = parseInt(this.fileLines.length / 9);
            for (var ctr = 0; ctr <= 7; ctr++) {
                //console.log("attaching click to div ctr:", ctr);
                var jumpAmt = rowsPerJump * (ctr + 1);
                var el = $('.com-chilipeppr-gcode-jumpscroll .paginator').eq(ctr);
                //console.log("EL:", el);
                el.click(jumpAmt, function (evt) {
                    console.log("jump scroll to:", evt.data);
                    that.infiniteScrollDestroy();
                    that.removeAllRows();
                    that.appendRows(evt.data);
                });

            }

            this.preSetupInfiniteScroll(true);
        },
        preSetupInfiniteScroll: function(doTopScrollOffset) {
            // Make clickable buttons at top/bottom in case waypoint fails us (which it has been doing)
            // I think the waypoint dies on resize
            var wayStart = $('#showstart');
            var wayEnd = $('#showend');
            var that = this;

            wayStart.click(function (evt) {
                console.log("click on waypoint for top. evt:", evt);
                if (that.showingStartIndex == 1) {
                    console.log("Already at startIndex 1. Not rendering more.");
                } else {
                    console.log("There's more to show at start. rendering...");
                    that.prependRows(that.showingStartIndex);
                }
            });
            if (doTopScrollOffset) $('#com-chilipeppr-widget-gcode-body').scrollTop(10);

            wayEnd.click(function (evt) {
                console.log("click on waypoint for bottom. evt:", evt);
                if (that.showingEndIndex >= that.fileLines.length) {
                    console.log("Already at endIndex max (fileLInes). Not rendering more.");
                } else {
                    console.log("There's more to show at end. rendering...");
                    that.appendRows(that.showingEndIndex + 1);
                }
            });

        },
        infiniteScrollDestroy: function () {
            //console.log("Destroying waypoints");
            var wayStart = $('#showstart');
            var wayEnd = $('#showend');

            // destory waypoints because as the DOM gets rows injected/removed
            // the waypoints cache their x/y pos and so we need to recreate them
            wayStart.waypoint('destroy');
            wayEnd.waypoint('destroy');
        },
        setupInfiniteScroll: function (doTopScrollOffset) {
            //console.log("setting up waypoints");
            //console.log($('#showstart'));

            if (!this.isBodyShowing) {
                console.log("body not showing, so no reason to setup infinite scroll");
                return;
            }

            var wayStart = $('#showstart');
            var wayEnd = $('#showend');

            // destory waypoints because as the DOM gets rows injected/removed
            // the waypoints cache their x/y pos and so we need to recreate them
            wayStart.waypoint('destroy');
            wayEnd.waypoint('destroy');

            var that = this;
            wayStart.waypoint(function (direction) {
                console.log("waypoint for top. dir:", direction);
                if (direction == "up") {
                    console.log("scroll was up. loading more at start.");
                    if (that.showingStartIndex == 1) {
                        console.log("Already at startIndex 1. Not rendering more.");
                    } else {
                        console.log("There's more to show at start. rendering...");
                        that.prependRows(that.showingStartIndex);
                    }
                }
            }, {
                context: '#com-chilipeppr-widget-gcode-body',
                offset: -1
                //offset: 'bottom-in-view',
            });
            if (doTopScrollOffset) $('#com-chilipeppr-widget-gcode-body').scrollTop(10);

            wayEnd.waypoint(function (direction) {
                console.log("waypoint for bottom. dir:", direction);
                if (direction == "down") {
                    console.log("sroll was down. loading more at end.");
                    if (that.showingEndIndex >= that.fileLines.length) {
                        console.log("Already at endIndex max (fileLInes). Not rendering more.");
                    } else {
                        console.log("There's more to show at end. rendering...");
                        that.appendRows(that.showingEndIndex + 1);
                    }
                }
            }, {
                context: '#com-chilipeppr-widget-gcode-body',
                offset: 'bottom-in-view',
            });
        },
        showingStartIndex: 0,
        showingEndIndex: 0,
        showingStats: function () {
            $('#gcode-lines-showing').text(this.showingStartIndex + " - " + this.showingEndIndex);
        },
        // callbacks from serial port json server, i.e. serial port widget
        // so we can update meta data of lines completed
        setupOnQueueWriteCompletePubSub: function() {
            // if we are in json mode we need to do a few unique things
            // unsubscribe first just in case
            console.group("gcode widget - setupOnQueueWriteCompletePubSub");
            chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/jsonSend", this, this.jsonOnSend);
            chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/onQueue", this, this.onQueue);
            chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/onWrite", this, this.onWrite);
            chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/onComplete", this, this.onComplete);
            chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/onError", this, this.onError);
            // /com-chilipeppr-interface-cnccontroller/onExecute
            chilipeppr.unsubscribe("/com-chilipeppr-interface-cnccontroller/onExecute", this, this.onExecute);
            
            // 1. we subscribe to more events like /jsonOnQueue, /jsonOnWrite, /jsonOnComplete
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/jsonSend", this, this.jsonOnSend);
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/onQueue", this, this.onQueue);
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/onWrite", this, this.onWrite);
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/onComplete", this, this.onComplete);
            chilipeppr.subscribe("/com-chilipeppr-interface-cnccontroller/onExecute", this, this.onExecute);
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/onError", this, this.onError);
            console.groupEnd();
        },
        jsonOnSend: function(data) {
            
            // write it to the log
            //console.group("gcode widget - jsonOnSend");
            console.log("jsonOnSend. data:", data);
            
            // figure out if this was a one-off send or an array
            var arr = [];
            if (Array.isArray(data)) {
                // we have array
                console.log("jsonOnSend. got array of data instead of individual. must be in multi-send mode. cool.");
                arr = data;
            } else {
                // one-off send. pretend array
                arr.push(data);
            }
            
            for(var index = 0; index < arr.length; index++) {
                var item = arr[index];
                var msgEl;
                // check that id string is not null/empty and starts with
                // a g, cuz we make all our id's start with g
                // otherwise this callback is not for us
                if (item.Id.length > 0 && item.Id.match(/^g/)) {
                    
                    console.log("jsonOnSend. seems we have an id for this item with a g. item:", item);
                    // get id
                    var id = item.Id;
                    // get numeric value cuz our ids are "g999"
                    var idnum = parseInt(id.replace(/g/, ""));
                    //console.log("derived idnum:", idnum, "id:", id);
                    
                    // update meta data
                    if (this.metaLines[idnum - 1] == null) {
                        //console.log("no meta data for this element yet. creating it.");
                        this.metaLines[idnum - 1] = $.extend({}, this.metaObj);
                    }
                    
                    // set that it is queued
                    this.metaLines[idnum - 1].isSent = true;
                    
                    // update the dom if this row is showing  
                    // send in 1-based number, not 0-based
                    // our id is 1-based, i.e. the row number
                    this.updateRowQueueStats(idnum);
                    
                }
            }
            //console.groupEnd();

        },
        onQueue: function(data) {
            
            // write it to the log
            //console.group("gcode widget - onQueue");
            console.log("onQueue. data:", data);
            
            var item = data;
            var msgEl;
            // check that id string is not null/empty and starts with
            // a g, cuz we make all our id's start with g
            // otherwise this callback is not for us
            if (item.Id.length > 0 && item.Id.match(/^g/)) {
                
                console.log("onQueue. seems we have an id for this item with a g. item:", item);
                // get id
                var id = item.Id;
                // get numeric value cuz our ids are "g999"
                var idnum = parseInt(id.replace(/g/, ""));
                console.log("onQueue. derived idnum:", idnum, "id:", id);
                
                // update meta data
                if (this.metaLines[idnum - 1] == null) {
                    //console.log("onQueue. no meta data for this element yet. creating it.");
                    this.metaLines[idnum - 1] = $.extend({}, this.metaObj);
                }

                // set that it is queued
                this.metaLines[idnum - 1].isQueued = true;

                // update the dom if this row is showing  
                // send in 1-based number, not 0-based
                // our id is 1-based, i.e. the row number
                this.updateRowQueueStats(idnum);
                
            }
            //console.groupEnd();
                     
        },
        onWrite: function(data) {
            // write it to the log
            //console.group("gcode widget - onWrite");
            console.log("onWrite. data:", data);
            
            var item = data;
            var msgEl;
            // check that id string is not null/empty and starts with
            // a g, cuz we make all our id's start with g
            // otherwise this callback is not for us
            if (item.Id.length > 0 && item.Id.match(/^g/)) {
                
                console.log("onWrite. seems we have an id for this item with a g. item:", item);
                // get id
                var id = item.Id;
                // get numeric value cuz our ids are "g999"
                var idnum = parseInt(id.replace(/g/, ""));
                //console.log("derived idnum:", idnum, "id:", id);
                
                // update meta data
                if (this.metaLines[idnum - 1] == null) {
                    //console.log("no meta data for this element yet. creating it.");
                    this.metaLines[idnum - 1] = $.extend({}, this.metaObj);
                }

                // set that it is queued
                this.metaLines[idnum - 1].isWritten = true;

                // update the dom if this row is showing  
                // send in 1-based number, not 0-based
                // our id is 1-based, i.e. the row number
                this.updateRowQueueStats(idnum);
                
            }
            //console.groupEnd();
        },
	displayLine: function(index, chilipepprPauseFun) {
	    // Only do this if not done already
            if (this.metaLines[index].isDisplayed)
		return;

	    this.metaLines[index].isDisplayed = true;			
	    
            // see if comment
            var linegcode = this.fileLines[index];
            if (linegcode.match(/(\(.*\)|;.*$)/)) {
                // it's comment
                //var re = /\((.*)\)/;
                //re.exec(linegcode);
                var comment = RegExp.$1;
                console.log("Found comment:", comment);
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Gcode Comment", comment, 3000, true);
            }
                    
            // see if M6 tool change command & user wants to pause on M6
            if (linegcode.match(/M0?6/i) && this.options.pauseOnM6) {
                this.showToolChangeModal(linegcode,
					 String(index)+" "+JSON.stringify(this.metaLines[index]));
            }
                    
            // see if chilipeppr_pause command
            if (linegcode.match(/chilipeppr_pause/i)) {
                chilipepprPauseFun(
                    { line: index + 1, gcode: linegcode } 
                );
            }
	},	    
        onComplete: function(data) {
            // write it to the log
            //console.group("gcode widget - onComplete");
            console.log("onComplete. data:", data);
            
            var item = data;
            var msgEl;
            // check that id string is not null/empty and starts with
            // a g, cuz we make all our id's start with g
            // otherwise this callback is not for us
            if (item.Id.length > 0 && item.Id.match(/^g/)) {
                
                console.log("onComplete. seems we have an id for this item with a g. item:", item);
                // get id
                var id = item.Id;
                // get numeric value cuz our ids are "g999"
                var idnum = parseInt(id.replace(/g/, ""));
                //console.log("derived idnum:", idnum, "id:", id);
                
                // update meta data
                if (this.metaLines[idnum - 1] == null) {
                    //console.log("no meta data for this element yet. creating it.");
                    this.metaLines[idnum - 1] = $.extend({}, this.metaObj);
                }

                // set that it is queued
                this.metaLines[idnum - 1].isCompleted = true;

                // update the dom if this row is showing  
                // send in 1-based number, not 0-based
                // our id is 1-based, i.e. the row number
                this.updateRowQueueStats(idnum);
                
                // let user follow along on completes
		
                if (!this.isInExecuteScrollToMode &&
		    !this.metaLines[idnum - 1].isDisplayed) {

                    this.gotoLine(idnum, true);

                    this.displayLine(idnum - 1, this.onChiliPepprPauseOnComplete);

                    // see if we're done sending
                    if (idnum >= this.fileLines.length) {
                        console.log("at end of onCompleting gcode.");
                        chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Gcode Sender", "Done sending all Gcode into the CNC controller. This may not mean it's done executing yet as the controller typically has a planner buffer.", 6000);
                        
                        // also trigger stop button
                        this.onStop({viaOnComplete: true});
                        
                        if (!this.isJobDonePubSubSent) {
                            chilipeppr.publish("/com-chilipeppr-widget-gcode/done", "Duration " + this.statEls.timeDur.text() + " Lines " + this.fileLines.length);
                            this.isJobDonePubSubSent = true;
                        }
                    }

                    // update estimated time remaining
                    this.calcEstimatedRemain(idnum - 1);
                }

            }
            
            // update duration of job
            var dur = new Date().getTime() - this.timeStart;
            dur = this.toHHMMSS(parseInt(dur / 1000));
            if (this.statEls) this.statEls.timeDur.text(dur);
            
            
            //console.groupEnd();
        },
        onError: function(data) {
            // write it to the log
            console.log("onError. data:", data);
            
            var item = data;
            var msgEl;
            // check that id string is not null/empty and starts with
            // a g, cuz we make all our id's start with g
            // otherwise this callback is not for us
            if (item.Id.length > 0 && item.Id.match(/^g/)) {
                
                console.log("onError. seems we have an id for this item with a g. item:", item);
                // get id
                var id = item.Id;
                // get numeric value cuz our ids are "g999"
                var idnum = parseInt(id.replace(/g/, ""));
                //console.log("derived idnum:", idnum, "id:", id);
                
                // update meta data
                if (this.metaLines[idnum - 1] == null) {
                    //console.log("no meta data for this element yet. creating it.");
                    this.metaLines[idnum - 1] = $.extend({}, this.metaObj);
                }

                // set that it is error
                this.metaLines[idnum - 1].isError = true;

                // update the dom if this row is showing  
                // send in 1-based number, not 0-based
                // our id is 1-based, i.e. the row number
                this.updateRowQueueStats(idnum);
                
                // let user follow along on completes
                //if (!this.isInExecuteScrollToMode) {
                    this.gotoLine(idnum, true);
                    
                    // see if comment
                    var linegcode = this.fileLines[idnum -1];
                    if (linegcode.match(/(\(.*\)|;.*$)/)) {
                        // it's comment
                        //var re = /\((.*)\)/;
                        //re.exec(linegcode);
                        var comment = RegExp.$1;
                        console.log("Found comment:", comment);
                        chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Gcode Comment", comment, 3000, true);
                    }
                    
                    // see if M6 tool change command & user wants to pause on M6
                    //(just because controller errored out, user is still expecting a pause on M6 from the software)
                    if (linegcode.match(/M0?6/i) && this.options.pauseOnM6) {
                        this.showToolChangeModal(linegcode, "onerror");
                    }

                    // see if we're done sending
                    if (idnum >= this.fileLines.length) {
                        console.log("at end of onCompleting gcode.");
                        chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Gcode Sender", "Done sending all Gcode into the CNC controller. This may not mean it's done executing yet as the controller typically has a planner buffer.", 6000);
                        
                        // also trigger stop button
                        this.onStop({viaOnComplete: true});
                        
                        chilipeppr.publish("/com-chilipeppr-widget-gcode/done", "Duration " + this.statEls.timeDur.text() + " Lines " + this.fileLines.length);
                    }

                    // update estimated time remaining
                    this.calcEstimatedRemain(idnum - 1);
                //}

            }
            
            // update duration of job
            var dur = new Date().getTime() - this.timeStart;
            dur = this.toHHMMSS(parseInt(dur / 1000));
            if (this.statEls) this.statEls.timeDur.text(dur);
            
            //console.groupEnd();
        }, 

        // this prop is set first time we see an onExecuted
        // because that means the user should only see scrolling
        // based on onExecuted, NOT based on onComplete. so this
        // var should be referenced in onComplete and not have a
        // gotoLine run from that method
        isInExecuteScrollToMode: false,
        lastLineMarkedExecuted: null,
        onExecute: function(data) {
            // write it to the log
            //console.group("gcode widget - onExecute");
            console.log("onExecute data:", data);
            console.log("onExecute lastLineMarkedExecuted:", this.lastLineMarkedExecuted,
                " isInExecuteScrollToMode:", this.isInExecuteScrollToMode);
            
            // we can get onExecute methods called on first load
            // because they come in from sr commands, so if we're not
            // initialized from the onPlay method, exit
            if (this.lastLineMarkedExecuted == null) {
                //console.groupEnd();
                return;
            }

            // if we get something lower than our start, which is 1
            // just ignore it. Need to do this before setting
            // isInExecuteScrollToMode below or we'll think that we
            // need to handle events we don't
            var item = data;
            if ('line' in item && item.line < 1) return;
            
            // make sure we're in onExecuted mode
            this.isInExecuteScrollToMode = true;
            
            var msgEl;
            // check that id string is not null/empty and starts with
            // a g, cuz we make all our id's start with g
            // otherwise this callback is not for us
            if ('line' in item && item.line >= 0) {
                
                console.log("onExecute. seems we have an id for this item with a g. item:", item);
                // get id
                var idnum = item.line;
                
                // ok, here's the deal, we only get status intervals every
                // 250ms, which means we'll get a line number that could be
                // many numbers beyond the last line we marked as "executed"
                // so we have to fill in the gaps
                
                for (var markIndex = this.lastLineMarkedExecuted; markIndex < idnum; markIndex++) {
                    //console.log("onExecute. marking metaline as executed. markIndex:", markIndex, "metaLine:", this.metaLines[markIndex]);
                    if (this.metaLines[markIndex] == null) {
                        //console.log("onExecute no meta data for this element yet. creating it.");
                        this.metaLines[markIndex] = $.extend({}, this.metaObj);
                    }
                    
                    // set that it is queued
                    this.metaLines[markIndex].isExecuted = true;
                    
                    // update the dom if this row is showing  
                    // send in 1-based number, not 0-based
                    // our id is 1-based, i.e. the row number
                    this.updateRowQueueStats(markIndex + 1);

		    // Act on line, if applicable
                    this.displayLine(markIndex, this.onChiliPepprPauseOnExecute);

                    //console.log("metaLine after:", this.metaLines[markIndex]);
                }
                this.lastLineMarkedExecuted = markIndex;

                // let user follow along on completes
                this.gotoLine(idnum, true);
                
                // see if we're done sending
                if (idnum >= this.fileLines.length) {
                    console.log("onExecute. at end of onExecuting gcode.");
                    chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Gcode Sender", "Done Executing Gcode. Duration " + this.statEls.timeDur.text() + " Lines " + this.fileLines.length, 5000);
                    
                    if (!this.isJobDonePubSubSent) {
                        chilipeppr.publish("/com-chilipeppr-widget-gcode/done", "Duration " + this.statEls.timeDur.text() + " Lines " + this.fileLines.length);
                        this.isJobDonePubSubSent = true;
                    }
                    
                    // also trigger stop button
                    this.onStop({viaOnExecute: true});
                    
                    // mark to no longer update onExecuteds (we'll exit
                    // at top of this method when null) we get marked as 
                    // an int from onPlay when we want to kick in our
                    // updates again
                    this.lastLineMarkedExecuted == null;
                }

                // update estimated time remaining
                this.calcEstimatedRemain(idnum - 1);
            }
            
            // update duration of job
            var dur = new Date().getTime() - this.timeStart;
            dur = this.toHHMMSS(parseInt(dur / 1000));
            if (this.statEls) this.statEls.timeDur.text(dur);
            
            
            
            //console.groupEnd();
        },

        // linenum is 1-based since visually gcode starts at line 1, this.fileLines is 0-based
        // so don't forget
        updateRowQueueStats: function(linenum) {
            // We will update the checkmark based on the underlying meta data for
            // the line. Lines are stored in this.fileLines and meta data is in
            // this.metaLines. They have equal indexes.

            // linenum is 1-based (not 0-based) since table is 1-based
            if (linenum < this.showingStartIndex || linenum > this.showingEndIndex) {
                // this means the line is not showing, so exit here
                //console.log("We are being asked to update the checkmark to show queue status for a line that does not exist so exiting. linenum:", linenum);
                //this.jumpToLine(linenum);
                return;
            }

            var container = $('#com-chilipeppr-widget-gcode-body');
            // figure out correct index from this.showingStartIndex and linenum
            var indx = linenum - this.showingStartIndex;
            var tr = $('#com-chilipeppr-widget-gcode-tbl tbody tr').eq(indx);

            // now that we have our correct row, update color of checkmark
            this.updateRowQueueStatsEl(tr);

        },
        // pass in the row element as jquery obj
        updateRowQueueStatsEl: function(rowEl) {
            // We will update the checkmark based on the underlying meta data for
            // the line. Lines are stored in this.fileLines and meta data is in
            // this.metaLines. They have equal indexes.

            //console.group("gcode widget - updateRowQueueStatsEl");
            // get index for this rowEl
            var indx = rowEl.find('.indx').text();
            //console.log("row index to update stats for:", indx, "rowEl:", rowEl);

            // get meta data
            var meta = this.metaLines[indx - 1];

            if (meta != null) {

                //console.log("meta was not null for this row, so updating checkmark colors. meta:", meta);
                // get checkmark dom el
                var check = rowEl.find('.glyphicon-ok');

                // since we could get these events in differing order, normalize
                // here such that meta.isCompleted has priority over earlier events
                if (!meta.isSent && !meta.isQueued && !meta.isWritten && !meta.isCompleted)
                    check.css('color', '#dddddd').parent().css('background-color', 'none');
                if (meta.isSent && !meta.isQueued && !meta.isWritten && !meta.isCompleted)
                    check.css('color', '#E6D8BB').parent().css('background-color', '#fcf8e3');
                if (meta.isQueued && !meta.isWritten && !meta.isCompleted)
                    check.css('color', '#BED0D9').parent().css('background-color', '#d9edf7');
                if (meta.isWritten && !meta.isCompleted)
                    check.css('color', '#BBCCAD').parent().css('background-color', '#dff0d8');
                if (meta.isCompleted)
                    check.css('color', 'black').parent().css('background-color', 'none');
                if (meta.isError)
                    check.css('color', 'black').parent().css('background-color', 'pink');
                if (meta.isExecuted)
                    check.css('color', 'black').parent().css('background-color', 'silver');

            }

            //console.groupEnd();

        },
        prependRows: function (endIndx) {

            var startIndx = endIndx - this.linesToShow;
            if (startIndx < 1) startIndx = 1;
            console.log("prependRows. startIndex:", startIndx, "endIndx:", endIndx);
            if (endIndx < 1) endIndx = 1;

            this.showingStartIndex = startIndx;
            //this.showingEndIndex = endIndx;

            // since we're adding rows, we have to destroy waypoints or things
            // get whacky when DOM changes
            this.infiniteScrollDestroy();

            // ok, now that we know our global start and end
            // figure out if we have too many rows showing
            if (this.showingEndIndex - this.showingStartIndex > this.linesToShowMax) {
                console.log("we are showing too many lines. will truncate at bottom");
                this.removeRowsFromEnd();
            }

            this.showingStats();

            for (var indxCtr = endIndx; indxCtr >= startIndx; indxCtr--) {

                var line = this.fileLines[indxCtr - 1];
                line = this.getFeedrateMarkup(line);
                line = this.getCommentMarkup(line);
                var cls = "g";
                var newTrDom = $(
                        "<tr>" +
                        '<td><span class="glyphicon glyphicon-ok"/></td>' +
                        "<td class=\"indx\">" + indxCtr + "</td>" +
                        "<td class=\"" + cls + "\">" + line + "</td>" +
                        '<td class="gtools"></td>' +
                        "</tr>");
                $('#com-chilipeppr-widget-gcode-tbl > tbody').prepend(newTrDom);

                //console.log("newTrDom:", newTrDom);
                // update the checkmark based on meta data of this line
                this.updateRowQueueStatsEl(newTrDom);

            }

            var that = this;
            setTimeout(function () {
                that.setupInfiniteScroll(true);
            }, 100);


        },
        appendRows: function (startIndx, skipWaypoint) {

            var endIndx = startIndx + this.linesToShow - 1;
            if (endIndx > this.fileLines.length) endIndx = this.fileLines.length;

            if (this.showingStartIndex == 0) this.showingStartIndex = startIndx;
            this.showingEndIndex = endIndx;

            // since we're adding rows, we have to destroy waypoints or things
            // get whacky when DOM changes
            this.infiniteScrollDestroy();

            // ok, now that we know our global start and end
            // figure out if we have too many rows showing
            if (this.showingEndIndex - this.showingStartIndex > this.linesToShowMax) {
                console.log("we are showing too many lines. will truncate at top");
                this.removeRowsFromStart();
            }

            this.showingStats();

            for (var indxCtr = startIndx; indxCtr <= endIndx; indxCtr++) {

                var line = this.fileLines[indxCtr - 1];
                line = this.getFeedrateMarkup(line);
                line = this.getCommentMarkup(line);
                var cls = "g";
                var newTrDom = $(
                        "<tr>" +
                        '<td><span class="glyphicon glyphicon-ok"/></td>' +
                        "<td class=\"indx\">" + indxCtr + "</td>" +
                        "<td class=\"" + cls + "\">" + line + "</td>" +
                        '<td class="gtools"></td>' +
                        "</tr>");
                $('#com-chilipeppr-widget-gcode-tbl > tbody').append(newTrDom);

                // update the checkmark based on meta data of this line
                this.updateRowQueueStatsEl(newTrDom);

                //console.log("newTrDom:", newTrDom);
            }

            if (!skipWaypoint) setTimeout(this.setupInfiniteScroll.bind(this), 100);
        },
        removeAllRows: function () {
            $('#com-chilipeppr-widget-gcode-tbl > tbody > tr').remove();
            this.showingStartIndex = 0;
            this.showingEndIndex = 0;
        },
        removeRowsFromStart: function () {
            console.log("removing rows from start.", this.linesToShow);
            $('#com-chilipeppr-widget-gcode-tbl > tbody > tr:lt(' + (this.linesToShow) + ")").remove();
            this.showingStartIndex = this.showingStartIndex + this.linesToShow;
        },
        removeRowsFromEnd: function () {
            console.log("removing rows from end.", this.linesToShow);
            $('#com-chilipeppr-widget-gcode-tbl > tbody > tr:gt(' + (this.showingEndIndex - this.linesToShow) + ")").remove();
            this.showingEndIndex = this.showingEndIndex - this.linesToShow;
        },
        feedrateEl: null,
        getFeedrateMarkup: function (html, isJustGettingRaw) {
            //console.log("getFeedrateMarkup");
            if (html === undefined) {
                //console.log("html was undefined. huh? ", html);
                return;
            }
            // lazy cache the dom el cuz this is slow
            if (this.feedrateEl == null) this.feedrateEl = $('#com-chilipeppr-widget-gcode-feedrate-val');
            var frdom = this.feedrateEl;
            var val = parseFloat(frdom.val());
            if (val == 1.0) return html;
            var origline = html;
            var curF = origline.match(/(F)(\d+\.{0,1}\d*)/gi);
            if (curF) {
                //console.log("origline:", origline, "curF:", curF);
                //console.log("original file line:", origline);
                for (var i = 0; i < curF.length; i++) {
                    var item = curF[i];
                    var fval = parseFloat(item.replace(/F/i, ""));
                    //console.log("fval:", fval);
                    fval = val * fval;
                    //console.log("new fval:", fval);
                    if (isJustGettingRaw == true) {
                        origline = origline.replace(item, "F" + fval.toFixed(2) + "");
                    } else {
                        origline = origline.replace(item, "<span class=\"feedrate-adjust\">F" + fval.toFixed(2) + "</span>");
                    }
                }
                //tdDom.html(origline);
            }
            return origline;
        },
        getCommentMarkup: function (html) {
            // check if comment, fade it out
            //console.log("getCommentMarkup. html:", html);
            if (html !== undefined && html.match(/\(.*\)|;/)) {
                console.log("got comments match");

                /*
                // this is kinda fancy. we are adding artificial spaces. this is so
                // we don't have a word too long that mucks with how beautiful our
                // widget is in terms for forcing the width too wide
                var newcomment;
                if (html.match(/(\(.*?\))/) || html.match(/(;.*)/)) {
                    var tmp = RegExp.$1;
                    console.log("$1 was:", tmp);
                    var arr = tmp.split(/ /);
                    var newarr = [];
                    $.each(arr, function(i, item) {
                        if (item.length > 30) {
                            console.log("found a comment with word too long. splitting");
                            var subarr = item.match(/.{1,30}/g);
                            console.log("subarr:", subarr);
                            newarr = newarr.concat(subarr);
                        } else {
                            newarr.push(item);
                        }
                    });
                    newcomment = newarr.join(" ");
                    console.log("newarr:", newarr);
                    console.log("our new html with artificial spaces:", newcomment);
                    if (html.match(/(\(.*?\))/)) html = html.replace(/(\(.*?\))/, newcomment);
                    if (html.match(/(;.*)/)) html = html.replace(/(;.*)/, newcomment);
                }*/

                // ok, just swap a span around comment
                html = html.replace(/(\(.*?\))/, '<span class="gcode-comment">$1</span>');
                html = html.replace(/(;.*)/, '<span class="gcode-comment">$1</span>');
                // also break really long words with no spaces so don't get rendering artifacts

            }
            return html;
        },
        getTooltipMarkup: function (txt) {
            // see if gcode matches a dictionary of gcode definitions
            // and swap in a popup to explain the defintion
            if (txt === undefined) {
                //console.error("txt was undefined. huh?");
                return;
            }

            //console.log("applying tooltip");
            var outtxt = "";
            var tokensout = [];

            // remove comments (put them back later)
            //txt = txt.replace(/(<span class="gcode-comment".*?<\/span>)/, "");
            //var comment = RegExp.$1;
            //console.log("comment:", comment);

            txt = txt.replace(/(\(.*\))/, "");
            var comment = RegExp.$1;
            //console.log("comment:", comment);

            // for gcode without spaces, add it so we can parse into tokens
            txt = txt.replace(/([gmxyzf])/gi, " $1");

            var tokens = txt.split(/\s+/);
            //console.log("tokens:", tokens);
            var that = this;
            $.each(tokens, function (index, gci) {

                //console.log("working on token: " + gci);
                var outgci = "";
                var isFound = false;
                // check that it's a G or M in gci, or else move on
                if (gci.match(/^(M|G|%)/i)) {
                    //console.log("looks like we got an M or G", gci);
                    $.each(that.gcodeData, function (i, elem) {
                        //console.log("trying to see if this token: " + gci + " == gcode: " + elem.code);
                        //console.log(elem.re);
                        //outgci = "";
                        var m = elem.re.exec(gci);
                        //if (!isFound && gci.match(elem.re)) {
                        if (!isFound && m != null) {
                            //if (m != null) {
                            //console.log("found a match. gci: " + gci);
                            outgci = gci.replace(
                                elem.re,
                                    '<span class="com-chilipeppr-gcode-tip" data-toggle="popover" data-title="' + elem.desc + '" data-content="' + elem.info + ' <br/><br/>Source: Wikipedia">' + m[0] + '</span>');


                            //return;
                            isFound = true;
                        }
                    });
                }
                if (isFound) {
                    //console.log("found a match so using outgci: " + outgci);
                    tokensout.push(outgci + "");
                } else {
                    //console.log("did not find match, so just using non-swapped gcode: " + gci);
                    tokensout.push(gci);
                }

            });
            //console.log("final markup. tokensout[]:", tokensout);
            var finalstr = tokensout.join(" ");
            finalstr += comment;
            return finalstr;
            //return  + "<span class=\"gcode-comment\">" + comment + "</span>";
        },
        lastElemIndex: null,
        cleanupHilites: function () {
            //console.log("cleanupHilites called.");

            var that = this;
            $('.com-chilipeppr-gcode-tip').each(function (i, elem) {
                var el = $(elem);
                var elp = $(el.context.parentNode);
                //console.log(el);
                //console.log(elp);

                // instead of doing cleanup, let's just rebuild from scratch
                //that.cleanupDomElem(elp);
                // get indx
                var indx = elp.parent().children('.indx').text();
                indx = parseInt(indx);
                var gcode = that.fileLines[indx-1];
                gcode = that.getFeedrateMarkup(gcode);
                gcode = that.getCommentMarkup(gcode);

                elp.html(gcode);
                //that.parseGcodeForDomElem(elp, false);

                /*
                 elp.html(elp.text());
                 // check if comment, fade it out
                 if (elp.text().match(/\(.*\)/)) {
                 elp.html(elp.text().replace(/(\(.*\))/, '<span class="gcode-comment">$1</span>'));
                 }
                 */
                //that.parseGcodeForDomElem(elp, false);
            });
        },
        cleanupDomElem: function (elem) {

            console.log("cleanupDomElem:", elem);
            var elems = elem.children(".com-chilipeppr-gcode-tip");
            console.log("elements to cleanup:", elems);

            //elem.children(".com-chilipeppr-gcode-tip").contents().unwrap();
            //elem.children(".com-chilipeppr-gcode-tip").remove();

            //elem.html(elem.text());
            // check if comment, fade it out
            /*
             if (elem.text().match(/\(.*\)/)) {
             elem.html(elem.text().replace(/(\(.*\))/g, '<span class="gcode-comment">$1</span>'));
             }
             */
        },
        parseGcodeForDomElem: function (elem, doTooltip) {

            //console.log("inside parseGcodeForDomElem. lastRowIndex:", this.lastElemIndex, " curElemRowIndex:",  elem.context.rowIndex);
            //console.log("elem:", elem);
            // if we just got called again on same row due to mouseover causing multiple
            // events, then just exit
            if (this.lastElemIndex && this.lastElemIndex == elem.context.rowIndex) {
                //console.log("lastElem = elem. exiting.");
                return;
            }

            // cleanup other rows when we are rendering markup for a new row
            this.cleanupHilites();

            //$(".com-chilipeppr-widget-gcode .popover").remove();
            if (doTooltip) {
                // get original line
                var indx = elem.parent().children('.indx').text();
                indx = parseInt(indx);
                var gcode = this.fileLines[indx-1];

                var newhtml = this.getTooltipMarkup(gcode);
                //console.log("newhtml for td.g", newhtml);
                //newhtml = that.getFeedrateMarkup(newhtml);
                //newhtml = this.getCommentMarkup(newhtml);
                //console.log("newhtml after comments", newhtml);

                //this.cleanupHilites();

                // check if comment, fade it out
                //if (elem.text().match(/\(.*\)/)) {
                //    elem.html(elem.html().replace(/(\(.*\))/, '<span class="gcode-comment">$1</span>'));
                //}

                // see if we can add tooltips
                //this.cleanupDomElem(elem);
                //var newhtml = (this.getTooltipMarkup(elem.html()));
                // re-add feedrate and comment
                //newhtml = this.getFeedrateMarkup(newhtml);
                //newhtml = this.getCommentMarkup(newhtml);
                elem.html(newhtml);

                //console.log("elem after tooltips:", elem);

                //console.log($this.html());
                // turn on the popovers
                elem.find('span').popover({
                    animation: true,
                    html: true,
                    placement: 'auto left',
                    trigger: 'hover',
                    delay: {
                        show: 20,
                        hide: 20
                    },
                    container: elem
                });
            }

            // always append a span tip to trigger a cleanup
            elem.append(' <span class="com-chilipeppr-gcode-tip hidden"></span>');

            this.lastElemIndex = elem.context.rowIndex;
        },
        parseGcode: function () {
            // this method attaches tooltips to gcode
            // to help you understand what each cmd does
            //console.log("Parsing Gcode...");
            var that = this;
            console.log(that);
            $('#com-chilipeppr-widget-gcode-tbl .g').each(function (i, td) {
                $this = $(this);
                //console.log($this.text());

                // do per dom element call
                //that.parseGcodeForDomElem($this);

                // check if comment, fade it out
                if ($this.text().match(/\(.*\)/)) {
                    $this.html($this.text().replace(/(\(.*\))/, '<span class="gcode-comment">$1</span>'));
                    //$this.html('<span class="gcode-comment">' + $this.text() + '</span>');
                }
            });
        },
        createGcodeDesc: function () {
            // Take from Gcode Wikipedia page and turned into json
            //this.createGcodeList();
            // create regexp list
            //console.log("creating regexp list for gcode");
            //gcodeReList = [];
            $.each(this.gcodeData, function (i, elem) {
                //console.log(elem.code);
                //gcodeReList.push(new RegExp(elem.code, "ig"));
                //elem.code = elem.code.replace("%", "\%");
                elem.re = new RegExp("^(" + elem.code + ")$", "i");

                // collapse leading zeroes
                if (elem.code.match(/(G|M)0{1,}/i)) {
                    var code_collapsed = elem.code.replace(/(G|M)0{1,}/i, "$1");
                    if (code_collapsed == "G") code_collapsed = "G0";
                    if (code_collapsed == "G00") code_collapsed = "G0";
                    if (code_collapsed == "M") code_collapsed = "M0";
                    if (code_collapsed == "M00") code_collapsed = "M0";
                    elem.re2 = new RegExp(code_collapsed, "ig");
                    elem.code2 = code_collapsed;
                    elem.re = new RegExp("^(" + elem.code + "|" + elem.code2 + ")$", "i");
                }

                // escape double quotes in desc and info
                if (elem.desc) {
                    //elem.desc = elem.desc.replace(/"/g, '\\"');
                    // remove html
                    elem.desc = elem.desc.replace(/\<.*?\>/g, '');
                    // esc double quote
                    elem.desc = elem.desc.replace(/"/g, '&quot;');
                }
                if (elem.info) {
                    elem.info = elem.info.replace(/\<.*?\>/g, '');
                    // esc double quote
                    elem.info = elem.info.replace(/"/g, '&quot;');
                }
                //console.log(elem.re);
            });
            //console.log(gcode);
            //console.log("done creating regex list for gcode");
        },
        gcodeIsLoaded: false,
        gcodeData: [],
        gcodeLoad: function (callback, context) {
            var that = this;
            chilipeppr.load("com-chilipeppr-elem-gcodedata",
                "http://fiddle.jshell.net/chilipeppr/QPG2v/show/light/",

                function () {
                    cprequire(["inline:com-chilipeppr-elem-gcodedata"], function (gcd) {
                        console.log("in callback from chilipeppr.load() for gcodedata");
                        that.gcodeIsLoaded = true;
                        that.gcodeData = gcd.gcode;
                        that.createGcodeDesc();
                        if (callback) callback.apply(context, gcd);
                    });
                });
        },
        obj3d: null, // gets the 3dviewer obj stored in here on callback
        obj3dmeta: null, // gets metadata for 3dviewer
        userCallbackForGet3dObj: null,
        get3dObj: function (callback) {
            this.userCallbackForGet3dObj = callback;
            chilipeppr.subscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this, this.get3dObjCallback);
            chilipeppr.publish("/com-chilipeppr-widget-3dviewer/request3dObject", "");
            chilipeppr.unsubscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this.get3dObjCallback);
        },
        get3dObjCallback: function (data, meta) {
            console.log("got 3d obj:", data, meta);
            this.obj3d = data;
            this.obj3dmeta = meta;
            if (this.userCallbackForGet3dObj) {
                //setTimeout(this.userCallbackForGet3dObj.bind(this), 200);
                //console.log("going to call callback after getting back the new 3dobj. this.userCallbackForGet3dObj:", this.userCallbackForGet3dObj);
                this.userCallbackForGet3dObj();
                this.userCallbackForGet3dObj = null;
            }
        },
        calcEstimatedRemain: function(indexOfLineAt) {
            // assume we have an obj3d from other method calls
            if (this.obj3d && this.obj3d.userData && this.obj3d.userData.lines) {
                var lastLine = this.obj3d.userData.lines[this.obj3d.userData.lines.length - 1];
                if ('p2' in lastLine && 'timeMinsSum' in lastLine.p2) {
                    console.log("we got a timeMinsSum:", lastLine.p2.timeMinsSum);
                    // get the timeMinsSum of the line we're on
                    var curEstDurMins = this.obj3d.userData.lines[indexOfLineAt].p2.timeMinsSum;
                    var estDurMins = lastLine.p2.timeMinsSum;
                    var remainMins = estDurMins - curEstDurMins;
                    var str = "-";
                    if (remainMins > 0) {
                        str = this.toHHMMSS(remainMins * 60); // expect seconds
                    }
                    $('#com-chilipeppr-widget-gcodeviewer #gcode-time-estremain').text(str);
                }
            }
        }
    }
});
