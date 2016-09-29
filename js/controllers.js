
var historyArray = [];

angular.module('starter.controllers', ['ionic','ngCordova'])

.run(function($window, $http,$rootScope, $ionicSideMenuDelegate,
		$ionicPlatform, $ionicPopup, $ionicLoading, $timeout) {
	
	
	$ionicLoading.show({
        content: 'Welcome. Please wait',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
	
	
	
	function triggerBackButton() {
        var backButtonEvent = document.createEvent('Events');
        backButtonEvent.initEvent('backbutton', false, false);
        document.dispatchEvent(backButtonEvent);
        //alert('back button triggered');
        var scope = angular.element(document.getElementById('pageContentID')).scope();
        scope.getBackPage();
        
        
    }

    function registerBackButtonFake() {
        document.addEventListener('keyup', function (event) {
            if (event.altKey && event.ctrlKey && event.keyCode === 13) {
                triggerBackButton();
                console.log(historyArray);
            }
        });
    }

    if (!$window.cordova) {
        $ionicPlatform.ready(registerBackButtonFake);
    }
	
	$ionicPlatform.ready(function() {       
		   //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failedtogetFilesystem);
		
		
		$ionicPlatform.registerBackButtonAction(function (event) {
	    	  /*if (condition) {
	    	    navigator.app.exitApp();
	    	  } else {
	    	    handle back action!
	    	  }*/

	    	  event.preventDefault();
	    	  var scope = angular.element(document.getElementById('pageContentID')).scope();
	          scope.getBackPage();
	    	  //console.log(lastItem);

	    	

	    	}, 100);
		
		
		
	}, false);
	  $ionicPlatform.ready(function() {

		var deviceInformation = ionic.Platform.device();
// 		alert("uuid-first - " + deviceInformation.uuid);

	  	// var uuid = $cordovaDevice.getUUID();
	  	// alert("uuid - " + uuid);



	    // Check for network connection
	    if(window.Connection) {
	      if(navigator.connection.type == Connection.NONE) {
	        $ionicPopup.alert({
	          title: 'No Internet Connection',
	          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
	        })
	        .then(function(result) {
	         // if(!result) {
	            ionic.Platform.exitApp();
	         // }
	        });
	      }
	    }
	    
	    
	    
	    $timeout(function () {
		    $ionicLoading.hide();	    	    
		  }, 3000);
	    


	   if(ionic.Platform.isIPad() || ionic.Platform.isIOS()) {
      //if(window.localStorage.userdetailSaved){
       
      	var userdata = {'deviceID':deviceInformation.uuid};
          $http({
               method: 'POST',
               url: "http://ayurworld.org/push_notification/notification/save_user_info",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
               data: $.param({
               user_data: JSON.stringify(userdata),
               os : "ios"
               })
             })
         .success(function(data, status, headers, config) {
//                   alert(data.message);
                  if(data.status == false || data.status == "false"){
                    window.localStorage.userdetailSaved=true;
                  }
          })
         .error(function(error) {
            //alert(JSON.stringify(error));
         });
     // }
    }
      

     // alert('testing');
      //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
      //Keep in mind the function will return null if the token has not been established yet.
      FCMPlugin.getToken(
        function(token){
          //	alert("token-"+token);
          	/* var pushdata = {'deviceID':deviceInformation.uuid,'key':token};
         	// alert('calling fileFactory saveUserToken');
         	//$fileFactory.saveUserToken(JSON.stringify(pushdata));
         	$http({
                  method: 'POST',
                  url: "http://ayurworld.org/push_notification/notification/update_key",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  data: $.param({
                    app_data: JSON.stringify(pushdata)
                  })
               })
            .success(function(data, status, headers, config) {
                  // alert(JSON.stringify(data));
                  //alert(data.message);
            })
         	.error(function(error) {
            	//alert(JSON.stringify(error));
         	});*/
        },
        function(err){
          console.log('error retrieving token: ' + err);
          //alert('error retrieving token: ' + err);
        }
      )

      //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
      //Here you define your application behaviour based on the notification data.
      FCMPlugin.onNotification(
        function(data){
          if(data.wasTapped){
            //Notification was received on device tray and tapped by the user.
           // alert( JSON.stringify(data) );
            alert(data.aps.alert["body"]);

          }else{
            //Notification was received in foreground. Maybe the user needs to be notified.
         //   alert( JSON.stringify(data) );
			alert(data.aps.alert["body"]);
          }
        },
        function(msg){
          console.log('onNotification callback successfully registered: ' + msg);
        },
        function(err){
          console.log('Error registering onNotification callback: ' + err);
        }
      );
      


	  });
	})
	
	
	
	
	
.controller('AppCtrl', function($scope, $compile, $window, $sce,
		$http, $state, $ionicSideMenuDelegate, $ionicScrollDelegate, 
		$ionicPopup, $ionicLoading, $cordovaFile, $timeout, $location) {
	
	
	historyArray.push('home');
	
	$scope.swiper = {touchEventsTarget:"container"};
	 
    $scope.onReadySwiper = function (swiper) {
 
        swiper.on('slideChangeStart', function () {
            console.log('slide start');
        });
         
        swiper.on('onSlideChangeEnd', function () {
            console.log('slide end');
        });     
    };
	
	
	function getPageBack(){
		$scope.getBackPage();
	}
	
	
	
	$scope.opendownloadsmenu = function(){
		
		$ionicSideMenuDelegate.toggleLeft(true);
		$("#2628").addClass("in");
		$location.hash("dn2628");
    $ionicScrollDelegate.anchorScroll();
	}
	
	$scope.getBackPage = function() {
		
		$ionicLoading.show ({
			template:"Loading..."			
		});
		
		
		
		   console.log(lastItem);
		   
		   console.log(historyArray.length);
		   if(historyArray.length >= 1){
			   var lastItem =  historyArray.pop();
			   if(!lastItem){
				   
				   ionic.Platform.exitApp();   
				   
			   }else{
				   getHomepage();
			   }
			   
		   }else{
			   ionic.Platform.exitApp();  
		   }
		   
		  /* if(lastItem){
			   	
				   if(lastItem =="ethnopharmacology"){
				  		$scope.pageContent = "";
						$ionicSideMenuDelegate.toggleLeft(false);
						$scope.player = $sce.trustAsHtml('<iframe width="100%" height="600px" src="http://www.ayurworld.org/ethnopharmacology/"></iframe>');

					}else if(lastItem =="delegate-registration"){
						$scope.pageContent = "";
						$ionicSideMenuDelegate.toggleLeft(false);
						$scope.player = $sce.trustAsHtml('<iframe width="100%" height="600px" src="http://ayurworld.org/delegate-registration/"></iframe>');

					}else if(lastItem =="jaim"){
						$scope.pageContent = "";
						$ionicSideMenuDelegate.toggleLeft(false);
						$scope.player = $sce.trustAsHtml('<iframe width="100%" height="600px" src="http://ayurworld.org/jaim/"></iframe>');

					}else if(lastItem =="wp-content"){
						$scope.pageContent = "";
						$http.post(url).then(function(returnData,payload){
						    var uriString = parseReturn(returnData);
						    location.href = uriString
						})
					}else if(lastItem =="home"){
						
						getHomepage();
						
					}else{
						$http.get("http://ayurworld.org/wac_api/api?slug="+lastItem).success(function (data, slug){
							$scope.pageContent = "";
							$scope.pageContent = data.content;
						  	$ionicSideMenuDelegate.toggleLeft(false);
						  	$scope.player = "";
						 });
					}
		   }else{
			   
			   alert("Exiting application!");
			   ionic.Platform.exitApp();    

				 // ionic.Platform.exitApp(); // stops the app
			  
		   }*/
		   
		   $timeout(function () {
	    	    $ionicLoading.hide();	    	    
	    	  }, 3000);
	  	   
	}
	 /*
	   * if given group is the selected group, deselect it
	   * else, select the given group
	   */
	  $scope.toggleGroup = function(group) {
	    group.show = !group.show;
	  };
	  $scope.isGroupShown = function(group) {
	    return group.show;
	  };
	  
	  
	  $scope.groups = [];
	  for (var i=0; i<10; i++) {
	    $scope.groups[i] = {
	      name: i,
	      items: []
	    };
	    for (var j=0; j<3; j++) {
	      $scope.groups[i].items.push(i + '-' + j);
	    }
	  }
	    	  
	    	  
	
		$scope.toggleLeftSideMenu = function() {
		    $ionicSideMenuDelegate.toggleLeft();
		  };
	
			  //$cordovaSplashscreen.show();
	    $scope.showcontent  = function(event) {
		  
		  
		  var element = event.target;
		  
		  //console.log(element.data['url'].value);
		  $http.get("http://www.ayurworld.org/home/api/?param=menu").success(function (data, slug){
	    	//console.log(data);
	    	//console.log(slug);
	    	
	    	$state.go( 'app.search' );
		  });
	  };
	
	  $http.get("http://www.ayurworld.org/home/api/?param=menu").success(function (data, slug){
	  	//console.log(data);
	  	$scope.menus = data;
	  	//console.log(slug);
	  	
	  	
	  });
  
  
	  $http.get("http://ayurworld.org/wac_api/api?slug=addons").success(function (data, slug){
		  	  var dataContent = JSON.parse(data.content);		  	  
		  	 
		  	  console.log(dataContent.all);
			  $.each( dataContent.all, function( key, value ) {
				  
				 $(document.getElementsByClassName( value.appendTo.toString()) ).empty();
				  var elem = $compile('<a data-ng-click="renderPage($event)" data-url="'+value.url+'"  data-url="'+value.url+'"  class="'+value.classTag+'">'+value.text+'</a>')($scope);
				  $(document.getElementsByClassName( value.appendTo.toString()) ).append(elem);   
			  });
			  
				$ionicSideMenuDelegate.toggleLeft(false);
		  }); 
	  
	   
	  
	  
	  $scope.getpage = function (event){
		  
		  $scope.page2Content = "dfd";
		  alert("hi");
	  };
			  
	 $scope.hide = function(){
	    $ionicLoading.hide().then(function(){
	      // console.log("The loading indicator is now hidden");
	    });
	 };
	     

	function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('glyphicon-plus glyphicon-minus');
    }
	
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
    
    $scope.checkChildNode = function(playlist){
    	if(playlist.children.length > 0){
    		return true;
    	}
    };
    
    
    $scope.isIOS = ionic.Platform.isIOS();
  
  
    $scope.OpenLink = function(event) {
    	
    	
		
		var url = $(event.target).attr("data-url");
		var filename = url.substring(url.lastIndexOf('/')+1);
		
		if($scope.isIOS == true){
			var myURL = encodeURI(url);
    		window.open(myURL, '_system');
    		return;
    	} else{
    		
    	

			var fileTransfer = new FileTransfer();
		    var filePath = cordova.file.externalDataDirectory + filename;

		    
		    
		    $cordovaFile.checkFile(cordova.file.externalDataDirectory, filename)
		      .then(function (success) {
		    	  
		    	// A confirm dialog
		    	    $ionicLoading.show ({
			  			template:"Please wait..."			
			  		});
		    	    var confirmPopup = $ionicPopup.confirm({
		    	      title: 'Open File',
		    	      template: 'File already exists in mobile.Are you sure you want to open the file?'
		    	    });
		    	    $ionicLoading.hide();

		    	    confirmPopup.then(function(res) {
		    	      if(res) {
		    	    	  $ionicLoading.show ({
			  		  			template:"Opening the file..."			
			  		  		});
		    	    	  window.plugins.fileOpener.open(filePath);
		    	    	  $ionicLoading.hide();
		    	      } else {
		    	        
		    	      }
		    	    });
		    	   
		    	  
		    	  
		    	  
		        // success
		      }, function (error) {
		    	  
		    	  
		    	  
		    	// A confirm dialog
		    	   
		    	    var confirmPopup = $ionicPopup.confirm({
		    	      title: 'Download File',
		    	      template: 'Are you sure you want to  download the file?'
		    	    });

		    	    confirmPopup.then(function(res) {
		    	      if(res) {
		    	    	  
		    	    	  $ionicLoading.show ({
			  		  			template:"Downloading file..."			
			  		  	  });
		    	    	  
		    	    	  fileTransfer.download(
		  	    		        url,
		  	    		        filePath,
		  	    		        function(entry) {
		  	    		            console.log('********OK!', filePath);
		  	    		            /*$ionicPopup.alert({
		  	    		  	          title: 'File saved',
		  	    		  	          content: filePath
		  	    		  	        })*/
		  	    		  	        window.plugins.fileOpener.open(filePath);
		  	    		          $ionicLoading.hide();
		  	    		            //window.plugins.pdfViewer.showPdf(filePath);
		  	    		        },
		  	    		        function (error) {
		  	    		           
		  	    		            
		  	    		           // alert(error.code);
		  	    		           // alert(error.source);
		  	    		           // alert(error.target);
		  	    		            //alert(error.http_status);
		  	    		            alert('Oh no, something went wrong');
		  	    		        }
		  	    		    );
		    	    	  
		    	    	 
		    	      } else {
		    	        
		    	      }
		    	    });
		     
		    	  
		    	  
		    	  
		    	  
		    	  
		    	  
		        // error
		      });
		    
		    
	    }
	    
	    
	    
	    
	    
		
	};

	$scope.renderPage = function(event) {
		
		 $scope.hide_home_content = false;
         $scope.hide_other_content = true;
         $scope.pageContent = "";
		 $scope.pageContent = "";
         
		$ionicLoading.show({
	        content: 'Loading',
	        animation: 'fade-in',
	        showBackdrop: false,
	        maxWidth: 200,
	        showDelay: 0
	      }).then(function(){
		       console.log("The loading indicator is now displayed");
		    });
			    /*$ionicLoading.show({
			      template: 'Loading...'
			    }).then(function(){
			       console.log("The loading indicator is now displayed");
			    });*/
			 
			console.log("ionic loading done");
	    	var url = $(event.target).attr("data-url");
	    	var urlSplit;
	    	if(url){
	  		  
	    		urlSplit = url.split('/');
	    		if(urlSplit['3']){
	    			if(historyArray.length <= 5){
	    				
	    				if(historyArray.indexOf(urlSplit['3']) == -1){
	    					historyArray.push(urlSplit['3']);
	    				}
	    			}
	    			console.log(historyArray);
	    			$scope.player ="";
	    			if(urlSplit['3'] =="ethnopharmacology"){
	    				$scope.pageContent = "";
	    				$ionicSideMenuDelegate.toggleLeft(false);
	    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="600px" src="http://www.ayurworld.org/ethnopharmacology/"></iframe>');
	    				
	    			}else if(urlSplit['3'] =="delegate-registration"){
	    				$scope.pageContent = "";
	    				$ionicSideMenuDelegate.toggleLeft(false);
	    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="600px" src="http://ayurworld.org/delegate-registration/"></iframe>');
	    				
	    			}else if(urlSplit['3'] =="jaim"){
	    				$scope.pageContent = "";
	    				$ionicSideMenuDelegate.toggleLeft(false);
	    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="600px" src="http://ayurworld.org/jaim/"></iframe>');
	    				
	    			}else if(urlSplit['3'] =="wp-content"){
	    				$scope.pageContent = "";
	    				$http.post(url).then(function(returnData,payload){
	    				    var uriString = parseReturn(returnData);
	    				    location.href = uriString
	    				})
	    				
	    				
	    			}else{
	    				
	    				
	    				$http.get("http://ayurworld.org/wac_api/api?slug="+urlSplit['3']).success(function (data, slug){
	    					
	    					$scope.pageContent = "";
	        			  	$scope.pageContent = data.content;
	        			  
	        			  	$ionicSideMenuDelegate.toggleLeft(false);
	        			 });
	    			}
	    			
	    		}else{
	    			
	    			
	    			 historyArray.push("home");
	    			getHomepage()
	    			
	    		}
	    		
	    	}else{
	    		getHomepage()
	    		 historyArray.push("home");
	    		
	    		
	    	}
	    	//$ionicLoading.hide();
	    	
	    	$timeout(function () {
	    	    $ionicLoading.hide();	    	    
	    	  }, 3000);
	    	
	        /*if($ionicSideMenuDelegate.isOpenLeft()) {
	            $ionicSideMenuDelegate.toggleLeft(false);
	        } else {
	            $ionicSideMenuDelegate.toggleLeft(true);
	        }*/
	        
	        
	        $ionicScrollDelegate.scrollTop();
	    }
	 
	$scope.gotohome =function (){
		getHomepage()
		
	}
	
	
	
	
	 
	 getHomepage()
	 function getHomepage(){
		 
		 $scope.hide_home_content = true;
         $scope.hide_other_content = false;
         
         $scope.pageContent = "";
		 $scope.pageContent = "";
		 
		 $ionicLoading.show({
		        content: 'Loading',
		        animation: 'fade-in',
		        showBackdrop: false,
		        maxWidth: 200,
		        showDelay: 0
		      }).then(function(){
			       console.log("The loading indicator is now displayed");
			    });
		 
		
		
		/* $http.get("http://ayurworld.org/wac_api/api?slug=home").success(function (data, slug){
			 $scope.pageContent = "";
			  	$scope.pageContent = data.content;
			 });*/
 		
 		$http.get("http://ayurworld.org/wac_api/api?slug=addons").success(function (data, slug){
 		  	  var dataContent = JSON.parse(data.content);		  	  
 		  	 
 		  	  console.log(dataContent.all);
 			  $.each( dataContent.all, function( key, value ) {
 				  
 				 $(document.getElementsByClassName( value.appendTo.toString()) ).empty();
 				  var elem = $compile('<a data-ng-click="renderPage($event)" data-url="'+value.url+'"  data-url="'+value.url+'"  class="'+value.classTag+'">'+value.text+'</a>')($scope);
 				  $(document.getElementsByClassName( value.appendTo.toString()) ).append(elem); 
 				  //$scope.$apply();
 			  });
 				$ionicSideMenuDelegate.toggleLeft(false);
 		  }); 
 		
 		$timeout(function () {
    	    $ionicLoading.hide();	    	    
    	  }, 3000);
 		
 		$ionicScrollDelegate.scrollTop();
	 }
	 
	 
	 
	 
	 
	 
	 $scope.onSwipeUpSc = function (){
     	
		 $ionicScrollDelegate.scrollBy(0, 350, true)
     	//alert('swipedup');
     }
	 
	 $scope.onSwipeDownSc = function (){
	     	
		 $ionicScrollDelegate.scrollBy(0, -350, true)
     	//alert('swipedup');
     }
	 
	 
	 
})


    
.controller("MenuController", function($scope, $ionicSideMenuDelegate, $http, $sce, $ionicLoading, $ionicPopup) {

	/*function downloadAndOpenPDF(url, fileName, folder) {
	    var fileTransfer = new FileTransfer();
	    var filePath = folder + fileName;

	    console.log('################# filepath');
	    console.log(filePath);

	    fileTransfer.download(
	        url,
	        filePath,
	        function(entry) {
	            console.log('********OK!', filePath);
	            window.plugins.pdfViewer.showPdf(filePath);
	        },
	        function (error) {
	            console.log('Failed, do something');
	            console.log(error.code);
	            console.log(error.source);
	            console.log(error.target);
	            console.log(error.http_status);
	            alert('Oh no, something went wrong');
	        }
	    );
	}*/
	
	
	
	
	
	 $scope.isDownloadLink = function(playlist){
	    	
		if(playlist.children.length > 0){
			return true;
		}else{
			var url = playlist.url;
	    	var urlSplit;
	    	urlSplit = url.split('/');
		
	    	if(urlSplit['3'] =="wp-content"){	    		
				//console.log("Not a child node " + urlSplit['3'])
	    		//console.log(urlSplit)
	    		return false;
	    	}else{
	    		return true;
	    	}
		}
	 };
	 
	 
	
	  
   
})










.controller("AppController", function ($scope, $timeout, $ionicModal) {
	
	
	
	
	
	
	
            //for carosel	 
            vm = this;

            vm.options = {
                unselectOthers: false
            };
            
            
           


            vm.carouselOptions6 = {
                carouselId: 'carousel-6',
                align: 'left',
                selectFirst: true,
                centerOnSelect: false,
                template: 'carousel-templates/demo-3.html',
                pullRefresh: {
                    active: true,
                    callBack: pullRefresh
                }
            };
            vm.onSelectCarousel = onSelectCarousel;
            activate();
            function activate() {
                vm.prueba = 'hola!';
                vm.carouselData6 = createArray(5, true);
                //vm.carouselData6 = [{id: 1,display,src:'http://localhost/ionic/www/img/003.jpg'},{id: 2,src:'http://localhost/ionic/www/img/004.jpg'}];//createArray(5);
                vm.loopItems = [
                    {
                        id: 0,
                        carouselId: 'carousel-8',
                        arrayData: createArray(6)
                    },
                    {
                        id: 1,
                        carouselId: 'carousel-9',
                        arrayData: createArray(8)
                    },
                    {
                        id: 2,
                        carouselId: 'carousel-10',
                        arrayData: createArray(4)
                    }
                ];


                function createArray(total, randomImg) {
                    var model;
                    model = [
                        {
                            id: 1,
                            display: 'item ',
                            src: 'http://www.ayurworld.org/wacapp/7th-wac.png',
                            link: 'http://ayurworld.org/about-7th-wac/'
                        },                        
                        {
                            id: 2,
                            display: 'item ',
                            src: 'http://www.ayurworld.org/wacapp/blog_wac.png',
                            link: 'http://ayurworld.org/goals-of-wac/'

                        },
                        {
                            id: 3,
                            display: 'item ',
                            src: 'http://www.ayurworld.org/wacapp/blog_goals-of-wac.png',
                            link: 'http://ayurworld.org/world-ayurveda-congress/'
                        },
                        {
                            id: 4,
                            display: 'item ',
                            src: 'http://www.ayurworld.org/wacapp/blog_wacs-at-a-glance.png',
                            link: 'http://ayurworld.org/wac-at-a-glance/'
                        }
                    ];
                    return model;
                }

                function createArray_org(total, randomImg) {
                    var i, model, imgId, arr = [];
                    for (i = 0; i < total; i++) {
                        model = {
                            id: i,
                            display: 'item ' + i
                        };
                        if (i === 2 || i === 13) {
                            model.display = 'longer ' + model.display;
                        }
                        model.src = 'http://localhost/ionic/www/img/003.jpg'
                        arr.push(model);
                    }

                    return arr;
                }
            }
            function onSelectCarousel(item) {
                console.log('Carousel item selected:', item);
                vm.itemSelected = item;

                // unselect all carousel with id that contains string except one
                if (vm.options.unselectOthers) {
                    $scope.$broadcast('a-carousel.desactivateItem', {idContains: 'carousel-', except: item.carouselId});
                }
            }
            // Pull refresgh method for carousel 6
            function pullRefresh() {
                //return false;
                $timeout(function () {
                    var i, model, total = 5;
                    var oldLength = vm.carouselData6.length;
                    for (i = 0; i < total; i++) {
                        model = getModelImageItem(oldLength + i);
                        vm.carouselData6.push(model);
                    }

                    $scope.$broadcast('a-carousel.arrayupdated', 'carousel-6');
                    $scope.$broadcast('a-carousel.pullrefresh.done');
                }, 2500);
            }

            function getModelImageItem(id) {
                return false;
                //var imgId = Math.floor(Math.random() * 10000);
                return {
                    id: id,
                    src: 'http://localhost/ionic/www/img/003.jpg'
                }
            }


////////////////////////////	    
        })


        .controller("TeamController", function ($scope, $timeout, $ionicModal) {
            //for carosel	 
            vm = this;

            vm.options = {
                unselectOthers: false
            };

            vm.carouselOptions6 = {
                carouselId: 'carousel-6',
                align: 'left',
                selectFirst: true,
                centerOnSelect: false,
                template: 'carousel-templates/demo-team.html',
                pullRefresh: {
                    active: true,
                    callBack: pullRefresh
                }
            };
            vm.onSelectCarousel = onSelectCarousel;
            activate();
            function activate() {
                vm.prueba = 'hola!';
                vm.carouselData6 = createArray(5, true);
                //vm.carouselData6 = [{id: 1,display,src:'http://localhost/ionic/www/img/003.jpg'},{id: 2,src:'http://localhost/ionic/www/img/004.jpg'}];//createArray(5);
                vm.loopItems = [
                    {
                        id: 0,
                        carouselId: 'carousel-8',
                        arrayData: createArray(6)
                    },
                    {
                        id: 1,
                        carouselId: 'carousel-9',
                        arrayData: createArray(8)
                    },
                    {
                        id: 2,
                        carouselId: 'carousel-10',
                        arrayData: createArray(4)
                    }
                ];


                function createArray(total, randomImg) {
                    var model;
                    model = [
                        {
                            id: 1,
                            display: '<figcaption class="figure-caption text-center"><br><div class="teamInner">Shri J P Nadda<br>Chief Patron<br>Honourable Minister For Health &amp; <br> Family Welfare, Government Of India</div></figcaption>',
                            src: 'http://ayurworld.org/wp-content/uploads/2015/03/nadda.jpg'
                        },
                        {
                            id: 2,
                            display: '<figcaption class="figure-caption text-center"><br><div class="teamInner">Shri Sripad Yesso Naik<br>Chief Patron<br>Honourable Minister For AYUSH <br> Government Of India </div></figcaption> ',
                            src: 'http://www.ayurworld.org/wp-content/uploads/2015/03/sripad3.jpg'
                        },
                        {
                            id: 3,
                            display: '<figcaption class="figure-caption text-center"><br><div class="teamInner">Shri Ajit M Sharan, IAS<br>Chair, National Steering Committee<br>Secretary Ministry of AYUSH<br>Government Of India</div></figcaption>',
                            src: 'http://ayurworld.org/wp-content/uploads/2015/03/ajit.jpg'

                        },
                        {
                            id: 4,
                            display: '<figcaption class="figure-caption text-center"><br><div class="teamInner">Dr Sowmya Swaminathan<br>Chair, National Organising Committee <br> Secretary, DHR &amp; Director General<br>ICMR, Government Of India </div></figcaption>',
                            src: 'http://ayurworld.org/wp-content/uploads/2015/03/sowmya.jpg'
                        }
                    ];
                    return model;
                }

                function createArray_org(total, randomImg) {
                    var i, model, imgId, arr = [];
                    for (i = 0; i < total; i++) {
                        model = {
                            id: i,
                            display: 'item ' + i
                        };
                        if (i === 2 || i === 13) {
                            model.display = 'longer ' + model.display;
                        }
                        model.src = 'http://localhost/ionic/www/img/003.jpg'
                        arr.push(model);
                    }

                    return arr;
                }
            }
            function onSelectCarousel(item) {
                console.log('Carousel item selected:', item);
                vm.itemSelected = item;

                // unselect all carousel with id that contains string except one
                if (vm.options.unselectOthers) {
                    $scope.$broadcast('a-carousel.desactivateItem', {idContains: 'carousel-', except: item.carouselId});
                }
            }
            // Pull refresgh method for carousel 6
            function pullRefresh() {
                //return false;
                $timeout(function () {
                    var i, model, total = 5;
                    var oldLength = vm.carouselData6.length;
                    for (i = 0; i < total; i++) {
                        model = getModelImageItem(oldLength + i);
                        vm.carouselData6.push(model);
                    }

                    $scope.$broadcast('a-carousel.arrayupdated', 'carousel-6');
                    $scope.$broadcast('a-carousel.pullrefresh.done');
                }, 2500);
            }

            function getModelImageItem(id) {
                return false;
                //var imgId = Math.floor(Math.random() * 10000);
                return {
                    id: id,
                    src: 'http://localhost/ionic/www/img/003.jpg'
                }
            }


////////////////////////////	    
        })
        
        
        
        
        
        
.controller('DownloadsCtrl', function($scope, $ionicPlatform,$ionicLoading, $cordovaFile, $fileFactory) {

	
	 $cordovaFile.checkFile(cordova.file.dataDirectory, "some_file.txt")
     .then(function (success) {
       // success
     }, function (error) {
       // error
     });
	
	
	
	
   /* var fs = new $fileFactory();

    $ionicPlatform.ready(function() {
    	
    	
        fs.getEntriesAtRoot().then(function(result) {
        	
        	
            $scope.files = result;
            alert(result);
        }, function(error) {
            console.error(error);
        });

        $scope.getContents = function(path) {
            fs.getEntries(path).then(function(result) {
            	
                $scope.files = result;
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }
    }); */ 

})
        
        
        
        
        
        

.controller('PlaylistsCtrl', function($scope, $http) {
	
	
	
	
	
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	
	
});


