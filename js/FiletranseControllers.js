angular.module('starter.controllers', ['ionic','ngCordova'])

.run(function($ionicPlatform, $ionicPopup) {
	
	$ionicPlatform.ready(function() {       
		   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, success, error);
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
	
	
	
.controller('AppCtrl', function($scope,  $http, $state, $ionicSideMenuDelegate, $window) {
	
	
	
	
	 
	    	  
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
  
})

.controller("MenuController", function($scope, $ionicSideMenuDelegate, $http, $sce, $ionicLoading, $ionicPopup) {

	function downloadAndOpenPDF(url, fileName, folder) {
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
	}
	
	
	
	$scope.OpenLink = function(event) {
		
		
		console.clear();
		var url = $(event.target).attr("data-url");
		console.log("downloading file");
		$ionicLoading.show ({
			template:"Loading..."			
		});
		
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsSuccess(fs), function() {
	        $ionicLoading.hide();
	        console.log("Request for filesystem failed");
	    });		
		
		function dirSuccess(entries){
			  console.log(entries);
			  
			  var alertPopup = $ionicPopup.alert({
              	title: 'File download Success',
              	template: 'Stored in location:'+entry
            });
			  // will print something like the following to the console
			  // [{"isFile":false,"isDirectory":true,"name":"extSdCard",
			  //    "fullPath":"file:///storage/extSdCard","filesystem":null},
			  //  {"isFile":false,"isDirectory":true,"name":"sdcard0",
			  //    "fullPath":"file:///storage/sdcard0","filesystem":null}
			  // ]
			}
		
		
		function fsSuccess(fs){
			
			/*if (fs.root.fullPath === 'file:///storage/sdcard0'){
			    fs.root.fullPath = 'file:///storage'; 
			  }
			  
			  var directoryReader = fs.root.createReader()
			  
			  directoryReader.readEntries(dirSuccess,fail);*/
			
			 fs.root.getDirectory(
		            "file:///sdcard/Wac",
		            {
		                create: true
		            },
		            function(dirEntry) {
		                dirEntry.getFile(
		                    "test.png", 
		                    {
		                        create: true, 
		                        exclusive: false
		                    }, 
		                    function gotFileEntry(fe) {
		                        var p = fe.toURL();
		                        fe.remove();
		                        ft = new FileTransfer();
		                        ft.download(
		                            encodeURI(url),
		                            p,
		                            function(entry) {
		                            	
		                                $ionicLoading.hide();
		                                $scope.imgFile = entry.toURL();
		                                
		                                var alertPopup = $ionicPopup.alert({
		                                	title: 'File download Success',
		                                	template: 'Stored in location:'+entry
	                                  });
		                            },
		                            function(error) {
		                                $ionicLoading.hide();
		                                alert("Download Error Source -> " + error.source);
		                            },
		                            false,
		                            null
		                        );
		                    }, 
		                    function() {
		                        $ionicLoading.hide();
		                        console.log("Get file failed");
		                    }
		                );
		            }
		        ); 
			
			
		}
		
	};
	
	 $scope.isDownloadLink = function(playlist){
	    	
		 if(playlist.children.length > 0){
			return true;
		}else{
			var url = playlist.url;
	    	var urlSplit;
	    	urlSplit = url.split('/');
		
		if(urlSplit['3'] =="wp-content"){	    		
			console.log("Not a child node " + urlSplit['3'])
	    		console.log(urlSplit)
	    		return false;
	    	}else{
	    		return true;
	    	}
		}
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
    			$scope.pageContent = "";
    			$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src=""></iframe>');
    			if(urlSplit['3'] =="abstract-submission"){
    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/abstract-submission/"></iframe>');
    			}else if(urlSplit['3'] =="delegate-registration"){
    				$scope.player = $sce.trustAsHtml('<iframe width="100%" height="500px" src="http://ayurworld.org/delegate-registration/"></iframe>');
    			}else if(urlSplit['3'] =="wp-content"){
    				$http.post(url).then(function(returnData,payload){
    				    var uriString = parseReturn(returnData);
    				    location.href = uriString
    				})
    			}else{
    				$http.get("http://ayurworld.org/wac_api/api?slug="+urlSplit['3']).success(function (data, slug){
        			  	$scope.pageContent = data.content;
        			 });
    			}
    		}else{
    			if(url == "http://www.ayurworld.org/"){
    				$http.get("http://ayurworld.org/wac_api/api?slug=home").success(function (data, slug){
    				  	$scope.pageContent = data.content;
    				 });
    			}else{
    				console.log('not a valid URL');
    			}
    		}
    		
    	}
    	$ionicLoading.hide();
    	
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


