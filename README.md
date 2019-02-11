# animated-svg-dial

## Fully customizable SVG dial

![](https://img.shields.io/npm/v/animated-svg-dial.svg?style=for-the-badge)

A fully customizable, dependancy free, multi-platform javascript progress dial created using SVG tags.

[Demos](https://codepen.io/collection/nvegVR/)

### Installation

    $ npm install animated-svg-dial

## Getting started

You have to add the script file to your HTML code.

### HTML

```html
<script src="node_modules/animated-svg-dial/build/animated-svg-dial.min.js"></script>
```

And then you can instanciate a dial in any container you want by providing a selector (a JS object returned from `document.querySelector` or a JQuery object) and an object of parameters.

### JS

```js
var dial = new AnimatedSVGDial('.container', {});
dial.animate();
```

## Different render options

This render options are assumed by the script based on what you pass as the configuration parameter.  
The options are:

* **Single dial with no text**, Passing a single object or an array with length === 1.
* **Single dial with text**, Passing a single object or an array with length === 1 and setting a value to the text parameters.
* **Multiple dials**, Passing an array with length > 1, multiple dials **never have text** even if you value the parameters.

[Demos](https://codepen.io/collection/nvegVR/)

## Configuration options

You can pass options to the dial or dials by creating an options object or an options array based on the number of dials you are creating.  
The options object for a single dial with text will be like this one:

```js
  {
    r: '40',
    bkgStrokeColor: 'black',
    value: 90,
    maxValue: 100,
    animationDuration: 1500,
    animationOffset: 0,
    textFill: '#b30000',
    textSize: '20',
    text: 'text'
  }
```

While the options array for more than one wheel will look lile this:

```js
  [{
    r: '40',
    bkgStrokeColor: 'black',
    value: 90,
    maxValue: 100,
    animationDuration: 1500,
    animationOffset: 0
  },
  {
    r: '30',
    bkgStrokeColor: 'black',
    strokeColor: '#de0613',
    strokeWidth: '7',
    bkgStrokeWidth: '7',
    value: 80,
    maxValue: 100,
    animationOffset: 600
  }]
```

[Demos](https://codepen.io/collection/nvegVR/)

### Options

value  
`default: 50`  

maxValue  
`default: 100`  
value when the dial will be fully completed

#### Background dial

r  
`default: 40`  
radius of the dial (shared with the foreground dial)

bkgFill  
`default: none`  
background of the dial area

bkgStrokeColor  
`default: black`  
color of the dial  
can be a gradient id using `'url(#' + gradientId + ')'`

bkgStrokeWidth  
`default: 40`  
width of the dial

bkgStrokeOpacity  
`default: 0.4`  
opacity of the dial

#### Foreground dial

r  
`default: 40`  
radius of the dial (shared with the background dial)

fill  
`default: none`  
background of the dial area

strokeColor  
`default: black`  
color of the dial  
can be a gradient id using `'url(#' + gradientId + ')'`

strokeWidth  
`default: 10`  
width of the dial

strokeOpacity  
`default: 1`  
opacity of the dial

strokeLineCap  
`default: round`  
the type of linecap of the dial

#### Gradient

gradient.type
`default: linear`  
gradient type, can be `linear` or `circular`

##### Linear gradient

gradient.x1  
`default: 0%`  

gradient.y1  
`default: 0%`  

gradient.x2  
`default: 100%`  

gradient.y2  
`default: 100%`  

##### Circular gradient

gradient.cx  
`default: 0%`  

gradient.cy  
`default: 0%`  

gradient.r  
`default: 5%`  

gradient.fx  
`default: 45%`  

gradient.fy  
`default: 45%`  

##### Gradient Stops

stop.offset  
`default: 0%`  

stop.color  
`default: #FFFFFF%`  

stop.opacity  
`default: 1%`

#### Text

Text params are utilized only in case of single dial.

text
`default: undefined`  
text to be inserted into the dial

textX  
`default: 50%`  
horizontal position of the text in the area

textY  
`default: -45%`  
vertical position of the text in the area

textStyle  
`default: transform: rotate(90deg);`  
style of the text element.  
**DO NOT FORGET TO ADD transform: rotate(90deg); TO THE STYLE OR THE TEXT WILL BE ROTATED TO THE RIGHT**

textFill  
`default: black`  
RGB or CSS colors are accepted

textStrokeColor  
`default: none`  
RGB or CSS colors are accepted

textStrokeWidth  
`default: 0`  

textSize  
`default: 18`  

textWeight  
`default: normal`  

textFont  
`default: Verdana`

textAnchor  
`default: middle`  

#### Animation

animationDuration  
`default: 350`  

animationOffset  
`default: 0`

animationEasing  
`default: ease-out`

## Methods

`animate()`  
animates the dial

`reset()`  
resets the dial to the initial value

## Misc

You can find me on: [GitHub](https://github.com/nano9222)

[© Enrico Nannetti 2019](https://github.com/nano9222)
