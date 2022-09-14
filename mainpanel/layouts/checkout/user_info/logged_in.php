<?php

$lgaddClass = !$this->UserData->getCity() ? 'noAddress' : null;
?>

<div class="logged-in <?php echo $lgaddClass ?>">
    <form class="checkOutUserInfo" id="ckcontex" action="" method="post">
        <input type="hidden" name="userid" id="user-id" value="<?php echo $this->UserData->getCusId() ?>" />
        <input type="hidden" name="email" value="<?php echo $this->UserData->getUserName() ?>" />
        <input type="hidden" name="fullName" value="<?php echo $this->UserData->getFullName() ?>" />
        <input type="hidden" name="mobileNumber" value="<?php echo $this->UserData->getMobileNumber() ?>" />
        <input type="hidden" name="orderLocation" value="<?php echo $this->UserData->getState() ?>" />
        <input type="hidden" name="fullAddress" value="<?php echo htmlspecialchars($this->UserData->getFullAddress()) ?>" />


        <div class="login-success">
            <div class="limlog-form">
                <div class="loggedindata-edit">
                    <div class="logged-in-userdata">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="userdata-panel">
                                    <h5 class="udp-title">You're logged in with:</h5>

                                    <div class="udp-field form-group">
                                        <input type="text" name="shippingName" class="form-control udp-userfield updatbale-fld"
                                               value="<?php echo $this->UserData->getFirstName() ?>"
                                               id="full-name"
                                               disabled />
                                    </div>

                                    <div class="udp-field">
                                        <span>Email Address:</span>
                                        <?php echo $this->UserData->getUserName() ?>
                                    </div>

                                    <div class="udp-field">
                                        <span>Mobile Number:</span>
                                        <?php echo $this->UserData->getMobileNumber() ?>
                                    </div>

                                    <div class="loggedindatanav">
                                        <a href="/my-account/?logout=1&ref=p.05">Not You ? Login Again</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7">
                                <div class="userdata-panel">
                                    <h5 class="udp-title">Delivery Address</h5>

                                    <table class="udp-table" border="0">
                                        <tr class="ordershippingloc">
                                            <td>Shipping Location:</td>
                                            <td>
                                                <select name="orderLocation" id="orderLoc">
                                                    <?php foreach ($this->DeliveryLocations as $Loc) : ?>
                                                        <option value="<?php echo htmlspecialchars($Loc['location']) ?>"
                                                                data-description="<?php echo $Loc['city'] ?>"
                                                                autocomplete="off"
                                                                <?php if ($this->UserData->getCity() == $Loc['location']) echo 'selected'; ?>>
                                                            <?php echo htmlspecialchars($Loc['location']) ?>
                                                        </option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Shipping Address:</td>
                                            <td><textarea name="shippingAddress" class="form-control updatbale-fld" id="shipping-address" disabled><?php echo $this->UserData->getAddress() ?></textarea></td>
                                        </tr>
                                        <tr class="hideonnoedit">
                                            <td>&nbsp;</td>
                                            <td>
                                                <div class="form-element">
                                                    <label class="checkbox-inline">
                                                        <input type="checkbox" id="saveUserData" checked>
                                                        Save this data
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <div class="loggedindatanav">
                                                    <a href="javascript:;" class="shippingChangeBtn">
                                                        <span class="editinfo">Edit Address</span>
                                                        <span class="saveinfo submit-btn">Save Changes</span>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="shippingIdCont">
                                        <label class="udp-label">Delivery Option:</label>
                                        <select name="shippingId" id="shippingId"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="nav-invoker">
            <input type="submit" class="second-tab-btn swtT nav-btn" data-relative="#ckcontex" value="Save & Continue" />
        </div>
    </form>
</div>
