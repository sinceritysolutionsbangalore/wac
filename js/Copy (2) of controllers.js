
var historyArray = [];

angular.module('starter.controllers', ['ionic','ngCordova'])

.run(function($window, $http,$rootScope, $ionicSideMenuDelegate,$ionicPlatform, $ionicPopup) {
	
	
	function triggerBackButton() {
        var backButtonEvent = document.createEvent('Events');
        backButtonEvent.initEvent('backbutton', false, false);
        document.dispatchEvent(backButtonEvent);
        alert('back button triggered');
        $rootScope.getBackPage();
        
    }

    function registerBackButtonFake() {
        document.addEventListener('keyup', function (event) {
            // Alt+Ctrl+<
            if (event.altKey && event.ctrlKey && event.keyCode === 13) {
                triggerBackButton();
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

	    	 // event.preventDefault();
	    	  //console.log(lastItem);

	    	

	    	}, 100);
		
		
		
	}, false);
	  $ionicPlatform.ready(function() {

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

	  });
	})
	
	
	
.controller('AppCtrl', function($scope, $rootScope, $compile, $http, $state, $ionicSideMenuDelegate, $ionicScrollDelegate, $window, $sce,$ionicPopup, $ionicLoading) {
	
	
	$rootScope.getBackPage = function() {
		var lastItem =  historyArray.pop();
		
		   console.log(lastItem);

	  	  if(lastItem =="abstract-submission"){
	  		  $rootScope.pageContent = "";
				$ionicSideMenuDelegate.toggleLeft(false);
				$rootScope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/abstract-submission/"></iframe>');

			}else if(lastItem =="delegate-registration"){
				$rootScope.pageContent = "";
				$ionicSideMenuDelegate.toggleLeft(false);
				$rootScope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/delegate-registration/"></iframe>');

			}else if(lastItem =="jaim"){
				$rootScope.pageContent = "";
				$ionicSideMenuDelegate.toggleLeft(false);
				$rootScope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/jaim/"></iframe>');

			}else if(lastItem =="wp-content"){
				$rootScope.pageContent = "";
				$http.post(url).then(function(returnData,payload){
				    var uriString = parseReturn(returnData);
				    location.href = uriString
				})


			}else{


				$http.get("http://ayurworld.org/wac_api/api?slug="+lastItem).success(function (data, slug){

					$rootScope.pageContent = "";
					$rootScope.pageContent = data.content;

				  	$ionicSideMenuDelegate.toggleLeft(false);
				 });
			}
		
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
			  
			  
			  
	  $scope.show = function() {
	    $ionicLoading.show({
	      template: 'Loading...'
	    }).then(function(){
	       //console.log("The loading indicator is now displayed");
	    });
	  };
	
	  $http.get("http://www.ayurworld.org/home/api/?param=menu").success(function (data, slug){
	  	//console.log(data);
	  	$scope.menus = data;
	  	//console.log(slug);
	  	
	  	
	  });
  
  
	  $http.get("http://ayurworld.org/wac_api/api?slug=home").success(function (data, slug){
	  	$scope.pageContent = data.content;
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
    
    
    
    $scope.OpenLink = function(event) {
    	
    	$ionicLoading.show ({
			template:"Downloading file..."			
		});
		
		var url = $(event.target).attr("data-url");
		var filename = url.substring(url.lastIndexOf('/')+1);
		
		var fileTransfer = new FileTransfer();
	    var filePath = cordova.file.externalDataDirectory + filename;

	    fileTransfer.download(
	        url,
	        filePath,
	        function(entry) {
	            console.log('********OK!', filePath);
	            $ionicPopup.alert({
	  	          title: 'File saved',
	  	          content: filePath
	  	        })
	  	        window.plugins.fileOpener.open(filePath);
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
	    $ionicLoading.hide();
		
	};
  
	
	
	
	
	
	
	 $scope.renderPage = function(event) {
		 
	    	$ionicLoading.show ({
				template:"Loading..."			
			});
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
	    			
	    			if(urlSplit['3'] =="abstract-submission"){
	    				$scope.pageContent = "";
	    				$ionicSideMenuDelegate.toggleLeft(false);
	    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/abstract-submission/"></iframe>');
	    				
	    			}else if(urlSplit['3'] =="delegate-registration"){
	    				$scope.pageContent = "";
	    				$ionicSideMenuDelegate.toggleLeft(false);
	    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/delegate-registration/"></iframe>');
	    				
	    			}else if(urlSplit['3'] =="jaim"){
	    				$scope.pageContent = "";
	    				$ionicSideMenuDelegate.toggleLeft(false);
	    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/jaim/"></iframe>');
	    				
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
	    			
	    			
	    			if(url == "http://www.ayurworld.org/"){
	    				
	    				
	    				$http.get("http://ayurworld.org/wac_api/api?slug=home").success(function (data, slug){
	    					 $scope.pageContent = "";
	    				  	$scope.pageContent = data.content;
	    				  	
	    				 });
	    				
	    			}else{
	    				console.log('not a valid URL');
	    			}
	    		}
	    		
	    	}else{
	    		getHomepage()
	    		
	    		
	    	}
	    	$ionicLoading.hide();
	    	
	        /*if($ionicSideMenuDelegate.isOpenLeft()) {
	            $ionicSideMenuDelegate.toggleLeft(false);
	        } else {
	            $ionicSideMenuDelegate.toggleLeft(true);
	        }*/
	        
	        
	        $ionicScrollDelegate.scrollTop();
	    }
	 
	 
	 getHomepage()
	 function getHomepage(){
		 $http.get("http://ayurworld.org/wac_api/api?slug=home").success(function (data, slug){
			 $scope.pageContent = "";
			  	$scope.pageContent = data.content;
			 });
 		
 		$http.get("http://ayurworld.org/wac_api/api?slug=addons").success(function (data, slug){
 		  	  var dataContent = JSON.parse(data.content);		  	  
 		  	 
 		  	  console.log(dataContent.all);
 			  $.each( dataContent.all, function( key, value ) {
 				  
 				 $(document.getElementsByClassName( value.appendTo.toString()) ).empty();
 				  var elem = $compile('<a data-ng-click="renderPage($event)" data-url="'+value.url+'"  data-url="'+value.url+'"  class="'+value.classTag+'">'+value.text+'</a>')($scope);
 				  $(document.getElementsByClassName( value.appendTo.toString()) ).append(elem);   
 			  });
 		  }); 
 		
 		$ionicScrollDelegate.scrollTop();
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

.controller('PlaylistsCtrl', function($scope, $http) {
	
	
	
	
	
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	
	
});


