# Parallax Background

A small, performance optimized jQuery plugin for parallax image backgrounds. Aims to be as straight forward and semantic as possible, without tricks, hacks, element clones, layout thrashing, etc.

## Installation

### Bower

```sh
bower install luukdv/parallax-background --save
```

### Manual

```html
<script src="dist/parallax-background.js"></script>
```

## Configuration

### Options

| Option | Default value | Required | Description |
| :--- | :--- | :--- | :--- |
| `image` | `undefined` | Yes | Selector string which can be picked up by jQuery

## Usage

### Example

```html
<div class="example">
  <div class="img"></div>
</div>
```

```js
$('.example').parallaxBackground({
  'image': '.img'
});
```

### Styling

This plugin is intented to be used for image backgrounds. There has to be a parent element (to hide the parallax overflow), and a child element. See example above. Naturally, some styling has to be involved. There isn't any bundled CSS file or activated style through JavaScript, to give as much freedom as possible. However, these are the recommended style rules:

```scss
$element-height: 400px; // Example, can be anything
$image-height: 800px; // Example, can be anything

.example {
  height: $element-height;
  overflow: hidden;
  position: relative;

  .img {
  	background-image: url('image.jpg');
    background-position: 50% 50%;
    background-size: cover;
    display: none; /* 1 */
    height: $image-height;
    position: absolute; /* 2 */
    top: -(($image-height - $element-height) / 2);
  }
}
```

1. When you load JavaScript in the footer/async/defer, it's a good idea to initially hide the image element. This will solve the (minimal) visual change of the image's position after the page is done loading.
2. Absolute positioning is the best option for optimal animation performance.

## Support

### Browser resizing

Positions will be recalculated when the browser is resized. That means orientation changes on tablets and media queries on the element can be done safely.

### requestAnimationFrame

As pointed out before, this plugin aims to be as performant as possible. Therefore, browsers that don't implement `requestAnimationFrame` are not supported.

### iOS 7

iOS 7 is not supported, since DOM painting is paused during scroll events which doesn't play well with parallax scrolling.

### Fallback

Fallback is gracious, since the image will just be displayed normally.
