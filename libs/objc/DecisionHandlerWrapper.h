#import <WebKit/WebKit.h>

void invokeDecisionHandler(void (^decisionHandler)(WKNavigationActionPolicy), WKNavigationActionPolicy policy);

const char* getUrlFromNavigationAction(WKNavigationAction *navigationAction);
