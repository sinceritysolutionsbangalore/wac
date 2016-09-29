angular.module('starter.controllers', [])

.run(function($ionicPlatform, $ionicPopup) {
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
	
	
	
.controller('AppCtrl', function($scope,  $http, $state, $ionicSideMenuDelegate) {
	
	
	
	
	 
	    	  
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
				  
				  console.log(element.data['url'].value);
				  $http.get("http://www.ayurworld.org/home/api/?param=menu").success(function (data, slug){
			    	console.log(data);
			    	console.log(slug);
			    	
			    	$state.go( 'app.search' );
				  });
			  };
			  
			  
			  
			  $scope.show = function() {
			    $ionicLoading.show({
			      template: 'Loading...'
			    }).then(function(){
			       console.log("The loading indicator is now displayed");
			    });
			  };
			
			  $http.get("http://www.ayurworld.org/home/api/?param=menu").success(function (data, slug){
			  	console.log(data);
			  	$scope.menus = data;
			  	console.log(slug);
			  	
			  	
			  });
  
  
			  $http.get("http://ayurworld.org/wac_api/api?slug=home").success(function (data, slug){
				  	console.log(data);
				  	
				  	$scope.pageContent = data.content;
				  	
				 });
			  
			  $scope.hide = function(){
				    $ionicLoading.hide().then(function(){
				       console.log("The loading indicator is now hidden");
				    });
				  };
	     
  
  
  
  
$scope.renderPage  = function(event) {
	  
	
	 
	 //console.log($(event.target).attr("data-url"));
	  
	//var element = event.target;
	  
	//console.log(element.data['url'].value);
    
  };
  
  
  
  
  
  
  
  
})


.controller("MenuController", function($scope, $ionicSideMenuDelegate, $http, $sce) {
	
	  
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
	  
	  
    $scope.renderPage = function(event) {
    	var url = $(event.target).attr("data-url");
    	var urlSplit;
    	if(url){
    		urlSplit = url.split('/');
    		
    		console.log(urlSplit)
    		if(urlSplit['3']){
    			
    			
    			$scope.pageContent = "";
    			$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src=""></iframe>');
    			console.log(url.split('/'));
    			
    			if(urlSplit['3'] =="abstract-submission"){
    				
    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/abstract-submission/"></iframe>');
    				/*$http.get("http://ayurworld.org/abstract-submission/").success(function (data, slug){
        			  	console.log(data);
        			  	
        			  	$scope.iframeContent = data.html;
        			  	 
        			  	
        			 });*/
    				
    				
    				
    			}else if(urlSplit['3'] =="delegate-registration"){
    				
    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/delegate-registration/"></iframe>');
    				
    			}else{
    				
    				
    				$http.get("http://ayurworld.org/wac_api/api?slug="+urlSplit['3']).success(function (data, slug){
        			  	console.log(data);
        			  	
        			  	$scope.pageContent = data.content;
        			  	
        			 });
    			}
    			
    			
    			//$ionicSideMenuDelegate.$getByHandle('my-handle').toggleLeft();
    			
    			
    			
    			// $scope.currentProject = 'http://ayurworld.org/abstract-submission/';
    		   //  $scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.currentProject.url);
    		}else{
    			
    			
    			if(url == "http://www.ayurworld.org/"){
    				$http.get("http://ayurworld.org/wac_api/api?slug=home").success(function (data, slug){
    				  	console.log(data);
    				  	
    				  	$scope.pageContent = data.content;
    				  	
    				 });
    				
    			}else{
    				console.log('not a valid URL');
    			}
    			
    		}
    		
    	}
    	
    	
        if($ionicSideMenuDelegate.isOpenLeft()) {
            $ionicSideMenuDelegate.toggleLeft(false);
        } else {
            $ionicSideMenuDelegate.toggleLeft(true);
        }
    }
})

.controller('PlaylistsCtrl', function($scope, $http) {
	
	
	
	
	
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	
	
});


