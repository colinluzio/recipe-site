var app = angular.module('recipeSite', ['ui.router',"angucomplete-alt"]);

app.factory('ingredients', ['$http',function($http){
  // service body
    var o = {
       'ingredients': [],
       'name': "ingredients"
    };
  
    o.getAll = function() {
        return $http.get('/ingredients').success(function(data){
        angular.copy(data[1].ingredients, o.ingredients);
        });
    };
    
    
    o.getAll();
    return o;
}]);
app.controller('MainCtrl', ['$scope', 'ingredients',function($scope,ingredients){
        $scope.ingredients=ingredients.ingredients;
  }
]);

//
//
//
//app.controller('MainCtrl', ['$scope', 'ingredients',function($scope,ingredients){
//    
//    $scope.ingredients=ingredients.ingredients;
//    $scope.selectedIngredient ='';
//    $scope.name = ''; // This will hold the selected item
//    $scope.onItemSelected = function() { // this gets executed when an item is selected
//    console.log('selected=' + $scope.name);
//  };
//    
//}]);
//
//app.controller('PostsCtrl', [
//    '$scope',
//    '$stateParams',
//    'posts',
//    function($scope, $stateParams, posts){
//        
//        $scope.post = posts.posts[$stateParams.id];
//        $scope.addComment = function(){
//            if($scope.body === '') {
//                return; 
//            }
//            
//        $scope.post.comments.push({
//            body: $scope.body,
//            author: 'user',
//            upvotes: 0
//        });
//        
//        $scope.body = '';
//    };
//    }
//    
//]);
//
//app.directive('typeahead', function($timeout) {
//    return {
//    restrict: 'AEC',
//    scope: {
//      items: '=',
//      title: '@',
//      prompt: '@',
//      model: '=',
//
//    },
//    link: function(scope, elem, attrs) {
//  scope.handleSelection = function(selectedItem) {
//    scope.model = selectedItem;
//    scope.current = 0;
//    scope.selected = true;
//    $timeout(function() {
//      scope.onSelect();
//    }, 200);
//  };
//  scope.current = 0;
//  scope.selected = true; // hides the list initially
//  scope.isCurrent = function(index) {
//    return scope.current == index;
//  };
//  scope.setCurrent = function(index) {
//    scope.current = index;
//  };
//},
//    templateUrl: '/templateurl.html'
//  };
//});
