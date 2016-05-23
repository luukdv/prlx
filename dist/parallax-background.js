'use strict';

! function($) {

$.fn.parallaxBackground = function(options) {
  /**
   * Check if image parameter is set
   */
  if(! options.image) {
    return;
  }

  /**
   * Show initially hidden elements to support avoidance of unstyled flash
   */
  $(options.image).show();

  /**
   * Check if device is running on iOS7,
   * because DOM painting is paused during scroll events
   */
  if(/iP(ad|hone|od).*OS 7.*/.test(navigator.userAgent)) {
    return;
  }

  /**
   * Check for RAF support
   */
  if(! window.requestAnimationFrame) {
    return;
  }

  var $elements = this;

  if(! $elements.length) {
    return;
  }

  var items = [],
      scrollTop,
      windowElement = $(window),
      windowHeight = windowElement.height();

  /**
   * Initialize function,
   * and call again on window resize to support element/window size changes
   */
  init();
  windowElement.resize(init);

  function init() {
    windowHeight = windowElement.height();

    $elements.each(function(key) {
      var $element = $(this),
          $image = $element.find(options.image);

      if(! $image.length) {
        return false;
      }

      var height = $element.height();

      /**
       * Check the available space for parallax movements,
       * and continue to next element when there is none
       */
      var parallaxSpace = $image.height() - height;

      if(parallaxSpace === 0) {
        return;
      }

      var offset = $element.offset().top;

      /**
       * Calculate some necessary variables
       */
      items[key] = {
        $image: $image,
        distanceToVisible: offset - windowHeight,
        height: height,
        offset: offset,
        parallaxSpace: parallaxSpace
      };

      /**
       * Check how big the space is where parallaxing should take place
       */
      items[key].scrollSpace = height + windowHeight;
    });
  }

  requestAnimationFrame(parallax);

  function parallax() {
    scrollTop = windowElement.scrollTop();

    /**
     * Separate calculations for each element
     */
    $.each(items, function(key, item) {
      /**
       * Check when element is in and out of sight,
       * for precise animations and avoiding execution when element is not visible
       */
      var inSight = scrollTop >= item.distanceToVisible,
          outOfSight = scrollTop >= (item.height + item.offset);

      if(inSight && ! outOfSight) {
        var scrollAmount = scrollTop - item.distanceToVisible;

        /**
         * Support negative amounts,
         * to make sure parallax is centered at the middle of the viewport
         */
        scrollAmount = scrollAmount - (item.scrollSpace / 2);

        /**
         * Calculate pixel amount to be animated,
         * and round off unnecessary precise amount
         */
        var animatePerPixel = item.parallaxSpace / item.scrollSpace,
            translate = (scrollAmount * animatePerPixel).toFixed(1);

        /**
         * Invert amount for more parallax effect
         */
        translate = translate * -1;

        item.$image.css({
          'transform': 'translateY(' + translate + 'px)'
        });
      }
    });

    requestAnimationFrame(parallax);
  }
};

}(jQuery);
