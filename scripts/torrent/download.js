var http = require('http');
var parse = require('parse-torrent');
var sid = require("shortid");
var pjson = require('../../package.json');
var sha1 = require('sha1');
var bencode = require('bencode');
var dns = require('dns');
var _ = require('underscore');
var Discovery = require('torrent-discovery');
var net = require('net');
var url = require('url');
var randombytes = require('randombytes');
var BN = require('bn.js');

var dgram = require('dgram');

const BASE = "CL";
var version = pjson.version;
var minor = version.split(".")[2];
var pidVersion = version.split(".")[0] + version.split(".")[1] + ('00'+minor).substring(minor.length);
var pstr = 'BitTorrent protocol';
var reserved = 0x00;

const { action, event } = require('./common')


function getPeerID(){
  return "-" + BASE + pidVersion + "-" + sid.generate() + sid.generate().substring(0, 4);
}

function connectWithPeer(peer, infoHash, peerId){
  console.log("Connecting with: "+peer);
  var peerSocket = net.createConnection({
    port: peer.split(":")[1],
    host: peer.split(":")[0]
  }, () => {
    console.log("Successfully connected");
    var handshake = [pstr.length, pstr, infoHash, peerId].join("");
    console.log("Handshake is: "+handshake);
    peerSocket.write(handshake);
  });
  console.log("Got here: "+peerSocket.connecting+" . "+peerSocket.remoteAddress+" . "+peerSocket.remotePort+" . "+peerSocket.localAddress+" . "+peerSocket.localPort);

  peerSocket.setTimeout(4000);
  peerSocket.on('timeout', function(){
    console.log("Timed out");
    peerSocket.end();
  });

  peerSocket.on('drain', function(){
    //This can be used ot throttle uploads somehow...
    console.log("Write buffer is empty");
  });

  peerSocket.on('error', function(err){
    console.log("Had the error: "+err);
  });

  peerSocket.on('end', function(){
    console.log("Peer completed handshake");
  });

  peerSocket.on('data', function(buff){
    console.log("Recieved data: "+JSON.stringify(buff));
    if(Buffer.isBuffer(buff)){
      console.log("It is a buffer: "+buff.toJSON());
    }else{
      console.log("IT was a string");
    }
  });

  peerSocket.on('close', function(hasError){
    if(hasError){
      console.log("Closed with error");
    }else{
      console.log("Closed connection to peer: "+peer);
    }
  });

  peerSocket.on('connect', function(){
    console.log("Connected from this event");
  });
}

function discover(tracker, infoHash, peerId){
  var discover = new Discovery({
    infoHash: infoHash,
    peerId: peerId,
    port: 5445,
    announce: tracker
  });

  var peers = []

  discover.on('peer', function(peer){
    peers.push(peer);

    if(peers.length == 1){
      connectWithPeer(peer, infoHash, peerId);
    }
  });

  discover.on('dhtAnnounce', function(){
    console.log("Announce sent to DHT");
  });

  discover.on('warning', function(err){
  });
  discover.on('error', function(err){
    console.log("Error emitted from torrent discovery "+JSON.stringify(err));
  });

  return discover;
}

var CONNECTION_ID = Buffer.concat([ toInt32(0x417), toInt32(0x27101980)])

function toInt32(n, signed = false){
  //Allocate 4 bytes of
  var buf = Buffer.allocUnsafe(4);
  if(signed){
    buf.writeInt32BE(n, 0);
  }else{
    buf.writeUInt32BE(n, 0);
  }
  return buf;
}

function toInt16(n, signed = false){
  var buf = Buffer.allocUnsafe(2);
  if(signed){
    buf.writeInt16BE(n, 0);
  }else{
    buf.writeUInt16BE(n, 0);
  }
  return buf;
}

var MAX_UINT = 4294967295

function toUInt64 (n) {
  if (n > MAX_UINT || typeof n === 'string') {
    var bytes = new BN(n).toArray()
    while (bytes.length < 8) {
      bytes.unshift(0)
    }
    return Buffer.from(bytes)
  }
  return Buffer.concat([toInt32(0), toInt32(n)])
}

function connectMessage(){
  var transId = randombytes(4);
  console.log('Building connect message')
  console.log("Transation id before we send is: "+transId.readUInt32BE(0));
  return Buffer.concat([
    CONNECTION_ID,
    toInt32(action.CONNECT),
    transId
  ]);
}

function announceMessage(connectionId, infoHash, peerId){
  var transId = randombytes(4);
  console.log('Building announce message')
  console.log(connectionId.toString('ascii')+" "+peerId.toString('ascii')+" "+infoHash.toString('ascii')+" "+transId.toString('ascii')+" "+event.started);
  return Buffer.concat([
    connectionId,
    toInt32(action.ANNOUNCE),
    transId,
    infoHash,
    peerId,
    toUInt64(0),        //Downloaded
    Buffer.from('FFFFFFFFFFFFFFFF', 'hex'), //Left, max 64 bit int
    toUInt64(0),        //Uploaded
    toInt32(event.STARTED),
    toInt32(0), //this is the IP address
    toInt32(0), //Key??? what is this for, although optional
    toInt32(-1, true), //Number of peers wanted presumably, -1 for all
    toInt16(4145) //Port
  ]);
}

var Request = function(a, url, b){
  this.url = url;
}

Request.prototype.send = function(message, onComplete){
  
}


function connectToTracker(tracker, infoHash, peerId){
  var trackerUrl = url.parse(tracker);

  var sock = dgram.createSocket('udp4');
  var message = connectMessage();
  sock.send(message, 0, message.length, trackerUrl.port, trackerUrl.hostname);

  sock.on('message', function(msg){
    console.log("Recieved the message: "+JSON.stringify(msg));
    if(msg.length !== 16){
      console.log("Error, they returned a msg of wrong length");
    }
    var msgAction = msg.readUInt32BE(0);
    if(msgAction === action.CONNECT){

      var transId = msg.readUInt32BE(4);
      if(transId !== message.readUInt32BE(12)){
        console.log("Error, tracker returned incorrect transaction ID");
      }
      var b = Buffer.alloc(4);
      var connectionId_upper = msg.readUInt32BE(8);
      var connectionId_lower = msg.readUInt32BE(12);
      console.log("Action: "+msgAction+" transId "+transId+" conn_ID "+connectionId_upper+""+connectionId_lower);
      const connectionId = Buffer.concat([toInt32(connectionId_upper), toInt32(connectionId_lower)])

      var annMessage = announceMessage(connectionId, infoHash, peerId);
      sock.send(annMessage, 0, annMessage.length, trackerUrl.port, trackerUrl.hostname);
    }else if(msgAction === action.ANNOUNCE){
      console.log("We got an announce response: "+JSON.stringify(msg));
    }
  });

  sock.on('listening', function(){
    console.log("Socket is listening");
  });

  sock.on('error', function(err){
    console.log("Error connecting to the socket: "+err);
  });
  console.log("Sending message: "+JSON.stringify(message));
}

function connect(file, onClose){
  var infoHash = Buffer.from(sha1(bencode.encode(file.info)), 'hex');
  var peerId = Buffer.from(getPeerID());

  connectToTracker(file.announce[0], infoHash, peerId);
}

module.exports = {
  connect: connect
};
