<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                <button class="pswp__button pswp__button--share" title="Share"></button>
                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>
            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="<?php echo asset('assets/vendors/photoswipe/photoswipe.css') ?>">
<link rel="stylesheet" href="<?php echo asset('assets/vendors/photoswipe/skins/default-skin.css') ?>">
<script src="<?php echo asset('assets/vendors/photoswipe/photoswipe.min.js') ?>"></script>
<script>
var openPhotoSwipe = function(index) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
        items = [<?php echo $this->zoom_item ?>],
        options = {
            index: index
        },
        gallery;

    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}

$('[data-imagezoom]').click(function() {
    var index = $(this).closest("li").index();
    openPhotoSwipe(index);
});
</script>
