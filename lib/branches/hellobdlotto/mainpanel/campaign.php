<?php

use _ilmComm\Core\DataBase\DataBaseWithIUD_Operation;
use _ilmComm\Orders\FetchOrders\FetchAllOrders;
use _ilmComm\Products\ProductInfo\SingleProduct;

// Get all lottery data
$lottery = $this->extModel('Home')->getSliders(5)->toArray();
rsort($lottery);

// Clean old drawn data
$db = new DataBaseWithIUD_Operation;
$extraData = array_slice($lottery, 6);
foreach ($extraData as $single) {
    $db->where('id', $single['id']);
    $db->delete('sliders', 1);
}

// Yesterday draw
$yesterdayDraw = array_filter($lottery, function ($val) {
    $lastDate = date('Y-m-d', strtotime('-1day'));
    $drawDate = date('Y-m-d', strtotime($val['image_text1']));
    return strtotime($drawDate) == strtotime($lastDate);
});
?>

<section class="main-body lottery-body">
    <div class="spd">
        <div class="container">
            <div class="top-timer-section">
                <div class="tts-bg">
                    <div class="tts-con">
                        <div class="tts-timer-title">
                            আজকের লটারির ড্র অনুষ্ঠিত হবে
                        </div>
                        <div class="tts-timer-body">
                            <div class="tts-timer-single-c hr">
                                <span id="cdown-hr">--</span>
                                <span>ঘন্টা</span>
                            </div>
                            <div class="tts-timer-single-c min">
                                <span id="cdown-min">--</span>
                                <span>মিনিট</span>
                            </div>
                            <div class="tts-timer-single-c sec">
                                <span id="cdown-sec">--</span>
                                <span>সেকেন্ড</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php
    if ($yesterdayDraw) :
        // Yesterday draw data found
        // Get yeaterday draw data
        $yesterdayDrawData = current($yesterdayDraw);

        // Get product id
        $productId = $yesterdayDrawData['image_text2'];

        // Build yesterday draw proudct info
        $sp = new SingleProduct;
        $sp->setProductId($productId);
        $sp->buildInfo();
        $sp->buildPriceAndStock();

        // Fetch yesterday drawn product orders
        $fo = new FetchAllOrders;
        $fo->product()->setProductId($productId);
        $yesterdayOrders = $fo->getOrders();
    ?>
        <div class="spd">
            <div class="container">
                <div class="yesterday-winners-section">
                    <div class="yws-body">
                        <div class="row yws-row">
                            <div class="yws-col yws-col-left col-md-6">
                                <div class="yws-title">
                                    <h1 class="animated tada" style="animation-iteration-count: infinite;">গতকালের লটারি ড্র</h1>
                                    <p>
                                        <span class="yws-title-tagline-body">
                                            <span class="yws-title-tagline">
                                                <?php echo date("F j, Y", strtotime('-1day')) ?> তারিখে লটারির ফলাফল।
                                                ঐদিন যেসকল কাস্টমার এই প্রোডাক্টটি অর্ডার করেছেন, তারা মূল প্রোডাক্টের সাথে
                                                আরও একটি প্রোডাক্ট পাবেন সম্পূর্ণ বিনামূল্যে।
                                            </span>
                                        </span>
                                        <img src="<?php echo asset('images/surprise-box.gif') ?>" alt="">
                                    </p>
                                </div>
                            </div>
                            <div class="yws-col yws-col-right col-md-6">
                                <div class="yws-col-right-row row">
                                    <div class="right-row-col-left col-md-5">
                                        <div class="yws-winner-image">
                                            <img src="<?php echo asset($sp->getThumbnail()) ?>" class="img-thumbnail">
                                        </div>
                                    </div>
                                    <div class="right-row-col-right col-md-7">
                                        <div class="yws-winner-content">
                                            <div class="yws-sc-title"><?php echo $sp->getProductName() ?></div>
                                            <div class="yws-sc-prname">Brand: <?php echo $sp->getBrandName() ?></div>
                                            <div class="yws-sc-prname">Price: <?php echo curr($sp->getPrice()) ?></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="spd">
            <div class="container">
                <div class="recent-winners-section">
                    <div class="rws-title">
                        <h1>গতকালের বিজয়ীদের তালিকা</h1>
                    </div>
                    <div class="rws-body">
                        <div class="rws-row winner-list-row row">

                            <?php while ($odr = $yesterdayOrders->fetch_assoc()) : ?>
                                <div class="rws-single rws-col single-winner col-md-2">
                                    <div class="rws-single-body single-winner-body">
                                        <div class="rws-single-image single-winner-image">
                                            <img src="<?php echo asset('assets/images/man3.png') ?>" alt="User Image">
                                        </div>
                                        <div class="rws-single-content single-winner-content">
                                            <div class="rws-sc-title swc-title"><?php echo $odr['name'] ?></div>
                                            <div class="rws-sc-prname swc-tagline"><?php echo $odr['phone'] ?></div>
                                            <div class="rws-sc-prname swc-tagline"><?php echo $odr['email'] ?></div>
                                        </div>
                                    </div>
                                </div>
                            <?php endwhile; ?>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>

    <div class="spd">
        <div class="container">
            <div class="middle-ad-section">
                <div class="mas-content">
                    <img src="<?php echo asset('images/slider/lottery-slide-3.jpg') ?>"
                        class="img-responsive">
                </div>
            </div>
        </div>
    </div>

    <div class="spd">
        <div class="container">
            <div class="recent-winners-section">
                <div class="rws-title">
                    <h1>অন্যান্য দিনের ড্র</h1>
                </div>
                <div class="rws-body">
                    <div class="rws-row winner-list-row row">
                        <?php
                        foreach ($lottery as $singleLottery) :
                            // Get product id
                            $productId = $singleLottery['image_text2'];
                            
                            if (!$productId) {
                                continue;
                            }

                            // Build yesterday draw proudct info
                            $sp = new SingleProduct;
                            $sp->setProductId($productId);
                            $sp->buildInfo();
                            $sp->buildPriceAndStock();
                        ?>
                            <div class="rws-single rws-col single-winner col-md-2">
                                <div class="rws-single-body single-winner-body">
                                    <div class="rws-single-image single-winner-image">
                                        <img src="<?php echo asset($sp->getThumbnail()) ?>" alt="Proudct Image">
                                    </div>
                                    <div class="rws-single-content single-winner-content">
                                        <div class="rws-sc-title swc-title"><?php echo $sp->getProductName() ?></div>
                                        <div class="rws-sc-prname swc-tagline">By <?php echo $sp->getBrandName() ?></div>
                                        <div class="rws-sc-prname swc-tagline"><?php echo curr($sp->getPrice()) ?></div>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<script>
var timer_hr = document.querySelector('.tts-timer-single-c.hr'),
    timer_min = document.querySelector('.tts-timer-single-c.min'),
    timer_sec = document.querySelector('.tts-timer-single-c.sec');

var oldHour, oldMinute;

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var dateobj = new Date(),
        nowTime = dateobj.getTime();

    // Set target date
    dateobj.setHours('22');
    dateobj.setMinutes('0');
    dateobj.setSeconds('0');

    // Find the distance between now and the count down date
    var distance = dateobj.getTime() - nowTime;

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("cdown-hr").innerHTML = hours;
    document.getElementById("cdown-min").innerHTML = minutes;
    document.getElementById("cdown-sec").innerHTML = seconds;

    //
    if (!timer_sec.classList.contains('play')) {
        timer_sec.classList.add('play');

        setTimeout(function() {
            timer_sec.classList.remove('play');
        }, 600);
    }

    if (oldMinute != minutes) {
        timer_min.classList.add('play');

        setTimeout(function() {
            timer_min.classList.remove('play');
        }, 600);

        oldMinute = minutes;
    }

    if (oldHour != hours) {
        timer_hr.classList.add('play');

        setTimeout(function() {
            timer_hr.classList.remove('play');
        }, 600);

        oldHour = hours;
    }

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
    }
}, 1000);
</script>

<style type="text/css">
@import url('https://fonts.maateen.me/solaiman-lipi/font.css');

body,
h1,
h2,
h3,
h4,
h5 {
    font-family: 'SolaimanLipi', Arial, sans-serif;
}

.lottery-body .spd {
    margin-bottom: 4.5rem;
}

.tts-bg {
    color: #fff;
    background-image: url('../images/lottery-1.jpg');
    background-size: cover;
}

.tts-con {
    text-align: center;
    padding: 4rem 0;
}

.tts-timer-title {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.tts-timer-body {
    font-size: 2rem;
}

.tts-timer-body .tts-timer-single-c {
    display: inline-block;
    text-align: center;
    padding: 7px 0;
    width: 80px;
    background-color: var(--accent)
}

.tts-timer-body .tts-timer-single-c.play {
    animation-name: timerFlip;
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0, .83, .05, .95);
}

.tts-timer-single-c span {
    display: block;
    font-weight: bold;
}

/** Yesterday winner */
.yws-body {
    box-shadow: 0px 0px 15px -10px #333;
    padding: 2rem;
    background: url('../images/winner-confetti.png');
    background-size: 80%;
    background-repeat: repeat;
    animation-name: confetti-fall;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.yws-title h1 {
    margin-top: 0;
    padding: 2px 15px;
    display: inline-block;
    background-color: var(--accent);
    color: #fff;
}

.yws-title p {
    margin: 0;
    position: relative;
}

.yws-title .yws-title-tagline-body {
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    font-size: 2rem;
    text-shadow: 0px 1px 1px #ccc;
}

.yws-title p img {
    max-height: 165px;
    display: block;
    margin: 20px auto;
}

.yws-col-right-row {
    display: flex;
    align-items: center;
}

.yws-winner-image img {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    max-width: unset;
    display: block;
    margin: 0 auto;
}

.yws-sc-title {
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.1em;
    margin-bottom: 1rem;
}

.yws-sc-prname {
    font-size: 1.6rem;
}

.winner-list-row {
    display: flex;
    justify-content: center;
}

/** Single winner */

.single-winner-image {
    position: relative;
    padding: 50%;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 10px;
}

.single-winner-image img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.single-winner-content .swc-title {
    font-weight: 600;
}

/** Last/Recent winners */
.recent-winners-section .rws-title,
.rws-single-content {
    text-align: center;
}

.rws-title h1 {
    margin-top: 0;
}

@keyframes timerFlip {
    0% {
        transform: rotateY(-360deg)
    }

    100% {
        transform: rotateY(0deg)
    }
}

</style>
