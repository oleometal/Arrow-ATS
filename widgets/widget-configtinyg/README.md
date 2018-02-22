# com-chilipeppr-widget-configtinyg
This widget lets you configure your TinyG from a graphical user interface. It stores backup copies of your settings as well to help you never lose your settings even if you flash your firmware.



## ChiliPeppr Widget / Configure TinyG

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-widget-configtinyg |
| Name                  | Widget / Configure TinyG |
| Description           | This widget lets you configure your TinyG from a graphical user interface. It stores backup copies of your settings as well to help you never lose your settings even if you flash your firmware. |
| chilipeppr.load() URL | http://raw.githubusercontent.com/raykholo/widget-configtinyg/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/raykholo/widget-configtinyg |
| Github URL            | http://github.com/raykholo/widget-configtinyg |
| Test URL              | https://preview.c9users.io/raykholo/widget-configtinyg/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget 
inside a workspace or from another widget. The key is that you need to load 
your widget inlined into a div so the DOM can parse your HTML, CSS, and 
Javascript. Then you use cprequire() to find your widget's Javascript and get 
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivWidgetConfigtinyg"><' + '/div>');

chilipeppr.load(
  "#myDivWidgetConfigtinyg",
  "http://raw.githubusercontent.com/raykholo/widget-configtinyg/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivWidgetConfigtinyg
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-widget-configtinyg"], // the id you gave your widget
      function(myObjWidgetConfigtinyg) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Widget / Configure TinyG just got loaded.", myObjWidgetConfigtinyg);
        myObjWidgetConfigtinyg.init();
      }
    );
  }
);

```

## Publish

This widget/element publishes the following signals. These signals are owned by this widget/element and are published to all objects inside the ChiliPeppr environment that listen to them via the 
chilipeppr.subscribe(signal, callback) method. 
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-pub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Subscribe

This widget/element subscribes to the following signals. These signals are owned by this widget/element. Other objects inside the ChiliPeppr environment can publish to these signals via the chilipeppr.publish(signal, data) method. 
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-sub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
      </tbody>
  </table>

## Foreign Publish

This widget/element publishes to the following signals that are owned by other objects. 
To better understand how ChiliPeppr's subscribe() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignpub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>/com-chilipeppr-widget-configtinyg/com-chilipeppr-widget-serialport/send</td><td>We send to the serial port certain commands like the initial configuration commands for the TinyG to be in the correct mode and to get initial statuses like planner buffers and XYZ coords. We also send the Emergency Stop and Resume of ! and ~</td></tr><tr valign="top"><td>/com-chilipeppr-widget-configtinyg/com-chilipeppr-elem-flashmsg/flashmsg</td><td>To flash messages</td></tr>    
      </tbody>
  </table>

## Foreign Subscribe

This widget/element publishes to the following signals that are owned by other objects.
To better understand how ChiliPeppr's publish() method works see amplify.js's documentation at http://amplifyjs.com/api/pubsub/

  <table id="com-chilipeppr-elem-pubsubviewer-foreignsub" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Signal</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>/com-chilipeppr-widget-configtinyg/com-chilipeppr-widget-serialport/recvline</td><td>When we get a dataline from serialport, process it and fire off generic CNC controller signals to the /com-chilipeppr-interface-cnccontroller channel.</td></tr>    
      </tbody>
  </table>

## Methods / Properties

The table below shows, in order, the methods and properties inside the widget/element.

  <table id="com-chilipeppr-elem-methodsprops" class="table table-bordered table-striped">
      <thead>
          <tr>
              <th style="">Method / Property</th>
              <th>Type</th>
              <th style="">Description</th>
          </tr>
      </thead>
      <tbody>
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-widget-configtinyg"</td></tr><tr valign="top"><td>url</td><td>string</td><td>"http://raw.githubusercontent.com/raykholo/widget-configtinyg/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"http://ide.c9.io/raykholo/widget-configtinyg"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"http://github.com/raykholo/widget-configtinyg"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://widget-configtinyg-raykholo.c9users.io/widget.html"</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Widget / Configure TinyG"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"This widget lets you configure your TinyG from a graphical user interface. It stores backup copies of your settings as well to help you never lose your settings even if you flash your firmware."</td></tr><tr valign="top"><td>publish</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>subscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>foreignPublish</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>foreignSubscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>isInitted</td><td>boolean</td><td></td></tr><tr valign="top"><td>logonInfo</td><td>object</td><td></td></tr><tr valign="top"><td>origConfig</td><td>object</td><td></td></tr><tr valign="top"><td>tinygv</td><td>object</td><td></td></tr><tr valign="top"><td>tinygv8</td><td>number</td><td></td></tr><tr valign="top"><td>tinygv9</td><td>number</td><td></td></tr><tr valign="top"><td>init</td><td>function</td><td>function () </td></tr><tr valign="top"><td>initValuesFromTinyG</td><td>function</td><td>function () </td></tr><tr valign="top"><td>updateUnits</td><td>function</td><td>function (units) </td></tr><tr valign="top"><td>hideTab</td><td>function</td><td>function (tab) </td></tr><tr valign="top"><td>showTab</td><td>function</td><td>function (tab) </td></tr><tr valign="top"><td>show</td><td>function</td><td>function () </td></tr><tr valign="top"><td>hide</td><td>function</td><td>function () </td></tr><tr valign="top"><td>cloneMotors</td><td>function</td><td>function () </td></tr><tr valign="top"><td>cloneAxis</td><td>function</td><td>function () </td></tr><tr valign="top"><td>btnSetup</td><td>function</td><td>function () </td></tr><tr valign="top"><td>fileWidget</td><td>object</td><td></td></tr><tr valign="top"><td>fileConfig</td><td>function</td><td>function () </td></tr><tr valign="top"><td>copyToMotors</td><td>function</td><td>function (a) </td></tr><tr valign="top"><td>copyToAxis</td><td>function</td><td>function (a) </td></tr><tr valign="top"><td>copyValues</td><td>function</td><td>function (source, target) </td></tr><tr valign="top"><td>saveConfig</td><td>function</td><td>function () </td></tr><tr valign="top"><td>revertConfig</td><td>function</td><td>function () </td></tr><tr valign="top"><td>backupAndSave</td><td>function</td><td>function () </td></tr><tr valign="top"><td>getBackupKey</td><td>function</td><td>function () </td></tr><tr valign="top"><td>backupCurrentData</td><td>function</td><td>function () </td></tr><tr valign="top"><td>warnAndSave</td><td>function</td><td>function () </td></tr><tr valign="top"><td>doSave</td><td>function</td><td>function () </td></tr><tr valign="top"><td>sendDataElement</td><td>function</td><td>function (dataToSend, index) </td></tr><tr valign="top"><td>sendCommandGetResponse</td><td>function</td><td>function (cmd, timeout) </td></tr><tr valign="top"><td>login</td><td>function</td><td>function () </td></tr><tr valign="top"><td>getAllConfig</td><td>function</td><td>function () </td></tr><tr valign="top"><td>getConfig</td><td>function</td><td>function (source, propName) </td></tr><tr valign="top"><td>restoreConfig</td><td>function</td><td>function () </td></tr><tr valign="top"><td>processConfigReport</td><td>function</td><td>function (report, panel) </td></tr><tr valign="top"><td>forkSetup</td><td>function</td><td>function () </td></tr>
      </tbody>
  </table>


## About ChiliPeppr

[ChiliPeppr](http://chilipeppr.com) is a hardware fiddle, meaning it is a 
website that lets you easily
create a workspace to fiddle with your hardware from software. ChiliPeppr provides
a [Serial Port JSON Server](https://github.com/johnlauer/serial-port-json-server) 
that you run locally on your computer, or remotely on another computer, to connect to 
the serial port of your hardware like an Arduino or other microcontroller.

You then create a workspace at ChiliPeppr.com that connects to your hardware 
by starting from scratch or forking somebody else's
workspace that is close to what you are after. Then you write widgets in
Javascript that interact with your hardware by forking the base template 
widget or forking another widget that
is similar to what you are trying to build.

ChiliPeppr is massively capable such that the workspaces for 
[TinyG](http://chilipeppr.com/tinyg) and [Grbl](http://chilipeppr.com/grbl) CNC 
controllers have become full-fledged CNC machine management software used by
tens of thousands.

ChiliPeppr has inspired many people in the hardware/software world to use the
browser and Javascript as the foundation for interacting with hardware. The
Arduino team in Italy caught wind of ChiliPeppr and now
ChiliPeppr's Serial Port JSON Server is the basis for the 
[Arduino's new web IDE](https://create.arduino.cc/). If the Arduino team is excited about building on top
of ChiliPeppr, what
will you build on top of it?

