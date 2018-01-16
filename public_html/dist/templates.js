angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('chatframeview.html','<!DOCTYPE html>\r\n<!--\r\nThis file is property of Power2SME pvt. ltd.\r\n@author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)\r\n@Date :\r\n@FileName For Reference :\r\n@Purpose : \r\n@Other Description :\r\n-->\r\n<div id="vertical-container" schroll-bottom="chatMessageList">\r\n    <div ng-repeat="msg in chatMessageList track by $index" class="repeated-item2" ng-init="parentIndex = $index">\r\n        <div class="chatmsg" ng-class="{\'message-box-container-bot\':msg.msgBy == \'bot\' || msg.msgBy == \'human\' ,\'message-box-container-client\':msg.msgBy == \'client\'}" >\r\n            <img class="user-icon" ng-src="{{msg.userIconPath}}">\r\n                <div ng-hide="msg.message == \'\' && true || false" ng-class="{\'white-bubble\':msg.msgBy == \'bot\' || msg.msgBy == \'human\' ,\'blue-bubble\':msg.msgBy == \'client\'}" bind-html-compile="msg.message">\r\n                </div>\r\n            <div class="white-bubble" ng-show="msg.message == \'\' && true || false">\r\n                <div class="typing-dot" >\r\n                </div>\r\n                <div class="typing-dot1" >\r\n                </div>\r\n                <div class="typing-dot2" >\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div id="suggesstion_bar" class="suggestion-bar-container" ng-show="msg.dataListPresent" >\r\n            <md-virtual-repeat-container id="horizontal-container" class="horizontal-container" md-orient-horizontal>\r\n                <div md-virtual-repeat="item in msg.dataList"\r\n                     class="repeated-item" >\r\n                    <div class ="chip" ng-click="choose($index, parentIndex)">\r\n                        {{item}}\r\n                    </div>\r\n                </div>\r\n            </md-virtual-repeat-container>\r\n        </div>\r\n        <div class="card-container" ng-show="msg.showPrice" myindex="{{$index}}" chatmessagelist="chatMessageList" sendcardrequest ="sendCardRequest(true)">\r\n            <div ng-repeat="item in msg.dataList" class="repeated-card-item">\r\n                <div class="card">\r\n                    <div id="card_header">\r\n                        <div id="subcategory">\r\n                            {{item.skuDetails.subcategory}}\r\n                        </div>\r\n                        <div id="brand">\r\n                            {{item.skuDetails.brand}}\r\n                        </div>\r\n                    </div>\r\n                    <div id="middle_content">\r\n                        <div class="row">\r\n                            <span>Category : </span>\r\n                            <span>{{item.skuDetails.category}}</span>\r\n                        </div>\r\n                        <div ng-repeat="(key, value) in item.skuDetails.otherProperties" class="row">\r\n                            <span>{{key}} : </span>\r\n                            <span>{{value}}</span>\r\n                        </div>\r\n                        <div class="row">\r\n                            <span>Quantity : </span>\r\n                            <span>{{item.qty}}{{item.uom}}</span>\r\n                        </div>\r\n                    </div>\r\n                    <div id="bottom_content">\r\n                        <div id="price">{{item.price}}</div>\r\n                        <div id="add_to_cart" ng-click="addToCart(item)">Add to cart</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('registerframeview.html','<!DOCTYPE html>\r\n<!--\r\nThis file is property of Power2SME pvt. ltd.\r\n@author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)\r\n@Date :\r\n@FileName For Reference :\r\n@Purpose : \r\n@Other Description :\r\n-->\r\n<div style="height: 480px;"> \r\n    <div class="chatmsg message-box-container-bot intro-bubble">\r\n        <img class="welcome-user-icon" ng-src="{{getBotIconUrl()}}">\r\n        <div>\r\n            <b>PICS</b><br/>\r\n            <small>Virtual Assistant Agent</small>\r\n        </div>\r\n    </div>\r\n<md-content id="content" style="background: transparent; width: 100%; height:170px;">\r\n    <div class="chatmsg message-box-container-bot">\r\n        <img class="user-icon" ng-src="{{getBotIconUrl()}}">\r\n        <div class="white-bubble">\r\n            Hello, How can I help you?\r\n        </div>\r\n    </div>\r\n    <div class="chatmsg message-box-container-bot">\r\n        <img class="user-icon" ng-src="{{getBotIconUrl()}}">\r\n        <div class="white-bubble"> \r\n            Please provide your mobile number to start with.\r\n        </div>\r\n    </div>\r\n    <!-- -->\r\n    <div>\r\n        <div ng-repeat="msg in phoneValidationMessageList track by $index" class="chatmsg message-box-container-bot">\r\n            <img class="user-icon" ng-src="{{getBotIconUrl()}}">\r\n        <div class="white-bubble" id="{{$index}}">\r\n            {{msg}}\r\n        </div>\r\n        </div>\r\n    </div>\r\n</md-content>\r\n<div id="welcome-sign-up-container">\r\n    <div class="contact-details">\r\n        <div style="margin: 18px 0 5px 0;">            \r\n            <label>Contact Number</label>            \r\n            <input id="mobilenumber" ng-model="userdetail.phone" required="" my-enter="sign_up_submit()">\r\n        </div>\r\n    </div>\r\n    <div>\r\n        <md-button id="chat_now_button" class="md-raised md-primary md-hue-2 start_chat" ng-click="sign_up_submit()">START CHAT</md-button>\r\n    </div>\r\n</div>\r\n</div>');
$templateCache.put('sendmessageboxview.html','<!--\r\nThis file is property of Power2SME pvt. ltd.\r\n@author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)\r\n@Date :\r\n@FileName For Reference :\r\n@Purpose : \r\n@Other Description :\r\n-->\r\n<div class="bottom-bar-container">\r\n    <div class="suggestion-bar-container">\r\n        <md-virtual-repeat-container id="horizontal-container" class="horizontal-container" md-orient-horizontal>\r\n            <div md-virtual-repeat="item in suggestionList"\r\n                 class="repeated-item" >\r\n                <div class ="chip" ng-click="choose($index, -1)">\r\n                    {{item}}\r\n                </div>\r\n            </div>\r\n        </md-virtual-repeat-container>\r\n    </div>\r\n    <table class="write-box-table" >\r\n        <tr>\r\n            <td  style="height: 48px;width:100%;">\r\n                <!--                <input id="input" class="input_box" type="text"/>-->\r\n        <md-input-container class="send-message-input-box md-block" md-is-error="validateText()" md-no-float>\r\n            <textarea ng-disabled="!isProgressInActive" id="input" ng-model="message.text" max-rows="3" md-maxlength="getMaxTextBoxLength()" class="input-box" type="text" placeholder="Write a reply ..." my-enter="send()" ctrl-enter>\r\n            </textarea>\r\n        </md-input-container>\r\n        </td>\r\n        <td class="chat_send_button_td" ng-click="send();" >\r\n\r\n        <md-toolbar class="md-primary md-hue-2 send-icon chat-send-button"><md-icon>send</md-icon></md-toolbar>\r\n        </td>\r\n        </tr>\r\n    </table>\r\n</div>');
$templateCache.put('suggestionview.html','<!DOCTYPE html>\r\n<!--\r\nThis file is property of Power2SME pvt. ltd.\r\n@author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)\r\n@Date :\r\n@FileName For Reference :\r\n@Purpose : \r\n@Other Description :\r\n-->\r\n<div>\r\n        <div>TODO write content</div>\r\n</div>\r\n');
$templateCache.put('welcomeframeview.html','<!DOCTYPE html>\r\n<!--\r\nThis file is property of Power2SME pvt. ltd.\r\n@author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)\r\n@Date :\r\n@FileName For Reference :\r\n@Purpose : \r\n@Other Description :\r\n-->\r\n<div style="height:480px;">\r\n    <div class="chatmsg message-box-container-bot intro-bubble">\r\n        <img class="welcome-user-icon" ng-src="{{getBotIconUrl()}}">\r\n        <div>\r\n            <b>PICS</b><br/>\r\n            <small>Virtual Assistant Agent</small>\r\n        </div>\r\n    </div>\r\n    <div class="chatmsg message-box-container-bot ">\r\n        <img class="user-icon" ng-src="{{getBotIconUrl()}}">\r\n        <div class="white-bubble">\r\n            Hello, How can I help you?\r\n        </div>\r\n    </div>\r\n    <div id="welcome-chatnow-container">\r\n        <md-button id="chat_now_button" class="md-raised md-primary md-hue-2" ng-click="nextChatViewStage();">CHAT NOW</md-button>\r\n    </div>            \r\n</div>');
$templateCache.put('chatview.html','<!DOCTYPE html>\r\n<!--\r\nThis file is property of Power2SME pvt. ltd.\r\n@author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)\r\n@Date :\r\n@FileName For Reference :\r\n@Purpose : \r\n@Other Description :\r\n-->\r\n\r\n<div ng-controller="ChatUIController" id="main_container" class="main-container">\r\n    <table class="main-table" >\r\n        <tr>\r\n            <td class="mouse-hand">\r\n        <md-toolbar class="md-primary md-hue-2 chat-header" md-ink-ripple="#FFFFFF">\r\n            <div layout="row" layout-align="space-between stretch">\r\n                <div ng-if="getChatViewState()" class="md-toolbar-tools layout-padding-left remove-border" flex="33">\r\n                    <div class="chat-header-switch">ChatBot</div>\r\n                    <md-switch ng-disabled="true" ng-model="switchValue" ng-change="switchValueChanged()" class="md-accent md-hue-1 chat-header-switch" aria-label="autochat">\r\n                        Agent\r\n                    </md-switch>\r\n                </div>\r\n                <div ng-if="!getChatViewState()" ng-click="changeChatViewState()" class="md-toolbar-tools chat-header-title remove-border" flex="33">\r\n                    {{getChatWindowTitle()}}\r\n                </div>                \r\n                <div class="md-toolbar-tools remove-border" ng-click="changeChatViewState()" flex="66">\r\n                        <div flex="95"></div>\r\n                        <md-icon ng-if="!getChatViewState()">expand_less</md-icon>\r\n                        <md-icon ng-if="getChatViewState()">expand_more</md-icon>\r\n                </div>\r\n            </div>\r\n        </md-toolbar>\r\n        <md-progress-linear md-mode="indeterminate" ng-disabled="isProgressInActive"></md-progress-linear>\r\n        </td>\r\n        </tr>\r\n        <tr class="" ng-show="chat_view_stage==1">\r\n            <td>\r\n<!--                <div ng-include="getWelcomeFrame()"></div>-->\r\n                <welcome-frame></welcome-frame>\r\n            </td>\r\n        </tr>\r\n        <tr ng-show="chat_view_stage==2">\r\n            <td>\r\n<!--                <div ng-include="getRegisterFrame()"></div>-->\r\n                <register-frame></register-frame>\r\n            </td>\r\n        </tr>\r\n        <tr class="chat-view-tr" ng-show="chat_view_stage==3">\r\n            <td>\r\n                <div ng-scrollbars ng-scrollbars-update="scrollBarUpdate" ng-scrollbars-config="config">\r\n                      <div class="chat-view" id="chat_view" chat-frame></div>\r\n                </div>\r\n            </td>\r\n        </tr>\r\n        <tr ng-show="chat_view_stage==3">\r\n            <td>\r\n<!--                <div ng-include="getSendMessageFrame()"></div>-->\r\n                    <sendmessage-frame></sendmessage-frame>\r\n            </td>\r\n        </tr>    \r\n    </table>\r\n</div>\r\n');}]);