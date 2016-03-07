# wp-angular

[![Build Status](https://travis-ci.org/miya0001/wp-angular.svg?branch=master)](https://travis-ci.org/miya0001/wp-angular)

This project is in progress...

```
<have-posts api-root="http://example.com/wp-json/wp/v2"
					post-type="posts" offset="0" per-page="5">
	<header class="entry-header">
		<the-post-thumbnail size="post-thumbnaiil"></the-post-thumbnail>
		<h1 class="entry-title"><the-title></the-title></h1>
		<div class="entry-meta">
			<the-date format="yyyy/mm/dd"></the-date>
		</div>
	</header>
	<div class="entry-content">
		<the-content></the-content>
	</div>
</have-posts>
```

Demo: [http://miya0001.github.io/wp-angular/tests/tests.html](http://miya0001.github.io/wp-angular/tests/tests.html)

## Creates your custom template tag

```
// Registers your module, you should import `wp`.
var myapp = angular.module( "myapp", [ "wp" ] );

// Creates a `<my-permalink></my-permalink>` as custom template tag.
// If you place it in your HTML,
// then you can get `<a href="#!/post/123">Hello</a>`.
myapp.directive( "myPermalink", [ '$sce', function( $sce ) {
	return{
		restrict:'E',
		replace: true,
		require : '^havePosts',
		compile: function( tElement, tAttrs, transclude ) {
			return {
				post: function postLink( scope, element, attrs, controller ) {
					var post = scope.$parent.post; // post object
					scope.post_id = post.id;
					scope.title = post.title.rendered;
				}
			}
		},
		template: "<a ng-href=\"#!/post/{{ post_id }}\">{{ title }}</a>"
	}
} ] );
```

## Enables Infinite Scroll

Please load [ngInfiniteScroll](https://sroze.github.io/ngInfiniteScroll/) like following.

```
<script type='text/javascript' src='path/to/jquery.min.js'></script>
<script type='text/javascript' src='path/to/angular.min.js'></script>
<script type='text/javascript' src='path/to/ng-infinite-scroll.min.js'></script>
```

Add `infinite-scroll` as a dependency.

```
angular.module( "app", [ "wp", "infinite-scroll" ] );
```

That's it.

## How to contribute

```
$ npm install
$ npm test
```
