var sax = require("../lib/sax")
  , parser = sax.parser()
  , assert = require("assert")
  , inspect = require('util').inspect
  ;

var paused = false

var events = [];

var expected = [ [ 'attribute',
    [ { name: 'xmlns:xsi',
        value: 'http://www.w3.org/2001/XMLSchema-instance' } ] ],
  [ 'attribute', [ { name: 'version', value: '2.0' } ] ],
  [ 'attribute',
    [ { name: 'xsi:noNamespaceSchemaLocation', value: 'vast.xsd' } ] ],
  [ 'opentag',
    [ { name: 'VAST',
        attributes: 
         { 'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
           version: '2.0',
           'xsi:noNamespaceSchemaLocation': 'vast.xsd' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'id', value: '223626102' } ] ],
  [ 'opentag',
    [ { name: 'AD', attributes: { id: '223626102' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'INLINE', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'version', value: '2.0' } ] ],
  [ 'opentag',
    [ { name: 'ADSYSTEM', attributes: { version: '2.0' } } ] ],
  [ 'text', [ 'DART_DFA' ] ],
  [ 'closetag', [ 'ADSYSTEM' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'ADTITLE', attributes: {} } ] ],
  [ 'text', [ 'In-Stream Video' ] ],
  [ 'closetag', [ 'ADTITLE' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'DESCRIPTION', attributes: {} } ] ],
  [ 'text', [ 'A test creative with a description.' ] ],
  [ 'closetag', [ 'DESCRIPTION' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'SURVEY', attributes: {} } ] ],
  [ 'closetag', [ 'SURVEY' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'id', value: 'DART' } ] ],
  [ 'opentag',
    [ { name: 'IMPRESSION', attributes: { id: 'DART' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/imp;v7;x;223626102;0-0;0;47414672;0/0;30477563/30495440/1;;~aopt=0/0/ff/0;~cs=j%3fhttp://s0.2mdn.net/dot.gif\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'IMPRESSION' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'id', value: 'ThirdParty' } ] ],
  [ 'opentag',
    [ { name: 'IMPRESSION', attributes: { id: 'ThirdParty' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/ad/N270.Process_Other/B3473145;sz=1x1;ord=7753381?\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'IMPRESSION' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'CREATIVES', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'sequence', value: '1' } ] ],
  [ 'attribute', [ { name: 'AdID', value: '' } ] ],
  [ 'opentag',
    [ { name: 'CREATIVE', attributes: { sequence: '1', AdID: '' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'LINEAR', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'DURATION', attributes: {} } ] ],
  [ 'text', [ '00:00:58' ] ],
  [ 'closetag', [ 'DURATION' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'TRACKINGEVENTS', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'start' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'start' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/activity;src=2215309;met=1;v=1;pid=47414672;aid=223626102;ko=0;cid=30477563;rid=30495440;rv=1;timestamp=7753381;eid1=11;ecn1=1;etm1=0;\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'midpoint' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'midpoint' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/activity;src=2215309;met=1;v=1;pid=47414672;aid=223626102;ko=0;cid=30477563;rid=30495440;rv=1;timestamp=7753381;eid1=18;ecn1=1;etm1=0;\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'midpoint' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'midpoint' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/ad/N270.Process_Other/B3473145.3;sz=1x1;ord=7753381?\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'firstQuartile' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'firstQuartile' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/activity;src=2215309;met=1;v=1;pid=47414672;aid=223626102;ko=0;cid=30477563;rid=30495440;rv=1;timestamp=7753381;eid1=26;ecn1=1;etm1=0;\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'firstQuartile' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'firstQuartile' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/ad/N270.Process_Other/B3473145.2;sz=1x1;ord=7753381?\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'thirdQuartile' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'thirdQuartile' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/activity;src=2215309;met=1;v=1;pid=47414672;aid=223626102;ko=0;cid=30477563;rid=30495440;rv=1;timestamp=7753381;eid1=27;ecn1=1;etm1=0;\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'thirdQuartile' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'thirdQuartile' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/ad/N270.Process_Other/B3473145.4;sz=1x1;ord=7753381?\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'complete' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'complete' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/activity;src=2215309;met=1;v=1;pid=47414672;aid=223626102;ko=0;cid=30477563;rid=30495440;rv=1;timestamp=7753381;eid1=13;ecn1=1;etm1=0;\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'complete' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'complete' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/ad/N270.Process_Other/B3473145.5;sz=1x1;ord=7753381?\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'mute' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'mute' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/activity;src=2215309;met=1;v=1;pid=47414672;aid=223626102;ko=0;cid=30477563;rid=30495440;rv=1;timestamp=7753381;eid1=16;ecn1=1;etm1=0;\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'pause' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'pause' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/activity;src=2215309;met=1;v=1;pid=47414672;aid=223626102;ko=0;cid=30477563;rid=30495440;rv=1;timestamp=7753381;eid1=15;ecn1=1;etm1=0;\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'fullscreen' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'fullscreen' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/activity;src=2215309;met=1;v=1;pid=47414672;aid=223626102;ko=0;cid=30477563;rid=30495440;rv=1;timestamp=7753381;eid1=19;ecn1=1;etm1=0;\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'event', value: 'fullscreen' } ] ],
  [ 'opentag',
    [ { name: 'TRACKING', attributes: { event: 'fullscreen' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/ad/N270.Process_Other/B3473145.6;sz=1x1;ord=7753381?\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'TRACKINGEVENTS' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'ADPARAMETERS', attributes: {} } ] ],
  [ 'closetag', [ 'ADPARAMETERS' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'VIDEOCLICKS', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'CLICKTHROUGH', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata', [ ' http://www.google.com/support/richmedia ' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'CLICKTHROUGH' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'id', value: 'DART' } ] ],
  [ 'opentag',
    [ { name: 'CLICKTRACKING', attributes: { id: 'DART' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/click%3Bh%3Dv8/3c41/3/0/%2a/z%3B223626102%3B0-0%3B0%3B47414672%3B255-0/0%3B30477563/30495440/1%3B%3B%7Eaopt%3D0/0/ff/0%3B%7Esscs%3D%3fhttp://s0.2mdn.net/dot.gif\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'CLICKTRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'id', value: 'ThirdParty' } ] ],
  [ 'opentag',
    [ { name: 'CLICKTRACKING', attributes: { id: 'ThirdParty' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://ad.doubleclick.net/clk;212442087;33815766;i?http://www.google.com/support/richmedia\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'CLICKTRACKING' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'VIDEOCLICKS' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'MEDIAFILES', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'id', value: '1' } ] ],
  [ 'attribute', [ { name: 'delivery', value: 'progressive' } ] ],
  [ 'attribute', [ { name: 'type', value: 'video/x-flv' } ] ],
  [ 'attribute', [ { name: 'bitrate', value: '457' } ] ],
  [ 'attribute', [ { name: 'width', value: '300' } ] ],
  [ 'attribute', [ { name: 'height', value: '225' } ] ],
  [ 'opentag',
    [ { name: 'MEDIAFILE',
        attributes: 
         { id: '1',
           delivery: 'progressive',
           type: 'video/x-flv',
           bitrate: '457',
           width: '300',
           height: '225' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nhttp://rmcdn.2mdn.net/MotifFiles/html/2215309/PID_914438_1235753019000_dcrmvideo.flv\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'MEDIAFILE' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'id', value: '2' } ] ],
  [ 'attribute', [ { name: 'delivery', value: 'streaming' } ] ],
  [ 'attribute', [ { name: 'type', value: 'video/x-flv' } ] ],
  [ 'attribute', [ { name: 'bitrate', value: '457' } ] ],
  [ 'attribute', [ { name: 'width', value: '300' } ] ],
  [ 'attribute', [ { name: 'height', value: '225' } ] ],
  [ 'opentag',
    [ { name: 'MEDIAFILE',
        attributes: 
         { id: '2',
           delivery: 'streaming',
           type: 'video/x-flv',
           bitrate: '457',
           width: '300',
           height: '225' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata',
    [ '\nrtmp://rmcdn.f.2mdn.net/ondemand/MotifFiles/html/2215309/PID_914438_1235753019000_dcrmvideo.flv\n' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'MEDIAFILE' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'MEDIAFILES' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'LINEAR' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'CREATIVE' ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'sequence', value: '1' } ] ],
  [ 'attribute', [ { name: 'AdID', value: '' } ] ],
  [ 'opentag',
    [ { name: 'CREATIVE', attributes: { sequence: '1', AdID: '' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'COMPANIONADS', attributes: {} } ] ],
  [ 'closetag', [ 'COMPANIONADS' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'CREATIVE' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'CREATIVES' ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'EXTENSIONS', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'attribute', [ { name: 'type', value: 'DART' } ] ],
  [ 'opentag',
    [ { name: 'EXTENSION', attributes: { type: 'DART' } } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'ADSERVINGDATA', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'DELIVERYDATA', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opentag', [ { name: 'GEODATA', attributes: {} } ] ],
  [ 'text', [ '\n' ] ],
  [ 'opencdata', [ undefined ] ],
  [ 'cdata', [ ' ct=PT&st=&ac=21&zp=&bw=2&dma=1&city=11349 ' ] ],
  [ 'closecdata', [ undefined ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'GEODATA' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'DELIVERYDATA' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'ADSERVINGDATA' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'EXTENSION' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'EXTENSIONS' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'INLINE' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'AD' ] ],
  [ 'text', [ '\n' ] ],
  [ 'closetag', [ 'VAST' ] ]]


sax.EVENTS.forEach(function(ev) {
  var methodName = 'on' + ev
  parser[methodName] = function() {
    events.push([ev, Array.prototype.slice.call(arguments)])
    assert.ok(! paused, 'paused')
  }
})

var xml = require('fs').readFileSync(__dirname + '/test.xml', 'utf8')

var chunkLength = 100;
var currentIndex = 0;

function resume() {
  paused = false
  parser.resume()
  var chunk = xml.substring(currentIndex, currentIndex + chunkLength)
  currentIndex += chunkLength
  parser.write(chunk)
  if (chunk.length === chunkLength) {
    pause()
    // send a chunk while it's paused
    chunk = xml.substring(currentIndex, currentIndex + chunkLength)
    parser.write(chunk) // this should not trigger any event, only when resumed
    currentIndex += chunkLength
    process.nextTick(resume)
  } else {
    parser.close()
  }
}

parser.onend = function() {
  assert.deepEqual(events, expected, 'events do not match')
}

function pause() {
  paused = true
  parser.pause()
}

resume();