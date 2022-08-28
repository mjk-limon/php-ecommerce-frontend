<?php

namespace _ilmComm;

?>

<section class="main-body">
    <div class="container">
        <div class="section-mb login_registration_widget">

            <?php if (!isset($_GET['track-id'])) : ?>
                <div class="order-track">
                    <h3>Track Your Order Now !</h3>
                    <div class="form-area">
                        <form id="" action="" method="GET">
                            <div class="inline-form">
                                <input type="text" name="track-id" placeholder="Type your order no/incoice id here.." />
                                <button class="">Get Status</button>
                            </div>
                        </form>
                    </div>
                </div>
            <?php
            else :
                $TrackId = preg_replace("/^#/", "", $_GET['track-id']);
                $OdrStatus = $this->getOrderStatus($TrackId);
                $StatusImage = Models::asset('images/track/track-' . $OdrStatus['status'] . '.gif');
            ?>
                <div class="order-track" style="background-image:url('<?php echo $StatusImage ?>');text-align:left">
                    <h3><?php echo $OdrStatus['text'] ?></h3>
                    <div class="track-timeline">
                        <p>Timeline</p>
                        <ul class="timeline-ul">
                            <li>
                                <span><?php echo date('F j, Y h:iA', strtotime($OdrStatus['time'])) ?></span>
                                Your placed order #<?php echo $TrackId ?>.
                            </li>
                            <?php
                            $Mts = $this->getMerchantStatusTimeline($TrackId);
                            while ($MT = $Mts->fetch_assoc()) :
                            ?>
                                <?php if (($OdrStatus['status'] > 1) && (!$MT['company_name'] && $MT['processed_on'])) : ?>
                                    <li>
                                        <span><?php echo date('F j, Y h:iA', strtotime($MT['processed_on'])) ?></span>
                                        <?php echo COMPANY_NAME ?> processed your order.
                                    </li>
                                <?php endif; ?>

                                <?php if ($OdrStatus['status'] > 2) : ?>
                                    <li>
                                        <span><?php echo date('F j, Y h:iA', strtotime($MT['shipped_on'])) ?></span>
                                        <?php echo $MT['company_name'] ?: COMPANY_NAME ?> shipped Products to <?php echo $MT['company_name'] ? COMPANY_NAME : 'your Logistic partner' ?>.
                                    </li>
                                <?php endif; ?>

                                <?php if (($OdrStatus['status'] > 3) && (!$MT['company_name'] && $MT['delivered_on'])) : ?>
                                    <li>
                                        <span><?php echo date('F j, Y h:iA', strtotime($MT['delivered_on'])) ?></span>
                                        You received ordered products.
                                    </li>
                                <?php endif; ?>

                                <?php if (($OdrStatus['status'] > 5) && (!$MT['company_name'] && $MT['returned_on'])) : ?>
                                    <li>
                                        <span><?php echo date('F j, Y h:iA', strtotime($MT['returned_on'])) ?></span>
                                        <?php echo COMPANY_NAME ?> returned your order.
                                    </li>
                                <?php endif; ?>

                            <?php endwhile; ?>
                        </ul>
                    </div>
                </div>
            <?php endif; ?>

        </div>
    </div>
</section>