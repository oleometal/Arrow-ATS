# com-chilipeppr-widget-tinyg
The TinyG widget subscribes and publishes to the SPJS widget (com-chilipeppr-widget-serialport) and intermediates the serial data to and from the TinyG. This widget parses the incoming data to normalize it for sending off axes reports, onExecuted signals, etc. This widget also allows monitoring of the status of the TinyG as well as configuring it.

![alt text](screenshot.png "Screenshot")

## ChiliPeppr Widget / Tinyg v2.0

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-widget-tinyg |
| Name                  | Widget / Tinyg v2.0 |
| Description           | The TinyG widget subscribes and publishes to the SPJS widget (com-chilipeppr-widget-serialport) and intermediates the serial data to and from the TinyG. This widget parses the incoming data to normalize it for sending off axes reports, onExecuted signals, etc. This widget also allows monitoring of the status of the TinyG as well as configuring it. |
| chilipeppr.load() URL | http://raw.githubusercontent.com/chilipeppr/widget-tinyg/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/chilipeppr/widget-tinyg |
| Github URL            | http://github.com/chilipeppr/widget-tinyg |
| Test URL              | https://preview.c9users.io/chilipeppr/widget-tinyg/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget 
inside a workspace or from another widget. The key is that you need to load 
your widget inlined into a div so the DOM can parse your HTML, CSS, and 
Javascript. Then you use cprequire() to find your widget's Javascript and get 
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivWidgetTinyg"><' + '/div>');

chilipeppr.load(
  "#myDivWidgetTinyg",
  "http://raw.githubusercontent.com/chilipeppr/widget-tinyg/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivWidgetTinyg
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-widget-tinyg"], // the id you gave your widget
      function(myObjWidgetTinyg) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Widget / Tinyg v2.0 just got loaded.", myObjWidgetTinyg);
        myObjWidgetTinyg.init();
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
      <tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/feedhold</td><td>Feedhold (Emergency Stop). This signal is published when user hits the Feedhold button for an emergency stop of the TinyG. Other widgets should see this and stop sending all commands such that even when the plannerresume signal is received when the user clears the queue or cycle starts again, they have to manually start sending code again. So, for example, a Gcode sender widget should place a pause on the sending but allow user to unpause.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/plannerpause</td><td>This widget will publish this signal when it determines that the planner buffer is too full on the TinyG and all other elements/widgets need to stop sending data. You will be sent a /plannerresume when this widget determines you can start sending again. The TinyG has a buffer of 28 slots for data. You want to fill it up with around 12 commands to give the planner enough data to work on for optimizing velocities of movement. However, you can't overfill the TinyG or it will go nuts with buffer overflows. This signal helps you fire off your data and not worry about it, but simply pause the sending of the data when you see this signal. This signal does rely on the TinyG being in {qv:2} mode which means it will auto-send us a report on the planner every time it changes. This widget watches for those changes to generate the signal. The default setting is when we hit 12 remaining planner buffer slots we will publish this signal.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/plannerresume</td><td>This widget will send this signal when it is ok to send data to the TinyG again. This widget watches the {qr:[val]} status report from the TinyG to determine when the planner buffer has enough room in it to send more data. You may not always get a 1 to 1 /plannerresume for every /plannerpause sent because we will keep sending /plannerpause signals if we're below threshold, but once back above threshold we'll only send you one /plannerresume. The default setting is to send this signal when we get back to 16 available planner buffer slots.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/axes</td><td>This widget will normalize the TinyG status report of axis coordinates to send off to other widgets like the XYZ widget. The axes publish payload contains {x:float, y:float, z:float, a:float} If a different CNC controller is implemented, it should normalize the coordinate status reports like this model. The goal of this is to abstract away the specific controller implementation from generic CNC widgets.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/units</td><td>This widget will normalize the TinyG units to the interface object of units {units: "mm"} or {units: "inch"}. This signal will be published on load or when this widget detects a change in units so other widgets like the XYZ widget can display the units for the coordinates it is displaying.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/coords</td><td>This widget will broadcast out any change in the coordinate system. The value is {coord:"g55", coordNum: 55} or for G92 {coord:"g92", coordNum: 92} or for machine {coord:"g53", coordNum: 53}</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/firmware</td><td>This widget will broadcast out a firmware build/version number when it sees it come in from the CNC controller to help other widgets pivot off of that data. The firmware build number is requested when the /onconnect is seen. Your widget must be loaded to see this signal as there is no request/recv signal implemented (please ask if you need one).</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/status</td><td>Status. This signal is published when machine change the status.</td></tr>    
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
      <tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/jogdone</td><td>We subscribe to a jogdone event so that we can fire off an exclamation point (!) to the TinyG to force it to drop all planner buffer items to stop the jog immediately.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/energizeMotors</td><td>Send in this signal to fully energize motors so you can do things like a tool change without moving your axis accidentally. This widget will send the correct command to the serial port for your CNC controller.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/unEnergizeMotors</td><td>Send in this signal to turn off the full power to the motors. Puts motors back into your configured motor settings. This widget will send the correct command to the serial port for your CNC controller.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-interface-cnccontroller/requestCoords</td><td>Send in this signal to request a callback signal of "/com-chilipeppr-interface-cnccontroller/coords" to be sent back. You wil be sent whatever value this widget currently has stored as the last coordinates.</td></tr>    
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
      <tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-widget-serialport/send</td><td>We send to the serial port certain commands like the initial configuration commands for the TinyG to be in the correct mode and to get initial statuses like planner buffers and XYZ coords. We also send the Emergency Stop and Resume of ! and ~</td></tr>    
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
      <tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-widget-serialport/ws/onconnect</td><td>When we see a new connect, query for status.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-tinyg/com-chilipeppr-widget-serialport/recvline</td><td>When we get a dataline from serialport, process it and fire off generic CNC controller signals to the /com-chilipeppr-interface-cnccontroller channel.</td></tr>    
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
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-widget-tinyg"</td></tr><tr valign="top"><td>implements</td><td>object</td><td></td></tr><tr valign="top"><td>url</td><td>string</td><td>"http://raw.githubusercontent.com/chilipeppr/widget-tinyg/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"http://ide.c9.io/chilipeppr/widget-tinyg"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"http://github.com/chilipeppr/widget-tinyg"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://widget-tinyg-chilipeppr.c9users.io/widget.html"</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Widget / Tinyg v2.0"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"The TinyG widget subscribes and publishes to the SPJS widget (com-chilipeppr-widget-serialport) and intermediates the serial data to and from the TinyG. This widget parses the incoming data to normalize it for sending off axes reports, onExecuted signals, etc. This widget also allows monitoring of the status of the TinyG as well as configuring it."</td></tr><tr valign="top"><td>publish</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>subscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>foreignPublish</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>foreignSubscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>plannerPauseAt</td><td>number</td><td></td></tr><tr valign="top"><td>plannerResumeAt</td><td>number</td><td></td></tr><tr valign="top"><td>init</td><td>function</td><td>function () </td></tr><tr valign="top"><td>initsInFlight</td><td>boolean</td><td></td></tr><tr valign="top"><td>initIdCtr</td><td>number</td><td></td></tr><tr valign="top"><td>initController</td><td>function</td><td>function (reinit) </td></tr><tr valign="top"><td>comPort</td><td>object</td><td></td></tr><tr valign="top"><td>lastFroVal</td><td>object</td><td></td></tr><tr valign="top"><td>setupFro</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onFro1x</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>onFroMousemove</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>onFroChange</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>updateFro</td><td>function</td><td>function (val) </td></tr><tr valign="top"><td>configtinyg</td><td>object</td><td></td></tr><tr valign="top"><td>setupConfig</td><td>function</td><td>function () </td></tr><tr valign="top"><td>popupConfigDialog</td><td>function</td><td>function () </td></tr><tr valign="top"><td>warnBeforeLeavingPage</td><td>function</td><td>function () </td></tr><tr valign="top"><td>options</td><td>object</td><td></td></tr><tr valign="top"><td>setupUiFromCookie</td><td>function</td><td>function () </td></tr><tr valign="top"><td>saveOptionsCookie</td><td>function</td><td>function () </td></tr><tr valign="top"><td>showBody</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>hideBody</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>resetTinyG</td><td>function</td><td>function () </td></tr><tr valign="top"><td>btnSetup</td><td>function</td><td>function () </td></tr><tr valign="top"><td>energizeTimer</td><td>object</td><td></td></tr><tr valign="top"><td>energizeTimeoutTimer</td><td>object</td><td></td></tr><tr valign="top"><td>energizeMotors</td><td>function</td><td>function () </td></tr><tr valign="top"><td>unEnergizeMotors</td><td>function</td><td>function () </td></tr><tr valign="top"><td>energizeMotorTimeout</td><td>function</td><td>function (that) </td></tr><tr valign="top"><td>getUrlParameter</td><td>function</td><td>function (sParam) </td></tr><tr valign="top"><td>urlParam</td><td>function</td><td>function (name) </td></tr><tr valign="top"><td>onRecvCmd</td><td>function</td><td>function (recvline) </td></tr><tr valign="top"><td>mt</td><td>object</td><td></td></tr><tr valign="top"><td>processMotorTimeout</td><td>function</td><td>function (mt) </td></tr><tr valign="top"><td>hp</td><td>object</td><td></td></tr><tr valign="top"><td>processHardwarePlatform</td><td>function</td><td>function (hp) </td></tr><tr valign="top"><td>fbver</td><td>object</td><td></td></tr><tr valign="top"><td>processFirmwareBuild</td><td>function</td><td>function (fb) </td></tr><tr valign="top"><td>lastUnits</td><td>object</td><td></td></tr><tr valign="top"><td>isShowingStats</td><td>boolean</td><td></td></tr><tr valign="top"><td>lastCoords</td><td>object</td><td></td></tr><tr valign="top"><td>coor</td><td>object</td><td></td></tr><tr valign="top"><td>publishAxisStatus</td><td>function</td><td>function (sr) </td></tr><tr valign="top"><td>statEls</td><td>object</td><td></td></tr><tr valign="top"><td>processStats</td><td>function</td><td>function (sr) </td></tr><tr valign="top"><td>statGetDomElements</td><td>function</td><td>function () </td></tr><tr valign="top"><td>plannerLastEvent</td><td>string</td><td>"resume"</td></tr><tr valign="top"><td>processPlannerStatus</td><td>function</td><td>function (qr) </td></tr><tr valign="top"><td>publishPlannerPause</td><td>function</td><td>function () </td></tr><tr valign="top"><td>publishPlannerResume</td><td>function</td><td>function () </td></tr><tr valign="top"><td>progBar</td><td>object</td><td></td></tr><tr valign="top"><td>progBarLbl</td><td>object</td><td></td></tr><tr valign="top"><td>plannerMin</td><td>object</td><td></td></tr><tr valign="top"><td>plannerMax</td><td>object</td><td></td></tr><tr valign="top"><td>updatePlannerProgBar</td><td>function</td><td>function (qr) </td></tr><tr valign="top"><td>updatePlannerMinMax</td><td>function</td><td>function () </td></tr><tr valign="top"><td>pktModeProgBar</td><td>object</td><td></td></tr><tr valign="top"><td>pktModeProgBarLbl</td><td>object</td><td></td></tr><tr valign="top"><td>pktModeMin</td><td>object</td><td></td></tr><tr valign="top"><td>pktModeMax</td><td>object</td><td></td></tr><tr valign="top"><td>pktModeMinMax</td><td>object</td><td></td></tr><tr valign="top"><td>modeFormat</td><td>object</td><td></td></tr><tr valign="top"><td>updatePktModePProgBar</td><td>function</td><td>function (qr) </td></tr><tr valign="top"><td>updateCharModePProgBar</td><td>function</td><td>function (qr) </td></tr><tr valign="top"><td>updatePktModeMinMax</td><td>function</td><td>function () </td></tr><tr valign="top"><td>forkSetup</td><td>function</td><td>function () </td></tr>
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

