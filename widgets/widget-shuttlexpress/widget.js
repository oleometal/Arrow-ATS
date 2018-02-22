// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:com-chilipeppr-widget-shuttlexpress"], function (shuttle) {
    console.log("test running of " + shuttle.id);
    shuttle.init();
    
    // load spjs widget in test mode
    // create div to hold it below our shuttlexpress widget
    
    var spjs = $("<div id=\"test-spjs\">spjs here</div>");
    $('#com-chilipeppr-widget-shuttlexpress').parent().append(spjs);
    
    chilipeppr.load("#test-spjs", "http://fiddle.jshell.net/chilipeppr/vetj5fvx/show/light/",

    function () {
        cprequire(
        ["inline:com-chilipeppr-widget-serialport"],

        function (sp) {
            sp.setSingleSelectMode();
            sp.init(null, "tinyg");
            sp.consoleToggle();
        });
    });
    

} /*end_test*/ );

cpdefine("inline:com-chilipeppr-widget-shuttlexpress", ["chilipeppr_ready"], function () {
    return {
        id: "com-chilipeppr-widget-shuttlexpress",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Widget / ShuttleXpress",
        desc: "The ShuttleXpress widget helps you setup your own ShuttleXpress jog dial USB device and enables audio feedback as you toggle the buttons on the device.",
        publish: {},
        subscribe: {},
        foreignPublish: {},
        foreignSubscribe: {
            '/com-chilipeppr-widget-serialport/onBroadcast' : 'We subscribe to broadcast messages so we know whether to play audio on the "move by" button press or on the xyza button presses.'
        },
        isInitted: false, // keep track of our one-time init
        audio: [],
        audioaxis: [],
        init: function () {

            if (this.isInitted) return;
            
            this.setupUiFromLocalStorage();
            this.btnSetup();

            // load audio
            this.loadAudio();
            
            // listen to broadcast msgs on spjs
            this.setupOnBroadcast();
            
            this.forkSetup();

            //this.lazyLoadTutorial();
            this.isInitted = true;

            // issue a resize a bit later
            // issue resize event so other widgets can reflow
            $(window).trigger('resize');

            console.log(this.name + " done loading.");
        },
        loadAudio: function() {
            //this.audio = new Array(4);
            this.audiomm1 = new Audio('http://chilipeppr.com/audio/mm1.wav');
            this.audiommpt1 = new Audio('http://chilipeppr.com/audio/mmpt1.wav');
            this.audiommptzero1 = new Audio('http://chilipeppr.com/audio/mmptzero1.wav');
            this.audiommptzerozero1 = new Audio('http://chilipeppr.com/audio/mmptzerozero1.wav');
            this.audio.push(this.audiomm1);
            this.audio.push(this.audiommpt1);
            this.audio.push(this.audiommptzero1);
            this.audio.push(this.audiommptzerozero1);
            console.log("this.audio:", this.audio);
            
            this.audio.forEach(function(item) {
                console.log("playing audio item:", item);
                //item.play();
            });
            
            this.audioaxisx = new Audio('http://chilipeppr.com/audio/axisx.wav');
            this.audioaxisy = new Audio('http://chilipeppr.com/audio/axisy.wav');
            this.audioaxisz = new Audio('http://chilipeppr.com/audio/axisz.wav');
            this.audioaxisa = new Audio('http://chilipeppr.com/audio/axisa.wav');
            this.audioaxis.push(this.audioaxisx);
            this.audioaxis.push(this.audioaxisy);
            this.audioaxis.push(this.audioaxisz);
            this.audioaxis.push(this.audioaxisa);
            this.audioaxis.forEach(function(item) {
                console.log("playing audioaxis item:", item);
                //item.play();
            });
        },
        setupOnBroadcast: function() {
            chilipeppr.subscribe('/com-chilipeppr-widget-serialport/onBroadcast', this, this.onBroadcast);
        },
        onBroadcast: function(msg) {
            // see if it's a msg for us
            console.log("got onBroadcast in shuttlexpress. msg:", msg);
            // check if json
            if (msg.match(/^{/)) {
                // good. it's json (we think)
                var json = $.parseJSON(msg);
                if ('id' in json && json.id == "shuttlexpress") {
                    console.log("we have a shuttlexpress broadcast msg. json:", json);
                    
                    // see if move by
                    if (json.action.match(/mm/)) {
                        
                        // get float
                        var val = parseFloat(json.action.replace(/mm/, ""));
                        console.log("val:", val);
                        if (val == 1.0) this.audiomm1.play();
                        else if (val == 0.1) this.audiommpt1.play();
                        else if (val == 0.01) this.audiommptzero1.play();
                        else if (val == 0.001) this.audiommptzerozero1.play();
                        
                        // update label
                        $('#' + this.id + ' .shuttlexpress-moveby').text(json.action);
                    }
                    
                    // see if axis
                    if (json.action.match(/x|y|z|a/)) {
                        
                        if (json.action == "x") this.audioaxisx.play();
                        else if (json.action == "y") this.audioaxisy.play();
                        else if (json.action == "z") this.audioaxisz.play();
                        else if (json.action == "a") this.audioaxisa.play();
                        
                        // update label
                        var axis = json.action.toUpperCase();
                        $('#' + this.id + ' .shuttlexpress-axis').text(axis);
                    }

                }
            }
        },
        isHidden: false,
        unactivateWidget: function () {
            if (!this.isHidden) {
                // unsubscribe from everything
                console.log("unactivateWidget. unsubscribing.");
                //chilipeppr.unsubscribe("/com-chilipeppr-interface-cnccontroller/axes", this, this.onAxes);
                //chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/ws/recv", this, this.onWsRecvLaser);
                this.isHidden = true;

            }
            // issue resize event so other widgets can reflow
            $(window).trigger('resize');
        },
        activateWidget: function () {
            if (!this.isInitted) {
                this.init();
            }
            if (this.isHidden) {
                // resubscribe
                console.log("activateWidget. resubscribing.");
                //chilipeppr.subscribe("/com-chilipeppr-interface-cnccontroller/axes", this, this.onAxes);
                //chilipeppr.subscribe("/com-chilipeppr-widget-serialport/ws/recv", this, this.onWsRecvLaser);
                this.isHidden = false;
                //this.introAnim();
            }
            // issue resize event so other widgets can reflow
            $(window).trigger('resize');
        },
        isVidLoaded: false,
        lazyLoadTutorial: function () {
            // lazy load tutorial tab youtube vid
            //var isVidLoaded = false;
            var that = this;
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                //e.target // activated tab
                console.log("tab activated. e.target:", $(e.target));
                if ($(e.target).text() == 'Tutorial') {
                    // lazy load
                    console.log("we are on tutorial tab");
                    if (!that.isVidLoaded) {
                        console.log("lazy loading vid cuz not loaded");
                        that.isVidLoaded = true;
                        $('#lasersolder-tutorial').html('<iframe style="width:100%;" class="" src="//www.youtube.com/embed/T2h7hagVfnA" frameborder="0" allowfullscreen></iframe>');
                    }
                }
                //e.relatedTarget // previous tab
            })

        },
        options: null,
        setupUiFromLocalStorage: function () {
            // read vals from cookies
            var options = localStorage.getItem(this.id + '-options');

            if (options) {
                options = $.parseJSON(options);
                console.log("just evaled options: ", options);
            } else {
                options = {
                    showBody: true,
                    //frprobe: 25,
                    //heightplate: 1.75
                };
            }

            // check z
            //if (!('z' in options)) options.z = 1.0;

            this.options = options;
            console.log("options:", options);

            // show/hide body
            if (options.showBody) {
                this.showBody();
            } else {
                this.hideBody();
            }

            // setup textboxes
            //$('#' + this.id + ' .frprobe').val(this.options.frprobe);
            //$('#' + this.id + ' .heightplate').val(this.options.heightplate);

            // attach onchange
            $('#' + this.id + ' input').change(this.saveOptionsLocalStorage.bind(this));
        },
        saveOptionsLocalStorage: function () {
            //var options = {
            //    showBody: this.options.showBody
            //};

            // grab text vals
            //this.options.frprobe = $('#' + this.id + ' .frprobe').val();
            //this.options.heightplate = $('#' + this.id + ' .heightplate').val();

            var options = this.options;

            var optionsStr = JSON.stringify(options);
            console.log("saving options:", options, "json.stringify:", optionsStr);
            // store cookie
            localStorage.setItem(this.id + '-options', optionsStr);
        },
        showBody: function (evt) {
            $('#' + this.id + ' .panel-body').removeClass('hidden');
            //$('#' + this.id + ' .panel-footer').removeClass('hidden');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = true;
                this.saveOptionsLocalStorage();
            }
        },
        hideBody: function (evt) {
            $('#' + this.id + ' .panel-body').addClass('hidden');
            //$('#' + this.id + ' .panel-footer').addClass('hidden');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = false;
                this.saveOptionsLocalStorage();
            }
        },
        btnSetup: function () {
console.log("setup hide/unhide for shuttle widget body");
            // chevron hide body
            var that = this;
            $('#' + this.id + ' .hidebody').click(function (evt) {
                console.log("hide/unhide body");
                if ($('#' + that.id + ' .panel-body').hasClass('hidden')) {
                    // it's hidden, unhide
                    that.showBody(evt);
                } else {
                    // hide
                    that.hideBody(evt);
                }
            });

            $('#' + this.id + ' .btn-toolbar .btn').popover({
                delay: 500,
                animation: true,
                placement: "auto",
                trigger: "hover",
                container: 'body'
            });

        },
        statusEl: null, // cache the status element in DOM
        status: function (txt) {
            console.log("status. txt:", txt);
            if (this.statusEl == null) this.statusEl = $('#' + this.id + '-status');
            var len = this.statusEl.val().length;
            if (len > 30000) {
                console.log("truncating status area text");
                this.statusEl.val(this.statusEl.val().substring(len - 5000));
            }
            this.statusEl.val(this.statusEl.val() + txt + "\n");
            this.statusEl.scrollTop(
            this.statusEl[0].scrollHeight - this.statusEl.height());
        },
        forkSetup: function () {
            var topCssSelector = '#' + this.id + '';

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
                    pubsubviewer.attachTo($('#' + that.id + ' .panel-heading .dropdown-menu'), that);
                });
            });

        },
    }
});