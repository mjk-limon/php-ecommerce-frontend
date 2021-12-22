<?php

namespace _ilmComm;

$sp = $this->SingleProduct;
$AllProducts = $this->fetchProducts("id,name,price,item_left,brand,category,discount,price,size,colors,others", 6);
$Fet = array_shift($AllProducts);
?>

<div class="homepage-top-section" id="htt_holder">
    <div class="video-area" id="htt_area">
        <div class="video-playback">
            <?php
            $sp->setPrInfo($Fet);
            $sp->processRating();
            if ($sp->getOthers('prvid')) :
            ?>
                <div id="htt_video" data-vimeourl="<?php echo $sp->getOthers('prvid') ?>"></div>
            <?php else : ?>
                <img src="<?php echo $sp->getProductImage() ?>" class="img-responsive">
            <?php endif; ?>
        </div>
        <div class="video-controls">
            <div style="display:flex;justify-content:end;">
                <div class="vc-top-padding">
                    <div class="vc-group m0">
                        <a href="javascript:;" class="prLikeBtn" data-prid="<?php echo $sp->getProductId() ?>">Like (<span><?php echo $sp->getRating("r_t") ?></span>)</a>
                        <a href="<?php echo $sp->getHref() . '?qstnid=1' ?>" class="qna">Question &amp Answers</a>
                        <a href="<?php echo $sp->getHref() ?>">Own It</a>
                        <a href="<?php echo $sp->getHref() . '?cmntid=1' ?>">Ratings</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="playback-playlist">
            <div class="playlist-title">More To Explore</div>
            <?php
            foreach ($AllProducts as $PrInfo) :
                $sp->setPrInfo($PrInfo);
            ?>
                <div class="playlist-single"
                     data-prid="<?php echo $sp->getProductId() ?>"
                     data-prlike="<?php echo $sp->getRating("r_t") ?>"
                     data-prtodr="<?php echo $sp->getRating("r_s") ?>"
                     data-prvid="<?php echo $sp->getOthers("prvid") ?>"
                     data-prlink="<?php echo $sp->getHref() ?>">
                    <div class="ps-image">
                        <img src="<?php echo $sp->getProductImage() ?>" alt="">
                    </div>
                    <div class="ps-title">
                        <?php echo $sp->getName() ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<section class="main-body bg-dark">
    <div class="spd">
        <div class="container">
            <div class="section-product-title">
                <h4 class="prtitle-headline"><?php echo $sp->getName() ?></h4>
                <p class="prtitle-postedon">Posted <?php echo date("F d, Y", strtotime($sp->getProductUploadedDate())) ?></p>
            </div>
        </div>
    </div>
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
                                        $BrowseCatProducts = $this->extModel("Home")->browseCatProducts($Cat->CatId);
                                        if ($BrowseCatProducts->num_rows) :
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
                                                                    <p><?php echo $BrowseCatProducts->num_rows ?> Videos</p>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    <?php
                                        endif;
                                    endwhile;
                                    ?>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

<script type="text/javascript">
$(document).ready(function() {
    var $htt_video = $("#htt_video"),
        likedArray = JSON.parse(sessionStorage.getItem("likedArr")) || [];

    var initLikedButton = function() {
        $('.prLikeBtn.liked').removeClass("liked");
        $.each(likedArray, function(i, v) {
            $('.prLikeBtn[data-prid="' + v + '"]').addClass("liked");
        });
    }

    var initVimeoPlayer = function($elem, autoplay = true) {
        $elem.RTOP_VideoPlayer({
            showFullScreen: true,
            showTimer: true,
            showSoundControl: true,
            autoPlay: autoplay,
            vimeo_url: $elem.data("vimeourl")
        });
    }

    $("#sticky").sticky({
        topSpacing: 20,
        center: true
    });

    $('.prLikeBtn').click(function(e) {
        e.preventDefault();
        var $env = $(this),
            $countDiv = $(this).find("span"),
            prid = $env.data("prid"),
            tlike = parseInt($countDiv.html());

        if (likedArray.indexOf(prid) === -1) {
            return ajaxPost({
                rtp: 'rvw',
                reply_product_rvw: 1,
                name: '',
                email: 'guest',
                message: '',
                rating: 5,
                prid: prid
            }, function(data) {
                var Result = IsJsonString(data) ? JSON.parse(data) : {
                    error: data
                };

                if (Result.success) {
                    likedArray.push(prid);
                    sessionStorage.setItem('likedArr', JSON.stringify(likedArray));
                    $countDiv.html(tlike + 1);
                }

                initLikedButton();
            });
        }
    });

    $('.playlist-single').click(function() {
        var vid_data = $(this).data(),
            $trn_video = $('<div />');

        $trn_video.attr({
            "id": "trn_video",
            "data-vimeourl": vid_data.prvid
        });

        $("#htt-area .video-playback").html($trn_video);
        $("#prOrderNow").attr("href", vid_data.prlink);
        $("#prReviews").attr("href", vid_data.prlink + '?cmntid=1');
        $("#prLikeTotal").html(vid_data.prlike);
        $("#prLikeTotal").parent().attr("data-prid", vid_data.prid);
        $("#prTotalOrder").html(vid_data.prtodr);
        initVimeoPlayer($trn_video);
        initLikedButton();
    });

    if ($htt_video.length) {
        initVimeoPlayer($htt_video);
    }
    initLikedButton();
});

$(window).load(function() {
    var htt_holder_height = $('#htt_holder').height();
    $('#htt_holder').height(htt_holder_height);
});
$(window).on("scroll", function() {
    var delta = 5,
        htt_holder_height = $('#htt_holder').height(),
        st = $(this).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > htt_holder_height) {
        $('#htt_area').addClass("fixed-video-area");
    } else {
        $('#htt_area').removeClass("fixed-video-area");
    }

    lastScrollTop = st;
});
</script>

<script defer src="<?= Models::asset("assets/_ilm_own/js/indexPage_scripts.js") ?>"></script>
