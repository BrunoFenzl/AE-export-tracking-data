# AE-export-tracking-data


This script exports your 2D tracking information from After Effects CC is json format. 
To install just move the .jsx file into your scripts folder. This Script requires access to the file system. To allow it, you need to go to 

```file -> settings -> general and check "Allow Scripts to Write Files and access Network". ```

After you are done with your tracking, select your Null layers and go to

```file -> Scripts -> exportTrackingData```

This script will export an Object with the following format:

```
{
   "frameRate":29.9700012207031,
   "layers":{
      "2131":{ // small unique identifier
         "displayName":"tracker_1",
         "numKeys":801 // amount of keyframes for this tracker
      },
      "0001":{
         "displayName":"tracker_2",
         "numKeys":384 // amount of keyframes for this tracker
      }
   },
   "frames":{
      "0":{ // frame 
         "2131":[ // layer
            "50.84", // Array with X, Y positions as percentages
            "49.90"
         ],
         "0001":[ // layer
            "64.12", 
            "30.90"
         ]
      },
      "1":{
         "2131":[
            "50.89",
            "49.88"
         ]
      }
      .
      .
      .
   }
}
```

