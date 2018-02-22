// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:org-jscut-gcode-widget"], function (macro) {
    console.log("test running of " + macro.id);
    macro.init();
        
} /*end_test*/ );


cpdefine("inline:org-jscut-gcode-widget", ["chilipeppr_ready"], function () {
    
    return {
        id: "org-jscut-gcode-widget",
        name: "Widget / JSCut",
        desc: "This widget enables you to view files sent directly to ChiliPeppr from JSCut. JSCut sends data to your ChiliPeppr cloud storage that is available to any logged in user. When you come back into CP this widget you can view the files in your cloud storage related to JSCut.",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        publish: {
        },
        subscribe: {},
        foreignPublish: {
        },
        foreignSubscribe: {
        },
        init: function () {

            this.forkSetup();
                        
            // setup del files
            $('#org-jscut-gcode-widget .recent-file-delete').click( this.deleteRecentFiles.bind(this));

            this.buildRecentFileMenu();
                        
            // popovers
            $('#org-jscut-gcode-widget .panel-heading .btn').popover();
            
            this.getFilesFromChiliPepprStorage();
            //jscut-refresh
            $('#org-jscut-gcode-widget .jscut-refresh').click( this.getFilesFromChiliPepprStorage.bind(this));
            
            this.checkIfUrlParamToAutoLoad();
            
            console.log(this.name + " done loading.");
        },
        getUrlParameterByName: function(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        },
        checkIfUrlParamToAutoLoad: function() {
            var loadJscut = this.getUrlParameterByName('loadJscut');
            console.log("checkIfUrlParamToAutoLoad. loadJscut:", loadJscut);
            
            // see if they gave us the key or just a true
            if (loadJscut != null && (loadJscut == true || loadJscut == "true")) {
                // just ask for our widget to be shown
                // this assumes the workspace that loaded us just has a parent div
                // with the hidden class
                $('#org-jscut-gcode-widget').parent().removeClass('hidden');
            } else if (loadJscut != null && loadJscut.length > 0) {
                // assume it's the key and load it
                this.loadFileFromChiliPeppr(loadJscut);
            }

        },
        getFilesFromChiliPepprStorage: function() {
            // this queries chilipeppr's storage facility to see what
            // files are available for jscut
            var that = this;
            $('#org-jscut-gcode-widget-body .alert-warning').addClass('hidden');

            $.ajax({
                url: "http://www.chilipeppr.com/datagetallkeys",
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function( data ) {
                
                // see if error
                if (data.Error) {
                    // we got json, but it's error
                    $('#org-jscut-gcode-widget-body .alert-warning').html("<p>We can't retrieve your data from JSCut because you are not logged in. Please login to ChiliPeppr to see your list of available files.</p><p>Error:" + data.Msg + "</p>").removeClass('hidden');
                    return;
                }
                    
                // loop thru keys and get org-jscut ones
                var files = [];
                data.forEach(function(item) {
                    console.log("item:", item);
                    if (item.Name && item.Name.match(/org-jscut-gcode/)) {
                        // we have a jscut file
                        files.push({
                            name: item.Name, 
                            created: item.CreateDate,
                            size: item.ValueSize
                        });
                    }
                });
                if (files.length > 0) {
                    that.buildJscutFileMenu(files);
                }
            });
        },
        buildJscutFileMenu: function(files) {
            
            console.log("buildJscutFileMenu. files:", files);
            
            // cleanup prev recent files
            $('#org-jscut-gcode-widget .dropdown-menu-main > li.recent-file-item').remove();
            
            var li = $('#org-jscut-gcode-widget .dropdown-menu-main > li.recent-files');
            console.log("listItems:", li);
            var ctr = 0;
            var that = this;
            
            files.forEach(function(item) {
                var recentName = item.name;
                var recentLastModified = item.created;
                var rlm = new Date(recentLastModified);
                var recentSize = item.size;
                var rsize = parseInt(recentSize / 1024);
                if (rsize == 0) rsize = 1;
                var newLi = $(
                    '<li class="recent-file-item"><a href="javascript:">' + recentName +
                    ' <span class="lastModifyDate">' + rlm.toLocaleString() + '</span>' +
                    ' ' + rsize + 'KB' +
                    '</a></li>');
                    //' <button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-trash"></span></button></a></li>');
                newLi.insertAfter(li);
                
                newLi.click(recentName, function(data) {
                    console.log("got jscut file click. data:", data);
                    var key = data.data;
                    that.loadFileFromChiliPeppr(key);
                    
                });

                ctr++;

            });
            
        },
        loadFileFromChiliPeppr: function(key) {
            // call dataget on chilipeppr servers to get value
            // then load as if drag dropped
            console.log("loadFileFromChiliPeppr. key:", key);
            $('#org-jscut-gcode-widget-body .alert-warning').addClass('hidden');
            
            $.ajax({
                url: "http://www.chilipeppr.com/dataget?key=" + key,
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function( data ) {

                console.log("got ajax callback of getdata. data:", data);
                
                // see if error
                if (data.Error) {
                    // we got json, but it's error
                    $('#org-jscut-gcode-widget-body .alert-warning').html("<p>We could not load your JSCut file from ChiliPeppr's cloud storage. Please login to ChiliPeppr to load your file.</p><p>Error:" + data.Msg + "</p>").removeClass('hidden');
                    return;
                }

                // we should have the file content. just fire it off as a drag/drop
                // as if the user dragged this onto the browser
                var info = {
                    name: "JSCut " + key.replace(/org-jscut-gcode/i, ""),
                    lastModified: new Date()
                };
                // send event off as if the file was drag/dropped
                chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", data.Value, info);

            });
        },
        deleteRecentFiles: function() {
            console.log("deleting files");
            // loop thru file storage and delete entries that match this widget
            for (var i = 0; i < localStorage.length; i++){
                console.log("localStorage.item.key:", localStorage.key(i));
                var key = localStorage.key(i);
                if (key.match(/org-jscut-gcode-widget/))
                    localStorage.removeItem(key);
                
            }
            //localStorage.clear();
            this.buildRecentFileMenu();
        },
        createRecentFileEntry: function(fileStr, info) {
            console.log("createRecentFileEntry. fileStr.length:", fileStr.length, "info:", info);
            // get the next avail slot
            var lastSlot = -1;
            for(var ctr = 0; ctr < 100; ctr++) {
                if ('org-jscut-gcode-widget-recent' + ctr in localStorage) {
                    console.log("found recent file entry. ctr:", ctr);
                    lastSlot = ctr;
                }
            }
            console.log("lastSlot we found:", lastSlot);
            
            var nextSlot = lastSlot + 1;
            var recent = localStorage.getItem("org-jscut-gcode-widget-recent" + nextSlot);
            if (recent == null) {
                console.log("empty slot. filling.");
                localStorage.setItem("org-jscut-gcode-widget-recent" + nextSlot, fileStr);
                localStorage.setItem("org-jscut-gcode-widget-recent" + nextSlot + "-name", info.name);
                localStorage.setItem("org-jscut-gcode-widget-recent" + nextSlot + "-lastMod", info.lastModified);
                this.buildRecentFileMenu();
            }
            
        },
        buildRecentFileMenu: function() {
            
            // cleanup prev recent files
            $('#org-jscut-gcode-widget .dropdown-menu-main > li.recent-file-item').remove();
            
            var li = $('#org-jscut-gcode-widget .dropdown-menu-main > li.recent-files');
            console.log("listItems:", li);
            var ctr = 0;
            var recentName = localStorage.getItem("org-jscut-gcode-widget-recent" + ctr + "-name");
            while(recentName != null) {
                console.log("recentFile ctr:", ctr, "recentName:", recentName);
                var recentLastModified = localStorage.getItem("org-jscut-gcode-widget-recent" + ctr + "-lastMod");
                var rlm = new Date(recentLastModified);
                var recentSize = localStorage.getItem("org-jscut-gcode-widget-recent" + ctr).length;
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
                newLi.click("org-jscut-gcode-widget-recent" + ctr, function(data) {
                    console.log("got recent file click. data:", data);
                    var key = data.data;
                    that.loadFileFromLocalStorageKey(key);
                    
                });

                ctr++;
                recentName = localStorage.getItem("org-jscut-gcode-widget-recent" + ctr + "-name");
                
            }
        },
        loadFileFromLocalStorageKey: function(key) {
            // load file into probes
            var info = {
                name: localStorage.getItem(key + '-name'), 
                lastModified: localStorage.getItem(key + '-lastMod')
            };
            console.log("loading jscut data. localStorage.key:", key, "info:", info);
            
            // load the data
            this.jscript = localStorage.getItem(key);
            this.loadJscript(this.jscript);
            this.status("Loaded jscut data \"" + info.name + "\"");
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
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function () {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function (pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .panel-heading .dropdown .dropdown-menu-main'), that);
                });
            });
            
        },
    }
});