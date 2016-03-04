var wp = angular.module( "wp", [ "ngResource" ] );

wp.factory( 'WP_Query', [ '$resource', function( $resource ){
	return function( apiRoot ) {
		var api = apiRoot + "/:endpoint/:id";
		var params = {
			endpoint: '@endpoint',
			id: '@id'
		};
		var actions = {};
		return $resource( api, params, actions );
	}
} ] );

wp.directive( "havePosts", [ 'WP_Query', function( WP_Query ) {
	console.log( 'hello' );
	return {
		restrict: "E",
		replace: true,
		// multiElement: true,
		transclude: true,
		scope: {
			postType: '@',
			postId: '@',
			apiRoot: '@',
		},
		controller: [ '$scope', function( $scope ) {
			//$rootScope.apiRoot = $scope.apiRoot;
		} ],
		compile: function( tElement, tAttrs, transclude ) {
			return {
				pre: function preLink( scope, iElement, iAttrs, controller ) {
					if ( scope.postId ) {
						scope.query = {
							'endpoint': scope.postType,
							'id': scope.postId
						}
					} else {
						scope.query = {
							'endpoint': scope.postType,
							'per_page': 10,
							'offset': 0,
							'filter[orderby]': 'date',
							'filter[order]': 'DESC',
							'_embed': true
						}
					}

					WP_Query( scope.apiRoot ).query( scope.query ).$promise.then( function( posts ) {
						scope.posts = posts;
					} );
				},
				post: function postLink( scope, iElement, iAttrs, controller ) {
				}
			}
		},
		template: "<div class=\"have-posts\"><article class=\"{{ postType }}\" ng-repeat=\"post in posts\"><div ng-transclude></div></article></div>"
	}
} ] );

wp.directive( "theTitle", [ function() {
	return{
		restrict:'E',
		require : '^havePosts',
		link: function( scope, element ) {
			element.html( scope.$parent.post.title.rendered );
		}
	}
} ] );

wp.directive( "theContent", [ function() {
	return{
		restrict:'E',
		require : '^havePosts',
		link: function( scope, element ) {
			element.html( scope.$parent.post.content.rendered );
		}
	}
} ] );




