// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:com-chilipeppr-elem-pubsubviewer"], function(psv) {
    console.log("test running of " + psv.id);
    //psv.init();

    var divs = $('<div id="com-chilipeppr-elem-pubsubviewer-object" class=""></div>' +
        '<div id="com-chilipeppr-elem-pubsubviewer-object2" class=""></div>');
    $('body').append(divs);

    chilipeppr.load("#com-chilipeppr-elem-pubsubviewer-object",
        "http://fiddle.jshell.net/chilipeppr/XxEBZ/show/light/",
        function() {
            require(["inline:com-chilipeppr-widget-tinyg", 'inline:com-chilipeppr-elem-pubsubviewer'], function(tinyg, pubsubviewer) {
                console.log("inside require of tinyg");
                console.log("tinyg obj:", tinyg);
                tinyg.init();

                //psv.show(cpobj);
                //pubsubviewer.attachTo($('#com-chilipeppr-elem-pubsubviewer-object .panel-heading .dropdown-menu'), tinyg);
            });
        });

    chilipeppr.load("#com-chilipeppr-elem-pubsubviewer-object2",
        "http://fiddle.jshell.net/chilipeppr/gh45j/show/light/",
        function() {
            require(["inline:com-chilipeppr-widget-xyz"], function(xyz) {
                console.log("inside require of xyz");
                console.log("xyz obj:", xyz);
                xyz.init();
                //psv.show(cpobj);
                //psv.attachTo($('#com-chilipeppr-elem-pubsubviewer-object2 .panel-heading .dropdown-menu'), xyz);
            });
        });

} /*end_test*/ );

cpdefine("inline:com-chilipeppr-elem-pubsubviewer", ["chilipeppr_ready"], function() {
    return {
        id: "com-chilipeppr-elem-pubsubviewer",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Element / Pubsub Viewer",
        desc: "This widget can be used to attach a set of menu items to a parent widget’s upper right corner menu to show the backing Github URL, a forking link, test links, and the inline pubsub viewer which lets you see what signals this widget publishes and subscribes to as well as documentation on the methods/properties inside the parent widget.",
        isInitted: false,
        init: function() {
            //var that = this;
            $('#com-chilipeppr-elem-pubsubviewer-modal').on('show.bs.modal', this.onShow.bind(this));
            $('#com-chilipeppr-elem-pubsubviewer-modal').on('hidden.bs.modal', function(e) {
                    console.log("modal hidden");
                })
                //this.show();
            this.isInitted = true;
            console.log(this.name + " done initting.");
        },
        cpobject: null, // the object we're showing pubsub for
        pubsubClick: function(evt) {
            console.log("got pubsub click in dropdown. evt:", evt);
            if (evt.data) {
                console.log("evt had correct object so showing modal:", evt.data);
                this.show(evt.data);
            }
        },
        show: function(cpobject) {
            this.cpobject = cpobject;
            if (!this.isInitted) this.init();
            $('#com-chilipeppr-elem-pubsubviewer-modal').modal('show');
        },
        onShow: function() {
            console.log("modal show pre");
            var o = this.cpobject;
            $('#com-chilipeppr-elem-pubsubviewer-modal .modal-title')
                .text("PubSub Viewer for \"" +
                    o.name + "\"");

            // do pre-amble info
            $('#com-chilipeppr-elem-pubsubviewer-modal .pubsub-id').html(o.id);
            $('#com-chilipeppr-elem-pubsubviewer-modal .pubsub-url').html('<a href="' + o.url + '" target="_blank">' + o.url + '</a>');
            $('#com-chilipeppr-elem-pubsubviewer-modal .pubsub-fiddleurl').html('<a href="' + o.fiddleurl + '" target="_blank">' + o.fiddleurl + '</a>');
            $('#com-chilipeppr-elem-pubsubviewer-modal .pubsub-desc').html(o.desc);

            // do interface implementations
            if (o.implements && o.implements != null) {
                $('#com-chilipeppr-elem-pubsubviewer-modal .pubsub-interface').removeClass('hidden');
                $('#com-chilipeppr-elem-pubsubviewer-modal #com-chilipeppr-elem-pubsubviewer-interface > tbody > tr').remove();
                if (Object.keys(o.implements).length > 0) {
                    var keys = Object.keys(o.implements);
                    $.each(keys, function(i, key) {
                        $('#com-chilipeppr-elem-pubsubviewer-modal #com-chilipeppr-elem-pubsubviewer-interface > tbody').append('<tr><td>' + key + '</td><td>' + o.implements[key] + '</td></tr>');
                    });
                }
            }
            else {
                // hide the interface section
                $('#com-chilipeppr-elem-pubsubviewer-modal .pubsub-interface').addClass('hidden');
            }

            // do publish
            this.appendKeyVal(o.publish, "#com-chilipeppr-elem-pubsubviewer-pub");
            this.appendKeyVal(o.subscribe, "#com-chilipeppr-elem-pubsubviewer-sub");
            this.appendKeyVal(o.foreignPublish, "#com-chilipeppr-elem-pubsubviewer-foreignpub");
            this.appendKeyVal(o.foreignSubscribe, "#com-chilipeppr-elem-pubsubviewer-foreignsub");


        },
        appendKeyVal: function(data, id) {
            // remove rows from previous rendering
            $('#com-chilipeppr-elem-pubsubviewer-modal ' + id + ' > tbody > tr').remove();
            if (data !== null && typeof data === 'object' && Object.keys(data).length > 0) {

                var keys = Object.keys(data);
                $.each(keys, function(i, key) {
                    $('#com-chilipeppr-elem-pubsubviewer-modal ' + id + ' > tbody').append('<tr><td>' + key + '</td><td>' + data[key] + '</td></tr>');
                });
            }
            else {
                $('#com-chilipeppr-elem-pubsubviewer-modal ' + id + ' > tbody').append('<tr><td colspan="2">(No signals defined in this widget/element)</td></tr>');

            }
        },
        attachTo: function(dropdownMenuEl, cpobject, altTitle) {
            var el = dropdownMenuEl;
            var o = cpobject;
            // this method let's you pass in a dropdown-menu
            // and we'll attach a new section with a divider,
            // the id of the widget, a link to the pubsub vieweer,
            // a linke to the standalone widget, and a link to fork
            // the widget

            // see if there's any <li> items. if there are add a divider
            // <li class="divider"></li>
            if (el.children('li').length > 0) {
                // has li's, so add divider
                el.append('<li class="divider"></li>');
            }

            // allow user to override the name Widget, i.e. set it to Workspace or Element
            var title = "Widget";
            if (altTitle != null && altTitle.length > 0) title = altTitle;

            /*
            <li role="presentation" class="dropdown-header fork-name"></li>
            <li><a href="" target="_blank" class="standalone">View Widget Standalone</a></li>
             <li><a href="" target="_blank" class="fork">Fork Widget</a></li>
            */
            el.append('<li role="presentation" class="dropdown-header fork-name">' + o.id + '</li>');
            var pslink = $('<li><a href="javascript:" class="pubsublink">PubSub for this ' + title + '</a></li>').click(o, this.pubsubClick.bind(this));
            el.append(pslink);

            // determine if this chilipeppr object is the new style
            // with github and cloud9 or if it is the old style
            if ('githuburl' in o) {
                // new approach
                //el.append('<li role="presentation" class="dropdown-header fork-name">' + o.name + '</li>');
                var c9 = "";
                if (o.fiddleurl.match(/c9\.io/i)) c9 = " in Cloud9";
                el.append('<li><a href="' + o.url + '" target="_blank" class="fork">URL for chilipeppr.load()</a></li>');
                el.append('<li><a href="' + o.fiddleurl + '" target="_blank" class="fork">Edit ' + title + c9 + '</a></li>');
                el.append('<li><a href="' + o.githuburl + '" target="_blank" class="fork">Fork ' + title + ' in Github</a></li>');
                el.append('<li><a href="' + o.testurl + '" target="_blank" class="fork">View ' + title + ' Standalone for Testing</a></li>');

            }
            else {
                // Traditional approach for a JSFiddle widget with
                // "View Widget Standalone" and
                // "Fork Widget"
                el.append('<li><a href="' + o.url + '" target="_blank" class="standalone">View ' + title + ' Standalone</a></li>');
                var fork = $('<li><a href="' + o.fiddleurl + '" target="_blank" class="fork">Fork ' + title + '</a></li>').click(o, function() {
                    console.log("Got fork click. object:", o);
                    ga('send', 'event', 'button', 'click', 'fork' + title + '-' + o.id);
                });
                el.append(fork);
            }

            el.children('.panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 1000,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });
        }
    }
});