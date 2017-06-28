app.service( 'HttpService', function( $http) {
  var sv = this;

  // postItem(itemToSend);
  sv.postItem = function( poop ) {
    return $http.post('/items', poop).then(function( response ){
      console.log('back from /items post with response: ', response);
      return response;
    });
  };

  sv.getItems = function () {
    return $http.get('/items').then( function (response) {
      // console.log('response is:', response);
      return response;
    });
  };
  sv.deleteItem = function(id) {
    return $http.delete('/items/'+ id).then(function(response){
      console.log('deleted', response);
      return response;
    });
  };
});
