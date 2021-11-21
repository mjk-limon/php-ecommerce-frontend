<?php

namespace _ilmComm;

require "../doc/includes/config.php";
require "../doc/main/autoload.php";

/**
 * Init page models
 */
$Model = new PageModels\OrderInvoice;
$OrderNos = $Model->reqestedOrderNos();
$InvoiceUrl = Models::baseUrl('invoice/print/odr-' . implode(",", $OrderNos));

/**
 * Watermark Background
 */
$image = imagecreatefrompng('../images/logo.png');
list($nw, $height) = getimagesize('../images/logo.png');
$nh = ($height / $nw) * 300;
$tmp = imagecreatetruecolor($nw, $nh);
imagealphablending($tmp, false);
imagesavealpha($tmp, true);
$color = imagecolorallocatealpha($tmp, 0, 0, 0, 127);
imagefill($tmp, 0, 0, $color);
imagecopyresampled($tmp, $image, 0, 0, 0, 0, $nw, $nh, $nw, $nh);
imagefilter($tmp, IMG_FILTER_COLORIZE, 0, 0, 0, 127 * 0.8);
ob_start();
imagepng($tmp);
$background = ob_get_clean();
imagedestroy($image);

/**
 * Download pdf
 */
if (isset($_GET['pdf'])) {
    $api_endpoint = "https://crm.dhakasolution.com/_ilmComm/html2pdf/";
    $parameters = array('u' => $InvoiceUrl);
    $result = @file_get_contents($api_endpoint . "?" . http_build_query($parameters));
    if (!$result) {
        echo "HTTP Response: " . $http_response_header[0] . "<br/>";
        $error = error_get_last();
        echo "Error Message: " . $error['message'];
    } else {
        header("Content-Type: application/pdf");
        header("Content-Disposition: attachment; filename=\"invoice-download.pdf\"");
        exit($result);
    }
}
?>

<!doctype html>
<html>

<head>
    <title>Invoice - <?php echo intval(microtime(true)) ?></title>
    <style>
        @media print {
            @page {
                size: A4;
                margin: 0
            }
        }
    </style>
    <script>
        window.onload = window.print()
    </script>
</head>

<body style="background-color: #fff;font-family: 'Roboto', sans-serif">
    <div id="thank-you">
        <?php
        foreach ($OrderNos as $oNo) {
            $OrderInfo = $Model->orderInformation($oNo);
            $OrderId = $OrderInfo->getOrderId();
            $SingleInvoiceUrl = Models::baseUrl('invoice/print/odr-' . $oNo);
        ?>
            <div class="your-bill" style="min-height:11.693in;background:url('data:image/png;base64,<?php echo base64_encode($background) ?>') center no-repeat;background-size:40%;overflow:hidden">
                <div class="background-white" id="uLoadAjaxP">
                    <div class="invoice" style="position:relative;text-align:left;padding:50px 65px">
                        <table class="table invoice-top" style="width:100%">
                            <tr>
                                <td width="25%" class="_inv_logo" style="padding:0 10px;vertical-align:top" align="middle">
                                    <img style="max-width:100%;max-height:100px" src="<?php echo Models::getLogo() ?>">
                                </td>
                                <td width="60%" style="padding:0 10px;vertical-align:top" class="tagline">
                                    <h2 class="company-name" style="margin:0;font-weight:700;font-size:28px;line-height:1em;text-transform:none"><?php echo COMPANY_NAME ?></h2>
                                    <div class="separator"></div>
                                    <p class="company-address" style="margin:0 0 3px 0;text-align:left;color:#888;font-size:14px;margin-bottom:0;line-height:1.2em">
                                        <?php echo Models::getContactInformation('address'); ?>
                                    </p>
                                    <p class="company-contact" style="margin:0 0 3px 0;text-align:left;color:#888;font-size:14px;margin-bottom:0;line-height:1.2em">
                                        <?php echo Models::getContactInformation('mobile1'); ?> |
                                        <?php echo Models::getContactInformation('email'); ?>
                                    </p>
                                </td>
                                <td width="15%" class="qr" style="padding:0 10px;vertical-align:top;text-align:right">
                                    <img src="<?php echo 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' . urlencode($SingleInvoiceUrl) . '&choe=UTF-8' ?>" style="width:100%;border:1px solid #e7e7e7" />
                                </td>
                            </tr>
                        </table>
                        <table class="table invoice-middle invoice-id" style="width:100%;margin-top:20px;margin-bottom:10px">
                            <tr>
                                <td style="padding:0 10px;vertical-align:middle">
                                    <h1 style="font-size:40px;font-family:'impact';color:#000;margin:10px 0;line-height:40px">INVOICE</h1>
                                    <div class="separator"></div>
                                    <h3 style="margin-top: 10px;margin-bottom:5px">#<?php echo $OrderId ?></h3>
                                    <img style="width:250px;height:40px" src="<?php echo 'https://crm.dhakasolution.com/_ilmComm/barcode/?t' . urlencode(base64_encode($OrderId)) ?>" alt="<?php echo $OrderId ?>" />
                                </td>
                            </tr>
                        </table>
                        <table class="table invoice-middle" style="width:100%">
                            <tr>
                                <td class="invoice-info" width="50%" style="padding:0 10px;vertical-align:middle">
                                    <table border="0" style="width: 100%;width:auto;border-collapse:collapse;border-spacing:0">
                                        <tr>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">Issue Date</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">:</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px"><?php echo date("d-m-Y H:iA") ?> </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">Ordering Date</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">:</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px"><?php echo date("d-m-Y H:iA", strtotime($OrderInfo->getOrderDate())) ?> </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">Currency</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">:</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px"> <?php echo Models::curr() ?> </td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">Payment Type</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">:</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px"><?php echo $OrderInfo->getPaymentType() ?></td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">Issuer</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px">:</td>
                                            <td style="vertical-align:top;font-size:13px;padding:1px 3px"><?php echo htmlspecialchars($OrderInfo->getName() . ", " . $OrderInfo->getMobileNumber() . ", " . $OrderInfo->getEmail()) ?></td>
                                        </tr>
                                    </table>
                                </td>
                                <td class="invoice-bill-to" width="50%" style="padding:0 10px;vertical-align:middle">
                                    <p style="margin:0 0 3px 0;text-align:left;margin-bottom:2px;font-size:13px;color:#000"><u>Ship To: </u></p>
                                    <p style="margin:0 0 3px 0;text-align:left;margin-bottom:2px;font-size:13px;color:#000"><strong><?php echo htmlspecialchars($OrderInfo->getShippingName()) ?></strong></p>
                                    <p style="margin:0 0 3px 0;text-align:left;margin-bottom:2px;font-size:13px;color:#000"><?php echo htmlspecialchars($OrderInfo->getShippingAddress()) ?></p>
                                    <p style="margin:0 0 3px 0;text-align:left;margin-bottom:2px;font-size:13px;color:#000">Delivery Location: <?php echo htmlspecialchars($OrderInfo->getDeliveryLocation()) ?></p>
                                    <p style="margin:0 0 3px 0;text-align:left;margin-bottom:2px;font-size:13px;color:#000"><?php echo htmlspecialchars($OrderInfo->getShippingPhone()) ?></p>
                                    <p style="margin:0 0 3px 0;text-align:left;margin-bottom:2px;font-size:13px;color:#000"><?php echo htmlspecialchars($OrderInfo->getEmail()) ?></p>
                                </td>
                            </tr>
                        </table>
                        <div class="invoice-table">
                            <table border="0" class="itemLists" style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:20px;font-size:14px">
                                <thead>
                                    <tr style="border-bottom:2px solid #aaa;color:#333;font-weight:600">
                                        <th style="padding:10px">#</th>
                                        <th style="width:55%;padding:10px">Description</th>
                                        <th style="padding:10px">Quantity</th>
                                        <th style="padding:10px">Unit Price</th>
                                        <th style="padding:10px">Total</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <?php
                                    $Sp = $Model->singleProduct();
                                    $CpInfo = $OrderInfo->getOdrUsedCoupon();
                                    $OdredProducts = $OrderInfo->getOrderedProducts();

                                    $Ci = $Model->orderCartInfo($OdredProducts, $CpInfo->getCouponToken());

                                    foreach ($OdredProducts as $i => $Prs) :
                                        $Sp->setPrId($Prs['p']);
                                        $Sp->processDiscount();
                                        $Sp->processStock($Prs["s"], $Prs["c"]);
                                    ?>
                                        <tr style="border-bottom:1px solid #ccc;color:#333;font-weight:500">
                                            <td style="padding:10px;vertical-align:middle"><?php echo $i + 1 ?></td>
                                            <td style="padding:10px;vertical-align:middle">
                                                <p class="ipnaid ipname" style="margin:0 0 3px 0;font-weight:600;font-size:13px;color:#333;text-align:left;margin-bottom:0">
                                                    <?php echo htmlspecialchars($Sp->getName()) ?>
                                                </p>
                                                <p class="ipnaid" style="margin:0 0 3px 0;font-size:11px;color:#333;text-align:left;margin-bottom:0">
                                                    ID: <?php echo $Sp->getProductId() ?>
                                                    <?php
                                                    if ($Prs["s"]) {
                                                        echo ', Size: ' . $Prs["s"];
                                                    }

                                                    if ($Prs["c"]) {
                                                        echo ', Color: ' . ucwords($Prs["c"]);
                                                    }
                                                    ?>
                                                </p>
                                            </td>
                                            <td style="padding:10px;vertical-align:middle"><?php echo $Prs["q"] ?></td>
                                            <td style="padding:10px;vertical-align:middle">
                                                <?php echo Models::curr($Sp->getPrice()) ?>
                                                <?php
                                                if ($Sp->getDiscount()) {
                                                    echo '<p style="margin:0 0 3px 0;font-size:11px;color:#333;text-align:left;margin-bottom:0" class="ipnaid">' . $Sp->getDiscount() . '% off</p>';
                                                }
                                                ?>
                                            </td>
                                            <td style="padding:10px;vertical-align:middle"><?php echo Models::curr($Sp->getPrice() * $Prs["q"]) ?></td>
                                        </tr>
                                    <?php
                                    endforeach;
                                    $Total = $Ci->getSubTotal();
                                    $DCost = $OrderInfo->getDeliveryCost();
                                    $CouponDiscount = $Ci->getCouponDiscount();
                                    $SubTotal = $Total + $DCost - $CouponDiscount; ?>

                                </tbody>
                            </table>
                            <table class="itemTotal" border="0" style="width:35%;border-collapse:collapse;border-spacing:0;margin-top:10px;font-size:14px;float:right;color:#333">
                                <tr>
                                    <td style="padding:3px;vertical-align:middle">Total</td>
                                    <td style="padding:3px;vertical-align:middle"><?php echo Models::curr($Total) ?></td>
                                </tr>
                                <tr>
                                    <td style="padding:3px;vertical-align:middle">Delivery Cost</td>
                                    <td style="padding:3px;vertical-align:middle"><?php echo Models::curr($DCost) ?></td>
                                </tr>

                                <?php if ($CouponDiscount) : ?>
                                    <tr>
                                        <td style="padding:3px;vertical-align:middle">Coupon Discount</td>
                                        <td style="padding:3px;vertical-align:middle"><?php echo Models::curr($CouponDiscount) ?></td>
                                    </tr>
                                <?php endif; ?>

                                <tr class="subtotal" style="color:#000;border-top:2px dotted #aaa;font-size:16px">
                                    <td style="padding:3px;vertical-align:middle">Subtotal</td>
                                    <td style="padding:3px;vertical-align:middle"><?php echo Models::curr($SubTotal) ?></td>
                                </tr>
                            </table>

                            <div class="separator" style="clear:both"></div>

                            <div class="payment-info" style="color:#888;font-size:12px;margin-top:20px;width:100%;font-weight:400">
                                <p style="margin:0 0 3px 0">
                                    Payment Type: <?php echo $OrderInfo->getPaymentType() ?>

                                    <?php if ($CouponDiscount) : ?>
                                        , Used coupon: <?php echo $CpInfo->getCouponCode() ?>
                                    <?php endif; ?>

                                </p>
                                <p style="margin:0 0 3px 0">Payment TrxnId: <?php echo $OrderInfo->getPaymentTrxnId() ?></p>
                                <img style="width:400px;height:60px" src="<?php echo 'https://crm.dhakasolution.com/_ilmComm/barcode/?t=' . urlencode(base64_encode($OrderInfo->getPaymentTrxnId())) ?>" alt="<?php echo $OrderInfo->getPaymentTrxnId()  ?>" />
                                <p>
                                    Your complete satisfaction<br />
                                    We want to make sure that your are completely satisfied with <?php echo COMPANY_NAME ?>.<br />
                                    Delivery: If for any reason you are not, then please advise the Customer Services Team Member at the door and they will ensure that any issues will be resolve for you.<br />
                                    If there are any questions you'd like to ask, either about your order or any aspect of the <?php echo COMPANY_NAME ?> service,
                                    Please call us on <?php echo Models::getContactInformation('mobile1') ?>, or e-mail us at <?php echo Models::getContactInformation('email') ?>. We are open seven days a week.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php } ?>
    </div>
</body>

</html>