#import <Cordova/CDV.h>
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import <CoreAudio/CoreAudioTypes.h>

@interface CarrierPlugin : CDVPlugin {
    
    AVAudioRecorder *recorder;
    NSTimer *leveltimer;
}

- (void)getAverageNoise:(CDVInvokedUrlCommand*)command;
- (void)getLuminosity:(CDVInvokedUrlCommand*)command;


@end