<?php

namespace _ilmComm;

$sp = $this->SingleProduct;
?>

<div class="homepage-top-section">
    <div style="width: 100%;overflow: hidden;background-color: #000;">
        <div id="video"></div>
        <div style="width: 50%;margin:0 auto">
            <div class="myVideo" id="my_video" data-video="https://www.w3schools.com/html/mov_bbb.mp4" data-type='video/mp4'></div>
        </div>
    </div>
</div>

<section class="main-body bg-dark">
    <div class="spd">
        <div class="container">
            <div class="section-browse-cat">
                <div class="bc-title">
                    <div class="bc-main-title">FEATURED</div>
                </div>
                <div class="bc-product-area">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="bc-single">
                                <div class="grid-row grid2">
                                    <?php
                                    $St_i = 1;
                                    $Cat = new Category\FetchCategories;
                                    $MainCats = $Cat->fetchMain();
                                    while ($ArrMain = $MainCats->fetch_assoc()) :
                                        $Cat->setCatId($ArrMain['id']);
                                        $Cat->setMain($ArrMain['main']);
                                        $Cat->setSubGroup(null);
                                        $Cat->setSub(null);
                                    ?>
                                        <div class="grids">
                                            <div class="bc-products">
                                                <div class="single-product">
                                                    <div class="sp-image">
                                                        <a href="<?php echo $Cat->getHref() ?>">
                                                            <img src="<?php echo $Cat->getCatImg('Homepage category sample')[0] ?>" />
                                                        </a>
                                                    </div>
                                                    <div class="sp-pr">
                                                        <div class="sp-pr-info">
                                                            <a href="<?php echo $Cat->getHref() ?>">
                                                                <h5><?php echo $Cat->Mainc ?></h5>
                                                                <p>24 Videos</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endwhile; ?>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div id="sticky" style="height: calc(100vh - 40px);display: flex;flex-direction: column;">
                                <div class="playback-area">
                                    <div id="trending-playback">
                                        <div class="myVideo" id="my_video2"></div>
                                    </div>
                                    <h4>Trending</h4>
                                </div>
                                <div class="playback-playlist">
                                    <div class="playlist-single">
                                        <div class="ps-image">
                                            <img src="images/DHL-1612949010.png" alt="">
                                        </div>
                                        <div class="ps-title">
                                            Simple Title Simple Title Simple Title Simple Title
                                            Simple Title Simple Title Simple Title Simple Title
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

<link rel="stylesheet" href="<?php echo Models::asset('assets/vendors/rtopvideoplayer/rtop.videoPlayer.1.0.2.min.css') ?>" />
<script src="<?php echo Models::asset('assets/vendors/rtopvideoplayer/rtop.videoPlayer.1.0.2.min.js') ?>"></script>
<script src="<?php echo Models::asset('assets/vendors/sticky/jquery.sticky.js') ?>"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $('#my_video').RTOP_VideoPlayer({
            showFullScreen: true,
            showTimer: true,
            showSoundControl: true,
            //autoPlay: true,
        });

        $('#my_video2').RTOP_VideoPlayer({
            showFullScreen: true,
            showTimer: true,
            showSoundControl: true,
            autoPlay: true,
            vimeo_url: "https://vimeo.com/567880610"
        });

        $("#sticky").sticky({
            topSpacing: 20,
            center: true
        });

        $('.playlist-single').click(function() {
            $("#trending-playback").html('<div class="myVideo" id="my_video2"></div>');
            $('#my_video2').RTOP_VideoPlayer({
                showFullScreen: true,
                showTimer: true,
                showSoundControl: true,
                autoPlay: true,
                vimeo_url: 'https://vimeo.com/193141268'
            });
        });
    });
</script>

<script defer src="<?= Models::asset("assets/_ilm_own/js/indexPage_scripts.js") ?>"></script>