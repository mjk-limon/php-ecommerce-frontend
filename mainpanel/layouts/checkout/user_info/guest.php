<?php

$CnCls = !isset($QckBuyGuest) ? "col-md-8 col-md-offset-2" : "col-md-12";

if (get_site_settings("qch")) :
?>
    <div class="quick-checkout only-checkout">
        <form class="checkOutUserInfo" action="" method="post">
            <input type="hidden" name="email" value="" />

            <div class="row">
                <div class="<?php echo $CnCls ?>">
                    <div class="limlog-form">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Delivery Location</label>
                                <select name="orderLocation" id="orderLoc">

                                    <?php foreach ($this->DeliveryLocations as $Loc) : ?>
                                        <option value="<?php echo htmlspecialchars($Loc['location']) ?>"
                                                data-description="<?php echo $Loc['city'] ?>"
                                                autocomplete="off">
                                            <?php echo htmlspecialchars($Loc['location']) ?>
                                        </option>
                                    <?php endforeach; ?>

                                </select>
                            </div>
                        </div>

                        <div class="form-group shippingIdCont">
                            <label>Delivery Option</label>
                            <select name="shippingId" id="shippingId" required></select>
                        </div>

                        <div class="row form-group widget_input">
                            <div class="col-md-6">
                                <label>Your Name</label>
                                <input class="form-control" type="text" name="fullName" required />
                            </div>
                            <div class="col-md-6">
                                <label>Your Mobile Number</label>
                                <input class="form-control" type="text" name="mobileNumber" required />
                            </div>
                        </div>

                        <div class="form-group widget_input">
                            <label>Your Full Address</label>
                            <textarea class="form-control" name="fullAddress" required></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <?php if (!isset($QckBuyGuest)) : ?>
                <div class="nav-invoker">
                    <a class="nav-btn previous qchk-logchk-toggle" href="javascript:void(0)">Return to Login</a>
                    <input type="submit" class="second-tab-btn swtT nav-btn" data-relative=".checkOutUserInfo" value="Save & Continue" />
                </div>
            <?php endif; ?>
        </form>
    </div>
<?php endif; ?>
