// Test this element. This code is auto-removed by the chilipeppr.load()
cprequire_test(["inline:com-chilipeppr-widget-configtinyg"], function (ls) {
    console.log("test running of " + ls.id);

    // Serial Port Selector
    // http://jsfiddle.net/chilipeppr/4RgrS/
    // NEW VERSION for SPJS v1.7 http://jsfiddle.net/chilipeppr/vetj5fvx/
    chilipeppr.load("com-chilipeppr-serialport-spselector",
        "http://fiddle.jshell.net/chilipeppr/vetj5fvx/show/light/",

    function () {
        cprequire(
        ["inline:com-chilipeppr-widget-serialport"],

        function (sp) {
            sp.setSingleSelectMode();
            sp.init(null, "tinyg", 115200);
            setTimeout(function () {
                ls.init()
            }, 2000);
        });
    });
} /*end_test*/ );

cpdefine("inline:com-chilipeppr-widget-configtinyg", ["chilipeppr_ready"], function () {
    return {
        id: "com-chilipeppr-widget-configtinyg",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        name: "Widget / Configure TinyG",
        desc: "This widget lets you configure your TinyG from a graphical user interface. It stores backup copies of your settings as well to help you never lose your settings even if you flash your firmware.",
        publish: {},
        subscribe: {},
        foreignPublish: {
            "/com-chilipeppr-widget-serialport/send": "We send to the serial port certain commands like the initial configuration commands for the TinyG to be in the correct mode and to get initial statuses like planner buffers and XYZ coords. We also send the Emergency Stop and Resume of ! and ~",
                "/com-chilipeppr-elem-flashmsg/flashmsg": "To flash messages"
        },
        foreignSubscribe: {
            "/com-chilipeppr-widget-serialport/recvline": "When we get a dataline from serialport, process it and fire off generic CNC controller signals to the /com-chilipeppr-interface-cnccontroller channel."
        },
        isInitted: false, // keep track of our one-time init
        logonInfo: null, // Holds current user's logon info
        origConfig: {}, // holds the unmodified config
		tinygv: null,	// holds the version of tinyg being configured
		tinygv8 : 1,	// specifies we're connected to a tinyg v8
		tinygv9 : 2,	// specifies we're connected to a tinyg v9
        init: function () {
            if (!this.isInitted) {
                console.log("Initializing config widget");
                if (!String.prototype.format) {
                    String.prototype.format = function () {
                        var args = arguments;
                        return this.replace(/{(\d+)}/g, function (match, number) {
                            return typeof args[number] != 'undefined' ? args[number] : match;
                        });
                    };
                }
                var me = this;
                this.cloneMotors();
                this.cloneAxis();
                this.btnSetup();
                this.forkSetup();
                this.isInitted = true;
            }
            this.show();
            console.log(this.name + " done loading.");
        },
        initValuesFromTinyG: function () {
            var that = this;
			this.sendCommandGetResponse({
				"hp":""
			})
			.done(function(result) {
				if (result.hp == 1) {
					that.tinygv = that.tinygv8;
				}
				else that.tinygv = that.tinygv9;
			});
			this.sendCommandGetResponse({
				"unit":""
			})
			.done(function (result) {
				that.updateUnits(result.unit);
			});
            this.sendCommandGetResponse({
                "x": ""
            })
                .done(function (result) {
                that.origConfig.x = result.x;
                that.processConfigReport(result.x, that.xAxis);
            });
            that.sendCommandGetResponse({
                "y": ""
            })
                .done(function (result) {
                that.origConfig.y = result.y;
                that.processConfigReport(result.y, that.yAxis);
            });
            that.sendCommandGetResponse({
                "z": ""
            })
                .done(function (result) {
                that.origConfig.z = result.z;
                that.processConfigReport(result.z, that.zAxis);
            });
            that.sendCommandGetResponse({
                "a": ""
            })
                .done(function (result) {
                that.origConfig.a = result.a;
                that.processConfigReport(result.a, that.aAxis);
            });
            that.sendCommandGetResponse({
                "1": ""
            })
                .done(function (result) {
                that.origConfig[1] = result[1];
                that.processConfigReport(result[1], that.motor1);
            });
            that.sendCommandGetResponse({
                "2": ""
            })
                .done(function (result) {
                that.origConfig[2] = result[2];
                that.processConfigReport(result[2], that.motor2);
            });
            that.sendCommandGetResponse({
                "3": ""
            })
                .done(function (result) {
                that.origConfig[3] = result[3];
                that.processConfigReport(result[3], that.motor3);
            });
            that.sendCommandGetResponse({
                "4": ""
            })
                .done(function (result) {
                that.origConfig[4] = result[4];
                that.processConfigReport(result[4], that.motor4);
            });
			if (this.tinygv == this.tinygv9) {
				this.showTab($('#configtinyg-Motors').find('a[href="#configtinyg-Motors-5"]'));
				this.showTab($('#configtinyg-Motors').find('a[href="#configtinyg-Motors-6"]'));
				this.showTab($('#configtinyg-Axis').find('a[href="#configtinyg-Axis-B"]'));
				that.sendCommandGetResponse({
					"b": ""
				})
					.done(function (result) {
					that.origConfig.b = result.b;
					that.processConfigReport(result.b, that.bAxis);
				});
				that.sendCommandGetResponse({
					"5": ""
				})
					.done(function (result) {
					that.origConfig[5] = result[5];
					that.processConfigReport(result[5], that.motor5);
				});
				that.sendCommandGetResponse({
					"6": ""
				})
					.done(function (result) {
					that.origConfig[6] = result[6];
					that.processConfigReport(result[6], that.motor6);
				});
			} else {
				this.hideTab($('#configtinyg-Motors').find('a[href="#configtinyg-Motors-5"]'));
				this.hideTab($('#configtinyg-Motors').find('a[href="#configtinyg-Motors-6"]'));
				this.hideTab($('#configtinyg-Axis').find('a[href="#configtinyg-Axis-B"]'));
			}
        },
		updateUnits: function(units) {
			if (units == 1) {
				$("#com-chilipeppr-widget-configtinyg .configtg-units").text("mm");
			} else {
				$("#com-chilipeppr-widget-configtinyg .configtg-units").text("inch");
			}
		},
		hideTab: function(tab) {
			tab.parent('li').addClass("hidden");
		},
		showTab: function(tab) {
			tab.parent('li').removeClass("hidden");
		},
        show: function () {
            $("#com-chilipeppr-widget-configtinyg").modal('show');
            this.initValuesFromTinyG();
        },
        hide: function () {
            $("#com-chilipeppr-widget-configtinyg").modal('hide');
        },
        cloneMotors: function () {
            this.motor1 = $('#com-chilipeppr-widget-configtinyg #configtinyg-Motors-1 .form-horizontal');
            this.motor2 = this.motor1.clone();
            this.motor3 = this.motor1.clone();
            this.motor4 = this.motor1.clone();
            this.motor1.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-1"]').remove();
            this.motor2.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-2"]').remove();
            this.motor3.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-3"]').remove();
            this.motor4.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-4"]').remove();
            $('#com-chilipeppr-widget-configtinyg #configtinyg-Motors-2').append(this.motor2);
            $('#com-chilipeppr-widget-configtinyg #configtinyg-Motors-3').append(this.motor3);
            $('#com-chilipeppr-widget-configtinyg #configtinyg-Motors-4').append(this.motor4);
			if (this.tinygv == this.tinygv9) {
				this.motor5 = this.motor1.clone();
				this.motor6 = this.motor1.clone();
				this.motor5.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-5"]').remove();
				this.motor6.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-6"]').remove();
				$('#com-chilipeppr-widget-configtinyg #configtinyg-Motors-5').append(this.motor5);
				$('#com-chilipeppr-widget-configtinyg #configtinyg-Motors-6').append(this.motor6);
			} else {
				this.motor1.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-5"]').remove();
				this.motor1.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-6"]').remove();
				this.motor2.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-5"]').remove();
				this.motor2.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-6"]').remove();
				this.motor3.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-5"]').remove();
				this.motor3.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-6"]').remove();
				this.motor4.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-5"]').remove();
				this.motor4.find('#configtinyg-Motors-CopyTo option[value="configtinyg-Motors-6"]').remove();
			}
        },
        cloneAxis: function () {
            this.xAxis = $('#com-chilipeppr-widget-configtinyg #configtinyg-Axis-X .form-horizontal');
            this.yAxis = this.xAxis.clone();
            this.zAxis = this.xAxis.clone();
            this.aAxis = this.xAxis.clone();
            this.xAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-X"]').remove();
            this.yAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-Y"]').remove();
            this.zAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-Z"]').remove();
            this.aAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-A"]').remove();
            this.xAxis.find('#configtinygRadiusRow').remove();
            this.yAxis.find('#configtinygRadiusRow').remove();
            this.zAxis.find('#configtinygRadiusRow').remove();
            $('#com-chilipeppr-widget-configtinyg #configtinyg-Axis-Y').append(this.yAxis);
            $('#com-chilipeppr-widget-configtinyg #configtinyg-Axis-Z').append(this.zAxis);
            $('#com-chilipeppr-widget-configtinyg #configtinyg-Axis-A').append(this.aAxis);
			if (this.tinygv == this.tinygv9) {
				this.bAxis = this.xAxis.clone();
				this.bAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-B"]').remove();
				$('#com-chilipeppr-widget-configtinyg #configtinyg-Axis-B').append(this.bAxis);
			} else {
				this.xAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-B"]').remove();
				this.yAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-B"]').remove();
				this.zAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-B"]').remove();
				this.aAxis.find('#configtinyg-Axis-CopyTo option[value="configtinyg-Axis-B"]').remove();
			}
        },
        btnSetup: function () {
            $('#com-chilipeppr-widget-configtinyg .tinyg-fileConfig').click(this.fileConfig.bind(this));
            $('#com-chilipeppr-widget-configtinyg .tinyg-saveConfig').click(this.saveConfig.bind(this));
            $('#com-chilipeppr-widget-configtinyg .tinyg-revertConfig').click(this.revertConfig.bind(this));
            $('#com-chilipeppr-widget-configtinyg .tinyg-closeConfig').click(this.hide.bind(this));
            $('#com-chilipeppr-widget-configtinyg .tinyg-restoreConfig').click(this.restoreConfig.bind(this));
            $('#com-chilipeppr-widget-configtinyg .configtinyg-Axis-CopyTo').click(this.copyToAxis.bind(this));
            $('#com-chilipeppr-widget-configtinyg .configtinyg-Motors-CopyTo').click(this.copyToMotors.bind(this));
            $('#com-chilipeppr-widget-configtinyg .btn-toolbar .btn').popover({
                delay: 500,
                animation: true,
                placement: "auto",
                trigger: "hover",
                container: 'body'
            });
        },
        fileWidget: null,
        fileConfig: function () {
            // See if our widget is dynamically loaded or not
            if (this.fileWidget != null) {
                // We must have loaded it already
                this.fileWidget.show();
            } else {
                var that = this;
                chilipeppr.load("#com-chilipeppr-widget-tinyg-holderAreaForFileWidget", 'http://fiddle.jshell.net/cmcgrath5035/f7kk0che/show/light/', function () {
                    require(["inline:com-chilipeppr-widget-backuprestoretinyg"], function (fileWidget) {
                        // We get here after the widget is loaded and instantiated
                        fileWidget.init();
                        // store a reference
                        that.fileWidget = fileWidget;
                    });
                });
            }
        },
        copyToMotors: function (a) {
            var formID = $(a.currentTarget).parents('.form-horizontal')[0].parentElement.id;
            var source = $('#com-chilipeppr-widget-configtinyg #' + formID + ' .form-horizontal');
            var row = $(a.currentTarget).parents('.row');
            var select = $(row).find('option:selected').val();
            if (select == 'All') {
                if (formID != 'configtinyg-Motor-1') this.copyValues(source, this.motor1);
                if (formID != 'configtinyg-Motor-2') this.copyValues(source, this.motor2);
                if (formID != 'configtinyg-Motor-3') this.copyValues(source, this.motor3);
                if (formID != 'configtinyg-Motor-4') this.copyValues(source, this.motor4);
				if (this.tinygv == this.tinygv9) {
					if (formID != 'configtinyg-Motor-5') this.copyValues(source, this.motor5);
					if (formID != 'configtinyg-Motor-6') this.copyValues(source, this.motor6);
				}
            } else {
                var selected = $('#com-chilipeppr-widget-configtinyg #' + select + ' .form-horizontal');
                this.copyValues(source, selected);
            }
        },
        copyToAxis: function (a) {
            var formID = $(a.currentTarget).parents('.form-horizontal')[0].parentElement.id;
            var source = $('#com-chilipeppr-widget-configtinyg #' + formID + ' .form-horizontal');
            var row = $(a.currentTarget).parents('.row');
            var select = $(row).find('option:selected').val();
            if (select == 'All') {
                if (formID != 'configtinyg-Axis-X') this.copyValues(source, this.xAxis);
                if (formID != 'configtinyg-Axis-Y') this.copyValues(source, this.yAxis);
                if (formID != 'configtinyg-Axis-Z') this.copyValues(source, this.zAxis);
                if (formID != 'configtinyg-Axis-A') this.copyValues(source, this.aAxis);
				if (this.tinygv == this.tinygv9) {
					if (formID != 'configtinyg-Axis-B') this.copyValues(source, this.bAxis);
				}
            } else {
                var selected = $('#com-chilipeppr-widget-configtinyg #' + select + ' .form-horizontal');
                this.copyValues(source, selected);
            }
        },
        copyValues: function (source, target) {
            var sourceControls = $(source).find('[id]');
            $.each(sourceControls, function (key, control) {
                var targetControl = target.find("#" + control.id)[0];
                if (null != targetControl) {
                    targetControl.value = control.value;
                }
            });
        },
        saveConfig: function () {
            var that = this;
            this.login()
                .done(function (credentials) {
                that.logonInfo = credentials;
                that.backupAndSave();
            })
                .fail(function () {
                that.warnAndSave();
            })
        },
        revertConfig: function () {
            this.processConfigReport(this.origConfig.x, this.xAxis);
            this.processConfigReport(this.origConfig.y, this.yAxis);
            this.processConfigReport(this.origConfig.z, this.zAxis);
            this.processConfigReport(this.origConfig.a, this.aAxis);
            this.processConfigReport(this.origConfig[1], this.motor1);
            this.processConfigReport(this.origConfig[2], this.motor2);
            this.processConfigReport(this.origConfig[3], this.motor3);
            this.processConfigReport(this.origConfig[4], this.motor4);
			if (this.tinygv == this.tinygv9) {
				this.processConfigReport(this.origConfig.b, this.bAxis);
				this.processConfigReport(this.origConfig[5], this.motor5);
				this.processConfigReport(this.origConfig[6], this.motor6);
			}
            chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Configure TinyG", "Settings reverted", 60000);
        },
        backupAndSave: function () {
            var that = this;
            this.backupCurrentData()
                .done(function () {
                that.doSave();
            })
                .fail(function () {
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Configure TinyG", "AutoBackup failed");
                that.warnAndSave();
            })
        },
        getBackupKey: function () {
            var d = new Date();
            return "AutoBackup-{0}-{1}.backup".format(this.logonInfo.Email, d.toISOString());
        },
        backupCurrentData: function () {
            var defer = new $.Deferred();
            var that = this;
            var key = this.getBackupKey();
            var data = JSON.stringify(this.origConfig);
            var url = "http://www.chilipeppr.com/dataput?key={0}&val={1}&callback=?".format(key, data);
            var jqxhr = $.getJSON(url)
                .done(function (data) {
                if (data.Name != undefined && data.Name != null) {
                    console.log("Data backed up");
                    defer.resolve(data.CurrentUser);
                } else {
                    console.log("backup failed");
                    defer.reject();
                }
            })
                .fail(function () {
                defer.reject();
            })
            return defer.promise();
        },
        warnAndSave: function () {
            if (!confirm("Please be SURE that all data in all tabs is correct. Pressing OK *WILL* irretrievably replace all data to the TinyG!")) {
                return;
            }
            this.doSave();
        },
        doSave: function () {
            var that = this;
			var dataToSend = [["x", this.xAxis], ["y", this.yAxis], ["z", this.zAxis], ["a", this.aAxis], ["1", this.motor1], ["2", this.motor2], ["3", this.motor3], ["4", this.motor4]];
			var v9data = [["b", this.bAxis], ["4", this.motor4], ["5", this.motor5], ["6", this.motor6]];
			var index = 0;

			if (this.tinygv == this.tinygv9) {
				dataToSend.concat(v9data);
			}
			this.sendDataElement(dataToSend, index);
		},
		sendDataElement: function(dataToSend, index) {
			if (index >= dataToSend.length) {
				chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Configure TinyG", "TinyG Configuration Updated.");
				this.hide();
				return;
			}
			var that = this;
			var item = dataToSend[index];
			that.sendCommandGetResponse(that.getConfig(item[1], item[0]))
				.done(function (result) {
					that.sendDataElement(dataToSend, index + 1);
				})
				.fail(function () {
					chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Configure TinyG", "Motor/Axis " + that.item[1] + " failed to save.");
				});
        },
        sendCommandGetResponse: function (cmd, timeout) {
            var defer = new $.Deferred();
            var cmdName = Object.keys(cmd)[0];
            var timeoutval = 5000;
            if (typeof timeout !== "unspecified" && timeout != null) timeoutval = timeout;
            setTimeout(function () {
                chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/recvline");
                defer.reject("timeout");
            }, timeoutval);
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/recvline", this, function (msg) {
                //verify response matches cmd
                if (!(msg.dataline)) return;
                var result = msg.dataline;
                if (result.match(/^{/)) {
                    // it is json
                    d = $.parseJSON(result);
                    if (d.r && d.r.hasOwnProperty(cmdName)) {
                        chilipeppr.unsubscribe("/com-chilipeppr-widget-serialport/recvline");
                        defer.resolve(d.r);
                    }
                }
            });
            chilipeppr.publish("/com-chilipeppr-widget-serialport/send", JSON.stringify(cmd).concat("\n"));
            return defer.promise();
        },
        login: function () {
            var defer = new $.Deferred();
            var that = this;
            var jqxhr = $.getJSON("http://www.chilipeppr.com/datalogin?callback=?")
                .done(function (data) {
                console.log(data);
                if (data.CurrentUser != undefined && data.CurrentUser != null) {
                    console.log("user logged in ", data.CurrentUser);
                    defer.resolve(data.CurrentUser);
                } else {
                    console.log("user NOT logged in");
                    defer.reject();
                }
            })
                .fail(function () {
                chilipeppr.publish("/com-chilipeppr-elem-flashmsg/flashmsg", "Configure TinyG", "Login failed");
                defer.reject();
            })
            return defer.promise();
        },
        getAllConfig: function () {
            var config = {};
            config.x = this.getConfig(this.xAxis, "x").x;
            config.y = this.getConfig(this.yAxis, "y").y;
            config.z = this.getConfig(this.zAxis, "z").z;
            config.a = this.getConfig(this.aAxis, "a").a;
            config[1] = this.getConfig(this.motor1, "1")[1];
            config[2] = this.getConfig(this.motor2, "2")[2];
            config[3] = this.getConfig(this.motor3, "3")[3];
            config[4] = this.getConfig(this.motor4, "4")[4];
			if (this.tinygv == this.tinygv9) {
				config.b = this.getConfig(this.bAxis, "b").b;
				config[5] = this.getConfig(this.motor5, "5")[5];
				config[6] = this.getConfig(this.motor5, "6")[6];
			}
            return config;
        },
        getConfig: function (source, propName) {
            var config = {};
            var configpart = {};
            var sourceControls = $(source).find('[id]');
            $.each(sourceControls, function (key, control) {
                if (control.id != 'configtinyg-Motors-CopyTo' && control.id != 'configtinyg-Axis-CopyTo' && control.id != 'configtinygRadiusRow') {
                    configpart[control.id] = Number(control.value);
                }
            });
            config[propName] = configpart;
            return config;
        },
        restoreConfig: function () {
            alert('This feature is not yet implemented, but you can get your backed-up data by visiting href="http://www.chilipeppr.com/datagetall"');
        },
        processConfigReport: function (report, panel) {
            for (prop in report) {
                var idName = "#" + prop;
                var v = panel.find(idName);
                if (v != null) v.val(report[prop]);
            }
        },
        forkSetup: function () {
            var topCssSelector = '#com-chilipeppr-widget-configtinyg';

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
                    pubsubviewer.attachTo($('#com-chilipeppr-widget-configtinyg .modal-header .dropdown-menu'), that);
                });
            });

        },
    }
});