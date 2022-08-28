<?php

namespace _ilmComm;

// Products
$Products = array();

// Payment gateways
$PmntGateways = $this->PaymentGateways;

// Seleted product info
$Products[] = array(
    "p" => $this->Sp->getProductId(),
    "s" => rec_arr_val($this->CkData, 'prSize'),
    "c" => rec_arr_val($this->CkData, 'prColr'),
    "q" => rec_arr_val($this->CkData, 'prQty', 1)
);
?>

<div id="checkout">
    <div class="clearfix"><span class="close" data-dismiss="modal">&times;</span></div>
    <div id="qc-user-info">
        <div class="row">
            <div class="col-md-6 modal-grid first-grid">
                <h4>Cart Information</h4>
                <table class="table qocarttable">
                    <thead>
                        <tr>
                            <th width="50%">Item Info</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="qopinfo tlist-fullinfo">
                                <div style="--tlwdth: 40px; background-image: url('<?php echo $this->Sp->getProductImage() ?>')" class="tl-img"></div>
                                <div style="--tlwdth: 40px; " class="tl-area">
                                    <div class="fi-name qopinfo">
                                        <p class="qoPNAME">
                                            <?php echo $this->Sp->getName() ?>
                                        </p>
                                        <p>
                                            Size: <?php echo $Products[0]['s'] ?: 'N/a' ?>,
                                            Colour: <?php echo $Products[0]['c'] ?: 'N/a' ?>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td><?php echo $Products[0]['q'] ?> Unit</td>
                            <td><?php echo curr($this->Sp->getPrice()) ?></td>
                            <td><?php echo curr($this->Sp->getPrice() * $Products[0]['q']) ?></td>
                        </tr>
                        <tr>
                            <td colspan="6" class="text-right">
                                <p class="mb-0"><strong>Item Total:</strong> <span class="aprstotal"><?php echo curr($this->Sp->getPrice() * $Products[0]['q']) ?></span></p>
                                <p><strong>Delivery Cost:</strong> <span class="dcosttotal">20</span></p>
                                <p><strong>Subtotal:</strong> <?php echo curr() ?><span class="aprdcostsubtotal">0</span></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-md-6 modal-grid second-grid qo-user-info">
                <h4>Your Information</h4>
                <div class="limlog-form">
                    <form class="checkOutUserInfo quickbuy" action="#" method="post">
                        <input type="hidden" name="products" value="<?php echo htmlspecialchars(json_encode($Products)) ?>" />

                        <?php if (!$this->UserData) : ?>
                            <input type="hidden" name="email" value="" />

                            <label>Delivery Location</label>
                            <select name="orderLocation" id="orderLoc">

                                <?php
                                $Locations = $this->DeliveryLocations;
                                foreach ($Locations as $Loc) :
                                ?>
                                    <option value="<?php echo $Loc ?>">
                                        <?php echo $Loc ?>
                                    </option>
                                <?php endforeach; ?>

                            </select>

                            <div class="shippingIdCont">
                                <label>Delivery Option</label>
                                <select name="shippingId" id="shippingId"></select>
                            </div>

                            <label>Your Name</label>
                            <input type="text" name="fullName" placeholder="Enter Your Name" required="" />

                            <label>Your Mobile Number</label>
                            <input type="text" name="mobileNumber" placeholder="Enter Your Number" required="" />

                            <label>Your Full Address</label>
                            <textarea name="fullAddress" placeholder="Enter Your Delivery Address" required=""></textarea>
                        <?php else : ?>
                            <div class="login-success logged-in">
                                <h3>You are logged in with <?php echo $this->UserData->getLastName() ?></h3>
                                <div class="limlog-form">
                                    <input type="hidden" name="email" value="<?php echo $this->UserData->getUserName() ?>" />
                                    <input type="hidden" name="fullName" value="<?php echo $this->UserData->getFullName() ?>" />
                                    <input type="hidden" name="mobileNumber" value="<?php echo $this->UserData->getMobileNumber() ?>" />
                                    <input type="hidden" name="orderLocation" value="<?php echo $this->UserData->getState() ?>" />
                                    <input type="hidden" name="fullAddress" value="<?php echo htmlspecialchars($this->UserData->getFullAddress()) ?>" />

                                    <table class="" border="0">
                                        <tr>
                                            <td>Full Name:</td>
                                            <td><input type="text" name="shippingName" value="<?php echo $this->UserData->getFullName() ?>" disabled /></td>
                                        </tr>
                                        <tr>
                                            <td>Email Address:</td>
                                            <td><?php echo $this->UserData->getUserName() ?></td>
                                        </tr>
                                        <tr>
                                            <td>Mobile Number:</td>
                                            <td><input type="text" name="shippingNumber" value="<?php echo $this->UserData->getMobileNumber() ?>" disabled /></td>
                                        </tr>
                                        <tr>
                                            <td>Shipping Address: </td>
                                            <td>
                                                <textarea name="shippingAddress" disabled><?php echo $this->UserData->getFullAddress() ?></textarea>
                                                <p><a href="javascript:;" class="shippingChangeBtn"><i class="fa fa-pencil"></i> Change</a></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"><a data-dismiss="modal" href="/my-account/?logout=1&ref=">Not You ? Login Again</a> </td>
                                        </tr>
                                    </table>

                                    <select name="orderLocation" id="orderLoc">
                                        <option value="<?php echo $this->UserData->getCity() ?>"><?php echo $this->UserData->getCity() ?></option>
                                    </select>

                                    <div class="shippingIdCont">
                                        <label>Delivery Option</label>
                                        <select name="shippingId" id="shippingId"></select>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?>

                        <input type="submit" class="btn qc-pmnt-btn" value="Order Now" />
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div id="qc-payment-info" style="display:none">
        <div class="row">
            <div class="col-md-12">
                <h4>Select Your Payment Mehtod</h4>
                <div class="payment-information" style="padding:1.5rem">

                    <?php
                    include "checkout-payment-methods.php";
                    ?>
                    
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    _ilm_Quick_buy.init();
    _ilm_Quick_buy.initSelectMethod();
</script>