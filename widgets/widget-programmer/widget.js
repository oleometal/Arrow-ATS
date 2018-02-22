// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:com-chilipeppr-widget-programmer"], function (programmer) {
    console.log("test running of " + programmer.id);

    // Serial Port Selector
    // NEW VERSION for SPJS v1.7 http://jsfiddle.net/chilipeppr/vetj5fvx/
    var testSpjsDiv = $("<div></div>").attr("id", "com-chilipeppr-serialport-spselector-test");
    $('body').append(testSpjsDiv);
    chilipeppr.load("#com-chilipeppr-serialport-spselector-test",
        "https://raw.githubusercontent.com/chilipeppr/widget-spjs/master/auto-generated-widget.html",

    function () {
        cprequire(
        ["inline:com-chilipeppr-widget-serialport"],

        function (sp) {
            sp.setSingleSelectMode();
            sp.init(null, "tinyg", 115200); //, "tinyg or tinygg2");
            sp.consoleToggle();
            // now show the modal popup
            programmer.init();
            
            setTimeout(function() {
            programmer.show();
            /*programmer.show({
                port: '/dev/ttyACM2',
                device: 'arduino_due_x',
                url: 'http://synthetos.github.io/g2/blahblah.bin'
            });*/
            }, 3000);
            
        });
    });
} /*end_test*/ );

cpdefine("inline:com-chilipeppr-widget-programmer", ["chilipeppr_ready"], function () {
    return {
        id: "com-chilipeppr-widget-programmer",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Widget / Programmer",
        desc: "This widget lets you program your Arduino/Atmel from within ChiliPeppr using SPJS's new programfromurl method. SPJS now comes with avrdude and bossac just like the Arduino IDE. This means SPJS can handle programming your firmware directly from the browser.",
        publish: {},
        subscribe: {},
        foreignPublish: {
            "/com-chilipeppr-widget-serialport/send": "We send to the serial port certain commands like the initial configuration commands for the TinyG to be in the correct mode and to get initial statuses like planner buffers and XYZ coords. We also send the Emergency Stop and Resume of ! and ~",
            "/com-chilipeppr-elem-flashmsg/flashmsg": "To flash messages"
        },
        foreignSubscribe: {
            "/com-chilipeppr-widget-serialport/recvline": "When we get a dataline from serialport, process it and fire off generic CNC controller signals to the /com-chilipeppr-interface-cnccontroller channel."
        },
        isInitted: false,
        init: function () {
            
            if (this.isInitted) {
                console.log("we are already initted, exiting init");
                return;
            }
            
            // we must subscribe to /ws/recv for the duration of this programming
            // then we can unsub
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/ws/recv", this, this.onWsRecv);
            
            //this.setupDeviceList();
            //this.setupPortList();
            this.setupProgramBtn();
            this.forkSetup();
            this.isInitted = true;
            
            console.log(this.name + " done loading.");
        },
        setupProgramBtn: function() {
            $('#com-chilipeppr-widget-programmer .programmer-doit').click(this.onProgram.bind(this));
            
            // watch for feedback from SPJS
            
        },
        onProgram: function() {
            
            var url = $('#com-chilipeppr-widget-programmer #programmer-url').val();
            console.log("Triggering programmer. portSelected:", this.portSelected, "device:", this.deviceSelected, "url:", url);
            
            this.progressDone = false;
            this.downloadDone = false;

            
            
            // programfromurl portName core:architecture:name url
            // programfromurl /dev/ttyACM0 arduino:sam:arduino_due_x http://synthetos.github.io/g2/binaries/TinyG2_Due-edge-078.03-default.bin 
            var device = this.devices[this.deviceSelected];
            var cmd = "programfromurl " + this.portSelected + " " + device.core + " " + url;

            var dlprogbar = $('#com-chilipeppr-widget-programmer .programmer-progbar-dl');
            var dlprogbarLbl = $('#com-chilipeppr-widget-programmer .programmer-progbar-lbl-dl');
            var progprogbar = $('#com-chilipeppr-widget-programmer .programmer-progbar-program');
            var progprogbarLbl = $('#com-chilipeppr-widget-programmer .programmer-progbar-lbl-program');
            var outputSpan = $('#com-chilipeppr-widget-programmer .programmer-progbar-lbl-output');
                        
            dlprogbar.attr('style', 'width:0%');
            dlprogbarLbl.html("Download&nbsp;0%");
            dlprogbarLbl.removeClass("programmer-progbar-greyedout");
            dlprogbarLbl.addClass("programmer-progbar-black");
            progprogbar.attr('style', 'width:0%');
            progprogbarLbl.html("Program&nbsp;0%");
            progprogbarLbl.removeClass("programmer-progbar-greyedout");
            progprogbarLbl.addClass("programmer-progbar-black");
            outputSpan.addClass("programmer-progbar-greyedout");
            
            // forcibly close the port
            var cmdClose = "close " + this.portSelected;
            chilipeppr.publish("/com-chilipeppr-widget-serialport/ws/send", cmdClose);
            outputSpan.text("Making sure " + this.portSelected + " port is closed so we have access to it for programming...");
            
            // Ok, now send programming command
            outputSpan.text(outputSpan.text() + "\n" + "Programming...");
            
            chilipeppr.publish("/com-chilipeppr-widget-serialport/ws/send", cmd);
            
            //$('#com-chilipeppr-widget-programmer .programmer-doit').prop("disabled", true); 
            $('#com-chilipeppr-widget-programmer .programmer-kill').prop("disabled", false); 

        },
        downloadDone: false,
        progressDone: false,
        onWsRecv: function(msg) {
            if (msg.match(/^\{/)) {
                // it's json
                data = $.parseJSON(msg);
                //console.log("got json for onWsRecv. data:", data);
                
                if ('ProgrammerStatus' in data) {
                    
                    var dlprogbar = $('#com-chilipeppr-widget-programmer .programmer-progbar-dl');
                    var dlprogbarLbl = $('#com-chilipeppr-widget-programmer .programmer-progbar-lbl-dl');
                    var progprogbar = $('#com-chilipeppr-widget-programmer .programmer-progbar-program');
                    var progprogbarLbl = $('#com-chilipeppr-widget-programmer .programmer-progbar-lbl-program');

                    
                    if (data.ProgrammerStatus == "DownloadStart") {
                        
                        dlprogbar.attr('style', 'width:1%');
                        dlprogbarLbl.html("Download&nbsp;1%");
                        
                    } else if (data.ProgrammerStatus == "DownloadProgress") {
                        
                        if (!this.downloadDone) {
                            var pct = (1 + data.Duration) * 10;
                            if (pct > 100) pct = 70;
                            if (pct > 50) {
                                dlprogbarLbl.removeClass("programmer-progbar-black");
                            }
                            dlprogbar.attr('style', "width:" + pct + '%');
                            dlprogbarLbl.html("Download&nbsp;" + pct + "%"); 
                        }
                        
                    } else if (data.ProgrammerStatus == "DownloadDone") {
                        
                        this.downloadDone = true;
                        dlprogbar.attr('style', 'width:100%');
                        dlprogbarLbl.html("Download&nbsp;100%"); 
                        dlprogbarLbl.removeClass("programmer-progbar-black");
                        
                    } else if (data.ProgrammerStatus == "Starting") {
                        
                        progprogbar.attr('style', 'width:1%');
                        progprogbarLbl.html("Program&nbsp;1%");
                        progprogbarLbl.removeClass("programmer-progbar-greyedout");
                        progprogbarLbl.addClass("programmer-progbar-black");
                        
                    } else if (data.ProgrammerStatus == "Progress") {
                        
                        if (!this.progressDone) {
                            console.log("doing progress. data.Duration:", data.Duration);
                            
                            var pct = (1 + data.Duration);
                            if (pct > 100) pct = 70;
                            if (pct > 50) {
                                progprogbarLbl.removeClass("programmer-progbar-black");
                            }
                            console.log("pct:", pct);
                            progprogbar.attr('style', "width:" + pct + '%');
                            progprogbarLbl.html("Program&nbsp;" + pct + "%"); 
                        }
                        
                    } else if (data.ProgrammerStatus == "Error") {
                        
                        //this.progressDone = true;
                        progprogbar.attr('style', 'width:100%');
                        progprogbarLbl.html("Program&nbsp;100%"); 
                        progprogbarLbl.removeClass("programmer-progbar-black");
                        
                        // put in the output
                        var outputSpan = $('#com-chilipeppr-widget-programmer .programmer-progbar-lbl-output');
                        outputSpan.removeClass("programmer-progbar-greyedout");
                        outputSpan.text(outputSpan.text() + "\n" + data.Msg + "\n\n" + data.Output);
                        
                        //this.onProgramDone();
                        
                    } else if (data.ProgrammerStatus == "Done") {
                        
                        this.progressDone = true;
                        progprogbar.attr('style', 'width:100%');
                        progprogbarLbl.html("Program&nbsp;100%"); 
                        progprogbarLbl.removeClass("programmer-progbar-black");
                        
                        // put in the output
                        var outputSpan = $('#com-chilipeppr-widget-programmer .programmer-progbar-lbl-output');
                        outputSpan.removeClass("programmer-progbar-greyedout");
                        outputSpan.text(data.Output);
                        
                        this.onProgramDone();
                        
                    }
                }
            }
        },
        onProgramDone: function() {
            //chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/ws/recv", this, this.onWsRecv);
            
            $('#com-chilipeppr-widget-programmer .programmer-doit').prop("disabled", false); 
            $('#com-chilipeppr-widget-programmer .programmer-kill').prop("disabled", true); 

        },
        portSelected: null,
        isSetupPortListInitted: false,
        setupPortList: function() {
            // populate the serial port list
            // listAfterMetaDataAdded
            if (this.isSetupPortListInitted == false) {
                chilipeppr.subscribe("/com-chilipeppr-widget-serialport/listAfterMetaDataAdded", this, this.getPortListCallback);
                chilipeppr.subscribe("/com-chilipeppr-widget-serialport/list", this, this.getPortListCallback);
                // create onclick event
                $('#com-chilipeppr-widget-programmer .programmer-serialport').change(
                    this.onPortListClick.bind(this)
                );
                this.isSetupPortListInitted = true;
            }
            
            var staticName = $("#com-chilipeppr-widget-programmer .programmer-serialport-staticname");
            staticName.text("Waiting for callback from Serial Port JSON Server...");
            staticName.removeClass("hidden");
            
            var portlist = $('#com-chilipeppr-widget-programmer .programmer-serialport');
            portlist.addClass("hidden");
            
            chilipeppr.publish("/com-chilipeppr-widget-serialport/getlist");

            
        },
        getPortListCallback: function(data) {
            console.group("programmer - getPortListCallback");
            console.log("data:", data);
            
            if (data == null) {
                console.log("port list data is null. returning.");
                return;
            }
            
            //chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/list", this, this.getPortListCallback);
            //chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/listAfterMetaDataAdded", this, this.getPortListCallback);
            
            var portlist = $('#com-chilipeppr-widget-programmer .programmer-serialport');
            
            // show a dropdown for user to pick from
            portlist.empty();
            
            var that = this;
            data.forEach(function(item, indx) {
                console.log("looping. item:", item);
                
                var fancyName = "";
                if ('DisplayName' in item && item.DisplayName.length > 0) {
                    fancyName = item.DisplayName;
                    if ('DisplayPort' in item && item.DisplayPort.length > 0)
                        fancyName += " (" + item.DisplayPort + ")";
                } else {
                    if ('DisplayPort' in item && item.DisplayPort.length > 0)
                        fancyName = "" + item.DisplayPort + "";
                    else
                        fancyName = item.Name;
                }
                
                var itemEl = $("<option />").val(item.Name).text(fancyName);
                
                portlist.append(itemEl);
                
            });

            // see if we were passed in a port or not. if we were, don't show
            // a dropdown but show the port statically
            if (this.options && 'port' in this.options && this.options.port && this.options.port.length > 0) {
                
                console.log("we were passed in a port. show statically. this.options:", this.options);
                
                // setup this port as the port we'll program
                this.portSelected = this.options.port;
                
                //portlist.addClass("hidden");
                var dropDownItem = $("#com-chilipeppr-widget-programmer .programmer-serialport  option[value='" + this.options.port + "']").attr("selected","selected");
                var staticName = $("#com-chilipeppr-widget-programmer .programmer-serialport-staticname");
                staticName.text(dropDownItem.text());
                staticName.removeClass("hidden");
                portlist.addClass("hidden");
                
            } else {
                portlist.removeClass("hidden");
                var staticName = $("#com-chilipeppr-widget-programmer .programmer-serialport-staticname");
                staticName.addClass("hidden");
            }
            
            console.groupEnd();
        },
        onPortListClick: function(evt) {
            console.group("programmer - onPortListClick");
            console.log("evt:", evt);
            var port = $("#com-chilipeppr-widget-programmer .programmer-serialport option:selected" ).val();
            console.log("port:", port);
            
            console.groupEnd();
        },
        deviceSelected: null,
        setupDeviceList: function() {
            
            // Reset everything
            var ddBtnImg = $('#com-chilipeppr-widget-programmer .programmer-device-dropdown .programmer-device-btn-img');
            var ddBtnName = $('#com-chilipeppr-widget-programmer .programmer-device-dropdown .programmer-device-btn-name');
            ddBtnImg.addClass("hidden");
            ddBtnName.text("(Choose your device type)");
            
            // query our device uber object and iterate thru to popular
            // the dropdown
            var dd = $('#com-chilipeppr-widget-programmer .programmer-device-dropdown ul');
            dd.html("");
            for (var devicekey in this.devices) {
                var device = this.devices[devicekey];
                console.log("devicekey:", devicekey, "device:", device);
                var option = $(
                    '<li class="device-key-' + devicekey + 
                    '" data-devicekey="' + devicekey + '" >' + 
                    '<a href="#"><img class="programmer-brdicon" src="' + 
                    device.img + '" /> ' + 
                    device.name + '</a></li>');
                option.click({devicekey: devicekey, device:device}, this.onClickDeviceType.bind(this));
                
                /*
                var option = $('<option/>', { 
                    value: devicekey,
                    text : device.name 
                });
                option.data("image", device.img);
                option.data("imagecss", "programmer-brdicon");
                */
                dd.append(option);
            }
            
            
            // see if we were passed in a device type to program or not. if we were, don't show
            // a dropdown but show the device type statically
            if (this.options && 'device' in this.options && this.options.device && this.options.device.length > 0) {
                
                console.log("we were passed in a device type. show statically. this.options:", this.options);
                
                // set which device we have selected
                this.deviceSelected = this.options.device;
                
                var ddStaticDiv = $('#com-chilipeppr-widget-programmer .programmer-device-static');
                var ddStaticImg = $('#com-chilipeppr-widget-programmer .programmer-device-static-img');
                var ddStaticName = $('#com-chilipeppr-widget-programmer .programmer-device-static-name');
                
                var device = this.devices[this.options.device];
                
                
                if (device && device.name) ddBtnName.text(device.name);
                if (device && device.img) ddBtnImg.attr('src', device.img);
                ddBtnImg.removeClass("hidden");
                
            } else {
                //portlist.removeClass("hidden");
            }
            
        },
        onClickDeviceType: function(evt) {
            console.log("got device type clicked. evt:", evt);
            var devicekey = evt.data.devicekey;
            var device = evt.data.device;
            this.onDeviceType(devicekey);
        },
        onDeviceType: function(devicekey) {
            
            this.deviceSelected = devicekey;
            
            var device = this.devices[devicekey];
            
            var ddBtnImg = $('#com-chilipeppr-widget-programmer .programmer-device-dropdown .programmer-device-btn-img');
            var ddBtnName = $('#com-chilipeppr-widget-programmer .programmer-device-dropdown .programmer-device-btn-name');
            if (device && device.name) ddBtnName.text(device.name);
            if (device && device.img) ddBtnImg.attr('src', device.img);
            ddBtnImg.removeClass("hidden");
            
            // see if there are any url shortcuts to setup            
            if (device && 'firmware' in device && device.firmware.length > 0) {

                // yes, there are some shortcuts
                console.log("url shortcuts:", device.firmware);

                var urlDiv = $('#com-chilipeppr-widget-programmer .programmer-url-shortcuts');
                urlDiv.empty();
                
                for (var indx in device.firmware) {
                    var fw = device.firmware[indx];
                    console.log("firmware. indx:", indx, "fw:", fw);
                    var shortcut = 
                        $('<div><a href="javascript:">' + fw.name +
                          '</a></div>');
                    shortcut.click({that:this, fw:fw}, function(evt) {
                        var that = evt.data.that;
                        that.setUrl(evt.data.fw.url);
                    });
                    urlDiv.append(shortcut);
                    
                    // see if there's a description
                    if ('desc' in fw) {
                        // add a div below href
                        urlDiv.append('<div class="cp-firmware-desc">' + fw.desc + '</div>');
                    }
                                     
                }
            }
        },
        setupUrl: function() {
            
            // see if we were given a default url
            if (this.options && this.options.url && this.options.url.length > 0) {
                this.setUrl(this.options.url);
            }
        },
        setUrl: function(url) {
            $('#com-chilipeppr-widget-programmer #programmer-url').val(url);
        },
        shortcutsClear: function() {
            var urlDiv = $('#com-chilipeppr-widget-programmer .programmer-url-shortcuts');
            urlDiv.empty();
        },
        isVersionWarningInitted: false,
        versionWarning: function() {
            // if we were specifically given a version, just treat that
            // like normal and don't trigger a callback
            
            var options = this.options;
            
            // see if we should hide the version warning
            if (options && 'spjsVersion' in options) {
                
                // we were staitically given a version warning, so use that
                console.log("spjsVersion. we were statically given version so will not trigger callback technique. spjsVersion:", options.spjsVersion);
                
                if (options.spjsVersion >= 1.83) {
                    $('#com-chilipeppr-widget-programmer .modal-body .alert-danger').addClass("hidden");
                } else {
                    $('#com-chilipeppr-widget-programmer .modal-body .alert-danger').removeClass("hidden");
                }
                
            } else {
                
                console.log("spjsVersion. we were not given a spjsVersion so we are asking the serial port widget to tell us");
                
                // we need to ask spjs to get a version back
                if (this.isVersionWarningInitted == false) {
                    chilipeppr.subscribe("/com-chilipeppr-widget-serialport/recvVersion", this, this.versionWarningCallback);
                }
                chilipeppr.publish("/com-chilipeppr-widget-serialport/requestVersion");
                
            }
                    

        },
        versionWarningCallback: function(spjsVersion) {
            console.log("spjsVersion. got versionWarningCallback. spjsVersion:", spjsVersion);
            // we were staitically given a version warning, so use that
            if (spjsVersion >= 1.83) {
                console.log("spjsVersion was >= 1.83. cool");
                $('#com-chilipeppr-widget-programmer .modal-body .alert-danger').addClass("hidden");
            } else {
                console.log("spjsVersion was NOT >= 1.83. cool");
                $('#com-chilipeppr-widget-programmer .modal-body .alert-danger').removeClass("hidden");
            }
        },
        options: null,
        show: function (options) {
            
            
            this.options = options;
            this.versionWarning();
            this.setupDeviceList();
            this.setupUrl();
            this.setupPortList();
            this.shortcutsClear();
            if (options && 'device' in options && options.device && options.device.length > 0) {
                this.onDeviceType(options.device);
            }
            $("#" + this.id).modal('show');
            
        },
        hide: function () {
            $("#" + this.id).modal('hide');
        },
        forkSetup: function () {
            var topCssSelector = '#' + this.id;

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
            chilipeppr.load("https://raw.githubusercontent.com/chilipeppr/widget-pubsubviewer/master/auto-generated-widget.html", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .modal-header .dropdown-menu'), that);
                });
            });

        },
        devices: {
            "uno" : {
                core: "arduino:avr:uno",
                name: "Arduino Uno",
                img: "http://chilipeppr.com/img/boards/uno.jpg",
            },
            "yun" : {
                core: "arduino:avr:yun",
                name: "Arduino Yun",
                img: "http://chilipeppr.com/img/boards/yun.jpg",
            },
            "diecimila" : {
                core: "arduino:avr:diecimila",
                name: "Arduino Diecimila",
                img: "http://chilipeppr.com/img/boards/diecimila.jpg",
            },
            "nano" : {
                core: "arduino:avr:nano",
                name: "Arduino Nano",
                img: "http://chilipeppr.com/img/boards/nano.jpg",
            },
            "mega" : {
                core: "arduino:avr:mega",
                name: "Arduino Mega",
                img: "http://chilipeppr.com/img/boards/mega.jpg",
            },
            "megaADK" : {
                core: "arduino:avr:megaADK",
                name: "Arduino MegaADK",
                img: "http://chilipeppr.com/img/boards/megaAdk.jpg",
            },
            "leonardo" : {
                core: "arduino:avr:leonardo",
                name: "Arduino Leonardo",
                img: "http://chilipeppr.com/img/boards/leonardo.jpg",
            },
            "micro" : {
                core: "arduino:avr:micro",
                name: "Arduino Micro",
                img: "http://chilipeppr.com/img/boards/micro.jpg",
            },
            "esplora" : {
                core: "arduino:avr:esplora",
                name: "Arduino Esplora",
                img: "http://chilipeppr.com/img/boards/esplora.jpg",
            },
            "mini" : {
                core: "arduino:avr:mini",
                name: "Arduino Mini",
                img: "http://chilipeppr.com/img/boards/mini.jpg",
            },
            "ethernet" : {
                core: "arduino:avr:ethernet",
                name: "Arduino Ethernet",
                img: "http://chilipeppr.com/img/boards/ethernet.jpg",
            },
            "fio" : {
                core: "arduino:avr:fio",
                name: "Arduino Fio",
                img: "http://chilipeppr.com/img/boards/fio.jpg",
            },
            "bt" : {
                core: "arduino:avr:bt",
                name: "Arduino BT (Bluetooth)",
                img: "http://chilipeppr.com/img/boards/ArduinoBT_Front_400px.jpg",
            },
            "LilyPadUSB" : {
                core: "arduino:avr:LilyPadUSB",
                name: "Arduino LilyPad USB",
                img: "http://chilipeppr.com/img/boards/lilypadusb.jpg",
            },
            "lilypad" : {
                core: "arduino:avr:lilypad",
                name: "Arduino LilyPad",
                img: "http://chilipeppr.com/img/boards/lilypad.jpg",
            },
            "pro" : {
                core: "arduino:avr:pro",
                name: "Arduino Pro",
                img: "http://chilipeppr.com/img/boards/pro.jpg",
            },
            "atmegang" : {
                core: "arduino:avr:atmegang",
                name: "Arduino NG",
                img: "http://chilipeppr.com/img/boards/ArduinoNG-240.jpg",
            },
            "robotControl" : {
                core: "arduino:avr:robotControl",
                name: "Arduino Robot Control Board",
                img: "http://chilipeppr.com/img/boards/robot.jpg",
            },
            "robotMotor" : {
                core: "arduino:avr:robotMotor",
                name: "Arduino Robot Motor Board",
                img: "http://chilipeppr.com/img/boards/robot.jpg",
            },
            "arduino_due_x_dbg" : {
                core: "arduino:sam:arduino_due_x_dbg",
                name: "Arduino Due Programming Port",
                img: "http://chilipeppr.com/img/boards/due.jpg",
            },
            "arduino_due_x" : {
                core: "arduino:sam:arduino_due_x",
                name: "Arduino Due Native USB Port",
                img: "http://chilipeppr.com/img/boards/due.jpg",
            },
            "grbl" : {
                core: "arduino:avr:uno",
                name: "Grbl Firmware for Uno",
                img: "http://chilipeppr.com/img/boards/uno.jpg",
                
                firmware: [
                    {
                        name: "Latest Grbl v0.9i",
                        url: "https://raw.githubusercontent.com/grbl/grbl-builds/master/builds/grbl_v0_9i_atmega328p_16mhz_115200.hex"
                    },
                    {
                        name: "Grbl v0.9g",
                        url: "https://raw.githubusercontent.com/grbl/grbl-builds/master/builds/grbl_v0_9g_atmega328p_16mhz_115200.hex",
                    }
                ]
            },
            "tinyg" : {
                core: "arduino:avr:tinyg",
                name: "Synthetos TinyG v8",
                img: "http://chilipeppr.com/img/boards/tinyg.jpg",
                firmware: [
                    {
                        name: "TinyG Master 440.20 (Recommended)",
                        desc: "Contains latest arc fixes and work coordinate fixes.",
                        url: 'http://synthetos.github.io/binaries/tinyg-master-440.20.hex'
                    },
                    /*{
                        name: "TinyG Master 440.18 (Recommended)",
                        desc: "Contains G2/G3 arc fixes and fix for having settings applied without reset.",
                        url: 'http://synthetos.github.io/binaries/tinyg-master-440.18.hex'
                        //url: "http://synthetos.github.io/binaries/tinyg-master-440.18.hex"
                    },*/
                    {
                        name: "TinyG Edge 442.04 (Experimental)", 
                        desc: "Contains features from G2 firmware.",
                        url: "http://synthetos.github.io/binaries/tinyg-edge-442.04.hex"
                    }
                ]
            },
            "tinygv9" : {
                core: "arduino:sam:arduino_due_x",
                name: "Synthetos TinyG G2 (v9 Board AT91SAM3X) Native USB Port",
                img: "http://chilipeppr.com/img/boards/tinygv9.jpg",
                firmware: [
                    {
                        name: "Latest TinyG G2 for v9 Board 087-edge",
                        url: "http://storage.googleapis.com/chilipeppr-bucket/TinyG2-G2v9k-087edge.bin"
                    }
                ]
            },
            "tinygg2" : {
                core: "arduino:sam:arduino_due_x",
                name: "Synthetos TinyG G2 (Due + gShield) Native USB Port",
                img: "http://chilipeppr.com/img/boards/due.jpg",
                firmware: [
                    {
                        name: "Latest TinyG G2 for Due + gShield 087-edge",
                        url: "http://storage.googleapis.com/chilipeppr-bucket/TinyG2-gShield-087edge.bin"
                    },
                    {
                        name: "Prior TinyG G2 for Due + gShield 078-edge",
                        url: "http://synthetos.github.io/g2/binaries/TinyG2_Due-edge-078.03-default.bin"
                    }
                ]
            },
            "tinygg2_dbg" : {
                core: "arduino:sam:arduino_due_x_dbg",
                name: "Synthetos TinyG G2 (Due + gShield) Programming Port",
                img: "http://chilipeppr.com/img/boards/due.jpg",
                firmware: [
                    {
                        name: "Latest TinyG G2 for Due + gShield 087-edge",
                        url: "http://storage.googleapis.com/chilipeppr-bucket/TinyG2-gShield-087edge.bin"
                    },
                    {
                        name: "Prior TinyG G2 for Due + gShield 078-edge",
                        url: "http://synthetos.github.io/g2/binaries/TinyG2_Due-edge-078.03-default.bin"
                    }
                ]
            },
        }
    }
});
