#import "CarrierPlugin.h"


@implementation CarrierPlugin


- (void)getAverageNoise:(CDVInvokedUrlCommand*)command

{
    // run as a background thread
    [self.commandDelegate runInBackground:^{
    
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayAndRecord error:nil];
    
    NSURL *url = [NSURL fileURLWithPath:@"/dev/null"];
    
    NSDictionary *settings = [NSDictionary dictionaryWithObjectsAndKeys:
                              [NSNumber numberWithFloat: 44100.0],                 AVSampleRateKey,
                              [NSNumber numberWithInt: kAudioFormatAppleLossless], AVFormatIDKey,
                              [NSNumber numberWithInt: 1],                         AVNumberOfChannelsKey,
                              [NSNumber numberWithInt: AVAudioQualityMax],         AVEncoderAudioQualityKey,
                              nil];
    
    NSError *error;
    
    recorder = [[AVAudioRecorder alloc] initWithURL:url settings:settings error:&error];
    
    if (recorder) {
        [recorder prepareToRecord];
        recorder.meteringEnabled = YES;
        [recorder record];
        
        [recorder updateMeters];
        
        float averageNS = [recorder averagePowerForChannel:0];
        float averageNSPos = 120.0f + averageNS;
        
        // convert power level into linar range
        //double percentage = pow (10, (0.05 * averageNS));
        //double percentageRounded = round (percentage * 100) / 100.0;
        
        NSString *averageString = [NSString stringWithFormat:@"%f", averageNSPos];
        
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                    messageAsString: averageString];
        
        NSLog(@"Average input: %f Peak input: %f", [recorder averagePowerForChannel:0], [recorder peakPowerForChannel:0]);
        //NSLog(@"Average input in averageString: %f", percentage);
        NSLog(@"Average input in averageString: %@", averageString);

        // the method calls the appropriate callback function to complete the process
        [self.commandDelegate sendPluginResult:result callbackId:[command callbackId]];
        
    } else
      //NSLog([error description]);
        NSLog(@"An Error occured in getAverageNoise");
    }];
}


- (void)getLuminosity:(CDVInvokedUrlCommand*)command
{
    // testing luminosity
    float lumin = [[UIScreen mainScreen] brightness];
    NSString *luminString = [NSString stringWithFormat:@"%f", lumin];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                messageAsString: luminString];
    [self.commandDelegate sendPluginResult:result callbackId:[command callbackId]];
    
    NSLog(@"Screen Brightness: %f",[[UIScreen mainScreen] brightness]);
}


@end