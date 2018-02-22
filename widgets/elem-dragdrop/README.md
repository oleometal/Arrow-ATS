# com-chilipeppr-elem-dragdrop
An element that presents a drag and drop icon that allows files to be dragged onto it. A pubsub event called /com-chilipeppr-elem-dragdrop/ondropped is published when the drop is complete. The contents of the file are passed in the pubsub call so different widgets/elements can consume the contents of the file.

![alt text](screenshot.png "Screenshot")

## ChiliPeppr Element / Drag Drop

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-elem-dragdrop |
| Name                  | Element / Drag Drop |
| Description           | An element that presents a drag and drop icon that allows files to be dragged onto it. A pubsub event called /com-chilipeppr-elem-dragdrop/ondropped is published when the drop is complete. The contents of the file are passed in the pubsub call so different widgets/elements can consume the contents of the file. |
| chilipeppr.load() URL | http://raw.githubusercontent.com/chilipeppr/elem-dragdrop/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/chilipeppr/elem-dragdrop |
| Github URL            | http://github.com/chilipeppr/elem-dragdrop |
| Test URL              | https://preview.c9users.io/chilipeppr/elem-dragdrop/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget 
inside a workspace or from another widget. The key is that you need to load 
your widget inlined into a div so the DOM can parse your HTML, CSS, and 
Javascript. Then you use cprequire() to find your widget's Javascript and get 
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivElemDragdrop"><' + '/div>');

chilipeppr.load(
  "#myDivElemDragdrop",
  "http://raw.githubusercontent.com/chilipeppr/elem-dragdrop/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivElemDragdrop
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-elem-dragdrop"], // the id you gave your widget
      function(myObjElemDragdrop) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Element / Drag Drop just got loaded.", myObjElemDragdrop);
        myObjElemDragdrop.init();
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
      <tr valign="top"><td>/com-chilipeppr-elem-dragdrop/com-chilipeppr-elem-dragdrop/ondropped</td><td>When the file is dropped. Payload contains the file.</td></tr><tr valign="top"><td>/com-chilipeppr-elem-dragdrop/com-chilipeppr-elem-dragdrop/ondragover</td><td>When the mouse is hovering over drop area so you can hilite/react. Empty payload.</td></tr><tr valign="top"><td>/com-chilipeppr-elem-dragdrop/com-chilipeppr-elem-dragdrop/ondragleave</td><td>When mouse stops hovering so you can remove hilites. Empty payload.</td></tr><tr valign="top"><td>/com-chilipeppr-elem-dragdrop/com-chilipeppr-elem-dragdrop/ondragdone</td><td>When user drops the file onto browser so you can remove hilites. Empty payload. Don't confuse this with ondropped which is the pubsub that actually contains file that was dropped.</td></tr>    
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
      <tr valign="top"><td>/com-chilipeppr-elem-dragdrop/com-chilipeppr-elem-dragdrop/loadGcode</td><td>Send in this signal to load a string of Gcode with a payload of: { gcode: "your gcode text as a string", name: "name of file as string so the recent file list can show the name", lastModified: Date }. This signal will then generate an onDropped signal which is what all widgets listen to for loading of the file.</td></tr><tr valign="top"><td>/com-chilipeppr-elem-dragdrop/com-chilipeppr-elem-dragdrop/loadGcodeDoNotCreateRecentFileEntry</td><td>Send in this signal to load a string of Gcode without creating a recent file menu entry. Send in the same payload as /loadGcode. This is useful if you have a macro or a widget that wants to send a lot of Gcode into ChiliPeppr over and over, but does not want to bloat the recent file menu. For example, the Auto-Leveller may want to let the user load Gcode over and over without creating a history.</td></tr><tr valign="top"><td>/com-chilipeppr-elem-dragdrop/com-chilipeppr-elem-dragdrop/loadGcodeFromUrl</td><td>Send in this signal to load Gcode from a URL. The payload is simply the URL as a string.</td></tr><tr valign="top"><td>/com-chilipeppr-elem-dragdrop/com-chilipeppr-elem-dragdrop/loadGcodeFromUrlDoNotCreateRecentFileEntry</td><td>Send in this signal to load Gcode from a URL, but do not create a recent file entry in the process. This allows you to load Gcode over and over without bloating the recent file menu.</td></tr>    
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
      <tr><td colspan="2">(No signals defined in this widget/element)</td></tr>    
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
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-elem-dragdrop"</td></tr><tr valign="top"><td>url</td><td>string</td><td>"http://raw.githubusercontent.com/chilipeppr/elem-dragdrop/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"http://ide.c9.io/chilipeppr/elem-dragdrop"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"http://github.com/chilipeppr/elem-dragdrop"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://elem-dragdrop-chilipeppr.c9users.io/widget.html"</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Element / Drag Drop"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"An element that presents a drag and drop icon that allows files to be dragged onto it. A pubsub event called /com-chilipeppr-elem-dragdrop/ondropped is published when the drop is complete. The contents of the file are passed in the pubsub call so different widgets/elements can consume the contents of the file."</td></tr><tr valign="top"><td>publish</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>subscribe</td><td>object</td><td>Please see docs above.</td></tr><tr valign="top"><td>hasHtml</td><td>boolean</td><td></td></tr><tr valign="top"><td>hasCss</td><td>boolean</td><td></td></tr><tr valign="top"><td>hasJs</td><td>boolean</td><td></td></tr><tr valign="top"><td>dropArea</td><td>object</td><td></td></tr><tr valign="top"><td>txtDomElemSelector</td><td>object</td><td></td></tr><tr valign="top"><td>init</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupOpenFile</td><td>function</td><td>function () </td></tr><tr valign="top"><td>setupDownload</td><td>function</td><td>function () </td></tr><tr valign="top"><td>onDownload</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>setupSubscribe</td><td>function</td><td>function () </td></tr><tr valign="top"><td>loadGcodeFromUrlDoNotCreateRecentFileEntry</td><td>function</td><td>function (url) </td></tr><tr valign="top"><td>loadGcodeFromUrl</td><td>function</td><td>function (url) </td></tr><tr valign="top"><td>loadGcodeDoNotCreateRecentFileEntry</td><td>function</td><td>function (obj) </td></tr><tr valign="top"><td>loadGcode</td><td>function</td><td>function (obj, isDoNotCreateRecentFileEntry) </td></tr><tr valign="top"><td>setupGlobalAjaxError</td><td>function</td><td>function () </td></tr><tr valign="top"><td>loadText</td><td>function</td><td>function () </td></tr><tr valign="top"><td>loadUrl</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>loadUrlDoNotCreateRecentFileEntry</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>loadChiliPepprGcodeInch</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>loadChiliPepprGcode</td><td>function</td><td>function (evt, alturl) </td></tr><tr valign="top"><td>deleteRecentFiles</td><td>function</td><td>function () </td></tr><tr valign="top"><td>createRecentFileEntry</td><td>function</td><td>function (fileStr, info) </td></tr><tr valign="top"><td>buildRecentFileMenu</td><td>function</td><td>function () </td></tr><tr valign="top"><td>bind</td><td>function</td><td>function (dropDomElemSelector, txtDomElemSelector) </td></tr><tr valign="top"><td>forkSetup</td><td>function</td><td>function () </td></tr>
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

