# prlx

A small (~1KB gzip), performance optimized module for parallax image backgrounds. Aims to be as straight forward and semantic as possible, without tricks, hacks, element clones, layout thrashing, etc.

## Installation

Yarn:

```sh
yarn add prlx
```

NPM:

```sh
npm install prlx --save
```

Manually:

```html
<script src="dist/prlx.js"></script>
```

## Arguments

| Argument | Required | Description |
| :--- | :--- | :--- |
| `item` | Yes | Selector string for parent element
| `image` | Yes | Selector string for image element inside parent

## Usage

### Example

```html
<div class="example">
  <div class="img"></div>
</div>
```

```js
prlx('.example', '.img');
```

### Styling

This plugin is intented to be used for image backgrounds. There has to be a parent element (to hide the parallax overflow), and a child element. See example above. Naturally, some styling has to be involved. There isn't any bundled CSS file or activated style through JavaScript, to give as much freedom as possible. However, these are the required style rules to work as intended:

```scss
$parallax-space: 20%; // Example, can be anything

.example {
  height: $element-height;
  overflow: hidden;
  position: relative;

  .img {
    background-image: url('image.jpg');
    height: 100% + $parallax-space;
    position: absolute; /* 1 */
    top: -($parallax-space / 2);
    width: 100%; // Example, can be anything
  }
}
```

These are additional recommended styles rules:

```scss
.example {
  .img {
    background-position: 50%;
    background-size: cover;
    display: none; /* 2 */
    will-change: transform; /* 3 */
  }
}
```

1. Absolute positioning is the best option for optimal animation performance.
2. When you load JavaScript in the footer/async/defer, it's a good idea to initially hide the image element. This will solve the (minimal) visual change of the image's position after the page is done loading.
3. Will create a dedicated paint layer for the parallax animation.

### Manual recalculation

When there are other libraries/scripts at work who influence the DOM after `prlx` is done calculating its values, it may be necessary to recalculate values. This can be done at any time:

```js
const example = prlx('.example', '.img');
...
example.recalculate();
```

## Support

### Browser resizing

Positions will be recalculated when the browser is resized. That means orientation changes on tablets and media queries on the element can be done safely.

### requestAnimationFrame

As pointed out before, this plugin aims to be as performant as possible. Therefore, browsers that don't implement `requestAnimationFrame` are not supported.

### iOS 7

iOS 7 is not supported, since DOM painting is paused during scroll events which doesn't play well with parallax scrolling.

### Fallback

Fallback is gracious, since the image will just be displayed normally.
