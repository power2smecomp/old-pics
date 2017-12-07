
/* 
 * This file is property of Power2SME pvt. ltd. 
 @author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)
 * This file is central configuration file. Changes should be done cautiously
 * 
 */
//'use strict';
var app = angular.module('app.chatui', ['ngMaterial', 'ngAnimate', 'ngAria']);

app.config(['$mdThemingProvider', '$httpProvider', function ($mdThemingProvider, $httpProvider) {
        $mdThemingProvider.theme('default')
                .primaryPalette('light-blue')
                .accentPalette('blue-grey')
                .warnPalette('grey');
        $httpProvider.defaults.withCredentials = true;
    }
]);

/* 
 * To change $scope license header, choose License Headers in Project Properties.
 * To change $scope template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : June 19, 2017
 Author     : Himanshu Shekhar {himanshushekhar00@gmail.com}
 */
var power2smeChat = angular.module("app.chatui");

power2smeChat.filter('trust', ['$sce', function ($sce) {
        return function (value, type) {
            return $sce.trustAs(type || 'html', value);
        };
    }]);

/* 
 * To change $scope license header, choose License Headers in Project Properties.
 * To change $scope template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 Created on : June 19, 2017
 Author     : Himanshu Shekhar {himanshushekhar00@gmail.com}
 */
var power2smeChat = angular.module("app.chatui");

power2smeChat.directive('schrollBottom', function () {
    return {
        scope: {
            schrollBottom: "="
        },
        link: function (scope, element) {
            console.log('I am scrollBottom directive');
            scope.$watchCollection('schrollBottom', function (newValue) {
                if (newValue)
                {
                    var chat_view = document.getElementsByClassName('chat-view')[0];
                    console.log("ScrollHeight:" + chat_view.scrollHeight);
                    var scroll_height = chat_view.scrollHeight;
                    jQuery('.chat-view').animate({scrollTop: scroll_height + 500}, 2000, 'linear', function () {
                        //alert("Finished animating");
                    });
                }
            });
        }
    };
});


power2smeChat.directive("scroll", function ($window) {
    return {
        restrict: "A",
        scope: {
            myindex: "@",
            chatmessagelist: "=",
            sendcardrequest: "&"
        },

        link: function (scope, element, attrs) {
            element.on("scroll", function () {
                console.log('I am scroll directive');
                //console.log(this.scrollLeft + ":" + this.scrollWidth + ":" + 400);
                //console.log(scope.chatmessagelist[scope.myindex].scrollActive);
                if (scope.chatmessagelist[scope.myindex].scrollActive == true) {
                    if (this.scrollLeft >= ((this.scrollWidth - 1) - 400)) {
                        scope.chatmessagelist[scope.myindex].scrollActive = false;
                        scope.sendcardrequest();
                    }
                }
            });
        }
    };
});
power2smeChat.directive('picsView', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/chatui/chatview.html',
        link: function (scope, element, attrs) {
            console.log('I am chatui directive');
            try {
                scope.smeId = attrs.smeId;            
            } catch (exception) {
                console.log('NO SMEID ERROR');
            }
            try {
                scope.email = attrs.emailId;
//                scope.userdetail.email = attrs.emailId;
            } catch (exception) {
                console.log('NO EMAIL ERROR');
            }
            try {
                scope.phone = attrs.phone;
//                scope.userdetail.phone = attrs.phone;
            } catch (exception) {
                console.log(exception);
                console.log('NO POHONE FIELD');
            }               
        }
    };
});

power2smeChat.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (!event.ctrlKey && event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

power2smeChat.directive('ctrlEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.ctrlKey && event.which === 13) {
                console.log('CTRL + ENTER');
            }
            ;
        });
    };
});

power2smeChat.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    }]);
  
/* 
 * This file is property of Power2SME pvt. ltd.
 @author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)
 * 
 * 
 */

var app = angular.module('app.chatui');
app.service("ChatServices", ['$log', '$http', '$q', function ($log, $http, $q) {

        //var BASE_DOMAIN = 'http://125.63.66.69/';
        //var BASE_DOMAIN = 'http://localhost:8085/';
        //var BASE_DOMAIN = 'http://192.168.0.186:8085';
        var BASE_DOMAIN = 'https://uat.power2sme.com/';
        var CONTEXT_WEBSITE = 'website/';
        var CONTEXT_P2SAPI = 'p2sapi/';
        //var CONTEXT_CHATAPI = 'chatapi/';
        var CONTEXT_CHATAPI = 'chatai/';
        var p2sapiusername = 'dev';
        var p2sapipassword = 'developer';
//        var tokenid = "9654910942";

        this.submitLongRfqForm = function (rfqData)
        {
            var canceller = $q.defer();
            return {
                promise: $http.post(BASE_DOMAIN + "website/public/rfq/orderdetail", rfqData, {cache: true}),
                cancel: canceller
            };
        };

        this.submitquery = function (query,agenttype,tokenid)
        {
            var canceller = $q.defer();
            return {
                promise: $http.get(BASE_DOMAIN +CONTEXT_CHATAPI+ "query?q=" + query + "&tokenid=" + tokenid + "&agenttype="+agenttype),
                cancel: canceller
            };
        };

        this.fetchAgentResponse = function (tokenid,messageid)
        {
            
            var canceller = $q.defer();
            return {
                promise: $http.get(BASE_DOMAIN + CONTEXT_CHATAPI+ "fetch/agent/responses?messageid=" + messageid + "&tokenid=" + tokenid),
                cancel: canceller
            };
        };
        
        this.createContact = function (namefirst,namelast,email,mobileNumber){            
            var canceller = $q.defer();
            var user={
                firstname : namefirst,
                lastname : namelast,
                mobilenumber : mobileNumber,
                emailid : email
            };
            return {
                promise: $http.post('https://uat.power2sme.com/website/public/rfq/usercontact',user),
                cancel: canceller
            };
        };
        
        this.registerContact = function (namefirst,namelast,email,mobileNumber){            
            var canceller = $q.defer();
            var user={
                name : namefirst+' '+namelast,
                phone : mobileNumber,
                email : email
            };
            return {
                promise: $http.post(BASE_DOMAIN + CONTEXT_CHATAPI+ 'register',user),
                cancel: canceller
            };
        };
    }]);
/*
 * {
 * "firstname":"Shubh",
 * "lastname":"Singh",
 * "mobilenumber":"9450430617",
 * "emailid":"shubh.aug@mailinator.com",
 * "smeid":null,
 * "errorfirstname":false,
 * "errorlastname":false,
 * "errormobilenumber":false,
 * "erroremailid":false
 * }
 */
/* 
 * This file is property of Power2SME pvt. ltd.
 @author(developer) : Himanshu Shekhar (himanshushekhar002@gmail.com)
 @Date : June 19,2017
 @FileName For Reference : chat_controller.js
 @Purpose : This is controller for chatview
 @Other Description :
 * 
 */

var app = angular.module("app.chatui");

app.controller("ChatUIController", ['$scope', '$log', '$timeout', '$interval', '$anchorScroll', '$compile', '$filter', '$location', 'ChatServices', function ($scope, $log, $timeout, $interval, $anchorScroll, $compile, $filter, $location, ChatServices) {
        /*PRIVATE VARIABLES*/
        var chat_view_state = false;
        var req_que = 0; // This will keep record of number of messages client has sent which are still pending for response.
        var chatWindowTitle = 'Chat';
        var chatid = 0;
        //var typingResponseActive = false;
        var lastMessageId = '';//This will contain last message id retrieved for agent
        var totalContinuousErrorResponseByBot = 0;
        var previousMsgError = false;
        var totalErrorResponseByBot = 0;
        var errorMessagesList = ['i cannot understand. please be more specific',
            'we will call you back soon',
            'We will contact you soon',
            'We will contact you shortly',
            'please be more clear about your requirement',
            'can you be more specific',
            'i cannot understand. can you be more specific.',
            'we are raw material supplier',
            'for anything related to finance'
        ];
        var intervalStopId = null;
        var livechatTokenId = null;
        //var typingAgentIconUrl = 'img/botagent01.jpeg';
        var typingAgentIconUrl='data:image/jpeg;base64,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';
        //var botIconUrl = 'img/botagent01.jpeg';
        var botIconUrl = 'data:image/jpeg;base64,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';
        //var agentIconUrl = 'img/agenticon14.png';
        var agentIconUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AABvs0lEQVR42u1dBZgcVdateIAkJMGCuzssvri7LbC4y4/74sHddmFh0QDLAkm6eybJZOLu7i4TmySTmarqmR63+u+tCbsh/arqVWt11TnfdzZs0tPTUvXue1fOURQAALwNw2ilDNmwnRLS9lbC+nFKOHq+ElFvVCLaw/T/XyV+pkT0X4n9iIPo30bSn+Ppz2n05xziIiWsrqQ/19HfbVJCejn9bI0SUpvp/ze1/Df/Hf0bP6blsYtaflabuvm5RrY8N/2OsP5Ly+/Uera8BvWv5mvqqx+r9NH2UvoXb4svDQAAAADs0Mdor/SLHqCEoudRcL2X+BbxPxRwR2wO3usoUNfSn0ZukTYVEX0tcfbm9/IzbRreVPL0u4nn0vvdT/nKaIcLAAAAAPBrgG9jntzz9LOId1AQfI2C4Y/051gzQJqn8FwL7qkiZx/01cQx9Hn8YGYzItrt9HmdYWYSehqtcQEBAAAA3kf/ih0plX42BbHHlLD23eb0eXVwA3ySDOuV9DlOps/xG/rzEfrzTKV3tDsuNAAAACA7KGzuQAHpaDqp3kp/vk+BaTAFrPUI2hkjlUX0Qvrs3yPerOSpR5qlFAAAAABIGbgBj2v0Lanpryn4zKO0fQOCsOfKCfWbmxb/ZW7MuMeAvzsAAAAAkAKfJCPqKZR+fpq62/Pov0sQXHOWGyhDEKLv8gklEj0RTYcAAADA/8A15Yh2GQWJd8zGvJzsuAclWU2lg9HmpEVIvUQpiHbDDQAAABAU8CmQu8w54IfUWbkazLbpFzX2HFRuHDuywjhvfMz469Qq44FZ1cZjc6qNZ+ZVGy8tqDFeX1RjvLuk1vhkWa3xzxW1xrer6oyfVtcZvdfVG3nr643CjfXGwA0t//3b2nrz3/gx/Fj+Gf5Zfo4X6bn4OR+l575/VpVxw9RK49xxMeOYERXGHvQa+LXk5OfIExghdbo5nhhST1NGGW1xgwAAAPgJ4bI9aJG/hxb5cIvgjXeD+iHDKoyLJ1Qa/0fB/FUKvp9TMP51bZ0xrKTBmBVtNNZUNxnVjc2G11BFr2l1VZMxU280htJr5df8Gb32ngtrzI3JRfSeDh5abnT08mYhpOpUMuhN18qdSnjTrrhxAAAAcg1cx+dxPLNDn5r2PBJg2ufrxv5Dys0T+70zq4y3FtcYv1CgnKQ2GBtqmoygYD291wn0nn9eU2e8SZ/B3TOqzIzCfvTZtMv31IZgVkumiDJG6B8AAADwKMxavn4XBf58+jOWzcDBQeyI4RXGTdOqzDQ6p9r5dNzUbAAO4M9oFX1WBVSaeHtJjVnaOIyyIm3zsr0ZoMwRZ5DC2m0kUrQ9bjgAAICsnvRpIeYFOaIP3DwGltGg0IrYo7DcuIBO9E9TjZxr6LMpTV/fhECeatTSZ8rlhR/oM35ybrWZRdl5YLbKCWpdiycCaRDkl3bGjQgAAJAJ8IIbUm9qMb4xF+KMLfzdBkSNSyZWmqn74ZsajE21uXGkr6PgGWtoNsrqms30O5+wl8SajHnljSb5v/nv+N9Uegw/ti5HNjEb6TvgnoM36DvhPoPtB0Qz73lg9pZEbzANmwAAAIAUghfWSPR6c6FtMZnJyOmea9K3Tq8y/rWyzphPgTIbqNzcXDdjq+Y6bhB8hLryuczAGYjjaRqAX++ulJHYoSBqdOofNXsOWiX5GfBzdKbn4ufk5+bf8adRFcaFE2Lm7+bJgNe2albkkzq/5qosNCvyb5xDWZgvVtYaN9Pr22dweVKfgcsyQZXZRBjRr1F6r9kGNy4AAEBC6X0y0Qmrl5oLKi+sGajbn0CB7XFKL/elMblMNeUVb9UQd8/MloY4bhbsmKvjdVtNNhxA7+X8rRofJ9J7Xp+hz3gdTU7w6CNvVo4bmbF+gpjp6hiKXghTIwAAABmwc15Ef73Fuz69izQH2YdnV5uz8Ok6rfKzLq9sMiLF9WZDIM/R84n9oKH+CPCp2CDweCBnFHhc8L2ltUY+6RKsqEzf5oBLHP3pO+dRS84QZOB9rqKN7MvmOCoAAACwBXjEKk+/1jTVSaM9LgcbrhP/fXmtsTSW+gDD9fNRpQ3GP+j5+SR/EmUUOBUPBb7EyKWHk0fHjPvos+QSwxj6bPX61G/UFlU0Gh+T8BFnKTqkdQyR7I9D+gDaDFwB0SEAAIKNFpOdd9Opt8/pZ66V8yheKgV0FtMGgtP2rJDHm4rdCjNYaw4w+TNm9UFuxvzb/GrjP/QdpHIzx5mgAZQdeJAyQ/umNzuw3pQk7qfvi4UAAIBgoFdRRwr4NxJHpmNhbU313T+PiRmf0il8WYrSyDyCNq6swUzhX06BZ8cCnOq9Rh4JvGpSpfEBlRC4pyJVUwy80fuIsgOciUjfBk8bZja5wtIYAAB/nvZju5Cq2huU4i9Lx6mQ0+2cxl1bnfzKX0KjZVyzf4pO97zwd8hHgM01cn/FabQRfJa+Q+4pKK1LPvvDo5Lv0waDpyDSsxlQN9FmoKfSu2InLBgAAOQ+8ssOo5rnt6l22eMFmDu6uWmsqCq5oM/BgdP5t9PIHzcGIpXvz9IBN17eRbLDPK6oJrkh4MZOVio8ekQ6NgM86qr9S4mUH4QFBACA3IJhtDK1+CN6QaoX8SNJYpfH5ZJJ77PcLKeJXyajGh79a52HABk0tqHvnLM7rKcwWWs0mpMsE7AWAksWp96tkKWttT+b9xQAAIBnYVrtskqfOiOVCyHL7T4/v8ZYWJG4GA/PnH9PVrfXT6k0uqOGD25F7uu4kXwHfiSp4ZIkFB5ZWZEbQ1MuUxzSplCfwHWYHgAAwFsoLOtCJ5WniGtSeUJjW1yuxTckuB7zKf+5+elK04J+JWeEuLz0woIaY4qW2KaT/SBYUIpHC1OaYQqpRVRSe1TpU9IJCw8AANlDQbQbNfa9aTqlpWiB4xGvVyg1vzrBuj5b6z5Ban57DipHMANTQhYLYrOnaQluBlbStfwibSZ4VDSFGwHdbBjkzTcAAEBGT/wR7RVaiKKpWMxYmvUKGuHi+etELHOn0sLMC/TegxH0wfSSvRBYf4C9GdyCZSh4IuFSGiVtk7KsgKrSvfgcMgIAAKQXpikPLTbmopP84rUXBWx2cStOQBOeF2BeiHlBRmACs8EDaaqAywRsAe0WPK7KDYh7pCxTxSOE+pMwIQIAILXgRYUXl5ZFJunFip3reBTLrTAfp1K5c58XXgQg0Es8hCYAOKC7LV1xf8u/aQT1mBEpmyAghUHtYaWwuQMWLgAAkkj10yIS1h7aLFuadGMVpz5ZK99tMxU7uZ2X6mYqEEzTeCFLQ4cSaF5lK2U2RUpJwyo35OZF7zMncwAAAKTBi0ZEv5e4OhWKbHeT+IrbET42aHmSmvl2GoiRPTA3uQtdu6xE6NarYC6NErIoVftUKFCG1ZVktHWHaa8NAABgC/YvD+kLk114dqC5au583uhipprNengOm7X8MbYH+kmF8MyxMVNtstbFXoB7Y7jPpeuAaCoyAnNpYuccLHAAAMQjv/zgVCj3sYPaZ2TdWuWiwD+HmqjYfS0lCx0Iepjd6Bpnd8r55fIZsRjVEj4hn4vUjLaqEdrk74cFDwAAhdKDXalp6GOaK25IZmHhxelfK+tc1T3ZovfccTjtg8HMClxAfS1DS+R7YtjhkDfXuyatJ6DWUTbgHSW/tDMWQAAIIrgmGI7eT4G/NJnFhBejf5D1rqz9Kj/uW5LkPXx4BQIBCBKPogmAH6j0VS95D9VQdu1DMsFKQX/MBtoI3Kn0NFpjQQSAoKDFqGdOstrpbI1aLZnqZ/c1nvnvUYgRPhAUkZUC3yGHQb1e7p6qpHuPHQmT9rYIqdNNwyEAAPwc+Kn2xzXAJGuY7MYXk8z1s2sf1/e364f6PgjKsFP/qPEo9QmslNQUKKd7sSfpY2yfdA+N9pvSR9sLCyUA+Ak81hfWXqCdfm2ii0MXWpRYhCcqeTphE5WrJqVS8hQEg0WWyL6O3CtlZYc1ujfZ/Io3EEn83moqCzwN10EA8APC0RPMEaAEF4R2NIvMXctldc3SEr0s+IPGPhBMXcMgb6bnSk4ObKLR2/tnVSW5+SZL7zz9GCygAJCLaNHt/5hu5KZEFwHuUl4gKeDDi9PVkxH4QTCdNsXXU0ZAVlSLx2vPpimbJDYBjea0APwFACCnav0Xmr7hSZic9CdnPlnFPl6UINMLgpmTG755WpXZXyODMMkSJ2WaFVaXmY3DAAB4GJHyHeiG/SnRG52biHi8SGYciRefW6ZVocYPglnsEbiTZLaLJJoFWYGQJwY6J9UfoH2jFES7YaEFAC/BMFpRuu7GRN36OIjfM7PKrB06YRUtNnfRotMWgR8EPUH2DLiP7l+2GHbCepIXZp+BJDJ2G6g34FpzzQEAIMsIl+1BN+XARBePM0ijfJaEn3kFjRo9Q8YmHfKx4IKgF7lNvxb/jUoJbY6pNKVzyuhYMmWBPCW8aVcswACQtZR/9Dqq9WuJ3MA7k4rYL2vrHBcKXkq+Kaoznc2wyIJgbggKsamWDFiBcIdEhYRCahmVBa7EQgwAmQRreEfU7xMdKbqNUoCqxFjfmNIG49iRkOwFwVzkiaMqjImqs9dACZX+bpiazASP9i+lf/G2WJgBIO3Bv/wk2nkvT+RG3Yec+oZImI9wU9FfpmCkDwT9oCFw0zS5/oABNPmTsONgWFtMI4PHYYEGgHSAzXsi2kvmbG4CTX6Pz612tOjl2uELVEPsCNleEPQVt6V7muWCnbw7uNeHpbsTaxJU6+nPZ2AuBACpRJ6+D83hjkvkxj+SXPdYltcJXDPcDUY9IOhr8glfpvdnApUODh2WaPlPHWE2JwMAkCRC6k0U/Mvd3oR8imf3PSfPHp7nT04tDATBXCOrfDrpB7B19yuUNWifyOQPNyfzuCAAAImk/LXt6Ub6OZGb+1Qa71nkIBfKmUC2Ht0G6X4QDCTZofOjZbVGk8MhYT7JfHNDYYK9Ad8pfUo6YUEHAFmE1SMojbY0EWWw1xbVON7Q08mw55gR6O4HQVA3TqDgPifqfGBgjYGElD/D+gJqXj4YCzsAOCESvZ5umEq3NxlrfU9yGPnhBqAnqRkQKn4gCG7t+vk8WQnXOgwLjC1rMPYenECvUEivoJLAVVjgAUAE9t8Oax8lOtcfcyj2D6Xxv6QMQUAQ9D0PIiOw0aX2B4lofbPx16lVif6Ot8yJJgAAfk/5x3amtP8otzdTNzLv+W2tvWsfC/7wBgEz/SAIytoOszcIB3o7/ESTQ10SMRcKa0NM4zIAQPAvO5luinWJaPivcRD3GLSx3uiB0T4QBBPg7jQyOHyTfTZgJU0SnJqYp8AqCAcBwUWLg98Dm8UzXNXq3qLxvmYH68+HScwDp34QBJPNBjxFJmB1TfYNgiwy5Lq3KKTWUl/AHQgGQLDQe802iWj5cw1/qoOoD3fzHj4cHf4gCKaOPDW00GG0mH0H9kqsQfBLpbC5AwIDEIDgX7Y77Xynu71JLp5QaWgONTme6YVdLwiC6ZIT/nxFre0aVEY9R+eNT6gkMEnpF9sFAQLwcb1fO9ptvZ9TcKzGZRf619c0GeePh5ofCILp56UTK00HQSuwDslzNFLougQZUouU/LLDECgA/yEUvZAu8pibG6IrdfmzQ5cdIsX1xo4FUPMDQTBz3GVg1BjosDaFaW1KYEogSiWBsxEwAP8got/r1sWPTXxYp99O1IdHddDoB4JgNshrz0PUbGwnHsSS5O5NhagxOqzdhsAB5DbYFjOsv+P2xrqRRDbsrHuX08bgSDT6gSDoAR4/ssJYZWMsxCJl106uTOC5tZ7mtBQA5Bx6FXWkC/g3tyN+nyyzb7LhkgCXBrDwgCDoFe5AZUhWG7XDe0trE5Eh/5GUA9sjoAC5g/4VO9KFO95tTW2MjQQn5wNepmbA1tDxB0HQg2SjINYoscMIEhbaaaDbA4w6UimIdkNgAbyPftED3Dr5HUHpfDtVP53G/3gMEIsMCIJe55WTKo1yG28SVg88xG1fQEhfSKJB+yDAAN5FfvlJNMpS5ubC5plZu5tlNgn7wMQHBMFcMxVaYCMcxJomZ451O7qslkA+GPBop792ptsxv7tmVBl2Jn5stsHiG1hQQBDMNXaiEcDe66xHBesp6XnztCq3mYByJU89FQEH8A7C6kW0AahxMz7zhk2tjDcFD0HLHwRBH4wKPjm32rAZajJeWuBSNCisVxLPQeABPBD89avdGPqwVO/Pa+ps6/1njYWqHwiC/uGFE2JGhU268/tVdeYUlCsjobB6KQIQkMXgr93sRuCne4F9p38RNce4F80AQRD0Po8iQ6G1Ns3Ow2iMcHs3I84htUGJRK9DIAKyUPMndb+Q2ix7sXIj3+KY9cXPLn+7DES9H3RPPjntQd7t7NjGTaU3TK00/m9WtfE4pV6fJStXHh/lktOri2qMFyjd+jT93aNzqo27qQeFO7b/PCZmdmXzBhVlJzCd3J2u01lR6+bA+eWNxt6uHAXVJiq/3o6ABGQy7f+4m4v+xFEVxiYb84y89fVo9gMda6lstXoZGbFwEP+BGkRHUzZpNWWNmuxNIl2BVdvm0SLMglN/X15r3Edy06eMjhmd++P6BFNDvpbsfAQ2kLnZcSNdZkLD2oMITEB6wbKUEe1FNxcm1/MrbTpgWPmvDcR9wK3YjVKhl1Cwf5NO7iNJPCVan8IonyBWkAT1r2vrjIepQfVYWqBx3YKJkhUBv1hprXrK/QKcmXL5vM8gSAHpC/4udf1ZvKfGIvjzqY0XUiwGILN9fstmkeVS59ikSL0EXqQ5U/AgXcfQqgATyWo9ReUoK7Afynlubc7D+mvwDwCyHvyvIfOL+ibrC/vyiVD2Czq3o7IP1+tDZJsaa2g2ch1LqMeFNzBsDoNeAlCWf5lifVCqozXU9VoZ1l9F0AJS2PDnLu1/C4lbWGX9uRfgT6PQ6R/khj1uvOtDAinVjbkf9K3AVtasC8+KcPjeQSeeTH0mal2zpS4Kb5RRDgA83/B3/6wqw2pZX1edgAY26AtyipwDIjc4BQ08+sqKbx3R6Ao6eKJsrLUumd45w6VqIBoDgeRO/jTq5+KCe2Juta0Bxr6DcRoKWo3znHEx247nIIFPeLwJ2rUQ9wEo5oGUMbIzRnPfN4URQSChkz+J/EjO+fNCz7PWVuD5f57Txg0enA7nm+jEO1NvRNS3qOuy8tthyIaBArIOwPJK603A3+a72QSwTgDEggB3af+rZRX+OPhz45MVuKN7Zwj8BII8Fsep7qWxJkR5CXCy9xcaKzwYfQLgVuQskZ2bIAtbSTeasmIgZIMBueDPxj5y2v5OwX8KqfuxuhpuaP+n+q+lqQ+7BQuwBtd3Wdhob5TIwC24I62dM2yyaK+TsqU77wAYCAH23f5nunH1s0v7c+MT1NP8TxbEsfN3AOTBo2B8suuE+wbcTPYGmKA2pKYcwC6CsBIGhMgvP4kukpjsxfSkTcPf4I0NkPb1OXeiss43RXVGM+J2ylFMkxI8SgstAZDJG8IRm6w3AQ+5awyM0kbgOAQ84H/oFz2AUkRlshcR66NboR/p+nfIx03r53Q/B6eyOoT+dGMoucNhcgZk8gip3TTNHdNdjAiGtI1Knr4PAh+gKP0rdqS6/zI3Ij/NNid/BH9/dycP2oiRvkyCVTM52wbfAZA3AVaZAO4juX6KC7GgkL6QNgFdEQCDjF5FHeliGC970XCjl5XzGteBkfb376n/VjphVDTg1J8tjCtrMPZBNgDlgP7WPQF8e17mSjZYHan0MdojEAYRPY3WdBH86sbYx0rbn7v90fDnT3alJiR2wAOyj3Ja4VlfAdcl7kmr6YBaWqPPHefCQCis/wDzoECO++lvy14k7NJmZVbBc/4Y9fMnTyTPhtVVmOn3Gn6kkUFk2zAiaDV2y2Wj01xZCWuvICAGatxPXuKXg0ClRfBnhT+I/PiT91KjZx1iv2cxmzbesCCGWJCVYiBni3hE14VvwG0IjEFAKHqhrMofLzCbLMwpWNt/d8j7+o7cxMnjfYD3odU3GxdNgK120BtzrbwD1tM46Z7SazSJv4X0sxEgfZ32146mL7lC5oLgtP5iC0lXdvXDeJL/yN/52DKI+uQSuCn3QdcGMaDfDISsXATnlTeaYkLSGgH5ZYchUPoRvct2py94newpcLSFuhtnBGDp6z/uT9mexdDwz1l8tKzWaI1RwUBbCVtpc7CeRDv58exVSp+SHgiYvgr+a7YhoZ/psiNfP6+ps2wu+dMoBH+/kb9Tq1IPkDsIFUOEK8g8ebR1s/a35D7pQllyklLY3AGB0w/gEY+I+r3sRcQGE1apxssnot7oN/6ZuoUx3+8fQIY72GStFqu7+YUFLsyDwvoXCJ6+qPtH75f90u+cYS3x+zDqjL7jeeNjZlYH8BdgxBVsPj3P2qfFnY6EdjsCaE4H/7KTZa19ORhYHQQ/ofoibix/8Xz6vmtR8vctJqnYBARZufOLlWKbdh7tPWOsrEYAOcP21Y9FIM1F9IvtItv0xw0k5RbRP4/MfaBD7i/yAlCNk7/vMRry3IFlW1qzrcyDeHz04KGSU1whtUiJlO+AgJpLGGW0JYOfUTJf8C4k5GM1RzqVJH6xgPhP3S+Gmn9gwOZNaAwMJjkDNCsqVgtkHZcdZRVcw9oQ8gxog8CaK4hoH8p8sTwaMsZi3K+ILpBdoPLnK/L4Ju/+gWDht7X1GBEMKFmsba3FAW8YjQdKZ3fD+psIrLmAUPQG2YuDa/si6BQkDsWsv6/Iks0roesfWLyzpAb3QUB51IgKy0kfd9eFdiUCrJfRVz2cdmqVMl/mjVPFHf98nZztxk0K9Dy3oTLOZK0RUTDgYH8H3A/B5IUTYoZV28/VkyXHu0N6OfUDHIRA60X00banjv+lMl/kkdT0ZzX+hXE//3UEcwoYABqxucd4oACcHXCh7jqflAI7IeB6ru6v/yzrJb3MwkHqp9Wu1KLAHOCTc6sR+YD/ghUf94SJV2APA33WiQ8DC8laWH5sVPsGAddT8/7azTJfHDcCDbAYDWF7UXT8+4tnjbVO+wHBxRQqB2EyILiTAQsqxOVAlpJ2cQC8BoHXC8jT92mpzTh/aS8vrLGcC4W3uP+8wkug7w9YgIVicJ8Ek6wBYNUU+Mw82RKwqpoGc0CW5/0j+niZL+ziCWKNaP67i+Ep7itypmdICWx9AXtcOQn3fVB5FX33IrDnyzmyfSJhdbjS02iNQJy9ef+XZL4oPt3rFvPfryzEeJDf+Ngc1P0BZ7B9LGeKcM8Ek28vEWeES+m62GuwrFKg/hQCcTaQX34SpWEaZcR+plqMgHE/AARC/EWe8IDGPyALzhSh8TeYZBGgoRaZwvFlDaacsEQpoJ7K0McgIGc0+Jd2Jo3m5TJf8puLxbs8ngTgiQDcCP7S/56GeX/AJe6eAX2AoJLlgFdbCIS9LJ8dXqT0L94WgTljqX/1e1nTF1Hin41g+KSIG8BffGoeUv+Ae3B5EKWA4PL4keKsIU8QnTxath9A/wKBOSPBP3qd7Ly/lcnPPVAE8x25zwMOf0Ci6Evz4biPgstHLPqGVlCmuIusPkCedjkCdFrn/cv2oNS/loz6W8TdrCeYIyzcCLU/IDlcOhFTAUEWCRpksYb8QAJxktbBpaQS2AOBOh0wjFb0IQ+U+SJumy7W+V9f02TsUIC6v994ycRKRC8gaSyJNRntIRAUWPagMtAmC+2QG6ZKbg7DWgjBOj11/xtlvoD9KRVs5fd+/njogPuNPOWxOIa2fyA1eGIuvECCzMssDhPRehejgWH9agTsVKJ/xY5mekWiC3ySKh7r+GgZlL8w8w8A9uCFfkdkCQNNVokUYUxpgzk6KPEc62k0sCsCd8pO//qPMl/ca4vEI39zotD+9quuN4t2AEAq8cFSHBaCTPaEWWThF/DCghrZUsBXCNyp6fq/QOYDP5XGNZoEsaCGOsMPx8ifL8k3IwCkGjxN0gNjgYHmsTQaWC+oLHJ1+YRRsvFEOxMBPBmw73JILXL6oDva7Ngeno2anh+5PY15avU4/QPpwd+XIwsQdD5joSsyt7xRsllUXar0KuqIQJ641v/HMl/UGxZqfzwahpE/f9LK2REAUoE6Ov1BHAimYiM2iXvKXlwgrRL4FgJ5Yqn/E2kH1SSj/S5q+lfrkMbzKznjswlWv0Ca8dZiGIUFnXsMKjfKBQGGN4iHDJMoBYTUBuoHOBoB3Q2+MtqRy9JcGTOHKRba76wFgAvYn7x3ZhWiE5B2cImpU39MBASd988SrzfjyDBIzkxOnab0MdogsEsr/mkvyHwxj88V12iGwuHL12k5q34PAEg1WCIW9x3WnLFl4lLAA7Mkr4+w/gQCuwxC0f0obVLr9IHuQ6IMVQLtd+7gZV14XLj+5AUk5gQAmQK7huIwAR48tNxM+2+NCioP7D5IIt6E9ColT90TAd5Z8S8io9s8xMLHmR3hcMH6l6FiaP4DmcVZY6EgCupm458I/dZLN5v/BwHe9vSvny3zRdxqofU/XW801QBxsfqTuwyMGg3o/QMyjP+sqcP9B5qjfzwCKMJ1U2SNpNRTEOiFM//UJBHR5zh9gDtTEFAF6m9cDThmBAR//My/zYfsL5B5sFc8TMRA5okkAiQ6g5TQVFJ3qWtEm6r0NFoj4Mc1/kXvl/kCfllbJ7xJ31mCkR2/c345mv+A7IA7wXEPgsxPl4u9Ar5bJZkpCmu3IeBvCTZOkDD7OWNszLJRZ5t+2KH7mSznDADZwkgShMF9CDJ5NHR1ldiB9EQ5meD1psot8N+xv49kZv5nRcUnwLPHoUnH77QyegKATIB9RiAsBv7OiyeIbYPZjVaqITCsv4nAz8gvP9hUS3L4wO6xEH/5cTUadPxOvqEw+w9kGw/BVwTcgr3XiSeSbp4mUS7iUfd++r7YAET0AhnjF5H0ayV1/u2GXbnveRDN4AJAtsGjx7gfwd+5N2nR1Ai0aNZVNxnbSZWktb5BF/25UOaDZn9uEV5YgMa/IPDROej+B7wxDbAteo1ACSO61xfJxqagWga36P0vdPqADqTTn8iXuYiaMDriZgwEB22E+A/gDVw6sRL3JPiHhsDimvgAxZkBzhBIlAJmBdMnIKLfK/MB998gXvz/MgU3YhDI0x2iNBsAZAOfr6jFfQlKCdNxj4BkFuCWYAX/wuYOdPpfk6ju+5hSmP0EhWeNhfY/4B2wFgXuS3BrsyArV9ozZGSkw+oyZZTRNkhjfw85fSjtSHZxgaDzm8+Cx46E4l/Q9bcBIFvoNgClR/CPPHm0+KAyk+Tp28jJ098VjODfe802phCCwwfyiEXj1zdFGPsLEgtR/wc8hkvQBwAK+PMasUotj7BL/Pwq6gVoH4DTP/kiO3wYXaixokyg98/Wi2wIg4stOKk1vR71f8BbeGsxpo/AeO5BtsDVgn6lDdQkKDc9oj7g7+A/ZMN29CZLnD6IlxeK077Pwuo3UDxgCOb/Ae9hKPQAQAv2tIhdT8vFrnVKr6KOfj79/83pQ+D6WlRw6ltFY38d8nGBBYnXTK5EtAE8Bz7R4f4EReSTvmgssJQy2p37S2QBwtqjPu38L+tCp381UWGFu2bAjStofBX6/4BHsRNKkaAFWTJahBdlhOtC2kalf/G2Ppz7115xevM7kp9yrCH+9M9uf23zcGEFjZFiNAAC3sQ5MCADLciZ6jXV8VkA7mfqKjdB8oy/gn9BtBu9qajTG3/fQvL3lmk4/QeRi2NNiDSAJ/EwjIFAG95rYV4nJREcUsuU/NLOfqr9v+n0ptlqU9RByS5wbXD6D6QDIBQAAa/iw6VQBATtdWxWVsUfYHiSjTPdEuqAL/oj+PfRtifVvwqnN/z35eLT/w1TMXMbRPKGEAC8inBxPe5T0JZ3WEgEvye1eaR+OV/0AoT0p5ze7J40P1knyPbOJdnN1jj9B5KnjIYEMOBdsMIb7lPQjty3tkRQxuRMdw8ZG/uw9qAfHP8cNf//tVKsoHT1ZJz+g0rO/ACAV8FCZbhPQSfeNE2cBfh0uUQWgD0CctopMKTe5PQm9yXLREHjv7nDhuEPRmkAwIvgJQu9SaAT+RoRedrUUmKAlQOdNwH61bkZ/A2jFdUxZji9wc9WiGv/l0FvG4paAOBhyDVzgUHndVPE2cwPZHoBwvqEXK39n+305nagG6hK0OnN1oo4/Qeb/7BoCgUAr+DgoeW4V0EpT5PZ0fgsAE8EbC+lC6CekoPCP3pBolavV03C6T/o/I+FsxYAeAWnjYEYECjHG6eKewGekvEICGuh3Ar++WWHOb2pjqSZvLFWrPqH2hqYtx4qgIC3cd54bABAeV0AkTrgWvq7dk4eNyG1WYlE988h4R/tW6cP5O4Z4h3Rg1DYAokDN2ADAHgbl6JPCXTBJ+eKG5tvllO6/TxHhH9KelDNos6pJrJQ0Bmp0miNnG8y6HcOI8tVAPAyrsGYMuiCXcgNsFww8jYrKtXzVq1EynfIBdnfN5w+CN45i8BOgLhQQOaYUmwAAG/jr1PhUQK64wcWfjfnSplLeV0euFdRR9PIwOGNjNwUv7izEqCUOhIYCI4twwYA8DZuxAYAdElWvRXp3gzaKCEtzVbBLK7n3c5/9UanN3H8yArhzfTdqjpcIOB/OXwTNgAASgCg//izxYTTEcMrZH7+Gi9vAEY6vYFf1orf/OFybx5EEyAAoAkQzFkea3EI7rVa6hA8yJvBv1/0AKcXvxfJ/oocXgs3wlkLxBggkFs4H2OAYIIcIchw1lMZfDenMjiPBIa0vT14+tfedXrT3OSXeAMEGCT+uhZCQIC38WcIAYEJ8hKLRviXFkg0wof11zzo+kcNCg7WiMU18UIIc6KQ/QXj+fkKSAED3sahw1C2BBOXB14kGIVfVdVk/pvDz6/1lksgNyY4vOErJol3PBD+AUV8bRHMgABvY+eB0CwBE+cTFsJAF06QyCyF1Uu9tAEY5PSCBwiauqqpIaDrANxEYDwfmQM7YMDbaAvJcjAJsptkXXxS3AgVy4wE6vkecf2jhgRTq9j6xbLvcZOg+e/H1Rj9A92ZZwCAF6DVN+M+BZPmb2vjD8asE7CLY3ZJbVTCm3b1gvLfa05v8hULb3c00YBWZKc1APAq2N4V9ymYLLkBXoRn5VwCX8iy7j81InBDgs2LZGe/1VXxeQ5ugEDzH2jF3SlrBABeRf56jC6DqWkGXCmIj0tjTc7xMayuVHoarbN4+qdGBIcXefEEcfOflA8yGOgbQ1QfAwAv4JNltbhPwZTwhQXiDPlZYyUy5KHoedm0/e3t9AIjxfE1DhY82AkdtKADeRcMAF7EY3NwgAFTQxb/EQnksWquhCbAD9kJ/kM2bEediFV2L27XQrHxQe91SJ+BzuwPOWDAo7gAKoBgCtlPoHzKGdAdChwPylGlsLlDFkb/otc7vann54tTG5DQBGX45mJoAQDexK5wLgVTyMsslAEfnyvVDHhFFsb/1LDdi+IGhoUCpaOVckpHIGhcP6USkQbwHErrmtHADKaUVkq5M3WpaZOfMxv880s7k/Z/jd2LOnK42PHo5YU1+MJBKR4yrALRBvAc2MgF9yeYqYzngUMds00xpfeabTJ5+r8p0TdzwBCkzkA58ghpTNREAgBZxPtLMQEApp5HWByaJQ2Crs6k9G8/p/T/ssr4dMYMHeIZoDsOK2lAxAE8hSvJ1wT3JpgOLhCUzeeVy8RN7bcMif9o25MMYZ3dizlupHgn87f5GJ0B3fFVmAIBHgNGmMF0saeFau5hTs6TPJHHk3kZmP2/zelNvLdUbOW6H9L/oEvyxAgAeAVLSJsC9yWYLh5q0ffEByHnn49el4n0/0Cn9H+RQNpwqob0P+ienfpHoQgIeAZfFcHADEwv55bHlwGkpPPDWii9wb8g2o0aABvsXsRJo8Q7mKch/QsmyOGb0AcAeANXof4PppkvWUgDHzWiwqkPoEbpU9Ipnaf/u5xe/MfLxOn/vQcj/Q8mRt48AkC2wQMpXfqj/g+mlwcPFRuhvbVYpgyg3pjG8T8938nAZV11fL52MtL/YBrGYwAgkxhVivl/MDNku+mtsbyySUaA6td0Wf+2NwUHbH65lYf7E3OR/gcTJ1/0IstMAMgknsQ6BmaIVjL6x490KgOoKsXqNuk4/Z/t9KI/XS5O/+85COl/MDm+u6QWEQjIKrCOgZkiC+aJ8J6MCFW47OR0jP+97/SLReI/E1WkzcDkaaUtAQCZwASsY2CGycJ5W0NKFCisv5aODMDcRHYsz82H9j+YmjKAaIMJAJnAo3OQ/ge9IYLmmIkKaVNSfPov28PpxT4yR9ypfbTj6AIIJqeSBQDp7v7vAftfMMO0Gqm/d2aVwwZAbVZ6V+yUwg2Afo/Tiy3cWB/3QjfUNME2E0wZeefbBG8gIMOIFNfj/gMzTjZDU+uaE7sew9rNqaz/h+x+2Tb9okZNY/wL7bUaqllgajlwQz0iEpBRXDwB4j9gdvjr2rq467GCUlLt8h37AP6dmuD/ldGO6v/ldr/sIrpBRLh+Cm4cMLVkJTYAyBTWkK4Jn8Rw74HZ4O3Tq4TX5ZljY07jgJuUnkbrFDT/aWc4vci/C8b/OFXbvQCqWWBq2TZP7DUBAOkAHEzBbJJ7T0TgsWjnMkD0hFTU/99x+kVLY00YmwEzxsfmQBoYSD9ilGrtOgCHGDC7nCkYB5wTlVHX1V5JQQZAnWX3S/a3GP97eSHG/8D0sDPpsev16AYE0otPltXifgOzzreXiKefdnccB9QnJhf8e0e7O724h2eLT2MnjML4H5g+vrMEI4FA+sA9zfvAwAz0AE+3kNi/e0aVUx9AU3LugBHtskS6sktpdKE1GmfANHKngVEzRQsA6cA3RZhgAr1B7vgvF6x1IZlxwDz93LTV//mFVQnG/35eg5sHTD/fXIwsAJB61DfBvhz0FsPF8QdtLoM6H7S1nslsAMbaPfkJFkpFPLqALw1MN7tRg1YUvQBAivHPFaj9g97iA7PEpXa2SnfYAAxNwv5Xq7F78sfnil8UNwbiSwMzwRcWIAsApA6c0dwNsr+gx8iBXoT7ZznJAusVidkDs6Wgw4vquy4+LVFS2wz5XzBjZBXKVdAFAFKElxZgegn0HjnVL5p8+rdMuT1PPyYR97+n7J6Ugzxr/W8N6GaDmeZ1U6AOCCQP3kjyhhL3FOhFivx2VtI1K+EL8FACEwBqxO5J97OY/39qHpSzwMySN6NjShsQwYCkAOly0Mt8yaLcKVGy+tVd8DeMVrQBKLF70lstNIpPHh3DlwVmnIdTjawelQAgQQze2IDSJehpnj1OrAdwndPGNaSvcbcB6Bc9wOnF/GtlvEtRLS3AHfLxRYHZ4auL0BAIJNb4B9Ef0OvcjspTgql749PlElMreeqebgSAbnd6wvnl8frE48qg/w9mj7z5XFDRiIgGuAJPM+H+AXOB07T49W26LuELEFb/6sYB8Gun+WsRpByKQDCNPIm0KRohDQBIYiKZlsHuF8wVfipw3uX1rlN/h+bVsP6ZiwyAPs/uyS6ZKO66vmISmmjA7POVhSgFAM6oIHnVfZH6B30w8XTuOIfeu5A6XS74FzZ3oAc32D3ZWxYSrDsWYIQGzD7b0omO7agBwA63TINiKZhb5I5/EV5xdN8lUb9RRlsJASDtaKcXMXxT/OK6ONaELwj0DPlkB5lgwAr/IQEVdP2DucgigfAZm/I5/myo9BCZ+v+tTjPX7Pa3NWAABHqNl0+EQBAQD25gdqyZgqBH2UegwLu2WuYAHr1eJgPwvt2T9LBIQTwDASDQg3wdo4HAFmBb1QOHou4P5i5ftuhx6l7g2Aj4hswI4GC7J7lgvFiM4KIJaAAEvUfu8BZJaALBxJVoVAZznHwNi3DmWEcRvn4yEwDr7Z7k6XliB0A4aIFe5fY0tjqvHPoAQcezyFKCPqCVDP/Ds6udJgGK7IN//4odnX75T6vjFQDVOjgAgt7mXtQUKDKvAoIBVi7FGgX6gewMGGuI78P7ukiiD6+wrIudA+DZTk8wOxp/khpVCgVA0Ps8fmSFKfsKBAuDqATUFmI/oI84STDmPFmTUATMU0+1q/8/ZvfD7UhqVWS48o/lUAAEc4PnUQ9LHRIBgQHrQaDjH/QbvyqKz8Tz4aa140ZXfcBuAuA7ux8+ghzXRLhnJgQ1wNwaD2xAIsD3mEka6V0HIPiD/iPX+0U4YEi50yTAF3YZgKl2P3zTNLEFMOuv40sBc4k3TK00mrAJ8C3YFGqngQj+oD95xljxNN41kx2tgceJg38fow09oNruh9nsZ2vwGooUG5iLZF1tZAL8h1nUp7Qzgj/oY1oZ8rElusMGoFwxjFYiBcC9nX6paJ56eSUkgMHc5aVUDqhFT4BvwM1R3ZD2BwNAVv/bGpFiCUngPiU94jcAefpZTj+4uirBXwiCHuY55KQVQyog5zGCPEo6IxsJBoSiA/lSKU8e9RTRBuAOux9qTxMAoiWSywL4MsBc59EjKox11UgF5Cp+JH0SXqNwLYNB4SfL4kvyPOEkMQlwo2ACQH/N7of2t1Afun8WJgBAf3CPQeVCnQvA22ArVIj8gEHjo3PEkwC7D3KaBNBeEEkA/+g0Py0CewPgywD9Qk4h562Hd0AuoJrmnnkyCdctGEReYeEJ8OcxDjE5pH0tygCMtfuhe2eKRwAPgrMW6EOpzefn1xjoCvAuVlDz8VEjMH4MBpd8/Ytw63SnTbE2TCQDvMbuh95aLLYg7IC6G+hTcnarrA7bAK+hYEM9Ov3BwLNL/6hlScy+BKAu21oDoD05BTXb/dAva+OlB4trMAII+pvscjm0pAFR1wPgcU2ue7aGrj8ImlQFB5TvVzmZAqn1pu7Pf9EveoDTLxKZD7DONr4EMAglgSfnVsNDIItgO+cjhyPlD4JbcrqeoDlfnrrnFun/6HlOPyCyUv15TR2+BDAw5AA0VcOUQCbB5o3vLKkxtumHlD8Ibs1QcXzD8qoqicx8nnb6lhMA99o9mG8+Ed5cXIMvAQwU21A24AnKBsBWOP3g080xaPQDQUt+sDReC4A9Tto59eaFtdu23AC8ZffgQ4bBBRAEt+S+g8sxLpgmROubjcdpk9UWtX4QtOVDFq6AvD45TAK8suUG4D92D754gnje8Nxx0AAAg02+B7g+DSQPPrl8ubIWLn4gKEn2MhHhHKfYHFZ7bbEBUEfYPfj/Zol3GfsPgQYACPJJlRUxISWc3Ggf5vpB0B0Ps8jO3z3DITsf0gu3zADMsXswWwyK0BGNOSD4X/L98BiNqW2sRX+ALHjE8uTRyCSCYCq1AFjIzKEEMHXLDcA6uwd/viK+0aCSmqDwBYBgPLfdvBFYVYWMgBX604n/9DEI/CCYDNkDQ2Rk+tEyJ5M+dUVL8DeMViQCVGv34F8FIkCrqyACBIJOpYHrp1RidHALIZ+vi+rMpmJcHyCYGopG9H9YXedUAihv2QAM2bCd0y8YJlBCm0EjOvjwQVBul37CqAoz+MUaglceWFDRaHb171CAkiEIpprzBU3I3FPj+LNfGe1IBEjb2+mBMwVqQ1y7w4cPgu7YiWp23KAzYlOD2fXuV5SSROlXtOE5her7sOoFwfRxTGn8AX2SjEpvn5Ie7AJ4nNMD1wi6m7ksgA8fBBPnLjTu9iDN8Y6mG9gPukIc9L8lHfLzyUQJM/wgmBmGBWqAyyolSvR91cNpAxA93+mB1YLV6bMVtfjwQTBF7Erudn+hfoHvKIAW1+RG8yBnMPikwe5jXOKASQ8IZp5cWtwaer1Ek35IO4M1AG506mgWgUcD8eGDYHp6Blhj4zby9eY0Otf4vFAuqKD+heFUuuB7n0/5PIKE7wsEs0v2yhBBIgt3DW0AtIftHrTnoHLhkz9CY0748EEwM2Q/juNHVhh30KbgYxrx4SYfbq5LhycBdxXzyZ4twF9cUGNcTmpj+5C0KGr5IOg9PjVPLNS3s7Oi5r3cA/Cq3YPYjEOEm6bBBwAEvZAt4Bv9ONoc8Kn8xqlVxsPUV8Bp+bfpZMDzwFyu4zQhy+x+urzWeJ8MRN4gI6/nSCyE/TyunlxpzuTzeN62EPcCwZwiHwpEONRx3FZ7njcAn9k96DxaVES4YDxEPEAQBEEwm7zMwg/AWWhL+5BVAH+1e9Bfp4p3F5yOxIcPgiAIgtkjj9qKwJk9258N6z/wBqCf3YMesDAC2g9GQCAIgiCYVR48VNynd6eTIVBE68MbgEF2D2JNcxF2LcQGAARBEASzyb0HizcAfHh3+Nl+PAY40u5Bz1h0GELWEwRBEASzSz6Mi/CY86TeIM4AjLd70EsLxDOGnTADDIIgCIJZZfcCsVYPH97tf5YO//Q/0+we9Poi8QagfT4+eBAEQRDMJvkwLgIf3h1+djxnAObYPejdJbXCJ4coCAiCIAhml+3oMC7C645qvXT4p/9YZPegT5bFbwDqSKocHzwIgiAIZpd8GBfhvaWOfj1zSAhIXWn3oH+uiN8AsKc5PngQBEEQzD5rBf5hrPpprwOgLeYMwDq7B7G959Yoq8MGAARBEAS9QDbq2hpfrHTaANDhn+oAm+we9NPq+A3A+pomfOggCIIg6AGW1sVvANha3PbnQnqxQv9Tbveg3uvq4554VRU2ACAIgiDoBRbXxNcA/r3GaQOglrEdcI3dg/LWx28AlsSwAQBBEARBL3BlVfwGoA8d3h0yABWUAVCb7R5UuDF+AzCvvBEfOgiCIAh6gItj8RuAfuvrncYA6xSnJx64ARsAEARBEMylDUC+8wagnpsAG1ECAEEQBMHcZFEiJQAu/5tpAJsH/bYWTYAgCIIg6KsmwIge4xJANcYAQRAEQTA3WZbIGGBEjyrmLsDmQSIhIBVCQCAIgiDoCSYkBBRRVZ4C0O0eBClgEARBEPQu6wRSwOzj47ABKOENQKndg2AGBAaJ2/SLGrsVlhuHDaswTh4dM84bHzOunFRp3DytyrhvZpXx+Nxq47n5Ncar5LTFTpl8f/Am+euiOqMXlcu47sZ9M6HierOBlkdxBtAkDU/TDKKR2iElDUIO3thg/juP3fJjC4j9N7T8PD9PmJ6vLzX1cGPPEcMrPPWZsRnJ5/QZ/Lq2zhQO49cZ3vz+uROZ38eAze+J3x+/T36/v7/3oZs5bPOfW34eAzf/LH8OkeKW98+/hz9n/rz5c+ff/RF9D+8safle+Pt5bE61cS99X/y9XT250riAvsdT6Ps8nD67PQaVG13IQhWOpqAfmIQZ0HouAay1exDsgMFcZ2da7DmgXzghZtxDQeHlhTXGZxQ0OJiMLm0wFlQ0Ghuor0VkqOFFjC9r8NT9x0E2F9FEWVOtvtlYVtlkTNYazc3Gj7Sp+JAWzqfmVRs30fs6a2zMOGhoubEdbQxxL4FeZBJ2wCsoA6AtsXsQP4kI7fPxwYPeIS/QJ46qMG6bXmW8sbjGPIXP0BsNvb7Z8CPunlHlic+9Q754BMmPYL31abRR4I3j+7RJuH9WlXEGbRB2GojNAZg9dqIDjggvLXDaAOjzOAMw2+5BLy4QbwD4VIUPH8wGuw6Imqd5Pslzqn0p6VI0NRuBAnf97lCQ/XvwCSqJAC3fxzjKzHDjFWeZjhtZgUMSmBF2LxBvAJ6hLJbtz4a0KWwGNNHuQfwkInhh8QGDwV2pJs8nex5rWUjp+mbEGxPfO4/5pJXb00ZMNH4E/K9Xajplof5Bvux/mVJp7IxMAZim9VGER+c4bADC6igWAhph9yB+EhH4l+LDB9PBNnm6cfa4mPExNXax7DQgBofeP4+JZe174qY7wB1YRZWzBJdPrDS2RV8BmALuPVi8AXhgllMGQC/kDMAAuwdxnUuE/YZgAwCmNuhzpzZ3dW+qxalSFrxBapeFVDN30lc34ntKBtx0ytMOD82uNnZBdgBMkIdQg7MIdzr1CYW1EPcA/Gr3oBumVgqf/E+jKvDhg0lzX9q9vklNeyIpS0AOzzrV+tLA7wQCYUDi4L0Uj0HeRYs2l1awNoCyPJXGW0W4isaXHX72R84AfGn3oHPHiZ+cm7Dw4YOJ8nw67fPpB2fI5FFF0YPTgJn67niWHof/9KGGPtwfaBzxRByyQAlyOUkEx/JgWP9Uof95x+5Bx4wQpxd4RhYfPuiGrfNaMko8ngekFs7e36njAIFFOJAe8NghN8C2zcP6AYp5x3Rxmf7QYU4bSK0nbwD+5lTrS6jDEAS34CW0S52Phr604krnlF/S5Ll3IPNYSVoLPF7YDqOF4FZ82mJSz1mfQnuMNgDR+52kUUV4zVFlCAR14yjKIHFtE0g/VlOQSLdiHSvmAdkDW7HziQ9KrKDTNI5z1ki7nZoAo9c7/YIqQcGP9bfx4YNWZBGUt6i5rwG14ozi/aXpuy95lh3wBqbQRgw9AiDzm6L4hlyWuHb+We1K3gBc4PTA1QKpTzbkwIcPingCLUysrw9kHrzhSodZEJ8mWHER8A54b81iUF0xNRBosknW1uB7VWIDcKai9NWPdXrgTEHTFqd18eGDIuGoesSJrGJcGsyCHpwNyV+vYm11kzmthfUnmBxTGl9inaTKxOeyQxUlv3Q3pwcOFdRweVOADx/8naxq9vMazIZ7Bak0C2KzkRKIM3k+G/ApSQ53QJNg4CjKtvKkjuPP9o52V5SvjHZOD+R0v6jhCB8+yGSNc4z2eQupNAt6dREkf3MFE+nkB1XBYHGjYHPOOhL2MsBqg9LTaK2YiKiq3YPZO31rcGMgPnyQBWhQG/YmUmEWxMEkhk7OnMIaKgkcOxINgkEgl/pEt+eHTs3AIb1Y+S9C+kK7B/dcKD4BbAMzi0DzoKHlZv0R8G5aOFmzIDauAXIPfEBj7Q2sU/4my0aL8Nx8pzF9deb/NgBsC2jzYHYVEuEAGAIFlruTQJRoOgTwFpIxC+INHg7/uQu2I75iEjYBfibLcotwl2MPkDZ4iw2A/ovdgy+aIJ7/ZT13fAnBI48dwaY3d5CoWVCoGJK/uQ6eyLlmMjYBfuVlFj4AZztNhYTVXltsALT37B588FCxHPC9M+EHEDTyPPjoUij75Vo62K1Z0MmjIfnrF3AWB4c1f/Jhi/HcfZzu97D+2pYbgIfsHtzRQg6Yld7wJQSLrDQH5B7cmgWNLcMmz0+IkjLc4cPRGOg3frQsfj1m4V5HGeCwfs+WG4ArnH7ReoFf+y9QAwwU2XYSJeHchaxZkJW9KJDbKKKenZ0xIugrhgVluiKpEX1SAP4vJNQAJ6jxJ4KJKtQAg8LdCstNfWkgdyFjFtQmT4eMs4/B5bvWsBb2DUX6KyM3yaoA/o7+FTs6/cB/BCpvnBXAlxDcnSaQe3AyC2IFQcDfeH4+Srd+oehQ9p2M/kefkk7/2wAYRivSAqiy+4E3F0MLIMipf8AfsDML4nt5HXQdfA+eDDgeQkG+1QB4aUGNkwqgpsQhos9L5GTAEwL4MvxLThlj3t9fsDIL4pMhEAwsJvXO9vANyGkePUKsAXDLNKfpPHVa/AYgrObZ/RC7TYlw4QSMl/iZLyxAUPAjthYKYd+AKHo8AoXnUArIaXJTrwinOat//irIAGgf2P3QfkPEWgCsEogvw78pJjT++RNbmwV9sgzjnUEDezxwcy/Wutzk43PFGgCO32lYf0OwAVAfsPshlhNtEsSC95xMB8Cc5RuLcfr3M35vFtqXREPqUOUJJH5ajVHuXCXbP2+NWrqPnac8tNvjNwCh6HlOv3CVoBac71JgBMyd038FhOB9jd/NgkQTPkBwroEjIRCUkxy8sUHY2+H4syH1tPgNQJ6+j9MPFmyIHwVbUYlRQD/ysTnVWB0DAG7wxDYv2Ph5DbIAuchigTgf+3dIjAD2iN8A9DHaUGqgxu4H314iTgl37o9RQL95TPNOEgAA/4OlY/cdjF6AXCL374jwykLHxs6oOfYvBHsE2/zwX6eKRwHZOARfin943ngYwQBAkPDFSvRy5RLPGiteo69ykvsO6RMVS0T0n+1++LBh4rnD++AK6Cv2XgfVPwAIEtgxEpnc3OGjFiVantZzaAD8xmYDoD3vZAUr6hb+bAV2j37htiT8U9mIqjAABA13z8BBLlf4TVF84y6PdbZ2dgF8wm4DcKXTL54pMB8YUwpTIL/w2smQ/QWAIIIVIrEG5gYna/FxeJKMOV8oeqH1BqBf9ACnJ/hhdfzOg8ViWuFL8QV/W4v0PwAEFfsPQTOg18mnfFGW9qsiiWmOcNke1hsAcxJAr7Z7gict1If2GIQLJ9fJ2uAxzP4DQGDhaCQDZp37W6jyPjTbUZXXZgLgv54A2uREOsQvmViJLyfHefoYdP8DQJAhlUYGs8qrLcq0pzt5AIT00YojQvqXdk+y80Dx/OHf5sMTINfJM6QAAAQXLPe+pUcEmDvrdNcBTt+b+onzBiAvep/TC9hYG58m/g/UpHKeIzc1YAUEgIDjpmmYBvAyWe1va7Cip3P9X7vNeQMQjp7g9ERDS+IDxdIYJIFzmR2o/l+D8T8ACDwgDextrhZ48rBMv+PP5qlHOm8AehV1pFRBYyIucVwewBeUm2Q1RwAAAKnTJJgVcrO9CI7NmyG1VvnKaKdIIaTPtXuyiyaImxAcZQhBz/KBWTD/AQCgBbvgMOdJ3jBVHHvPHuckx69OU6TBcoEOVrGiZPH7S6EImKv8cmUtVj0AAExchqkuT/Ify+PXaZ7c3q6f44btc/kNQFi/x+mFzInGKxFNwAhJzpLHfwAAABivL4IegBc5Q6DEO5VUAZ1/VrvFxQZAPcLpCb8QnBjZJ6BjP6SO/KIsBQBAMDFoYz3WRo+xE5k1iZbpj5dJZN5Z5VcarAgY0ivsnvDmaWJr4NPGwBo417inRWMJAADBBBoBvcdzx4kbtdm/xaEBsMxZATCuD0AdYfek+wwWB41n5kEQCAqAAADkMlgQiEeDsT56XwCoR6GjDH+B4hoR/S27J2Xzn3XV8fOI+euROso13jq9CiseAAB/wGHDKrA+eohDBPo7yyulBIBeTmADoF7s9MS918UrEm2qhTNgrvFlSAADALAVrsRYt2fYhvq0KgRGbT+ulhBtytPPcr8BKCzrQpuAJrsnfnSOeHb8oKFwBswlfreqDqsdAAB/wFMo53qGR42oEH5H9850km1W65Tea7ZREkJInW735MePFL+ou2ZASzqXOHgjRgABAPgjPl0OXRev8MHZ1YmVaUL6OCVhhLWP7J68bZ7YP/7XtdCSziVO0xqx2gEA8AfA4M075N66raHWNZsj3Pb1f/3NxDcAEe1KpxfWf4P4hbXJw5eWK1xR2YTVDgCAP4BN37A+Zp/t88UHbe7Bc/756AWJbwB6R7s7/YL/s9CQP2kUOkhzhXo9RIAAAPgjZuqNWB89wLPGise075juWP9vVPqUdFKSQkSdmYgewKuQkswZFUCEfwAAtsbaaogBeYHvLhH7tDjO/4f1CUrSCGvvOb3ARRXxNeTJGnaPucDuBVGsdAAAxKGGdGexRmafIt8dqexMWH81+Q1AKHqe0y9iLeKtwafKHQvgC5Cr/tIAAADQdMkudysUr89vL5HIsIfU05LfAPQq6kjNgDV2v+j88eIaxY1TMQ7ode47GBsAAADEgBxwdnnnDLFK6+lOnjshvVz5yminpAQRbajdL+OLpKoxQZUiMKs8eCg2AAAAiNGlP7K42WQfgdpulJq22zpN2YX0fCVliOjPOL3QAYJxwJJaiTlFMKs8YngFVjkAAITYaSA2ANkiB3nRhFZfmfG/sPZQ6jYAYfWIRJWKjhuJcUAv87iR2AAAACDG7oMg654tnjpaXFqXU9qN7p+6DQB7CUf0VYnUkl9YgHFAL/PEUdgAAAAgBq/rWCezw9cXiU3adnMa/wvpC5WUI6x/5vSCF8fiFeWmYBzQ0zweGQAAACywFzYAWeNswfgf/51E+v/91G8AQtELnX7xR8vEggX74CJCDwAAADmHXdAD4KnmbLnxP+2M1G8AeBwwrFfa/eKTLWoWT8NW0rM8EFMAAABYoOsAbACywZcWiNP/x4xwcv9TdWWU0VZJC8Jqnt0vZ9GI1VXxZYCpKAN4lntDBwAAAAts2w8bgGxwbnl8+n8JldgdhZnC+i9K2pCn3+H0wj9YKi4D7DcEZQAvskchNgAAAIgBV9fM89Bh4rLs6zL+OqHoDenbALA7YEhtsHsBf7LoKv/bfJQB4AUAAECuoIlG0LFGZp49F4rT/4cPd0z/1yr5pZ2VtMJBFbCVhb/8DFhLepKs4ggAALA12IMea2TmuUBgrsd/53z6T6X6n2UfQPR+pxfCnYoiHIAygCdZ2QhDYAAA/ohVVbAD9spU1isLpbr/b03/BqBfbBclojbZvZCjR4jfBESBvMkiQeMmAADBxnRkbT0j/sNjgfY/q9ZTj15XJSMI6aOdygAiUSApEQMw4+QpDQAAgC0xeGMD1scMMqm4GdILlYwhrD3o9IJeS3gnA2aahRvrsdoBAPAH/LwGbq6Z5FEWmfPn50tkzsP6nZnbAPSu2IlSDo12L+hwi1rGq4tQBvAa2bYZAABgS3y6vBbrYwb5jkXvnOMIPXf/99G2VzIKTjk4vKH5AjEDFgrCbKm3+KGFdgMAAMHFS+jZyhjb0TTWhpr49P80TUr7P6RkHBHtFqcX9uw8sUXwRRMq8aV7iI/MqcZqBwDAH3Db9CqsjxnilZMqhd8Br80SP39N5jcALDgQ0avtXtjOZCRRL2gwDxXX40v3EC+ZWInVDgCAP+DPY2JYHzPEgg3xfVg1NJ7dzcmLIaSXmz49WUFE+83pjfVdF//GSF8CLlM54DwFAEBw4eg7D6aEewwqN1UXt8ZPq2WaMNXvlawhpF7i9AIvGC92CHwWDoGeYXuqPzVBCwgAgM2optNnK6yNGeHLFtK/p8tkYPL0s7K3AWDbwYi+3u4Fts4TC80slXE2AjPGVRADAgBgMxZWQLMlE+T4KFp7F9Hn7+z8p65Uehqtlawior3r9CZftPA2PnMsakxe4YhNDVj1AAAwwTVprIvpp1WG/CmpDLn2ipJ15Jcf7PRCuZYkkpuH0IR3+I/lGAUEAKAF7y+FBkAmKOqR48b5nZx65EJqM2n/7614AmF9gtMbzV8f/0Zr6Y06djmCGeEdNPIDAADAuGkaRgDTTaspud7rZLIv2jDFMwjr9zi94EsnJjXnCGZJhhIAgODhsGEVWBfTzKctdHLOGy9RGg+pN3lnA9CnpBPNI1bYvWBW/1tbHb/dYbVANANmn23p+6mBLTAABB48AQC11vQ3/y0RGP+spIbA1nmOwb8se7P/ls2A+j+d3vSrFgZBF4xHM6AXOAWugAAQeEzRMAGQbl5ukRGXMv6JaB8onkNYPUJG8KBBcMgcUgLbSS/wi5VoBASAoOOrIjRnp5tjSuOnruooIdBDRnwpVH6g4kmE9HFOL/7fa8TOc1yDxoWRXd4yDY2AABB03AEPgLTyhFHifqtvV9XlWPNfvDLgTU5v4BiLZrMfVmPXmW3yuCYAAMHGPoMhAZxO/ra2Xvi5SzZeXuPdDUBhcwfSJt7k9CaGlcSnP3gcAtrT2efiGBQBASCoYNVWrIPpI2+uRL3WksJL65WvjHaKpxHRX3d6IxdOEKsfvbME/tPZ5j9XoA8AAIKKXsjEppWfLBOvr2dJqeJqLyqeR3jTrpQFqLd7Izz2N688vuNcr282OvWHMFA2ee1kWAMDQFBxO+r/aWNXEr2LCbrgp+syo/BajdK/YkclJxDRf3L6MG63UJ57FMJAWWX3giicAQEgoNgL9f+08VkL4Z8bplZKdP5rXys5g7zo8TIWtMU1YiEEiFBkl2PLYAwEAEHD3HLM/6fTcl0U79gJsK1MvOurHq7kFCRGAv82X7wj+suUSlw0WeRjc6qxGgJAwPD6IvRgpYu3WmS8H5PKeGtDlZxDWL860ZrIDB3ywNkkCzahCgAAwcJxI6HFkg5yRnu+Rc9bZ6meN/Xi3NsA9DRaK2FtcaJdkVdNQhYgm5wMWWAACAxWY/wvbbxxqvj0Lzn1NkcxjFZKTiJPv9vpDXLTSV2TuB7VGr0AWeMz81AGAICg4B/La7HupclkTWT6w8Zru0rJ/nrJ9S8RYaCQXuz0Jj+zmD2/Hr0AWePeg1EGAICg4IyxMGRLB62m3T5YWisT/IuUUUZbJacR1p92eqO8ExJZ0S6saMREQBY5tATTAADgdyyrRPo/HWxHnf8rKuNP/5UU63YaKFH7D2sPKTmPwrIutJPRnd7sRxa9ADdPgzBFtnjdFIgCAYDf8eICdP+ng/fMFJ/+31ws83mTpH7/4m0VXyCsv+b0hnemHVGlIAuwNCY5JwmmZXZ1Uy0KAQDgV7DoF0/9YL1LLTvQ2smNlVsjSp3/3QbIdP5rzym+QUG0G/UClDu96bepK1KEO2cgC5AtfrgU3gAA4FcMoTIf1rnU88HZ4ibqlxfWyNT+y5T80s6KryBhEsQytOUCXQB2qOLTKC6szPPgoWgGBAC/Ao3Wqec2/aJC1T+1rtnoIjX3rz2v+A69o90pC1Dh9OZ7LhRnAe6biSxAtth/Qz1WSgDwGdZUo7yaSSVVVr6VqP2r/jv9/68X4E2nD2B7qo9o9fFnzrV0sfLOChdY5nnamBhWSwDwGZ6eB+O1VJPdbDcK+qZK6O+2k4pfuWD5m1wWwLEX4Pn54iwAulWzx/EwCAIA34BLrV1gvZ5ycoe/CI/PlTz989ScrxHRXpHZRYm6z3lKYLdCdKxmg5dNxEggAPgFPHaNdS213IfE02oFqrbcD9BRLnv9jOJ7cH2DZxwdPowHZonrKD+ursPFlgWyOdO8cvgDAECug/usWYId61pq2WeduFeK1QCdO/9JMbf3mm2UQCCsPy7joDQnKg44J46Ca1U2eOUkZAEAINfxVREOUakmSymLMFWT9LQJR+9XAoNeRR1px7PG6UM5e5z4Q52oNsAuGL0AAAC4BEuu7w7hn5Tb/c7UxYfVU0ZLeCyE1WXKV0Y7JVCI6HfJfLjhYnFahS0WcfFlnnxBAwCQm5AyoQFd8a4ZYsnfn9fIZlrUG5XAgV2OIvp8pw9nvyFiu2AeC9wWY4FZodWmDAAA74JlaFlsDWtY6tjFYuyvijItchLL6gylp9FaCSTC6kUyH7KVRHDPhRgLzAYPInXA+iYsqACQS8AYder57hKxVPrL0rFJO1MJNMLaEKcPqTPtsjYIpBWraZe1J+pZWaHVpgwAAO9heaX0KBooyf0tstNsAiQlWhdW85TAI089ktIgTU4fFo9SiPDLWnS0ZoO8mCyvRBoAAHIBF0+A5n+qGbEohUr5K4TUBiVSfhA2AC3iQN84fWA8SsEjFSJcMD6GCzILPG88GgIBwOvgQIX1KrW8wmIkemyZ5IRaWP8Ugf939CnpIWMUZNWBzm6B2yG9lRX+mzpdAQDwJipRJk1L49+66vjsJ7cCHjdSRqOGJH8j5Tsg8P9RHOhpmQ//h9XigPMhxluywp0GRk2jCwAAvIcn58LwJ9X85wpx49+XK2VjkPp/CPhxWQCjPX04i5w+vB0KxD4BTfRXf4JCYFZ4CXwCAMBzGF3aIKdCBybtjMp6/+xkK1H7n0Wxrg0CvjALED1f5kv461RxQ+Bskg5ul4+LNBv8x/JarLgA4BGw29/e0PtPKTtQbFlUIe5DY5l0qecJqach0Ns2BKoRGWOaARvEHZjPzcesa7amAubCLAgAPAEpAxrQFV9bJB597rtOsskyrP8bAd5xLFDfh6YCapw+TG5siTXElwLYjvHAodj5ZoOHD68wtcYBAMgeQuj6T8vaJhI/00ldsYecRX1MCW/aFQFebizwOZkv5aHZ1ah9eYy3Wug1AACQfrA2R9cBmIhKtdnPJFVsgnb3DMlMS1h7BIFdFuyMFNHnyWgDTLD4Yu6ZiRRYtvjxMvQDAECmwfrzR41AI3Sq+bDFQXPkJllXWnUaGv/cKwSeKvPlHDasQijHyMYXsL3M3o55aAlsgwEgk7hpGg49qSY3UopKzVzqPGCIlNlPk9JXPxYBPTGfgK9kvqRXFoqbM4aVoBSQLXYbAKlgAMgUPl0OHZR0HGRY2U+EZ+fJ6itoHyOQJ4qCaDclpG10+pDb03jGfIsOdAhhZI+HUHamrA5NgQCQTgyhg05bHHRSzhcWiA+WM/VGuc87pK8hldtOCOTJKQT+RebLOpFEgEQN6FweOAZ1sazxJPpeKjEZAABpwQwKRp36o+kv1eR4Isj8m5MAx46UjCch9RIE8NSUAkIyH/hLFju2hSTesA28ArLGCyfEhCM0AAAkjpXkgbLLQKxrqSZvqJZZlC+fkU796z8icKcK/WK7tBgoONdsxlnUbD5bgRpZNnkjqTciDwAAqQGX1g6C3kla+O0qsd/MiE2SPWVctu4d7Y7AndoswM2yXZvlDeJQw5r1uMCzx/tmYhMAAMmC17cT4XuSFl4zWexrota5mCoL61cjYKcahtGKPtj+sqdNEdi1Dimz7PJOEs5owi4AABIO/ich+KeFHOBVi6blqyfLHh61PgjWacsCkJSiRCmA+ZOFbfBA8hBohYs9q7yZ5pXRFwgACP5eIaf2h28Sl4+/KaqTtfktUcKxnRGo0yoTHL1O5svoQo0c3CQjwoOzMRqYbV43pdJowCYAABD8PcCn5onV/pbGmuSnLPK0yxGgMzMa+G+ZL+TU0TFhupkNg44biZsp27x4QqVQZQsAgD+WLv+E4J82njxaPKXES5P05x7SvkZgzphMsN6VPvS1Ml/MqxYWjqsoO7BDAfoBsk2eqS2uwYwgAIjA42j7D0G3f7rIPWFW64+8tby6AoI/mc8CnCPz5bBi00QLwyBW0GoDBa2sk62d51ooOQJAUDFVazR2QtNy2sixgZ1jRRhVKhsbSOs/pJ6GgJyVfgDtA9nRQCtJ2jcX1+Bm8AC5Z2MIDIQAwAQ3K28H8bK08iML19KNta5G/t5AIM4W+hjtTatFiS/qvPExy/GzKydBH8Ar5htvL6mBVgAQaLxD9wBMzNLLG6aK5/15OumMsTHZ5xmvjDLaIhBnVSUwegB9ETGZL4xrOiJwhy1UtbxD3pCxnTMABAnsmcHTMVgD0svDh1v7kzwuax4XUnVq/NsbAdgbpYBbZL40nv+PFNcLv/gFFTDV8BLZaxt9AUBQwNbZRwxHp3+6uT3ZlPNonwi/rK2T14jJ069F4PXUJoDMFyRrzYsqxIGl9zqIBHmJ21IN9MuVtYgOgK/Rl9adbgNw+MiE2E/+evEBkA8b8j0X2r8QcD3XD0BjGCF9ocwXeCj51FvNnz85FyJBXiN7OGzAqCDgM/AaxNLYuMczwxcs3GK53HiA/KjlHKV/8bYIuF5EftlhtAmokvkir51s3QTC9rW4YbzFHUmzwap8AwC5hsk04of5/szxcjpEWHUVXSZrEhfSy5VQ+YEItF5GSL1J9qJ4b6k4vVxBO/OjRqAe50XeNr3KcqQTALyOOkpk9VxYY86g437ODI8nsbEqi6a/1xa5GgO/BgE2N0SCvpAVghhhYQCxtrrJ2K0QO3SvZgN+sDB7AgCvYgIJkh02DAeLTHIv0oCxKh8WbqyXH7cMax8hsOYKCps7yOoDsNKWlWnQrGij0RmTAZ7lWTSvuziG3gDA2+Ax4/+bVY0G4yx0/M+3mCTiSYDuslLwYX2C8pXRDoE1p0oBNKMZUktlvuBDaFeuW8ydsyIX0nXeZft83XiRmntgKgR4ETxZJK0qB6aM7WhdGGahLFpa56rpb4OSX7obAmouIk8/izIBjTJf9JljxY5QjC9oFA27d2+zB5Vrvibf7kbsAwAPgHX8TxuDZuJskNfq71aJS4TsBHvKaNnvRa0nnoJAmtsiQQ/LXjg3T6uyvKHZLxo3l/fJYiqDNmJaAMgO1lHvEDeq4sDgvXE/xl/cKC2G9XsQQHMdhtGKdnHfy37pLy8UXzx8sOTRQdxgucFzx8WMcWUwFwIyA5XSyhx4YOCTXd441foQ94ybQxw3kgM+Qa+ijtTFOVk2fdTLosO8hvLLJ49GWi+XeA5tBMaUYiMApAfcO8SHhi5oFs46T6eSS51FGfdLN2XckD7ONJoD/DQauGlX+mLXyDaWDbcYD+SdPjS7c49n00ZgFDYCQIrA6nE8Q749JHw9wWNGWDdy87ifdCN3WF2p9K7YCQHTl5sA7WhZ58CuNiMkPFd6INwDc1YU5Oc1dZYNnwBghyIaGX5sTjWMwzxElnbfVCsO/q5GuVnpj9VkAV83BV5G44HNMhfE3jYiEmuo2Yf/HTdgbpJFnt4m33UVqoKABKZQVz9b9bbBSLCnuB+N8xVbrNEs5iY/gknTYuHo+QiQgcgE6E/IXmDH0YmxwmLGfBlZeO4KtcCcdxy8iwxZJqooDwB/RDX1/LDi5Kno+/Ek96DgXmQh4sblgCNdlWrVBxAYgzQZENK/lL04/kzNJdUWA+ZcJtixAOlAP5BlWj9eVmsKhQDBxRxKGz88u9osA+K+8CZ3JgVXKxVQFgU7aZSr4P8JgmLQMMpoS5mA/rIXyfnjrTtMZ+iNaAbymbogzwuz+2ANlIUCAa4h/3NFrcvAAWaDLOHLmzSrSS0WdZN/Pq2v0tNojYAYRAzZsJ3seODvlpJWirNs9IEZYP+Rx7tuJWEXloRG46C/wBr9nOJn+2/IfecGuaGP+zFE4PvzogmuhH7GmiPiQIDBIx9hdZnsRXPDVGtfaR4d7IhNgK9PHndSvwBnBiqRGchJcHmHg/7VJOqFezX3+nWsND34drzajVBbSF+o9I52RwAEaDIguj/VgUpkLx5uGrMCnxSxsPifHahMwKeNzyltvLoKqQEvg2vF7y+tNXt5WuOkn7PBf4iFuQ9vxW8hGXcXz7de6aPthcAH/A950eNpV1ghexE9QrPAhk0mAHPCwWsg5MaxMGUHMFqYXZRQPf+3tfXGvTOrzDExXJ+5n/YfbSPidd9MF8E/pOpKX+0oBDxApBFwJl0gtbIX03PzrU0nuCcAjYHBJJ8yj6Xx0SfnVhv91tcbG2uxIUgnWKsjjz5nFujh0S8Y8fir7GZV82c8MbfaTdq/SslTT0WgA2wyAdrlshbCzDcXW28CeDoAI4Igcx8SjforGZV8QmOGk2hzWIuqQULgSZzJFBA+XV5rfp4Q4/Ivdxlo3e3PYA8GF6N+9UooeiECHCCTCbjFjff0GzabANYJgFgQuDW56/xwOq3eRLXLd5fUmnrlbCUL/A+cOeG6L9fvucbLp/t2+bh2giLyYzXn/3vwlzf3YeXX6HUIbIA8wtpDbi7Yv8237glgxUCcVEDZlCc7TrKnPG8suZbNmSQrNcpcBwtszaVNMvdOvEPSzNxgy816LPSC6yG48r5FNo21T7pJ+7fwXgQ0wD1C+lNuLjRuArMCewfAQAhMhjvQ5oBdzy4jPYoHZlWb5SceaRtGp2ROlbImuldKC7xf4Wa8BRWNZgPXf8iA6T06yXPz7FWTKo0/keBOD8qMoV4Pbm3sY6Xt3+y24a9F6OdhBDIgmXLA824uOJ4Tb2q2blaClTCYia7pfSnjdAIF2QtIwZLno1nM6P9o0/DMvGrTxvZDCsaf0Qgj+6R/U1Rn9KKNxL8pSP+6ts7os67ezDywayJvML5dVWf8a2WdOfLIUsmcmeAGWN7w3kHPy6qJPBJ5CmUueJPbjZpfEdjBRCx9rWS4ec7f5agf80kEMCAVm4Cebi48FguyytiW0QV+MsxFQBAE/8vTqezDBj5WCn+uRH5aTv7PIXABqQGbB0X0t9xcgCwbbJWOZb3qa11f0CAIgv4jN8LW2ayVruR9W4L/KwhaQOo3AWH9TTcX4nmUfq2ykIzlv32K0rFIlYIgGETy2vfiAusJKnb1c2fsszn481oNAGkqB7zi5oI8jVJb5TYd3F9QDRZGJCAIBok8zvkd9ZZYgcsB7p0ZkfYHPNgYyKpw62uabP0DIB0MgmAQyAqpw0qspX3X0sTUke6bpdHwB2QQLkcE96Ku7Hnl1qpWs2iMa/dBGBMEQdC/TM86iFE/IBtwKRbEO9+hDjvfo0ZgTBAEQf/xeMqEbnDIhHZ2kwllhb+wfg8CEZDNTcDNbrwDnGpfrPjGs9tYMEAQ9At5KsqqIZrxpeteKNL2h7wv4AmYBkJaTaq6X/k+eRoTAiAI5jjZGZPXOjsha9drHbv6wdgH8FhjIFkJ6xWpmn9lsCIbmgNBEMzVZr98smm2AuukXDfF5Yx/SNVh6Qt4NBMQPZ5SUyVuLugzaM5Vq7feH7OW+sHwEABBMIfIkudLbdz8WPL3VPeKqOuVvtpRCDSAhzMB0f2VsLrMzYXNAX6ljfsV9wWwgQoWFhAEvU6WQrer9/PGYP8hLg81IX2h0kfbCwEG8D56V+xEzYGT3VzgOxbYz8Yy3ia71DYQDQJB0KPiPmwWZYfCjfWm5bWr5w7rY5Xe0e4ILEDuoH/xtnTh9ndzoXNwZ090O/AY4Y4F6AsAQdA73GVg1LR9tgO7ULZ2fYDR+iq9ijoioAC5h1FGW0pdfen2ZrqGjIJiNvLBq6hcwDO1WHhAEMw22d202Ga+P0o9TpdNTKSEqX6i9DRaI5AAuYsWE6HHTdEKFxf/IcMqjEUVjbYdtI/MwaggCILZG/HjEb56m0kmVv07wG2939RVUR9A8AB81ByoXUYXd8zNjcCqWKHieseaGqffsCCBIJgpslzv8E32Kf9f1tYZ2/VzvTZFlXD0fAQMwH/gEZaQvsbNDcEn/Gdpl91ko6SxqTbRFBsIgqA7XkslSrWu2VbI7LFEspNhdaWSX3YYAgXgX/Qp6eF2QoB57riYOTtrB7YW3rYfsgEgCKaeLEr2rY2MOWMjHUZY28T184f0ceb0FAD4HoXNHWgT8J3bm4SdtMaX2afduG/gWDQIgiCYQp4wqsJYVtlku/bwFECCjqb/VPoY7REYgIA1B5KbYEhtcHOzsGHGywtrDBudDbMph5tzWkMzAATBJNhms5a/zVCS+W/PzU9Eo4QMfeDmBwS8OZA8BNTSREZvVjjsyEdQk84egyAjDIKge+5NGcexDhlHVvX706iEMo7raQNwCgIAALDEZUSb6vYm6kI1uR9W29fkyml7ft/MKmQDQBCUPvU/PLvaVouE8U1RQl3+rOw3Qckv3Q0LPwBs2RcQ0T9PVHs7Wm9/s46h+hxMhUAQtOPhZOIzUbU/9fMEAIuVJfQ7wtpHyldGOyz4ACBCSL2JdsiViTQIjnGQ4mTxIK7ntc/HQgeC4P/YgdYEluqtt68qmrP/CTX6hfRy+vMaLPAA4ASehWX3qwRSdy84NOww5pI614mjMCkAgqBunDYmZiy0UR1NQWPxHCVUfiAWdgCQ7gso6UTCGL0SHdlhCU478B7hE3Lu4tleLIIgGDxyDxFrhzhhVjSZ0WLtX6YxGgAACZYEQnqF2xuP0/yc7q9zSOmxsdBFE6AiCIJB4hWTKo111faLQw3NGrMKabtESoYhVVfy9GuxgANAsohE96eRmWmJ3OhsKjTOYZSH0XtdvTn2g8URBP3L/ciYJ+LgL8IYSbV+9yY+/+V4JaTtjYUbAFJWEiClrLD2vltXwd9dux6YVW1UODQH8I7/jcU1iY32gCDo6XT/u0tqHTOCOk0T3TWjKkGXUbWJGpjfMG3QAQBIR0lAP9utodDvZFGgfuudd//s7X3rdGgHgKAfZvrvpoDOGv1O6EtZwF0LEz31qyvocHIaFmgASHs2QNuebrofE7lReWd/3ZRKo0RiQZisNZqKg1hIQTD3eDp198/UG6U2/FdNSqIPKKR9TcI+nbEwA0AmwU02IbUskZu2e0HU+M7B2et3/LymDpLCIJgj3Id6efqsc8708RHgS5oC2H5AoiU/tUTJ0y7HQgwA2UJ4065UEshPdLE4iUYGJ6nOTYJV1B/wCpkQwW4YBL1JHul9k3p4apucN/Ws8X9cMq6hYa23Eo7tjAUYALIN01lQ/Wui2QCu9d88rcpMBcqkCx8infAOUBMEQU+wI23KH5tTLVXnX01jv9dTCbBV4un+jVD0AwBPZgNoRx7Rfkt0IeHu/9dJDrSmUW4huZdMhtphIwCCWZPvfZA24zIbd87gsY34Nsll8H5Ueke7Y6EFAE9vBPSr6WbdkIwNaG+JGiKDLYlvp4mBtpgYAMGMkDfdvPnmTXhGenh46iikXoKFFQByBS2TAv9MRDfgd54xVq6LmLGEfMFvojJCG2wEQDAt5E02b7Z50y2DqTTFc0pSUzw810/ufSxLDgBADiK//CTTjCOJOeJ76LSxoUZu0VlApiJ/oRojNARAMHWz/DdOrTI32TLgksDtSet4kPJoWD8OCygA5DrYfzusP02pvKpEFwTu/mc3sNK6ZqlFaDYZiPCihR4BEEyM7OfBglzzy+WycKztwc2AHZOr88fo1P8IKY+2wcIJAH5CnrqnOb6TxKLUmUaN2GSIJUNlsIYMR56cW21KkWJRB0FndqW5fDbhKZbMuql1LaY9KZDw/skcKwYAwMdgOeGIPj/ZRYonBmINchuBcnrcB0trjT0hKASClgI+bNHt5p7izv6kN9chdRZkfAEgaGWBiPYYbQbKk1k8diRFwfcosFc3yi1avLZxV/KxyYiQgKCPeAKJcf22tt5okruFjEq611jwp9uAZE/8qkp8AOl+AAgqWDsgrH9BC0FjMotJDzIR+XS5s9vYlhhBlqOXTETDIBg88jV/OV37Y0obpO8X1ufgLNpOA5M+8TfQPf+pEinfAQsgAAA0LVB2GC0OBckubDxvzItUhWQak7GIJgeeoD4BziYgOIB+JgdvbqaV7ehnRKnf5p0lNUk49W0p4avmUeA/CAseAADxCEXPS2Zs8HeywchTtNCtrZZf6Dh7wKnQc8fFkBUAfXXav2B8zLTbrXeRIVtFQj/c1d85FQ20IXU6lfzOxAIHAIA9uCYY1m6jRaMoFapl7DPAY4FuwGInLyxI0akHBLNAzoZxk96qqiZX1/50Et+6YWplatQ1Q+pyKu/dqPQ0WmNhAwBAHoXNHejU8PBmA5CkFiI2H+GT/aCN9a4WQ+4t7Le+3rhsYiXkhsGckOm9clKlUbBBvqnvdwygnzmT1DdbpeK1hPRiJRy932z2BQAASBhDNmxHGYEXaGGJpmKRPHJ4hdFrdZ2rdChjHZUTuPv5iOGYIAC9Qw7YR42oMOv0soqZW5a9vl1VZxw2LFXXNHf2688ovddsg4ULAIDUoSDajbqHX03VRmA3Su+/tMB9ivR3yeGelF49dBg2A2B2yBtR1sJYHHN//XKJ6/n5Neb0TMoCP2/SC8u6YKECACB9yNO7UmmgJ9UX9VQ1SV04IWaEiuuNhmbXa6kxl6RSeSNx0FD0C4DpJW84eePJG1C34IwXu2ymtMk1pJbRvfi8kl/aGQsTAACZAzsOhrWXN6cdU7Kg7TKwRQZ1WaX7UxVjFjUb8slq/yHYDICpIW8seYM5r7wxoWuSMwQ8EZP0/P4fA38pBf7nEPgBAMjyRoDsQsP646ZveArrqmfTSemXtXWuxIW2xAzqpn6VUrQnkdIabIpBN7a7p5KNLqf33U6vbCna8xP1uZw+JkVNff8L/EW06X5I6V+8LRYeAAC8A9N1kMYHw/qCVC7IO5BA0OMkFDRTT2wx/t0w5VfaTNxG7mo9MFoICvpR7pxRZfShFL2s0ZUI07RG4xGa3U9epjeOc8xxvlFGWyw0AAB4FzxznKddTgvWyFQv1AcmmY79HbyZeJu6tvmEBsviYFrtnkUjd+xjMSea3LXEZafn0lZ20obSfXSxYhitsLAAAJBbCGtH0wL2PbEu1Ysjj069lmAX9tauamFqQLx/VpXZ2Q0VQv+RS0A8qvfg7Gojn3QlYg3NSV0z82kDyiI/B6el8VSrIe2Nr0m29wgsIAAA5D76xXahhe2VVIgKifoFjqbFnU/0KyqT2wwwOAVcSIJFL1KmgU+JKfBZBzPMTiSfy932r1CQHlLSYG7ykgXr93NfwOHp06FYT/fIi0rvip2wYAAA4D/0Mdorkej16SgP/L4ZOJ6shjm1m2yZYEsLY67tstvhdVMqzXoxgqz3ZHdZPvcf9B1x82djc0q+erMJkDeWx9AGs1XaXj+n+fVroNoHAEBwECo9hDYCn6RKT0DEPSkw3DuzyohQir+iIUVRgVBE4kXcMMZpYJZ+3Y/qvygdZMZYh2vtV0+uNE/3rB2xuqopZd8rO++xac9d1BCY1o1ey/z+B0qo/EAsBAAABBc80mROD6ij0t34xVrr7y5JvvFLBK4rT1IbjK+K6oyHqdZ8Bv2uNHSDB4Y8/cElmEepq/4b+kwnUxamsrE55d/blg2hafWbCKnNFPSH0Z83Kb2KOuLGBwAA+ENWILofLZavE1enO8DsTtmBu+mkx6fIZEa/nMCWyNxT8MmyWjOYXUEZA25IS4nNa46zC30G3L/BWRQe9eQyy+CNDUZxTVPavg8eCWVFvjtoJDQjbpNhdaUpmNVH2ws3OAAAgBN4lDAUPY8W0B+JsUyklnkC4IFZ1ca/19QZK6vSF4C2DkZs/8qbkA+ob+EhyhxcSs6HPOHAwbFVDgd3fu3bUwaEm+bYzZGzIh/RJognLvjUraVx07UlllNj6A8kysOlIP5cM1KqCenl5vRLnn4WrHgBAACSKRFEotfRoppPi2p9JsVhuOnv73QqnZ7CxjK3+vHsMMdjZ2NKG8zg+TWlw9l5juVl+RTLwfUUUq7jkbS9B5ebp9rulD7nTnjWOGiVYPDmn+Xn4Ofi5+TnPoQCKKvkXU6/k3/30/Qa+LVwip77LPg1sk7+xtpmoyELnxf/zqlUKviYNhrXUp9ARkWfQmotpfj7khDW1UjxAwAApBrsSBjR790skNKYrdGygeTdzqn9XADH4Vp6qdwEWUoZB06vc4aD9ROY3NDIf1dG/8aPqcuNt2WCGwAL6LtgcSiWjs78yCZtSEN6IQX9O01vDAAAACAD6B3tTinWO2ghLkiH0JAM+XTMjYUs//r15ka1qmykCnwObv6buLnBkssk3LDXNVsNlnzS52xUSLvVdMYEAAAAsgg+fXF3dVjr3VJ/ze6o2gE0qnYNpaDZjIhT40vppJ1LJ+tsgTMVnJXgngjOtFzllRFLHlUN679QX8oNcOADAADwKlhQJaSfTZuBj+iUtsRLM+w8efBnOr3eSvVzDnDfr6ozRlHdfBWlspsCkDjg5AiXH0ZuajC+o/fOqftbplUZp9Fnwj0XntJSCOkL6Rp6n66hM2DCAwAAkIuIlB9EC/mjtKAPyMREQaLkprt9qdHuHKpl83ji82Qww13z3MHOdW7WGFhGHe16vfd2CtzRz1kOfo0D6LXya/6QphrYJIdFdbg+vw+9t7ZeFkvizBGn9tluNxLdHzcOAACAn8BSxHyiC+tv0EI/mXoHmnLVs37ngVFzrI3r4ayMx3a2PMb4GPUjPEPd+Xy6Zu16lkXm+fovVtaap24ec2QVw35kisPGOPzf/Hf8b/wY1ivgn+Gf5efg52L9An5u/h2clucsxqH0u3ei19A2ZxUQqYk0rE8gvqrkqafilA8AABAkFJZ1IaGWiygIvGMGgwyOGYIZD/h19B2PJb5JJ/wLlD4lnXADAAAAAC0wZYn1c2jMsKc53hVSNQTOHKWpt08TIqzCx4I8vddsgwscAAAAkINhtNrcQ0BeBfoXdIqcka2RQ9BJhEedRv/9OW3eblH6RQ8wvzsAAAAASBm4jyCsHb1Zg+DvZlo5pFcgEGeMUfq8R5tOkrwxy1OPhJUuAAAAkL1MAZu9cD9BSH+KAtN3ZpMhNgbJBvqJdKL/hjZZT9AM/oVKuGwPnOwBAACA3NgYhDftquRpp5tysWYDmvYbpaynm+IySN1rm1P3v5qTGRHtdvq706hBrwcCPQAAAOBfsKpcftlhZubA9DggK+Sw/gNlD4ZQIJxF/399pj0PUhTYG+j0XkyvfSYF9cH0/nrR+3qNeI/ZgR8pOxRd+AAAAABgB7aTjZTvYG4UItqZxCvN/oOw/rg5wx7WPzVtk8NaqGVygevj2lT6u3kUgFds3kRsIqpmWj2sV9K/15hB2hx7pP9uEUiKtjxGLdn8MyvM5whpUyiAj2oxvaHfYf4u/p00KRHRHjNP7fyazNdGgZ09GmCBCwCex/8Dxl8edcPVUXsAAAAASUVORK5CYII=';
        //var customerIconUrl='img/customericon03.png';
        //var customerIconUrl = 'img/account_circle_client.png';
        var customerIconUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAYAAAAGAB4TKWmAAAC60lEQVRIx7WWQWuUVxSGn3PvFzVJHWkgjAkOYzSdtNJF4kLqWopFSkTrRnCRnWLQgj9A0B8g2JLSLoQsukxNE0Qi/oBKF3EQoU6MiWHEOARHjSYx8d57XMyMyTgzmRHqC9/mcO97znvu/d5zhU3Q/cvyrmB9P6I/qkoXIgkAVLMiOovKDePt+PT5lie1OKRaMPnHUofx4TIwAERsDgcMB2suzp1una+boOu3xX6QP4HtVqA3btkfNyRihi+3Fta8WIW5xUA6F0jnPF4BeA16avZsbLxmgt1Db34W0SuA6YtbTvREtLdUFfkBC8vKSMZxN+cBgqpceDz4xdWKBMXKR41gjqUiDnfV60w5JmYcfz90BCWAHispEYDEr0udkQ3/AbGfeirJvcLYQ8edpx6A7zotR7+KsFKZ5PqUA1h03nyTPdf61ABENlwCYn1xW7XysSnHxIzj5Vvl5VtlYsYxViAqww97IvriFiBW5MTsHVpOAANW4MTX1dvyT7HyejEocBSVDewdWk6YIL4fiHrjlvbmzQ+0EbQ3C70FFVEQ329U9QhAX9zU3HSw0zYUK6HEpapHIhHpBkjGaic4mopAqDjkWihxiUh3BHQA7NhWW7YVOJ6KOJ5q7Opu4OowDe0oYs0Xvk9BBMwD21cdbKvS1n/nPZPPApl8YOldwRNam4SeNsP+nYYDHZWbVtdv8HykqtMiksrkQ9niuVfK7+k1nq9oBcHSO2Uy55nMeUanHGd6t5DcsX4DM/kAgKpOGxG5CXA3F8pIrt2rTv4xnq8o1+6tlcVKXCJy0xi144BL5zwLGwh72ho/no1rF1aUdMH4nFE7bh4NtmSBYa8w8mC9eSf3NXEoadns1xPgUNJycl/Th9jIA1ey7+FHgy3ZumaXyQduP/bcX/CEokAj8G275fvdtqz6W7OOvzLlZtewXXuFfLGFbc1S4aS3Zh2jUzXsuoTPOnA+UlJ3ZGYXA5OfOjJL+KxDfyP+j2fLewM9dOyX3Vh4AAAAAElFTkSuQmCC';
        var maxTextLength = 75;

        /*PUBLIC VARIABLES :: TWO WAY BINDERS*/
        $scope.queryResponse = "";
        $scope.chatMessageList = [];
        $scope.phoneValidationMessageList = [];
        $scope.activeagent = 'bot';//bot or human
        $scope.switchValue = false;
        $scope.chatviewactive = false;
        $scope.chat_view_stage = 1;//1 : welcome, 2 : register, 3 : chat
        $scope.isProgressInActive = true;
        $scope.userdetail = {
            email: '',
            phone: '',
            name: ''
        };
        $scope.message = {
            text : ''
        };

        /*PUBLIC FUNCTIONS*/

        $scope.$watch('switchValue', function (newValue, oldValue) {
            if (newValue == true) {
                $scope.activeagent = 'human';
                //use $interval
                console.log(intervalStopId);
                if (intervalStopId == null) {
                    connectToAgent();
//                    processForApiRequest(' ');
                    typingAgentIconUrl = agentIconUrl;
                    intervalStopId = $interval(function () {
                        fetchAgentResponse(livechatTokenId, lastMessageId);
                    }, 10000);
                }
            } else {
                typingAgentIconUrl = botIconUrl;
                $scope.activeagent = 'bot';
                if (intervalStopId != null) {
                    try {
                        $interval.cancel(intervalStopId);
                    } catch (e) {
                        console.log('Error in closing interval for fetch Agent Response');
                        console.log(e);
                    }
                    intervalStopId = null;
                }
            }
        });

        $scope.switchValueChanged = function () {
            $scope.switchValue = !$scope.switchValue;
        };

        /* Welcome Frame
         * When chat window first starts */
        $scope.getWelcomeFrame = function () {
            return 'components/chatui/subviews/welcomeframeview.html';
        };
        /* Register Frame
         * When registration is required */
        $scope.getRegisterFrame = function () {
            return 'components/chatui/subviews/registerframeview.html';
        };
        /* Chat Frame
         * This is actually chatting frame */
        $scope.getChatFrame = function () {
            return 'components/chatui/subviews/chatframeview.html';
        };
        /* Send message block 
         * Message typing and sending block 
         * #included int chat frame*/
        $scope.getSendMessageFrame = function () {
            return 'components/chatui/subviews/sendmessageboxview.html';
        };
        /* Chat Window Title */
        $scope.getChatWindowTitle = function () {
            return chatWindowTitle;
        };

        $scope.sign_up_submit = function () {
            var validation = validatePhone($scope.userdetail.phone);
            if (validation == true) {
                createContact($scope.userdetail.name, $scope.userdetail.email, $scope.userdetail.phone);
            } else {
                $scope.phoneValidationMessageList.push(validation);
                var id = $scope.phoneValidationMessageList.length - 1;
                $timeout(function () {
                    jQuery('#content').scrollTo('#' + id);
                });
            }
        };

        /* Chat view state ie. 
         * 1. open 
         * 2. minimized */
        $scope.getChatViewState = function () {
            return chat_view_state;
        };

        /*
         * Change Chat View state
         * from minimize to maximize and vice-versa
         */
        $scope.changeChatViewState = function () {
            if (chat_view_state == false) {
                chat_view_state = true;
                //document.getElementById('main_container').style.height = '480px';
                jQuery('#main_container').animate({height: '480px', width: '400px'}, 350, 'swing', function () {
                    //alert("Finished animating");
                });
                jQuery('#chat_header_control_icon').attr('src', 'img/window_minimize.png');
            } else {
                chat_view_state = false;
                //document.getElementById('main_container').style.height = '48px';
                jQuery('#main_container').animate({height: '45px', width: '300px'}, 350, 'swing', function () {
                    //alert("Finished animating");
                });
                jQuery('#chat_header_control_icon').attr('src', 'img/window_maximize.png');
            }
            if (chatid == null) {
                getChatId();
            }
        };

        /* 
         * Method is called for sending message by client
         * */
        $scope.send = function () {
            var input = document.getElementById('input').value;
            $scope.sendMsg(input);
        };

        $scope.sendMsg = function (input) {
            if (input != "") {
                document.getElementById("input").value = "";
                console.log("request_stack: in sendMsg :: " + req_que);
                ++req_que;
                generateChatMessage(input, "client", true, null, false);
                processForApiRequest(input);
            } else {
                animateSnackBar(AppConstants.CONS_EMPTY_TEXT_MSG, '#D50000');
            }
        };

        $scope.getBotIconUrl = function () {
            return botIconUrl;
        };

        $scope.nextChatViewStage = function () {
            $scope.chat_view_stage++;
            $location.hash('last');
            $anchorScroll();
            if ($scope.chat_view_stage == 2) {
                setFocusOnContactNumberInput();
            }
        };

        $scope.validateText = function () {
            var len=document.getElementById('input').value.length;
            if (len >= maxTextLength) {                
                document.getElementById('input').value = document.getElementById('input').value.substring(0, maxTextLength-1);
            }
        };

        $scope.getMaxTextBoxLength = function () {
            return maxTextLength;
        };

        /*#######################################*/

        /*INITIALIZES CONTROLLER*/
        init();

        /*PRIVATE FUNCTIONS*/
        function init() {
            //callServices();
            //processForApiRequest('Hi');
            $timeout(function () {
                $scope.userdetail.phone = $scope.phone;
                $scope.userdetail.name = $scope.name;
                $scope.userdetail.email = $scope.email;
            });
        }


        function callServices() {
        }//callServices end


        /*
         * This method will generate message object and push 
         * to the message list which will appear on chat frame
         * @param {type} messageText
         * @param {type} who
         * @param {type} replaceLast
         * @param {type} dataList
         * @param {type} showPrice
         * @returns {undefined}
         */
        function generateChatMessage(messageText, who, replaceLast, dataList, showPrice) {
            var userIconPath;
            if (who === "bot") {
                userIconPath = botIconUrl;
            } else if (who === 'human') {
                userIconPath = agentIconUrl;
            } else {
                userIconPath = customerIconUrl;
            }
            var dataListPresent = false;
            if (dataList !== null && showPrice == false) {
                dataListPresent = true;
                console.log("dataListPresent");
            }
            var chatMessage = {
                message: messageText,
                msgBy: who,
                dataList: dataList,
                userIconPath: userIconPath,
                dataListPresent: dataListPresent,
                showPrice: showPrice,
                scrollActive: true,
                isTypingResponse: messageText === '' ? true : false
            };
            console.log('in gen chat msg');
            console.log(chatMessage);
            if (replaceLast === true && (who == 'bot' || who == 'human')) { //since for bot first remove typing
                generateTypingResponse();
            }
            if (messageText !== '') {
                $scope.chatMessageList.push(chatMessage);
            }
            if (replaceLast === true && who == 'client') { // for client gen typing after msg pushed
                generateTypingResponse();
            }
        }

        /*
         * This method will generate message object for 
         * typing effect
         * 
         */
        function generateTypingResponse() {
            var typingMessage = {
                message: "",
                msgBy: $scope.activeagent,
                dataList: null,
                dataListPresent: null,
                //userIconPath: $scope.activeagent == 'bot' ? 'img/account_circle_bot.png' : 'img/humanagent.png',
                userIconPath: typingAgentIconUrl,
                showPrice: false,
                scrollActive: true,
                isTypingResponse: true
            };
            angular.forEach($scope.chatMessageList, function (typingmessage, index) {
                if (typingmessage.isTypingResponse) {
                    $scope.chatMessageList.splice(index, 1);
                }
            });
            if (req_que > 0) {
                $scope.chatMessageList.push(typingMessage);
            }
            //typingResponseActive = true;
            //document.getElementById('chat_box_div').scrollTop = document.getElementById('chat_box_div').scrollHeight;
        }

        function connectToAgent() {
            var msg = 'Trying to connect you to our agent.Please wait...';
            livechatTokenId = guid();
            var token = livechatTokenId;
            generateChatMessage(msg, 'bot', true, null, false);
            setProgressActive();
            $scope.activeagent = 'human';
            console.log('TOKEN :: ' + token);
            ChatServices.submitquery(' ', $scope.activeagent, token).promise.then(function (response) {
                console.log(response);
                req_que = req_que <= 0 ? 0 : --req_que;
                if (response.status == 200 && response.data.errorcode == 0) {
                    var msg = 'Agent connected.Please continue your conversation...';
                    generateChatMessage(msg, 'bot', true, null, false);
                    setProgressInActive();
                } else {
                    processForResponse(response.data);
                    setProgressInActive();
                }
            }).catch(function (error) {
                console.log(error);
                $scope.network_error_state = true;
                processForResponse(error);
                setProgressInActive();
            }).finally(function () {

            });
        }
        /*
         * This method will submit user query
         * to the api
         */
        function processForApiRequest(input) {
            var token = $scope.activeagent == 'bot' ? $scope.userdetail.phone : livechatTokenId;
            console.log('TOKEN :: ' + token);
            if ($scope.activeagent == 'bot') {
                setProgressActive();
            }
            ChatServices.submitquery(input, $scope.activeagent, token).promise.then(function (response) {
                console.log(response);
                req_que = req_que <= 0 ? 0 : --req_que;
                if (response.status == 200 && response.data.errorcode == 0) {
//                    $scope.queryResponse = response.data.response.textResponse;
                }
                if ($scope.activeagent == 'bot' || response.data.errorcode != 0) {
                    processForResponse(response.data);
                }
            }).catch(function (error) {
                console.log(error);
                $scope.network_error_state = true;
                processForResponse(error);
                //$scope.chatMessageList.pop();
            }).finally(function () {
                console.log('Inside Finally');
                setProgressInActive();
            });
        }

        function createContact(name, email, mobilenumber) {
            var firstname = '';
            var lastname = '';
            try {
                if (angular.isDefined(name)) {
                    firstname = name.substr(0, name.indexOf(' ')); // "72"
                    lastname = name.substr(name.indexOf(' ') + 1); // "tocirah sneab"
                }
                console.log('firstname : ' + firstname);
                console.log('lastname : ' + lastname);
                console.log('email : ' + email);
                console.log('mobilenumber : ' + mobilenumber);
            } catch (exception) {
                console.log(exception);
            }
            setProgressActive();
            ChatServices.createContact(firstname, lastname, email, mobilenumber).promise.then(function (response) {
                console.log(response);
                ChatServices.registerContact(firstname, lastname, email, mobilenumber).promise.then(function (response) {
                    console.log('Inner call');
                    console.log(response);
                    initializeChat();
                });
            }).catch(function (error) {
                console.log(error);
                //$scope.chatMessageList.pop();
            });
            ;
        }

        function initializeChat() {
            processForApiRequest('Hi');
            $scope.chatviewactive = true;
            $scope.nextChatViewStage();
        }

        /*
         * This method will process response 
         * got from backend
         */
        function processForResponse(data) {
            console.log('inside data processing');
            var msg = '';
            var msgs = [];
            try {
                if (data.errorcode === 0) {
                    msgs = data.responses;
                    angular.forEach(msgs, function (msgobj, index) {
                        if (msgobj.responseType === 'CONVERSATION') {
                            if (angular.isDefined(msgobj.tokenid)
                                    && msgobj.tokenid != null
                                    && msgobj.tokenid != '') {
                                lastMessageId = msgobj.tokenid;
                            }
                            if (index > 0) {
                                msg = msg + '<br>' + convertUrlToHref(msgobj.textResponse);
                            } else {
                                msg = convertUrlToHref(msgobj.textResponse);
                            }
                        } else if (msgobj.responseType === 'CARD') {
                            var tempMsg = getMsgHtmlForCard(msgobj);
                            if (index > 0) {
                                msg = msg + '<br>' + tempMsg;
                            } else {
                                msg = tempMsg;
                            }
                        } else if (msgobj.responseType === 'IMAGE') {
                            console.log('IMAGE RESPONSE PARSER NOT IMPLEMENTED');
                        } else {
                            console.log('INVALID RESPONSE TYPE');
                        }
                    });
                    generateChatMessage(msg, $scope.activeagent, true, null, false);
                    checkForAutoSwitch(msg);
                    if (msgs.length === 0 && $scope.activeagent === 'bot') {
                        if (angular.isUndefined(msg) || msg === null || msg === '') {
                            console.log('Something went wrong');
                            //msg = 'Something Went wrong. Please write us on <a target="_blank" href="https://www.power2sme.com/contactus">https://www.power2sme.com/contactus</a>';                            
                            msg = '';
                        }
                        console.log('msg :: ' + msg);
                        generateChatMessage(msg, $scope.activeagent, true, null, false);
                    }
                } else {
                    console.log('RESPONSE FROM BACKEND :: ');
                    console.log(data);
                    if ($scope.activeagent === 'human') {
                        $scope.switchValue = false;
                        msg = 'Unable to connect to agent.Try Chatting with our bot or write us on <a target="_blank" href="https://www.power2sme.com/contactus">https://www.power2sme.com/contactus</a>';
                        generateChatMessage(msg, 'bot', true, null, false);
                    } else {
                        $scope.switchValue = true;
                    }
                }
            } catch (e) {
                console.log(e);
                msg = '';
                generateChatMessage(msg, $scope.activeagent, true, null, false);
            }
        }

        function convertUrlToHref(msg) {
            console.log('IN :: ' + msg);
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);

            var words = msg.split(" ");
            console.log(words);
            for (i = 0; i < words.length; i++) {
                var word = words[i];
                console.log(word + ' :: '+word.match(regex));
                if (word.match(regex)) {
                    if(word.indexOf('.power2sme.')== -1){
                        msg=msg.replace(word, "<a href=" + word + " target='_blank'>" + word + "</a>");
                    }else{
                        msg=msg.replace(word, '<a href=' + word + '>' + word + '</a>');
                    }
                }
                console.log(msg);
            }
            return msg;
        }

        function fetchAgentResponse(tokenid, messageid) {
            console.log('going to fetch agent response');
            ChatServices.fetchAgentResponse(tokenid, messageid).promise.then(function (response) {
                if (response.status == 200) {
                    processForResponse(response.data);
                }
            }).catch(function (error) {
                console.log(error);
                $scope.network_error_state = true;
                processForResponse(error);
                //$scope.chatMessageList.pop();
            });
        }

        /*
         * This method will see that if autoswitch to agent 
         * is required or not. If required it signal for switch
         * through common variable which represents agent
         */
        function checkForAutoSwitch(msg) {
            if (!angular.isDefined(msg) || msg === null || msg == 'undefined') {
                msg = '';
            }
            var isMsgErr = false;
            angular.forEach(errorMessagesList, function (errmsg, key) {
                console.log('inside err loop test , errmsg :: ' + errmsg);
                console.log('msg :: ' + msg);
                if (msg.toLowerCase().indexOf(errmsg.toLowerCase()) !== -1) {
                    console.log('matched..');
                    isMsgErr = true;
                    totalErrorResponseByBot = totalErrorResponseByBot + 1;
                    if (!previousMsgError) {
                        totalContinuousErrorResponseByBot = 0;
                    }
                    totalContinuousErrorResponseByBot = totalContinuousErrorResponseByBot + 1;
                    console.log('Total Err :: ' + totalErrorResponseByBot);
                    console.log('Continu Err :: ' + totalContinuousErrorResponseByBot);
                    //This condition will automatically switch chat to Agent mode
                    var threshHoldErrCount = 5;
                    try {
                        var length = $scope.chatMessageList.length;
                        var errLimit = 0.4 * length;
                        if (errLimit > 5) {
                            threshHoldErrCount = errLimit;
                        }
                    } catch (e) {
                        console.log(e);
                        threshHoldErrCount = 5;
                    }
                    ;
                    if (totalErrorResponseByBot >= threshHoldErrCount || totalContinuousErrorResponseByBot >= 2) {
                        totalErrorResponseByBot = 0;
                        totalContinuousErrorResponseByBot = 0;
                        //$timeout(function () {
                        $scope.switchValue = true;
                        //}, 500);
                    }
                }
            });
            if (isMsgErr) {
                previousMsgError = true;
            } else {
                previousMsgError = false;
            }
        }

        function getMsgHtmlForCard(cardmsg) {
            var number = parseInt(cardmsg.heading);
            var distance = '';
            try {
                distance = cardmsg.keyValuePairContent.Distance;
            } catch (e) {
                console.log('No Distance');
            }
            //console.log('price bef :: '+cardmsg.footer);
            //var price=$filter('number')(cardmsg.footer);   
            //console.log(price);
            var html = '<div class="card-element"><div class="sku-description">' + cardmsg.heading + '</div>&nbsp;' + '<md-button id=' + number + ' class="md-raised md-primary md-hue-2 text-transform-none" ng-click=sendMsg(' + number + ')>' + cardmsg.footer + '</md-button>' + '&nbsp<small><i>&nbsp;';
            if (distance != '' && distance != 'undefined' && distance != null) {
                html = html + 'Availability Distance : ' + distance + '</i></small></div>';
            } else {
                html = html + '</div>';
            }
            //var html = '<div ng-bind="exp"></div>';
            deactivateElement(number);
            return html;
        }

        function deactivateElement(id) {
            if (jQuery('#' + id).length > 0) {
                console.log('ELEMENT FOUND WITH ID : ' + id);
                jQuery('#' + id).attr('disabled', 'true');
                jQuery('#' + id).attr('id', Math.random());
            } else {
                console.log('ELEMENT NOT FOUND WITH ID : ' + id);
            }
        }

        function setProgressActive() {
            console.log('ACTIVATING PROGRESS');
            $scope.isProgressInActive = false;
        }

        function setProgressInActive() {
            console.log('DE-ACTIVATING PROGRESS');
            $scope.isProgressInActive = true;
            setFocusOnTextArea();
        }

        function setFocusOnTextArea() {
            $timeout(function () {
                jQuery('#input').focus();
            });
        }
        ;


        function setFocusOnContactNumberInput() {
            $timeout(function () {
                jQuery('#mobilenumber').focus();
            });
        }
        ;

        function validatePhone(mobileNumber) {
            var NUMBER_LENGTH_ERROR = 'It must be of 10 digit. Please check.';
            var START_DIGIT_ERROR = 'It must start with 9,8 or 7. Please enter valid mobile number.';
            var INVALID_CHARACTER = 'It must contain only digits between 0-9. Please enter correct mobile number.';
            var EMPTY_NUMBER = 'Please enter your mobile number to start the conversation.';
            if (mobileNumber == null || mobileNumber.length == 0) {
                return EMPTY_NUMBER;
            }
            var phoneno = /^\d{10}$/;
            if (mobileNumber.match(phoneno)
                    && (mobileNumber.startsWith('9')
                            || mobileNumber.startsWith('8')
                            || mobileNumber.startsWith('7'))) {
                return true;
            } else {
                if (mobileNumber.startsWith('9')
                        || mobileNumber.startsWith('8')
                        || mobileNumber.startsWith('7')) {
                    if (mobileNumber.length != 10) {
                        return NUMBER_LENGTH_ERROR;
                    }
                } else {
                    return START_DIGIT_ERROR;
                }
                return INVALID_CHARACTER;
            }
        }
        ;
        //random unique id generator
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
        }

    }]);






