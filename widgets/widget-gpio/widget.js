// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:net-delarre-widget-gpio"], function (gpio) {
    console.log("test running of " + gpio.id);
    gpio.init();


} /*end_test*/ );

cpdefine("inline:net-delarre-widget-gpio", ["chilipeppr_ready", "jquerycookie"], function () {   
    var classPrefix = "net-delarre-widget-gpio";
    return {
        id: "net-delarre-widget-gpio",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Widget / GPIO",
        desc: "The GPIO widget communicates to Ben Delarre’s GPIO server for a Raspberry Pi. The GPIO server was modeled after the Serial Port JSON Server (SPJS) and enables websocket communication from the browser to the Rpi’s GPIO ports.",
        publish: {
        },
        subscribe: {
        },
        foreignPublish: {
        },
        foreignSubscribe: {
        },
        init: function (host) {
            this.forkSetup();

            this.wsConnect(null, host);
    
            // setup onconnect pubsub event, get the pin map when we connect successfully
            chilipeppr.subscribe("/" + this.id + "/ws/onconnect", this, function (msg) {
                this.getPinmap();
                this.getPinStates();
            });
            // setup recv pubsub event
            // this is when we receive data from the socket
            chilipeppr.subscribe("/" + this.id + "/ws/recv", this, function (msg) {
                this.onWsMessage(msg);
            });

            // setup low-level send pubsub event
            // this is when a widget sends data to the socket
            chilipeppr.subscribe("/" + this.id + "/ws/send", this, function (msg) {
                this.wsSend(msg);
            });
           
            var that = this;
            
            // show last remote host, if there is one
            var lasthost = $.cookie('lasthost-gpio');
            if (lasthost) {
                $('#net-delarre-widget-gpio-host').val(lasthost);
            }
            // if connect btn or enter key on remote host connect
            var remoteCon = $('#' + classPrefix + '-hostbtn');
            remoteCon.click(this.onRemoteHostConnect.bind(this))

            $('#net-delarre-widget-gpio-host').keypress(function(event){
                //console.log("got keypress. event:", event);
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13'){
                    that.onRemoteHostConnect(); 
                }
            });
            this.btnBarSetup();
            this.initBody();
            this.initSettings();
            this.initControls();
            console.log(this.name + " done loading.");
        },
        resetVersion: function() {
            $('.' + classPrefix + '-version-yours').text("1.1");
            $('.' + classPrefix + '-version').addClass("hidden");
        },
        onVersion: function(version) {
            this.versionFloat = parseFloat(version);
            this.version = version;
            $('.' + classPrefix + '-version-yours').text(version);
            if (this.versionFloat < 1.1) {
                // invalid version!
                $('.' + classPrefix + '-version').removeClass("hidden");
                $('.' + classPrefix + '-version-fullmsg').html(
                    "You are running version " + version + " of the GPIO JSON Server. You MUST upgrade to the new 1.1 version.<br/><br/>To upgrade, " + 
                    '<button type="button" class="btn btn-xs btn-default disconnect-inline" data-toggle="popover" data-placement="auto" data-container="body" data-content="Disconnect from gpio json server" data-trigger="hover" data-original-title="" title=""><span class="glyphicon glyphicon-remove-sign"></span></button>' +
                    " disconnect from the websocket server and click the correct platform to download the binary for.");
                $('.' + classPrefix + '-version-fullmsg .disconnect-inline').click(this.disconnect.bind(this));
            }
        },
        getPinmap: function() {   
            this.wsSend("getpinmap");
        },  
        getPinStates: function() {   
            this.wsSend("getpinstates");
        },    
        onPinRemoved: function(data) {
            var pinId = data.PinRemoved;
            $('#pin_' + pinId).remove();
            $('#pin_control_' + pinId).remove();
        },
        onPinMap: function(data) {
            if (!data.PinMap) {
                console.log("Failed to get Pinmap in onPinmap event!");
                return;
            }
            var pinmap = {};
            
            // build selection options for use in settings drop down
            var options = "";
            $.each(data.PinMap, function (i, pin) {                
                // create internal map of all aliases to the pin
                // we'll use this for lookup later
                pinmap[pin.ID] = pin;
                var option = "<option value=" + pin.ID + ">" + pin.ID + " (";
                option += pin.Aliases.join(", ");
                option += ")</option>";
                options += option;
                $.each(pin.Aliases, function(k, alias) {
                    pinmap[alias] = pin;
                });
            });
            $('#pinId').html(options);
            this.pinmap = pinmap;
        }, 
        onPinStates: function(data) {
            if (!data.PinStates) {
                console.log("Failed to get Pinmap in onPinStates event!");
                return;
            }
            var table = $("#" + this.id + " .net-delarre-widget-gpio-pins tbody");
            table.empty();
            var pinControls =  $('#net-delarre-widget-gpio .connected-body .pin-controls');
            pinControls.empty();
            this.pinStates = data.PinStates;
            for (var pinId in data.PinStates) {
                var pin = data.PinStates[pinId];
                this.addPinState(pin);                
            }
        },
        onPinAdded: function(data) {
            this.addPinState(data.PinAdded);
        },
        addPinState: function(pin) {
            var table = $("#" + this.id + " .net-delarre-widget-gpio-pins tbody");
            var pinControls =  $('#net-delarre-widget-gpio .connected-body .pin-controls');
            var dir = pin.Dir === 1 ? "out" : (pin.Dir == 0 ? "in" : "pwm");
            var state = pin.State;
            var pullup = pin.Pullup === 1 ? "up" : pin.Pullup === 2 ? "down" : "none";
            var row = "<tr id='pin_" + pin.PinId + "'><td>" + pin.Name + "</td><td>" + pin.PinId + "</td><td>" + dir + "</td><td>" + state + "</td><td>" + pullup + "</td><td><button type='button' class='btn-delete btn btn-xs'><span class='glyphicon glyphicon-trash' title='Remove this pin. This stops the GPIO server from managing this pin but does not necessarily change its state.'></span></button></td><td><button type='button' class='btn btn-edit btn-xs'><span class='glyphicon glyphicon-edit' title='Edit this pins settings'></span></button></td></tr>";
            table.append(row);
            
            // now add a control for each button depending on its type...
            var controlRow = "<div class='row'>";
            // add a label
            var controlName = 'pin-control-' + pin.PinId;
            controlRow += "<div class='pin-control' id='pin_control_" + pin.PinId + "'><label class='control-label col-xs-3' for='" + controlName + "'>" + pin.Name + "</label>";
            if (dir == "out") {
                // add a toggle button
                controlRow += '<button type="button" class="col-xs-3 btn btn-' + (pin.State ? 'success' : 'danger') + ' ' + (pin.State ? 'pin-on' : '') + '" data-toggle="button" aria-pressed="false" autocomplete="off">' + (pin.State ? 'On' : 'Off') + '</button>';
            } else if (dir == "in") {
                // just add a label field so we can see the reading
            } else if (dir == "pwm") {
                // add a slider from 0 to 255   
                controlRow += '<div class="col-xs-3 nopadding"><input type="number" class="form-control" value="' + pin.State + '" disabled/></div><div class="col-xs-6"><input type="range" min="0" max="255" step="1" value="' + pin.State + '"/></div></div>';
            }
            controlRow += "</div></div>";
            pinControls.append($(controlRow));
        },
        wsWasEverConnected: false,
        wsConnect: function (hostname, onsuccess, onfail) {                       
            if (!window["WebSocket"]) {
                this.publishSysMsg("Your browser does not support WebSockets.");
            }
            if (!hostname) {
                // see if cookie is set and pull it if it is if not try localhost
                hostname = $.cookie('lasthost-gpio') || "localhost";
            }
            var fullurl;
            if (hostname.match(/:\d+$/))
                fullurl = "ws://" + hostname + "/ws";
            else
                fullurl = "ws://" + hostname + ":8888/ws";
            
            console.log("Connecting to " + fullurl);
            var conn = new WebSocket(fullurl);
            this.conn = conn;
            var that = this;
            that.conn.onopen = function (evt) {
                that.wsWasEverConnected = true;
                //that.reconMsgHide();
                that.onWsConnect(evt);
                $.cookie('lasthost-gpio', hostname, {
                    expires: 365,
                    path: '/'
                });
                if (onsuccess) onsuccess.apply(that);
            };
            that.conn.onerror = function (evt) {
                console.log(evt);
                that.publishSysMsg("GPIO ajax error.");
                if (onfail) onfail.apply(that);
            };
            that.conn.onclose = function (evt) {
                //if (that.wsWasEverConnected) that.reconMsgShow();
                that.onWsDisconnect(evt);
            }
            that.conn.onmessage = function (evt) {
                that.publishMsg(evt.data);
            };
        },
        onRemoteHostConnect: function() {
            var host = $('#net-delarre-widget-gpio-host').val();
            $('#net-delarre-widget-gpio-hostconnectmsg').html(
                "Trying to connect to " +
                host + "...");
            this.wsConnect(host, function() {
                $('#net-delarre-widget-gpio-hostconnectmsg').html("Last connect successful.");
            }, function() {
                $('#net-delarre-widget-gpio-hostconnectmsg').html("Failed to connect to host.");
            });
        },
        disconnect: function() {
            this.resetVersion();
            console.log("closing websocket:", this.conn);
            if (this.conn) {
                this.conn.close();
            }
        },
        wsSend: function (msg) {
            if (this.isWsConnected) {
                this.conn.send(msg);
            } else {
                this.publishSysMsg("Tried to send message, but we are not connected to gpio server.");
            }
        },
        publishSysMsg: function (msg) {
            chilipeppr.publish("/" + this.id + "/ws/sys", msg);
            var now = Date.now();
            if (this.lastMsg == msg && now - this.lastMsgTime < 20000) {
                // skip publish
                console.log("skipping publish. same msg or too fast.");
            } else {
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Serial Port System Message", msg);
                this.lastMsg = msg;
                this.lastMsgTime = now;
            }
        },

        onWsConnect: function (event) {
            this.isWsConnected = true;
            this.resetVersion();
            chilipeppr.publish("/" + this.id + "/ws/onconnect", "connected");
            $('#' + this.id).addClass('connected');
            // because we're hiding a large mess of text, we should trigger
            // a resize to make sure other widgets reflow since the scroll bar
            // or other stuff may need repositioned
            $(window).trigger('resize'); 
        },
        onWsDisconnect: function (event) {
            this.isWsConnected = false;
            $('#' + this.id).removeClass('connected');
            chilipeppr.publish("/" + this.id + "/ws/ondisconnect", "disconnected");
            this.publishSysMsg("GPIO ajax connection closed. " +
                "readyState: " + this.conn.readyState);
        },
        publishMsg: function (msg) {
            chilipeppr.publish("/" + this.id + "/ws/recv", msg);
        },
        onWsMessage: function (msg) {
            // parse it as json if we can
            var data = null;
            try {
                data = $.parseJSON(msg);
            } catch (e) {
                // not json!, do something else.
                console.log("Invalid JSON from GPIO Server: " + msg + " error : " + e);
                return;
            }
            if (!data) {
                return;
            }
            if (data.Error) {
                // something went wrong with this command, log the error to console
                console.log("Error from GPIO Server: " + data.Error);
                return;
            }
            if (data.Version) {
                this.onVersion(data.Version);
                return
            }
            var callback = "on" + data.Type;
            if (!this[callback]) {
                console.log("No callback " + callback + " found");
            } else {
                this[callback].call(this, data);
            }
        },
        statusWatcher: function () {
            // This method subscribes to "/ws/sys" and updates the UI with
            // the latest msg
            chilipeppr.subscribe("/" + this.id + "/ws/sys", this, function (msg) {
                $('.net-delarre-widget-gpio-status .well.well-sm').text(msg);
            });
        },
        
        btnBarSetup: function () {
            $('.net-delarre-widget-gpio .btn').popover({
                animation: true,
                delay: 100,
                //container: 'body'
            });
            
            $('#net-delarre-widget-gpio .btn-toolbar .btn.reconnect').click(this.wsConnect.bind(this));
            $('#net-delarre-widget-gpio .btn-toolbar .btn.disconnect').click(this.disconnect.bind(this));
        },
        initSettings: function() {
            // bind listeners to the form controls in settings dialog
            // setup handlers for adding/removing/editing pin settings
            $('#editPinForm').on('submit', function(ev) {
                ev.preventDefault();
                // pull out the data from the form and send to the websocket
                var pinId = $('#pinId').val(),
                    pinDir = $('#pinDir').val(),
                    pinName = $('#pinName').val(),
                    pinPullup = $('#pinPullup').val();
                this.wsSend("initpin " + pinId + " " + pinDir + " " + pinPullup + " " + pinName);
                
            }.bind(this));
            
            $('.net-delarre-widget-gpio-pins').on('click', '.btn-delete', function(ev) {
                ev.preventDefault();
                var row = $(ev.currentTarget).closest("tr"),
                    pinId = row[0].id.substring(4);
                this.wsSend("removepin " + pinId);
            }.bind(this));
            $('.net-delarre-widget-gpio-pins').on('click', '.btn-edit', function(ev) {
                ev.preventDefault();
                var row = $(ev.currentTarget).closest("tr"),
                    pinId = row[0].id.substring(4);
                // populate the form
                var pin = this.pinStates[pinId];
                if (!pin) {
                    return;
                }
                var dir = pin.Dir === 1 ? "out" : (pin.Dir==0 ? "in" : "pwm");
                var pullup = pin.Pullup === 1 ? "up" : pin.Pullup === 2 ? "down" : "none";
                $('#pinId').val(pin.PinId);
                $('#pinDir').val(dir);
                $('#pinPullup').val(pullup);
                $('#pinName').val(pin.Name);
            }.bind(this));
        },
        initControls: function() {
            // initialise controls, read these from cookies
            $('#net-delarre-widget-gpio .pin-controls').on('click', 'button', function(ev) {
                var target = $(ev.currentTarget);
                var row = target.closest(".pin-control"),
                    pinId = row[0].id.substring("pin_control_".length);
                if (!target.hasClass('pin-on')) {
                    target.addClass('pin-on');
                    target.removeClass('btn-danger');
                    target.addClass('btn-success');
                    target.html('On');
                } else {
                    target.removeClass('pin-on');
                    target.addClass('btn-danger');
                    target.removeClass('btn-success');
                    target.html('Off');
                }
                this.wsSend("setpin " + pinId + " " + (target.hasClass('active') ? '1' : '0'));
            }.bind(this));
            $('#net-delarre-widget-gpio .pin-controls').on('input', 'input[type=range]', function(ev) {
                var target = $(ev.currentTarget);
                var row = target.closest(".pin-control"),
                    pinId = row[0].id.substring("pin_control_".length);
                row.find("input[type=number]").val(target.val());
                this.wsSend("setpin " + pinId + " " + target.val());
            }.bind(this));
        },
        initBody: function(evt) {
            $('#' + this.id + ' .hidebody, #' + this.id + ' .showbody').click(this.toggleBody.bind(this));
            var config = localStorage.getItem("/" + this.id + "/body");
            if (config == "visible")
                this.showBody();
            else
                this.hideBody();
        },
        toggleBody: function(evt) {
            if ($('#' + this.id).hasClass('hidebody'))
                this.showBody(evt);
            else
                this.hideBody(evt);
        },
        showBody: function(evt) {
            $('#' + this.id ).removeClass('hidebody');
            if (!(evt == null)) localStorage.setItem("/" + this.id + "/body", "visible");
            $(window).trigger('resize');
        },
        hideBody: function(evt) {
            $('#' + this.id ).addClass('hidebody');
            if (!(evt == null)) localStorage.setItem("/" + this.id + "/body", "hidden");
            $(window).trigger('resize');
        },
        forkSetup: function () {
            var topCssSelector = '#net-delarre-widget-gpio';
            
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
            
            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($('#net-delarre-widget-gpio .panel-heading .dropdown-menu'), that);
                });
            });
            
        },
    }
});