/* global requirejs cprequire cpdefine chilipeppr */

// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:com-chilipeppr-widget-wcs"], function (wcs) {
    console.log("test running of " + wcs.id);
    wcs.init();
    
    var testCoords = function() {
        setTimeout(function() {
            chilipeppr.publish('/com-chilipeppr-interface-cnccontroller/coords', {coord:"g55", coordNum: 55});
        }, 5000);
    }
    testCoords();
    
    $('body').css("padding", "30px");
    
} /*end_test*/ );

cpdefine("inline:com-chilipeppr-widget-wcs", ["chilipeppr_ready", "jquerycookie"], function () {
    return {
        id: "com-chilipeppr-widget-wcs",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Widget / Work Coordinate System",
        desc: "The Work Coordinate System widget is a visual display to let you easily toggle between your G53 through G59 layers of coordinates as well as turn on G92 temporary coordinates. The visualization of layers helps the user understand how work coordinate systems work.",
        publish: {},
        subscribe: {},
        foreignPublish: {},
        foreignSubscribe: {},
        init: function () {

            // Do UI setup
            this.initBody();
            this.initLayers();
            this.subscribeSetup();
            
            this.forkSetup();


            var that = this;
            console.log(this.name + " done loading.");
        },
        activeLayer: null,
        lyrTemplt: null,
        arrNum: [53, 54, 55, 56, 57, 58, 59, 60],
        arrLyr: ["g53", "g54", "g55", "g56", "g57", "g58", "g59"],
        arrLyrEl: [],
        // layersShowingTo is by default set to 54
        // g53 and g92 are always showing
        // so if layersShowingTo is set to 56 then 54,55,56 show
        layersShowingTo: null, // indicates base setting where g53 is showing (so is g92)
        isG92Active: false,
        layerHt: 11.5,
        pathLtEl: null,
        pathRtEl: null,
        initLayers: function() {
            console.log("initLayers");
            
            // get template
            this.lyrTemplt = $('#com-chilipeppr-widget-wcs #svgWcs #g54').clone();
            console.log("lyrTemplt:", this.lyrTemplt);
            this.pathLtEl = $('#com-chilipeppr-widget-wcs #svgWcs #pathLeft');
            this.pathRtEl = $('#com-chilipeppr-widget-wcs #svgWcs #pathRight');

            // attach to add button
             $('#com-chilipeppr-widget-wcs #svgWcs #gAddBtn').click(this.onAddBtn.bind(this));
            // attach to g92
            $('#com-chilipeppr-widget-wcs #svgWcs #g92').click(92, this.onClickLayer.bind(this));
            
            // wipe all template layers
            this.removeAllLayers();
            
            // show our layers
            var config = parseInt(localStorage.getItem("/" + this.id + "/layersShowingTo"));
            if (!config) config = 54;
            this.showLayer(config);
            //this.addLayer(55, 0);
            //this.addLayer(54, 1);
            //this.addLayer(53, 2);
        },
        subscribeSetup: function() {
            // subscribe to the CNC controller broadcasting what
            // layer system we're in
            chilipeppr.subscribe('/com-chilipeppr-interface-cnccontroller/coords', this.onCoordsUpdate.bind(this));
        },
        lastCoords: {coord: null, coordNum: null},
        onCoordsUpdate: function(coords) {
            console.log("onCoordsUpdate. coords:", coords);
            // we are told by the CNC controller widget, i.e. TinyG, which
            // coordinate system we're in. So, even if this widget sends
            // a G54 command, we wait to update the UI based on what TinyG
            // tells us
            if (coords.coordNum != this.lastCoords.coordNum) {
                
                // make sure we have this layer actually showing
                // in the buttons, i.e. if they didn't "add" buttons
                // up to this layer existing, we need to figure that
                // out and show it
                if (this.layersShowingTo < coords.coordNum) {
                    
                    this.showLayer(coords.coordNum);
                }
                
                // we have new a different coordinate layer showing
                // hilite it
                this.setActiveLayerHilite(coords.coordNum, true);
                this.lastCoords = coords;
                
            }
            
        },
        onAddBtn: function() {
            var newpos = this.layersShowingTo;
            newpos++;
            
            if (newpos > 59) {
                return;
            }
            //this.removeAllLayers();
            this.showLayer(newpos);
        },
        removeAllLayers: function() {
            $('#com-chilipeppr-widget-wcs #svgWcs g.wcsLayerTmplt').remove();
        },
        showLayer: function(pos) {
            this.removeAllLayers();
            this.layersShowingTo = pos;
            var total = pos - 53;
            for (var i = 0; i <= total; i++) {
                this.addLayer(pos - i, i);
            }
            this.saveUserSettings();
            
            if (pos >= 59) {
                console.log("we need to hide add button");
                $('#com-chilipeppr-widget-wcs #svgWcs #gAddBtn').attr('opacity', '0.1');
            } else {
                $('#com-chilipeppr-widget-wcs #svgWcs #gAddBtn').attr('opacity', '0.99');
            }
            
            // make sure hilites are correct
            // however, don't hilite a layer not visible in SVG
            // and don't hilite layer if we don't have an activelayer yet
            if (this.activeLayer && this.activeLayer <= this.layersShowingTo) {
                this.setActiveLayerHilite(this.activeLayer);        
            }
        },
        addLayer: function(pos, totalLayers) {
            var showingLayers = totalLayers; //pos - 53;
            var layerName = "g" + pos;
            var newEl = this.lyrTemplt.clone();
            newEl.attr('id', layerName);
            var matrix = newEl.attr('transform');
            console.log("original matrix:", matrix);
            matrix = matrix.replace(/translate\((.*?)\)/, "$1");
            var mArr = matrix.split(/,/);
            if (mArr.length < 2) console.warn("did not get 2 elements splitting matrix");
            var yval = parseFloat(mArr[1]);
            var yvalOffset = this.layerHt * (showingLayers);
            var newyval = yval + yvalOffset;
            mArr[1] = newyval;
            var newmatrix = "translate(" + mArr.join(",") + ")";
            console.log("newmatrix:", newmatrix);
            newEl.find('.layer-id').text("G"+pos);
            var name = (pos == 53) ? "Machine" : "Work";
            newEl.find('.layer-name').text(name);
            newEl.attr('transform', newmatrix);
            
            // attach click event
            newEl.click(pos, this.onClickLayer.bind(this));
            
             // attach click event to minus button
            newEl.find('.wcs-minusbtn').click(pos, this.onClickMinusBtn.bind(this));
            
            // add it
            console.log("about to add newEl:", newEl);
            $('#com-chilipeppr-widget-wcs #svgWcs g:first').prepend(newEl);
            
            // adjust path height
            // reset path height
            //var matrix = this.pathLtEl.attr('d');
            var matrix = "m 15,958 0,17.0";
            console.log("original d pathLt:", matrix);
            matrix.match(/(.*),(.*?)$/);
            var newmatrix = RegExp.$1;
            var y = RegExp.$2;
            console.log("y:", y);
            var yval = parseFloat(y);
            var yvalOffset = this.layerHt * showingLayers;
            var newyval = yval + yvalOffset;
            newmatrix += "," + newyval;
            console.log("newmatrix:", newmatrix);
            this.pathLtEl.attr('d', newmatrix);

            // pathRt
            var matrix = "m 38,958 0,17.0";
            console.log("original d pathLt:", matrix);
            matrix.match(/(.*),(.*?)$/);
            var newmatrix = RegExp.$1;
            var y = RegExp.$2;
            console.log("y:", y);
            var yval = parseFloat(y);
            var yvalOffset = this.layerHt * showingLayers;
            var newyval = yval + yvalOffset;
            newmatrix += "," + newyval;
            console.log("newmatrix:", newmatrix);
            this.pathRtEl.attr('d', newmatrix);
        },
        setActiveLayerHilite: function(lyrNum, isFromCnc) {
            
            // treat g92 differently, like a toggle
            if (lyrNum == 92) {
                if (this.isG92Active) {
                    // then turn on g92
                    $('#com-chilipeppr-widget-wcs #g92')[0].classList.add("active");
                } else {
                    // turn off g92
                    $('#com-chilipeppr-widget-wcs #g92')[0].classList.remove("active");
                }
            } else {
                
                if (lyrNum <=53) return;
                var lyr = "g" + lyrNum;
                //console.log("onClickLayer. lyr:", lyr, "evt:", evt);
                var lyrEl = $('#com-chilipeppr-widget-wcs #' + lyr);
                console.log("lyrEl:", lyrEl);
                
                // removes hilite from all layers
                this.turnOffAllLayers();
                
                // turn back on g92 hilite if user selected it prior
                if (this.isG92Active) {
                    $('#com-chilipeppr-widget-wcs #g92')[0].classList.add("active");
                }
                
                // set the current layer as active. this would only get g53 to g59
                this.activeLayer = lyrNum;
                lyrEl[0].classList.add("active");
                if (isFromCnc) {
                    // add dark stroke
                    lyrEl[0].classList.add("active-verified");
                }
            }
        },
        onClickMinusBtn: function(evt) {
            var lyrNum = evt.data;
            // they want to delete this layer
            var lyrToShowTo = lyrNum - 1;
            if (lyrToShowTo < 54 || lyrToShowTo > 60) return;
            this.showLayer(lyrToShowTo);
        },
        onClickLayer: function(evt) {
            var lyrNum = evt.data;
            if (evt.ctrlKey) {
                // they want to delete this layer
                var lyrToShowTo = lyrNum - 1;
                if (lyrToShowTo < 54 || lyrToShowTo > 60) return;
                this.showLayer(lyrToShowTo);
            } else {
                if (lyrNum == 92) {
                    // toggle g92
                    if (this.isG92Active) {
                        // turn off
                        this.isG92Active = false;
                    } else {
                        this.isG92Active = true;
                    }
                }
                this.setActiveLayerHilite(lyrNum, false);
                this.switchWcs(lyrNum);
            }
        },
        jsonCtr: 0,
        switchWcs: function(pos) {
            var gcode = "G" + pos;
            if (pos == 92) {
                // do we turn on or off G92
                if (this.isG92Active) {
                    // turn on
                    gcode = "G92 X0 Y0 Z0";
                } else {
                    // turn off
                    gcode = "G92.1";
                }
            }
            if (pos == 53) {
                gcode += ' (Reminder: G53 is not modal.)\n(It does not remain in effect past)\n(the line on which it appears.)';
                //Window.xyz.showHidemDRO();
            }                
            gcode += "\n";
            var jg = {D: gcode, Id: "coord" + this.jsonCtr};
            chilipeppr.publish("/com-chilipeppr-widget-serialport/jsonSend", jg);
            this.jsonCtr++;
        },
        turnOffAllLayers: function() {
            var allLayers = $('#com-chilipeppr-widget-wcs .wcsLayer');
            console.log("allLayers", allLayers);
            for (var i = 0; i < allLayers.length; i++) {
                var lyr = allLayers[i];
                //console.log("turning off active for lyr:", lyr);
                lyr.classList.remove('active');
            }
        },
        saveUserSettings: function() {
            var config = localStorage.setItem("/" + this.id + "/layersShowingTo", this.layersShowingTo);
            var config = localStorage.getItem("/" + this.id + "/layersShowingTo");
            console.log("saved user settings:", config);
        },
        initBody: function (evt) {
            $('#' + this.id + ' .hidebody').click(this.toggleBody.bind(this));
            var config = localStorage.getItem("/" + this.id + "/body");
            if (config == "visible") this.showBody();
            else this.hideBody();
        },
        toggleBody: function (evt) {
            if ($('#' + this.id + '-body').hasClass('hidden')) this.showBody(evt);
            else this.hideBody(evt);
        },
        showBody: function (evt) {
            $('#' + this.id + '-body').removeClass('hidden');
            $('#' + this.id + '-ftr').removeClass('hidden');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-down');
            if (!(evt == null)) localStorage.setItem("/" + this.id + "/body", "visible");
            $(window).trigger('resize');
        },
        hideBody: function (evt) {
            $('#' + this.id + '-body').addClass('hidden');
            $('#' + this.id + '-ftr').addClass('hidden');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-down');
            if (!(evt == null)) localStorage.setItem("/" + this.id + "/body", "hidden");
        },
        forkSetup: function () {
            //$('#com-chilipeppr-widget-xyz-tbar-fork').prop('href', this.fiddleurl);
            //$('#com-chilipeppr-widget-xyz-tbar-standalone').prop('href', this.url);
            //$('#com-chilipeppr-widget-xyz .fork-name').html(this.id);
            $('#com-chilipeppr-widget-xyz .panel-title').popover({
                title: this.name,
                content: this.desc,
                trigger: 'hover',
                placement: "auto",
                html: true,
                delay: 200,
                animation: true
            });

            // load the pubsub viewer / fork element which decorates our upper right pulldown
            // menu with the ability to see the pubsubs from this widget and the forking links
            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($('#com-chilipeppr-widget-xyz .panel-heading .dropdown-menu'), that);
                });
            });

        },
    }
});