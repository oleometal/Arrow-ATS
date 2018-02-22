# com-chilipeppr-widget-recvtext
Let people send inbound texts to trigger actions inside ChiliPeppr.

![alt text](screenshot.png "Screenshot")

## ChiliPeppr Widget / Zipwhip Receive Text

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-widget-recvtext |
| Name                  | Widget / Zipwhip Receive Text |
| Description           | Let people send inbound texts to trigger actions inside ChiliPeppr. |
| chilipeppr.load() URL | http://raw.githubusercontent.com/chilipeppr/widget-recvtext/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/chilipeppr/widget-recvtext |
| Github URL            | http://github.com/chilipeppr/widget-recvtext |
| Test URL              | https://preview.c9users.io/chilipeppr/widget-recvtext/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget 
inside a workspace or from another widget. The key is that you need to load 
your widget inlined into a div so the DOM can parse your HTML, CSS, and 
Javascript. Then you use cprequire() to find your widget's Javascript and get 
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivWidgetRecvtext"><' + '/div>');

chilipeppr.load(
  "#myDivWidgetRecvtext",
  "http://raw.githubusercontent.com/chilipeppr/widget-recvtext/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivWidgetRecvtext
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-widget-recvtext"], // the id you gave your widget
      function(myObjWidgetRecvtext) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Widget / Zipwhip Receive Text just got loaded.", myObjWidgetRecvtext);
        myObjWidgetRecvtext.init();
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
      <tr valign="top"><td>/com-chilipeppr-widget-recvtext/recv</td><td>This signal is sent when an incoming text comes in. You can subscribe to it and you will get a signal that contains the payload of the message including the body of the text and the sender's phone number.</td></tr>    
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
      <tr valign="top"><td>/com-chilipeppr-widget-recvtext/send</td><td>You can publish this signal and this widget will send a text message. The payload should look like {body: "my text msg body", to: "313-555-1212"} and the text will be sent to the to phone number from the account you are logged into. Make sure to send less than 160 characters or multiple concatenated texts will be sent.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-recvtext/getSessionKey</td><td>You can ask for the sessionkey back and phone number of the logged in account. This lets you make your own direct calls to Zipwhip. You must pass in {callback:mymethod} and that method will get called back immediately with the sessionkey and phone number of the logged in account.</td></tr>    
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
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
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
      <tr valign="top"><td>/com-chilipeppr-widget-recvtext/com-chilipeppr-widget-gcode/done</td><td>When we see this signal, we know we can queue up the next trigger.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-recvtext/com-chilipeppr-widget-gcode/onpause</td><td>When we see this signal, we know the operator is having a problem and is pausing.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-recvtext/com-chilipeppr-widget-gcode/onplay</td><td>When we see this signal, we know that the gcode is in play mode so we can reject incoming texts.</td></tr><tr valign="top"><td>/com-chilipeppr-widget-recvtext/com-chilipeppr-widget-gcode/onstop</td><td>When we see this signal, we know the operator is having a problem and is stopping.</td></tr>    
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
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-widget-recvtext"</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Widget / Zipwhip Receive Text"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"Let people send inbound texts to trigger actions inside ChiliPeppr."</td></tr><tr valign="top"><td>url</td><td>string</td><td>"http://raw.githubusercontent.com/chilipeppr/widget-recvtext/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"http://ide.c9.io/chilipeppr/widget-recvtext"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"http://github.com/chilipeppr/widget-recvtext"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://widget-recvtext-chilipeppr.c9users.io/widget.html"</td></tr><tr valign="top"><td>publish</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>subscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>foreignSubscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>sessionkey</td><td>object</td><td>The sessionkey is the main value needed for all Zipwhip cloud calls. This
value is set from localStorage after you login.</td></tr><tr valign="top"><td>sessionPhone</td><td>object</td><td></td></tr><tr valign="top"><td>vending</td><td>boolean</td><td></td></tr><tr valign="top"><td>isTimerMode</td><td>boolean</td><td></td></tr><tr valign="top"><td>timeOut</td><td>number</td><td></td></tr><tr valign="top"><td>noPollingWhileTesting</td><td>boolean</td><td></td></tr><tr valign="top"><td>isInitted</td><td>boolean</td><td></td></tr><tr valign="top"><td>init</td><td>function</td><td>function () </td></tr><tr valign="top"><td>activateWidget</td><td>function</td><td>function () </td></tr><tr valign="top"><td>unactivateWidget</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupPubSub</td><td>function</td><td>function () </td></tr><tr valign="top"><td>publishSessionKey</td><td>function</td><td>function (payload) </td></tr><tr valign="top"><td>setupLogin</td><td>function</td><td>function () </td></tr><tr valign="top"><td>afterLogin</td><td>function</td><td>function (info) </td></tr><tr valign="top"><td>doPostLogin</td><td>function</td><td>function () <br><br>This method should be called after verifying there is a legitimate sessionkey
and we are good to go to start running short polling and show UI items that
we want after having a good login.</td></tr><tr valign="top"><td>logout</td><td>function</td><td>function () </td></tr><tr valign="top"><td>injectDiv</td><td>function</td><td>function () </td></tr><tr valign="top"><td>subscribeSetup</td><td>function</td><td>function () </td></tr><tr valign="top"><td>intervalPtr</td><td>object</td><td>Holds the pointer to the interval setTimeout so we can turn it off</td></tr><tr valign="top"><td>toggleShortPoll</td><td>function</td><td>function () </td></tr><tr valign="top"><td>turnOffShortPoll</td><td>function</td><td>function () </td></tr><tr valign="top"><td>turnOnShortPoll</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupIntervalToShortPoll</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupBtns</td><td>function</td><td>function () </td></tr><tr valign="top"><td>loadContactCard</td><td>function</td><td>function () </td></tr><tr valign="top"><td>loadIdentityCard</td><td>function</td><td>function (callback) </td></tr><tr valign="top"><td>checkForInboundMsgs</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onRecvText</td><td>function</td><td>function (msg) </td></tr><tr valign="top"><td>addInboundMsgBubble</td><td>function</td><td>function (msg) </td></tr><tr valign="top"><td>onBusyMsg</td><td>function</td><td>function (msg) </td></tr><tr valign="top"><td>onStartVending</td><td>function</td><td>function (phone, msg) </td></tr><tr valign="top"><td>isVending</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onEndVending</td><td>function</td><td>function () </td></tr><tr valign="top"><td>shortPoll</td><td>function</td><td>function (callback) </td></tr><tr valign="top"><td>formatPhone</td><td>function</td><td>function (phone) </td></tr><tr valign="top"><td>sendTextFromPubSubSignal</td><td>function</td><td>function (payload) <br><br>Pass in the payload {body: "your body", to: "313-414-1234"} to send your text.</td></tr><tr valign="top"><td>sendText</td><td>function</td><td>function (destAddr, body) </td></tr><tr valign="top"><td>onTest</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onDone</td><td>function</td><td>function (msg) </td></tr><tr valign="top"><td>onPlay</td><td>function</td><td>function (param1, param2) </td></tr><tr valign="top"><td>onPause</td><td>function</td><td>function (param1, param2) </td></tr><tr valign="top"><td>onStop</td><td>function</td><td>function (param1, param2) </td></tr><tr valign="top"><td>btnSetup</td><td>function</td><td>function () <br><br>Call this method from init to setup all the buttons when this widget
is first loaded. This basically attaches click events to your 
buttons. It also turns on all the bootstrap popovers by scanning
the entire DOM of the widget.</td></tr><tr valign="top"><td>options</td><td>object</td><td>User options are available in this property for reference by your
methods. If any change is made on these options, please call
saveOptionsLocalStorage()</td></tr><tr valign="top"><td>setupUiFromLocalStorage</td><td>function</td><td>function () <br><br>Call this method on init to setup the UI by reading the user's
stored settings from localStorage and then adjust the UI to reflect
what the user wants.</td></tr><tr valign="top"><td>saveOptionsLocalStorage</td><td>function</td><td>function () <br><br>When a user changes a value that is stored as an option setting, you
should call this method immediately so that on next load the value
is correctly set.</td></tr><tr valign="top"><td>showBody</td><td>function</td><td>function (evt) <br><br>Show the body of the panel.
<br><br><b>evt</b> ({jquery_event})  - If you pass the event parameter in, we 
know it was clicked by the user and thus we store it for the next 
load so we can reset the user's preference. If you don't pass this 
value in we don't store the preference because it was likely code 
that sent in the param.</td></tr><tr valign="top"><td>hideBody</td><td>function</td><td>function (evt) <br><br>Hide the body of the panel.
<br><br><b>evt</b> ({jquery_event})  - If you pass the event parameter in, we 
know it was clicked by the user and thus we store it for the next 
load so we can reset the user's preference. If you don't pass this 
value in we don't store the preference because it was likely code 
that sent in the param.</td></tr><tr valign="top"><td>forkSetup</td><td>function</td><td>function () </td></tr>
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

