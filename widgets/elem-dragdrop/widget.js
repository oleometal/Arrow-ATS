// test
cprequire_test(["inline:com-chilipeppr-elem-dragdrop"], function (dd) {
    console.log("test running of " + dd.id);
    console.log(window.location);

    console.log("testing drag drop");
    $("body").height("300px;");
    //$(".com-chilipeppr-elem-dragdrop").popover('show');
    dd.init();
    dd.bind("body", null);
    console.log(dd);
    
    var testLoadGcodePubSub = function() {
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-elem-dragdrop/loadGcodeDoNotCreateRecentFileEntry", {
                gcode: "G0 X10 Y10\n",
                name: "my test file no recent entry",
                lastModified: new Date()
            });
        }, 5000);
    }
    var testLoadGcodeFromUrlPubSub = function() {
        setTimeout(function() {
            chilipeppr.publish("/com-chilipeppr-elem-dragdrop/loadGcodeFromUrl", "http://www.shapeoko.com/wiki/images/0/09/Circle-diamond-square-50-45-40mm.txt");
        }, 5000);
    }
    //testLoadGcodePubSub();
    //testLoadGcodeFromUrlPubSub();

    $("body").css('padding', '20px');
    $('title').html(dd.name);
    
} /*end_test*/ );

cpdefine("inline:com-chilipeppr-elem-dragdrop", ["chilipeppr_ready"], function () {
    console.log("Inside of define for com-chilipeppr-elem-dragdrop");
    return {
        id: "com-chilipeppr-elem-dragdrop",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself

        name: "Element / Drag Drop",
        desc: "An element that presents a drag and drop icon that allows files to be dragged onto it. A pubsub event called /com-chilipeppr-elem-dragdrop/ondropped is published when the drop is complete. The contents of the file are passed in the pubsub call so different widgets/elements can consume the contents of the file.",
        publish: {
            "/com-chilipeppr-elem-dragdrop/ondropped":"When the file is dropped. Payload contains the file.",
            "/com-chilipeppr-elem-dragdrop/ondragover":"When the mouse is hovering over drop area so you can hilite/react. Empty payload.",
            "/com-chilipeppr-elem-dragdrop/ondragleave": "When mouse stops hovering so you can remove hilites. Empty payload.",
            "/com-chilipeppr-elem-dragdrop/ondragdone" : "When user drops the file onto browser so you can remove hilites. Empty payload. Don't confuse this with ondropped which is the pubsub that actually contains file that was dropped."
        },
        subscribe: {
            "/com-chilipeppr-elem-dragdrop/loadGcode":"Send in this signal to load a string of Gcode with a payload of: { gcode: \"your gcode text as a string\", name: \"name of file as string so the recent file list can show the name\", lastModified: Date }. This signal will then generate an onDropped signal which is what all widgets listen to for loading of the file.",
            "/com-chilipeppr-elem-dragdrop/loadGcodeDoNotCreateRecentFileEntry":"Send in this signal to load a string of Gcode without creating a recent file menu entry. Send in the same payload as /loadGcode. This is useful if you have a macro or a widget that wants to send a lot of Gcode into ChiliPeppr over and over, but does not want to bloat the recent file menu. For example, the Auto-Leveller may want to let the user load Gcode over and over without creating a history.",
            "/com-chilipeppr-elem-dragdrop/loadGcodeFromUrl":"Send in this signal to load Gcode from a URL. The payload is simply the URL as a string.",
            "/com-chilipeppr-elem-dragdrop/loadGcodeFromUrlDoNotCreateRecentFileEntry":"Send in this signal to load Gcode from a URL, but do not create a recent file entry in the process. This allows you to load Gcode over and over without bloating the recent file menu.",
        },
        hasHtml: true,
        hasCss: true,
        hasJs: true,
        dropArea: null,
        txtDomElemSelector: null,
        init: function () {
            console.log("init called");
            $(".com-chilipeppr-elem-dragdrop .dropdown-toggle").popover({animation:true,delay:100});
            //$(".com-chilipeppr-elem-dragdrop").popover('show');
            this.forkSetup();
            
            // subscribe to our own signal so we can create recent file list entries
            // do this at a lower priority in case we run out of file quota
            // that way the 2nd copy we make of the file will just get
            // dropped if over quota
            chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", this, this.createRecentFileEntry, 20);
            
            // setup chilipeppr logo btn click
            //$('.com-chilipeppr-elem-dragdrop-loadlogo').click(this.loadChiliPepprGcode.bind(this));
            $('.com-chilipeppr-elem-dragdrop-loadlogo').click("//i2dcui.appspot.com/3d/chilipepprlogo.nc", this.loadUrlDoNotCreateRecentFileEntry.bind(this));
            //$('.com-chilipeppr-elem-dragdrop-loadlogoinch').click(this.loadChiliPepprGcodeInch.bind(this));
            $('.com-chilipeppr-elem-dragdrop-loadlogoinch').click("//i2dcui.appspot.com/3d/chilipepprlogo.inches.nc", this.loadUrlDoNotCreateRecentFileEntry.bind(this));
            $('.com-chilipeppr-elem-dragdrop-loadcirclediamondsquare').click("//i2dcui.appspot.com/img/gcode/Circle-diamond-square-50-45-40mm.gcode", this.loadUrlDoNotCreateRecentFileEntry.bind(this));
            $('.com-chilipeppr-elem-dragdrop-loadlogosvg').click("//i2dcui.appspot.com/img/svg/chilipepprlogo.svg", this.loadUrlDoNotCreateRecentFileEntry.bind(this));
            $('.com-chilipeppr-elem-dragdrop-loadeagleuno').click("//i2dcui.appspot.com/slingshot?url=https://raw.githubusercontent.com/chilipeppr/elem-dragdrop/master/arduinoUnoRev3.brd", this.loadUrlDoNotCreateRecentFileEntry.bind(this));
            $('.com-chilipeppr-elem-dragdrop-loadeaglemicro').click("//i2dcui.appspot.com/slingshot?url=https://raw.githubusercontent.com/chilipeppr/elem-dragdrop/master/Arduino_Micro_Rev03j.brd", this.loadUrlDoNotCreateRecentFileEntry.bind(this));
            $('.com-chilipeppr-elem-dragdrop-loadeagleadafruitruler').click("//i2dcui.appspot.com/slingshot?url=https://raw.githubusercontent.com/chilipeppr/elem-dragdrop/master/AdafruitPCBReferenceRuler.brd", this.loadUrlDoNotCreateRecentFileEntry.bind(this));
            
            // setup del files
            $('.com-chilipeppr-elem-dragdrop .recent-file-delete').click(this.deleteRecentFiles.bind(this));

            this.buildRecentFileMenu();
            
            var that = this;

            // url loader
            $('.com-chilipeppr-elem-dragdrop .dropdown-menu .url-load').click(function(e) {
                e.stopPropagation();
                console.log("click event in url load field. e:", e);
            });
            $('.com-chilipeppr-elem-dragdrop .dropdown-menu .url-load').keypress(function(e) {
                console.log("keypress event in url load field. e:", e);
                if (e.charCode == 13) {
                    // user hit enter key
                    // mimic clicking go button
                    $('.com-chilipeppr-elem-dragdrop .dropdown-menu .url-load-go').trigger('click');
                    //that.loadUrl();
                }
            });
            $('.com-chilipeppr-elem-dragdrop .dropdown-menu .url-load-go').click(function(e) {
                that.loadUrl();
            });
            
            // paste loader
            $('.com-chilipeppr-elem-dragdrop .dropdown-menu .paste-load').click(function(e) {
                e.stopPropagation();
            });
            $('.com-chilipeppr-elem-dragdrop .dropdown-menu .paste-load-go').click(function(e) {
                that.loadText();
            });
            
            this.setupGlobalAjaxError();
            this.setupSubscribe();
            
            this.setupOpenFile();
            this.setupDownload();
            
            //console.log(this);
        },
        setupOpenFile: function() {
            var filePicker = $("#com-chilipeppr-elem-dragdrop-openfile-picker");

            filePicker.on('change', function(){
                if (!window.FileReader) {
                    alert('Your browser is not supported');
                    return false;
                }
                
                var input = filePicker.get(0);
                if (input.files.length > 0) {
                    var fileReader = new FileReader();
                    fileReader.fileName = input.files[0].name; // HAX, but simplest way to pass up the stack
                    
                    fileReader.onload = function (fileLoadedEvent) {
                        var gcodetxt = fileLoadedEvent.target.result;
                        
                        var info = {
                        	name: fileLoadedEvent.target.fileName, 
                        	lastModified: new Date()
                        };
                        
                        chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", gcodetxt, info);
                    };
                    
                    fileReader.readAsText(input.files[0], "UTF-8");
                }
            });
            
            $('.com-chilipeppr-elem-dragdrop-openfile').click(function() { $("#com-chilipeppr-elem-dragdrop-openfile-picker").click(); });
        },
        setupDownload: function() {
            $('.com-chilipeppr-elem-dragdrop-download').click(this.onDownload.bind(this));
        },
        onDownload: function(evt) {
            // Opens new window and downloads Gcode to 
            // local file. Shows use of cprequire() 
            // which is the way to get access to any 
            // of ChiliPeppr's modules. You can 
            // override methods in a module, call 
            // methods directly, or access properties 
            // of that module.
            cprequire(['inline:com-chilipeppr-widget-gcode'], function(gcode) {
                var txt = gcode.fileLines.join('\n');
                window.open('data:text/csv;charset=utf-8,' + escape(txt));
            });
        },
        setupSubscribe: function() {
            chilipeppr.subscribe(
                "/com-chilipeppr-elem-dragdrop/loadGcode", this, this.loadGcode);
            chilipeppr.subscribe(
                "/com-chilipeppr-elem-dragdrop/loadGcodeDoNotCreateRecentFileEntry", 
                this, this.loadGcodeDoNotCreateRecentFileEntry);
            //loadGcodeFromUrlDoNotCreateRecentFileEntry
            chilipeppr.subscribe(
                "/com-chilipeppr-elem-dragdrop/loadGcodeFromUrl", this, this.loadGcodeFromUrl);
            chilipeppr.subscribe(
                "/com-chilipeppr-elem-dragdrop/loadGcodeFromUrlDoNotCreateRecentFileEntry", 
                this, this.loadGcodeFromUrlDoNotCreateRecentFileEntry);
        },
        loadGcodeFromUrlDoNotCreateRecentFileEntry: function(url) {
            this.loadUrlDoNotCreateRecentFileEntry({data:url});
        },
        loadGcodeFromUrl: function(url) {
            this.loadUrl({data:url});
        },
        loadGcodeDoNotCreateRecentFileEntry: function(obj) {
            this.loadGcode(obj, true);
        },
        loadGcode: function(obj, isDoNotCreateRecentFileEntry) {
            console.log("got loadGcode signal. obj:", obj, "isDoNotCreateRecentFileEntry:", isDoNotCreateRecentFileEntry);
            var name = "";
            if (obj.name) {
                name = obj.name;
            } else {
                // build name from the gcode contents
                if (obj.gcode.length > 20) name += obj.gcode.substring(0,20);
                else name += obj.gcode;
            }
            name = name.replace(/[\r\n]/g, " ");
            
            var info = {
                name: name,
                lastModified: new Date()
            };
            if (obj.lastModified) info.lastModified = obj.lastModified;
            var data = obj.gcode;
            
            console.log("info:", info);
            var that = this;
            // send event off as if the file was drag/dropped
            if (isDoNotCreateRecentFileEntry) {
                // unsubscribe so we don't get loopback
                chilipeppr.unsubscribe("/com-chilipeppr-elem-dragdrop/ondropped", that.createRecentFileEntry);
                // send event off as if the file was drag/dropped
                chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", data, info);
                // resubscribe
                chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", that, that.createRecentFileEntry);
            } else {
                chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", data, info);
            }
        },
        setupGlobalAjaxError: function() {
            $.ajaxSetup({
                error: function(xhr, status, error) {
                    console.log("global ajax error xhr:", xhr, "status:", status, "error:", error);
                    console.log("state:", xhr.state());
                    var respHdr = xhr.getAllResponseHeaders();
                    console.log("response headers:", respHdr);
                    //alert("An AJAX error occured: " + status + "\nError: " + error);
                    chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Error on Load URL", "There was an error loading your URL. Error: " + error + "<br>Status: " + status + "<br>State: " + xhr.state() + "<br>Response Headers: " + JSON.stringify(respHdr) + "<br><br>This could be due to Allow-Access-Origin security on the URL you are trying to load, or you are not online.", 5000);
                }
            });
        },
        loadText: function() {
            console.log("loading gcode from paste");
            var data = $('.com-chilipeppr-elem-dragdrop .dropdown-menu .paste-load').val();
            var name = "Paste: ";
            if (data.length > 20) name += data.substring(0,20);
            else name += data;
            name = name.replace(/[\r\n]/g, " ");
            
            var info = {
                name: name,
                lastModified: new Date()
            };
            console.log("info:", info);
            // send event off as if the file was drag/dropped
            chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", data, info);
        },
        loadUrl: function(evt) {
            var url = $('.com-chilipeppr-elem-dragdrop .dropdown-menu .url-load').val();
            console.log("loadUrl. evt:", evt);
            if (evt && evt.data) {
                url = evt.data;
            }
            // let's slingshot this thru ChiliPeppr's geturl method on the server
            // to solve for CORS header problems
            url = "http://chilipeppr.com/geturl?url=" + encodeURIComponent(url);
            console.log("url about to retrieve:", url);
            
            var that = this;
            $.get(url, null, function(data) {
                console.log("got gcode from url. url:", url);
                var info = {
                    name:url, 
                    lastModified: new Date()
                };
                console.log("info:", info);
                // send event off as if the file was drag/dropped
                chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", data, info);
            }, 'text')
            .error(function (err, r, s) {
                console.log("got error loading url. are we online? err:", err, s, r, err.getAllResponseHeaders());   
                //chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Error on Load URL", JSON.stringify(err));
            });
        },
        loadUrlDoNotCreateRecentFileEntry: function(evt) {
            console.log("doing loadUrlDoNotCreateRecentFileEntry. evt:", evt);
            var url = $('.com-chilipeppr-elem-dragdrop .dropdown-menu .url-load').val();
            if (evt.data) {
                url = evt.data;
            }
            // do everything thru slingshot
            if (url.match(/\/\/i2dcui.appspot.com\/slingshot/)) {
                console.log("the url already seems to have slingshot so not preprending");
            } else {
                if (url.match(/\/\//)) {
                    url = "http:" + url;
                }
                url = "//i2dcui.appspot.com/slingshot?url=" + url;
            }
            
            var that = this;
            $.get(url, null, function(data) {
                console.log("got file from url. url:", url);
                var info = {
                    name:url, 
                    lastModified: new Date()
                };
                console.log("info:", info);
                // unsubscribe so we don't get loopback
                chilipeppr.unsubscribe("/com-chilipeppr-elem-dragdrop/ondropped", that.createRecentFileEntry);
                // send event off as if the file was drag/dropped
                chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", data, info);
                // resubscribe
                chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", that, that.createRecentFileEntry);
            }, 'text')
            .error(function () {
                console.log("got error loading url. are we online?");    
            });
        },
        loadChiliPepprGcodeInch: function(evt) {
            this.loadChiliPepprGcode(evt, "http://www.chilipeppr.com/3d/chilipepprlogo.inches.nc");
        },
        loadChiliPepprGcode: function(evt, alturl) {
            var url = 'http://www.chilipeppr.com/3d/chilipepprlogo.nc';
            if (alturl !== undefined && alturl != null) url = alturl;
            var that = this;
            $.get(url, null, function(data) {
                console.log("got chilipeppr logo.");
                // unsubscribe so we don't get loopback
                chilipeppr.unsubscribe("/com-chilipeppr-elem-dragdrop/ondropped", that.createRecentFileEntry);
                // send event off as if the file was drag/dropped
                chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", data);
                // resubscribe
                chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", that, that.createRecentFileEntry);
            }, 'text')
            .error(function () {
                console.log("got error loading chilipeppr logo. are we online?");    
            });
            
        },
        deleteRecentFiles: function() {
            
            console.group("Drag/drop. deleteRecentFiles()");
            console.log("deleting files");
            // loop thru file storage and delete entries that match this widget
            var keysToDelete = [];
            for (var i = 0; i < localStorage.length; i++){
                console.log("localStorage.item.key:", localStorage.key(i));
                var key = localStorage.key(i);
                if (key.match(/com-chilipeppr-elem-dragdrop-recent/) || key.match(/^last-imported/) ) {
                    //localStorage.removeItem(key);
                    keysToDelete.push(key);
                    console.log("going to remove localstorage key:", key);
                }
            }
            keysToDelete.forEach(function(key) {
                localStorage.removeItem(key);
            });
            //localStorage.clear();
            this.buildRecentFileMenu();
            console.groupEnd();
            
            //console.log("deleting files");
            //localStorage.clear();
            //this.buildRecentFileMenu();
        },
        createRecentFileEntry: function(fileStr, info) {
            console.log("createRecentFileEntry. fileStr.length:", fileStr.length, "info:", info);
            // get the next avail slot
            var lastSlot = -1;
            for(var ctr = 0; ctr < 200; ctr++) {
                if ('com-chilipeppr-elem-dragdrop-recent' + ctr in localStorage) {
                    console.log("found recent file entry. ctr:", ctr);
                    lastSlot = ctr;
                }
            }
            console.log("lastSlot we found:", lastSlot);
            
            var nextSlot = lastSlot + 1;
            var recent = localStorage.getItem("com-chilipeppr-elem-dragdrop-recent" + nextSlot);
            if (recent == null) {
                console.log("empty slot. filling.");
                // this could fail if we are out of quota (happens often)
                try {
                    localStorage.setItem("com-chilipeppr-elem-dragdrop-recent" + nextSlot, fileStr);
                } catch(e) {
                    if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name == "QuotaExceededError" || e.code == 22 || e.name == "NS_ERROR_DOM_QUOTA_REACHED" || e.code == 1014) {
                        console.error("Drag/drop Widget. out of local storage space, but letting user proceed. err:", e);
                        info.name += " (No local storage available, not saving.)";
                        localStorage.setItem("com-chilipeppr-elem-dragdrop-recent" + nextSlot, "(No local storage available, not saved.)");
                        $('#com-chilipeppr-widget-dragdrop-outofspace').modal();
                    } else {
                        console.error("Drag/drop Widget. got err with localStorage:", e);
                    }
                }
                localStorage.setItem("com-chilipeppr-elem-dragdrop-recent" + nextSlot + "-name", info.name);
                localStorage.setItem("com-chilipeppr-elem-dragdrop-recent" + nextSlot + "-lastMod", info.lastModified);
                this.buildRecentFileMenu();
            }
            
        },
        buildRecentFileMenu: function() {
            
            // cleanup prev recent files
            $('.com-chilipeppr-elem-dragdrop .dropdown-menu > li.recent-file-item').remove();
            
            var li = $('.com-chilipeppr-elem-dragdrop .dropdown-menu > li.recent-files');
            console.log("listItems:", li);
            var ctr = 0;
            var recentName = localStorage.getItem("com-chilipeppr-elem-dragdrop-recent" + ctr + "-name");
            while(recentName != null) {
                console.log("recentFile ctr:", ctr, "recentName:", recentName);
                var recentLastModified = localStorage.getItem("com-chilipeppr-elem-dragdrop-recent" + ctr + "-lastMod");
                var rlm = new Date(recentLastModified);
                var recentSize = localStorage.getItem("com-chilipeppr-elem-dragdrop-recent" + ctr).length;
                var rsize = parseInt(recentSize / 1024);
                if (rsize == 0) rsize = 1;
                var newLi = $(
                    '<li class="recent-file-item"><a href="javascript:">' + recentName +
                    ' <span class="lastModifyDate">' + rlm.toLocaleString() + '</span>' +
                    ' ' + rsize + 'KB' +
                    '</a></li>');
                    //' <button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-trash"></span></button></a></li>');
                newLi.insertAfter(li);
                var that = this;
                newLi.click("com-chilipeppr-elem-dragdrop-recent" + ctr, function(data) {
                    console.log("got recent file click. data:", data);
                    var key = data.data;
                    // publish event to pubsub
                    var info = {
                        name: localStorage.getItem(key + '-name'), 
                        lastModified: localStorage.getItem(key + '-lastMod')
                    };
                    
                    // unsubscribe so we don't get loopback
                    chilipeppr.unsubscribe("/com-chilipeppr-elem-dragdrop/ondropped", that.createRecentFileEntry);
                    // send event off as if the file was drag/dropped
                    chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", localStorage.getItem(key), info);
                    // resubscribe
                    chilipeppr.subscribe("/com-chilipeppr-elem-dragdrop/ondropped", that, that.createRecentFileEntry);
                });

                ctr++;
                recentName = localStorage.getItem("com-chilipeppr-elem-dragdrop-recent" + ctr + "-name");
                
            }
            /*$.each(lis, function(i, li) {
                if (li.
            });*/
        },
        bind: function (dropDomElemSelector, txtDomElemSelector) {
            // Create drag and drop
            //dropArea = $('.dropArea');
            this.dropArea = $(dropDomElemSelector);
            this.txtDomElemSelector = $(txtDomElemSelector);

            // Attach our drag and drop handlers.
            this.dropArea.bind({
                dragover: function () {
                    $(this).addClass('hover');
                    $(".com-chilipeppr-elem-dragdrop").addClass('hover');
                    //$(".com-chilipeppr-elem-dragdrop").popover('show');
                    chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondragover", "");
                    return false;
                },
                dragend: function () {
                    $(this).removeClass('hover');
                    $(".com-chilipeppr-elem-dragdrop").removeClass('hover');
                    //$(".com-chilipeppr-elem-dragdrop").popover('hide');
                    chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondragleave", "");
                    return false;
                },
                dragleave: function () {
                    $(this).removeClass('hover');
                    $(".com-chilipeppr-elem-dragdrop").removeClass('hover');
                    //$(".com-chilipeppr-elem-dragdrop").popover('hide');
                    chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondragleave", "");

                    return false;
                },
                drop: function (e) {
                    $(this).removeClass('hover');
                    $(".com-chilipeppr-elem-dragdrop").removeClass('hover');
                    //$(".com-chilipeppr-elem-dragdrop").popover('hide');
                    chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondragleave", "");

                    e = e || window.event;
                    e.preventDefault();

                    // jQuery wraps the originalEvent, so we try to detect that here...
                    e = e.originalEvent || e;
                    //console.log(e);

                    // Using e.files with fallback because e.dataTransfer is immutable and can't be overridden in Polyfills (http://sandbox.knarly.com/js/dropfiles/).            
                    var files = (e.files || e.dataTransfer.files);
                    //console.log(files);
                    for (var i = 0; i < files.length; i++) {
                        (function (i) {
                            // Loop through our files with a closure so each of our FileReader's are isolated.
                            var reader = new FileReader();
                            //console.log(reader);
                            //console.log("file");
                            //console.log(files[i]);
                            var thefile = files[i];
                            reader.onload = function (event) {
                                //console.log(event);
                                //console.log(event.target.result);
                                //console.log(event.target.result);
                                $(this.txtDomElemSelector).html(event.target.result);

                                // publish event to pubsub
                                var info = {
                                    name: thefile.name, 
                                    lastModified: thefile.lastModifiedDate
                                };
                                console.log("the drag/drop widget is about to publish an onDropped event. file.length:", event.target.result.length, "info:", info);
                                chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", event.target.result, info);
                                chilipeppr.publish(
                                    "/com-chilipeppr-elem-flashmsg/flashmsg", "File Loaded", 
                                    '<div class="row">' +
                                    '<div class="col-xs-3">' + 
                                    "Name: " + 
                                    '</div><div class="col-xs-9">' + 
                                    thefile.name +  
                                    '</div>' + 
                                    '</div><div class="row">' +
                                    '<div class="col-xs-3">' + 
                                    "Size: " + 
                                    '</div><div class="col-xs-9">' + 
                                    thefile.size + 
                                    '</div>' + 
                                    '</div><div class="row">' +
                                    '<div class="col-xs-3">' + 
                                    "Last Modified: " + 
                                    '</div><div class="col-xs-9">' + 
                                    thefile.lastModifiedDate +
                                    '</div>' +
                                    '</div>' +
                                    "</div>", 1000 * 3, true);
                            };
                            //reader.readAsDataURL(files[i]);
                            reader.readAsText(files[i]);

                        })(i);
                    }

                    return false;
                }
            });
            // end drop area code
        },
        forkSetup: function () {
            var topCssSelector = '.' + this.id; //com-chilipeppr-widget-tinyg';

            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .dropdown-menu'), that);
                });
            });

        },

    };
});

