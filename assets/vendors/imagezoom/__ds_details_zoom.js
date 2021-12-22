/**
 * ImageZoom Plugin
 * http://0401morita.github.io/imagezoom-plugin
 * MIT licensed
 *
 * Copyright (C) 2014 http://0401morita.github.io/imagezoom-plugin A project by Yosuke Morita
 */
(function ($) {
  var defaults = {
    cursorcolor: '255,255,255',
    opacity: 0.5,
    cursor: 'crosshair',
    zindex: 1020,
    zoomviewsize: [820, 492],
    zoomviewposition: 'right',
    zoomviewmargin: 10,
    zoomviewborder: '1px solid #CCC',
    magnification: 2.725
  };

  var $this, $active, imagezoomCursor, imagezoomView, settings, imageWidth, imageHeight, offset, cursorSize, imageSrc;
  var methods = {
    init: function (options) {
        $this = $(this),
        imagezoomCursor = $('.imagezoom-cursor'),
        imagezoomView = $('.imagezoom-view'),
        $(document).on('mouseenter', $this.selector, function (e) {
          var data = $(this).data();
            $active = $(this),
            settings = $.extend({}, defaults, options, data),
            offset = $(this).offset(),
            imageWidth = $(this).width(),
            imageHeight = $(this).height(),
            cursorSize = [(settings.zoomviewsize[0] / settings.magnification), (settings.zoomviewsize[1] / settings.magnification)];
          if (data.imagezoom == true) {
            imageSrc = $(this).attr('src');
          } else {
            imageSrc = $(this).get(0).getAttribute('data-imagezoom');
          }

          var posX = e.pageX, posY = e.pageY, zoomViewPositionX;
          $('body').prepend('<div class="imagezoom-cursor">&nbsp;</div><div class="imagezoom-view"><img src="' + imageSrc + '"></div>');

          if (settings.zoomviewposition == 'right') {
            zoomViewPositionX = (offset.left + imageWidth + settings.zoomviewmargin);
          } else {
            zoomViewPositionX = (offset.left - imageWidth - settings.zoomviewmargin);
          }

          $(imagezoomView.selector).css({
            'position': 'absolute',
            'left': zoomViewPositionX,
            'top': offset.top,
            'width': 'calc(1215px - 33%)',
            'height': cursorSize[1] * settings.magnification,
            'background': '#000',
            'z-index': 1020,
            'overflow': 'hidden',
            'box-shadow': '0px 0px 3px #ccc'
          });

          $(imagezoomView.selector).children('img').css({
            'position': 'absolute',
            'width': imageWidth * settings.magnification,
            'height': imageHeight * settings.magnification,
          });

          $(imagezoomCursor.selector).css({
            'position': 'absolute',
            'width': cursorSize[0],
            'height': cursorSize[1],
            'background-color': 'rgb(' + settings.cursorcolor + ')',
            'z-index': settings.zindex,
            'opacity': settings.opacity,
            'cursor': settings.cursor
          });

          $(imagezoomCursor.selector).css({ 'top': posY - (cursorSize[1] / 2), 'left': posX });
          $(document).on('click.imageZoomToggleClick', imagezoomCursor.selector, methods.openGallery);
          $(document).on('mousemove', document.body, methods.cursorPos);
        }),
        $(document).on('click', '[data-dpgtoggle]', function () {
          var data = $(this).data();
          
          if (data.vid) {
            methods.toggleImage(data.dpgtoggle, true);
            return;
          }

          methods.toggleImage(data.dpgtoggle);
        });
    },
    cursorPos: function (e) {
      var posX = e.pageX, posY = e.pageY;
      if (posY < offset.top || posX < offset.left || posY > (offset.top + imageHeight) || posX > (offset.left + imageWidth)) {
        $(imagezoomCursor.selector).remove();
        $(imagezoomView.selector).remove();
        return;
      }

      if (posX - (cursorSize[0] / 2) < offset.left) {
        posX = offset.left + (cursorSize[0] / 2);
      } else if (posX + (cursorSize[0] / 2) > offset.left + imageWidth) {
        posX = (offset.left + imageWidth) - (cursorSize[0] / 2);
      }

      if (posY - (cursorSize[1] / 2) < offset.top) {
        posY = offset.top + (cursorSize[1] / 2);
      } else if (posY + (cursorSize[1] / 2) > offset.top + imageHeight) {
        posY = (offset.top + imageHeight) - (cursorSize[1] / 2);
      }

      $(imagezoomCursor.selector).css({ 'top': posY - (cursorSize[1] / 2), 'left': posX - (cursorSize[0] / 2) });
      $(imagezoomView.selector).children('img').css({ 'top': ((offset.top - posY) + (cursorSize[1] / 2)) * settings.magnification, 'left': ((offset.left - posX) + (cursorSize[0] / 2)) * settings.magnification });

      $(imagezoomCursor.selector).mouseleave(function () {
        $(this).remove();
      });
    },
    
    openGallery: function() {
      $('#all-image-slider').modal('show');
      $(document).off('.imageZoomToggleClick');

      if ($active.data("vimeourl")) {
        methods.toggleImage($active.data("vimeourl"), true);
      } else {
        methods.toggleImage(imageSrc);
      }

      $(imagezoomView.selector).remove();
    },

    toggleImage: function(image, isVideo = false) {
      if (isVideo) {
        $('a[href="#gallery-videos"]').tab('show');
        _ilm_Details_page.initVimeoPlayer(image);
        return;
      }
      
      $('a[href="#gallery-images"]').tab('show');
      $('#dpgvpimg img').attr('src', image)
    }
  };

  $.fn.imageZoom = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error(method);
    }
  }

  $(document).ready(function () {
    $('[data-imagezoom]').imageZoom();
  });
})(jQuery);
