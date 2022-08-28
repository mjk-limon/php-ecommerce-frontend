<?php

namespace _ilmComm;

// Single Product var
$PrInfo = $this->SingleProduct;

// Single order var
$OdrInfo = $this->SingleOrder;

// Viewing tab name
$SwtchTab = $this->ViwingTabName;
?>

<section class="main-body">
    <div class="container">
        <div class="section-mb login_registration_widget pd-0">
            <div class="my-account">
                <div class="card hovercard">
                    <div class="card-background">
                        <img class="card-bkimg user-ppc" src="<?php echo asset($this->UserData->getUserImage()) ?>">
                    </div>
                    <div class="useravatar">
                        <img class="user-ppc" src="<?php echo asset($this->UserData->getUserImage()) ?>">
                    </div>
                    <div class="card-info">
                        <span class="card-title">Hi, <?php echo $this->UserData->getLastName() ?></span>
                    </div>
                </div>
                <div class="btn-pref btn-group btn-group-justified btn-group-lg myac-nav" role="group">
                    <div class="btn-group" role="group">
                        <a href="#user-info" class="active" data-toggle="tab">
                            <button type="button" class="btn btn-default">
                                <span class="fa fa-user"></span>
                                <div class="hidden-xs">Overview</div>
                            </button>
                        </a>
                    </div>
                    <div class="btn-group" role="group">
                        <a href="#my-wishlist" data-toggle="tab">
                            <button type="button" class="btn btn-default">
                                <span class="fa fa-heart"></span>
                                <div class="hidden-xs">Wishlists</div>
                            </button>
                        </a>
                    </div>
                    <div class="btn-group" role="group">
                        <a href="#order-history" data-toggle="tab">
                            <button type="button" class="btn btn-default">
                                <span class="fa fa-truck"></span>
                                <div class="hidden-xs">Order History</div>
                            </button>
                        </a>
                    </div>
                    <div class="btn-group" role="group">
                        <a href="#notifications" data-toggle="tab">
                            <button type="button" class="btn btn-default">
                                <span class="fa fa-comment"></span>
                                <div class="hidden-xs">Notifications</div>
                            </button>
                        </a>
                    </div>
                </div>
                <div class="well my-accwell">
                    <div class="tab-content">
                        <div class="tab-pane in active" id="user-info">
                            <?php
                            include "layouts/my-account-userinfo.php";
                            ?>
                        </div>

                        <div class="tab-pane in" id="my-wishlist">
                            <?php
                            include "layouts/my-account-wishlists.php";
                            ?>
                        </div>

                        <div class="tab-pane in" id="order-history">
                            <?php
                            include "layouts/my-account-orderhistory.php";
                            ?>
                        </div>
                        <div class="tab-pane in" id="notifications">
                            <?php
                            include "layouts/my-account-notifications.php";
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script defer type="text/javascript">
    $(document).ready(function() {
        $('.myac-nav a[href="<?php echo $SwtchTab ?>"]').tab('show');

        $('.up-tab-btn').on("click", function(e) {
            var targetTab = $(this).attr("href");
            $(".user-info, .update-userinfo, .update-user-password").hide();
            $(targetTab).show();
            e.preventDefault();
        });

        $('#ppic-file-input').on('change', function(e) {
            var env = $(this).parent(),
                usid = $(this).data("pp"),
                files = $(this).prop("files"),
                form_data = new FormData();

            form_data.append("profilePicUpdate", 1);
            form_data.append("usId", usid);
            form_data.append('ppic', files[0]);

            _ilm.globLoader('show', env, true);
            ajaxPost(form_data, function(data) {
                var result = IsJsonString(data) ? JSON.parse(data) : {
                    "error": data
                };

                if (result.success) $(".user-ppc").attr("src", result.image);
                else _ilm.showNotification(result.error, true);

                _ilm.globLoader('hide', env, true);
            }, null, {
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false
            });

        });
    });
</script>