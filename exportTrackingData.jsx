﻿var composition = app.project.activeItem;
var name = composition.name;
var layers = composition.selectedLayers;
var numFrames = Math.floor(composition.duration * composition.frameRate);
var trackingData = {};

exportLayers();
writeFile();

function writeFile() {
  var file = new File(Folder.myDocuments.absoluteURI + "/" + name + ".json");
  file.displayName = name + ".json";
  file.saveDlg("Save Tracking Data");
  file.open("w", "TEXT", "????");
  file.write(JSON.stringify(trackingData));
  file.close();
  file.execute();
}

function exportLayers() {
  if (layers.length == 0) {
    alert(
      "No layers selected. Please select some layers with keyframes to export."
    );
    return;
  }

  trackingData.staticMedia = false;
  trackingData.frameRate = composition.frameRate;
  trackingData.layers = {};
  trackingData.frames = {};
  trackingData.firstFrame = numFrames;
  trackingData.frameDuration = composition.frameDuration;

  for (var p = 0; p < layers.length; p++) {
    var id = uuid();
    layers[p].trackingID = id;
    trackingData.layers[id] = {
      displayName: layers[p].name,
      numKeys: layers[p].Transform.Position.numKeys
    };
  }

  for (var i = 0; i < layers.length; i++) {
    // get property to track
    var pos = layers[i].Transform.Position;
    // get all amount of keyframes from this property
    var keyCount = pos.numKeys;

    // loop over each key
    for (var k = 1; k <= keyCount; k++) {
      // time in seconds from this keyframe
      var frameTime = pos.keyTime(k);
      // get keyFrae index relative to global timeline
      var keyframe = Math.floor(frameTime * composition.frameRate);
      // the lowest keyframe will vary depending on the order
      // of the layers. So on each keyframe we chek to see wich one is the lowest
      trackingData.firstFrame = Math.min(trackingData.firstFrame, keyframe);
      // if there is no object initialized for this frame, create one
      if (trackingData.frames[keyframe] === undefined)
        trackingData.frames[keyframe] = {};
      // save the position properties under the layer ID for this keyframe
      trackingData.frames[keyframe][layers[i].trackingID] = [
        (
          (layers[i].Transform.Position.valueAtTime(frameTime, true)[0] /
            composition.width) *
          100
        ).toFixed(2), // x%
        (
          (layers[i].Transform.Position.valueAtTime(frameTime, true)[1] /
            composition.height) *
          100
        ).toFixed(2) // y%
      ];
    }
  }
}

function uuid() {
  // 4 digits instead of 16 to save on weight…
  return "xxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 4) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(4);
  });
}
