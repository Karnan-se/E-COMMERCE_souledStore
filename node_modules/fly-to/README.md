<div id="top"></div>

# FlyTo

Fly a DOM element to another element.

## [View Online Demo](https://rodgath.github.io/fly-to/demo/)

<br>
<br>

![NPM](https://rodgath.github.io/fly-to/images/fly-to-demo.gif)

<br>
<br>


# Table of Contents

- [Installation](#installation)
- [Implementation](#implementation)
- [License](#license)

# Installation 

**[A]** Download 

+ [fly-to.min.js](https://unpkg.com/fly-to@latest/dist/js/fly-to.min.js) - Minified
+ [fly-to.js](https://unpkg.com/fly-to@latest/dist/js/fly-to.min.js) - Unminified

**[B]** Package

* Install with [yarn](https://yarnpkg.com/): `yarn add fly-to`

* Install with [npm](https://www.npmjs.com/package/fly-to): `npm install fly-to` 

* [![NPM](https://nodei.co/npm/fly-to.png?downloads=true)](https://www.npmjs.com/package/fly-to) 

**[C]** Get a local working copy of the development repository _(Optional)_ <br />
`git clone https://github.com/Rodgath/fly-to.git`


# Implementation

#### Initializing with `flyTo` function. [View Demo](https://rodgath.github.io/fly-to/demo/index.html)
Your HTML code of upto 36 images
```html
<div class="fly-to-element"></div>
<div class="fly-from-element"></div>
```

#### Call the `flyTo()` function with two arguments.
...**1)** The flying element object using its _'class'_ or _'id'_. 

...**2)** The target element object using its _'class'_ or _'id'_. 
```javascript
document.addEventListener('DOMContentLoaded', function() {
  
  const flyFromElement = document.querySelector('.fly-from-element');
  const flyToElement = document.querySelector('.fly-to-element');

  flyTo(flyFromElement, flyToElement);
  
});
```

#### Enqueue the flyTo script at the bottom of your markup
+ Using local script file.
```html
<script src="fly-to.min.js"></script>
<!-- OR -->
<script src="./node_modules/fly-to/dist/js/fly-to.min.js"></script>
```
+ Using CDN file. _(Optional)_
```html
<script src="https://cdn.jsdelivr.net/npm/fly-to@latest/dist/js/fly-to.min.js"></script>
```

##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>

---

## License
flyTo is an open-source project released under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

---

Crafted by [Rodgath](https://twitter.com/Rodgath)
##### <div align="right"><a href="#top">&uarr; TOP &uarr;</a></div>