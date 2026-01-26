<?php

namespace _ilmComm;

?>

<div class="support-center">
    <div class="support-bg">
        <h3 class="support-title">
            <img src="<?php echo asset('images/logo.png') ?>" alt="logo" />
            <sup>&trade;</sup> <span>Support Center</span>
        </h3>
        <p>Get 24/7 instantly support. Happy shopping.</p>
    </div>
    <section class="main-body">
        <div class="spd">
            <div class="container">
                <div class="section-mb">
                    <div class="support-quick-options">
                        <div class="sqo-cat">
                            <h4>Order &amp; Refund Related Issues</h4>
                            <ul>
                                <li><a href="#"><i class="fa fa-angle-right"></i> Want to cancel order ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> Want to return product ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> Percel not received ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> I haven't received my parcel but it shows "Delivered" ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> Product returned but not refunded ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> How can I get a refund if my credit card is no longer valid or has expired ?</a></li>
                            </ul>
                        </div>
                        <div class="sqo-cat">
                            <h4>Account Related Issues</h4>
                            <ul>
                                <li><a href="#"><i class="fa fa-angle-right"></i> I want to delete my account ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> I want to change my default email ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> I forgot my password, How can I reset ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> I want to unsubscribe from <?php echo COMPANY_NAME ?> newsletter ?</a></li>
                            </ul>
                        </div>
                        <div class="sqo-cat">
                            <h4>Payment Related Issues</h4>
                            <ul>
                                <li><a href="#"><i class="fa fa-angle-right"></i> How do I pay on <?php echo COMPANY_NAME ?> ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> Is there any Hidden Charge ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> Is return service is free ?</a></li>
                                <li><a href="#"><i class="fa fa-angle-right"></i> How safe is my payment data ?</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-white">
        <div class="spd">
            <div class="container">
                <div class="section-mb">
                    <div class="support-more">
                        <h5>Contact Us</h5>
                        <div class="supm-box">
                            <a href="#" class="newLiveChat">
                                <img src="<?php echo asset('images/headp.png') ?>" alt="" />
                                Live Chat
                            </a>
                        </div>
                        <div class="supm-box">
                            <a href="#" class="newFreeMessage">
                                <img src="<?php echo asset('images/headp.png') ?>" alt="" />
                                Leave a message
                            </a>
                        </div>
                        <div class="supm-box">
                            <a href="#showMap" data-toggle="modal">
                                <img src="<?php echo asset('images/headp.png') ?>" alt="" />
                                Direct contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<div class="modal" id="newSupport" role="dialogue" tabindex="-1">
    <div class="vertical-alignment-helper">
        <div class="modal-dialog vertical-align-center">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" data-dismiss="modal">&times;</span>
                    <h4 class="modal-title">New support ticket</h4>
                </div>
                <div class="modal-body">
                    <div class="limlog-form">
                        <form id="supportTicketForm" action="" method="POST">
                            <input type="hidden" name="newSupportTicket" />

                            <label>Your full name</label>
                            <input type="text" name="fullName" required autofocus />

                            <div class="row">
                                <div class="col-md-6">
                                    <label>Your email address</label>
                                    <input type="text" name="email" required />
                                </div>
                                <div class="col-md-6">
                                    <label>Your mobile number</label>
                                    <input type="text" name="mobileNumber" />
                                </div>
                            </div>

                            <label>Subject</label>
                            <input type="text" name="subject" class="supportSubject" required />

                            <label>Addtional message</label>
                            <textarea name="message"></textarea>

                            <button type="submit" class="btn qc-pmnt-btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="showMap" role="dialogue" tabindex="-1">
    <div class="vertical-alignment-helper">
        <div class="modal-dialog vertical-align-center">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" data-dismiss="modal">&times;</span>
                    <h4 class="modal-title">Our office location</h4>
                </div>
                <div class="modal-body">
                    <iframe src="https://www.google.com/maps/embed/v1/place?key=<?php echo config('gmap_api') ?>&q=<?php echo urlencode(get_contact_information('address')); ?>"
                            width="100%" style="height:300px;border: 0;"
                            frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?php echo asset('assets/_ilm_own/js/supportPage_scripts.js') ?>"></script>
