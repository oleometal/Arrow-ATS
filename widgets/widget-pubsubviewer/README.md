# com-chilipeppr-elem-pubsubviewer
This widget can be used to attach a set of menu items to a parent widget’s upper right corner menu to show the backing Github URL, a forking link, test links, and the inline pubsub viewer which lets you see what signals this widget publishes and subscribes to as well as documentation on the methods/properties inside the parent widget.



## ChiliPeppr Element / Pubsub Viewer

All ChiliPeppr widgets/elements are defined using cpdefine() which is a method
that mimics require.js. Each defined object must have a unique ID so it does
not conflict with other ChiliPeppr widgets.

| Item                  | Value           |
| -------------         | ------------- | 
| ID                    | com-chilipeppr-elem-pubsubviewer |
| Name                  | Element / Pubsub Viewer |
| Description           | This widget can be used to attach a set of menu items to a parent widget’s upper right corner menu to show the backing Github URL, a forking link, test links, and the inline pubsub viewer which lets you see what signals this widget publishes and subscribes to as well as documentation on the methods/properties inside the parent widget. |
| chilipeppr.load() URL | http://raw.githubusercontent.com/chilipeppr/widget-pubsubviewer/master/auto-generated-widget.html |
| Edit URL              | http://ide.c9.io/chilipeppr/widget-pubsubviewer |
| Github URL            | http://github.com/chilipeppr/widget-pubsubviewer |
| Test URL              | https://preview.c9users.io/chilipeppr/widget-pubsubviewer/widget.html |

## Example Code for chilipeppr.load() Statement

You can use the code below as a starting point for instantiating this widget 
inside a workspace or from another widget. The key is that you need to load 
your widget inlined into a div so the DOM can parse your HTML, CSS, and 
Javascript. Then you use cprequire() to find your widget's Javascript and get 
back the instance of it.

```javascript
// Inject new div to contain widget or use an existing div with an ID
$("body").append('<' + 'div id="myDivElemPubsubviewer"><' + '/div>');

chilipeppr.load(
  "#myDivElemPubsubviewer",
  "http://raw.githubusercontent.com/chilipeppr/widget-pubsubviewer/master/auto-generated-widget.html",
  function() {
    // Callback after widget loaded into #myDivElemPubsubviewer
    // Now use require.js to get reference to instantiated widget
    cprequire(
      ["inline:com-chilipeppr-elem-pubsubviewer"], // the id you gave your widget
      function(myObjElemPubsubviewer) {
        // Callback that is passed reference to the newly loaded widget
        console.log("Element / Pubsub Viewer just got loaded.", myObjElemPubsubviewer);
        myObjElemPubsubviewer.init();
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
      <tr valign="top"><td>id</td><td>string</td><td>"com-chilipeppr-elem-pubsubviewer"</td></tr><tr valign="top"><td>url</td><td>string</td><td>"http://raw.githubusercontent.com/chilipeppr/widget-pubsubviewer/master/auto-generated-widget.html"</td></tr><tr valign="top"><td>fiddleurl</td><td>string</td><td>"http://ide.c9.io/chilipeppr/widget-pubsubviewer"</td></tr><tr valign="top"><td>githuburl</td><td>string</td><td>"http://github.com/chilipeppr/widget-pubsubviewer"</td></tr><tr valign="top"><td>testurl</td><td>string</td><td>"http://widget-pubsubviewer-chilipeppr.c9users.io/widget.html"</td></tr><tr valign="top"><td>name</td><td>string</td><td>"Element / Pubsub Viewer"</td></tr><tr valign="top"><td>desc</td><td>string</td><td>"This widget can be used to attach a set of menu items to a parent widget’s upper right corner menu to show the backing Github URL, a forking link, test links, and the inline pubsub viewer which lets you see what signals this widget publishes and subscribes to as well as documentation on the methods/properties inside the parent widget."</td></tr><tr valign="top"><td>isInitted</td><td>boolean</td><td></td></tr><tr valign="top"><td>init</td><td>function</td><td>function () </td></tr><tr valign="top"><td>cpobject</td><td>object</td><td></td></tr><tr valign="top"><td>pubsubClick</td><td>function</td><td>function (evt) </td></tr><tr valign="top"><td>show</td><td>function</td><td>function (cpobject) </td></tr><tr valign="top"><td>onShow</td><td>function</td><td>function () </td></tr><tr valign="top"><td>appendKeyVal</td><td>function</td><td>function (data, id) </td></tr><tr valign="top"><td>attachTo</td><td>function</td><td>function (dropdownMenuEl, cpobject, altTitle) </td></tr>
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

