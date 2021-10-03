<?php

namespace _ilmComm;

$OrderInfo = $this->orderInformation();
$OrderId = $OrderInfo->getOrderId();
$InvoiceUrl = Models::baseUrl('invoice/print/odr-'. $OrderId);
?>

	<section class="main-body">
		<div id="thank-you">
			<div class="container">
				<div class="top-content">
					<h2 class="successfull">Your order has been successfully placed!</h2> 
					<p>Thank you so much for ordering us. Our representative will confirm the order by contacting you within the maximum 24 hours.
						If your order no: <?= $OrderId ?> is confirmed then we will reach your product. You can also review the product if you want to verify it.</p>
					<p><?= COMPANY_NAME ?> always considers the quality of the product and its acceptability to the customer. 
						In that continuation, we promise you always good products. Even then, if the product is broken / damaged / bad, or if the quality is not expected, then we request you to let us know within 24 hours of receiving the product. </p>
				</div>
				<div class="your-data">
					<h3><span class="p-title">Ordering Information</span></h3>
					<div class="section-mb">
						<div class="mb-content">
							<div class="row">
								<div class="col-md-6">
									<table border="0" class="">
										<tbody>
											<tr><td>Name</td><td>:</td><td><?= htmlspecialchars($OrderInfo->getName()) ?></td></tr>
											<tr><td>Mobile Number</td><td>:</td><td><?= htmlspecialchars($OrderInfo->getMobileNumber()) ?> </td></tr>
											<tr><td>Email</td><td>:</td><td><?= htmlspecialchars($OrderInfo->getEmail()) ?> </td></tr>
											<tr><td>Address</td><td>:</td><td><?= htmlspecialchars($OrderInfo->getAddress()) ?></td></tr>
											<tr><td>Delivery Type</td><td>:</td><td><?= $OrderInfo->getDeliveryType() ?></td></tr>
										</tbody>
									</table>
								</div>
								<div class="col-md-6">
									<table border="0" class="">
										<tbody>
											<tr><td>Delivery Location</td><td>:</td><td><?= htmlspecialchars($OrderInfo->getDeliveryLocation()) ?></td></tr>
											<tr><td>Payment Type</td><td>:</td><td><?= $OrderInfo->getPaymentType() ?></td></tr>
											<tr><td>Payment Status</td><td>:</td><td><?= $OrderInfo->getPaymentStatus() ?></td></tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="your-bill">
					<h3><span class="p-title">YOUR BILL</span></h3> 
					<p class="your-bill-nav">
						<a href="<?= $InvoiceUrl ?>?pdf=true" target="_blank">
							<span class="invoice-print"><i class="fa fa-print"></i> Save as PDF</span>
						</a>
						<a class="text-muted" style="padding:0 3px">|</a>
						<a href="<?= $InvoiceUrl ?>" target="_blank">
							<span class="invoice-print"><i class="fa fa-print"></i> Print Invoice</span>
						</a>
					</p>
					
					<div class="section-mb">
						<div class="mb-content">					
							<div class="invoice">
								<img src="<?= Models::asset("images/logo.png") ?>" class="_invoice_watermark">
								<div class="row invoice-top">
									<div class="col-md-3 col-sm-3 col-xs-3">
										<img src="<?= Models::asset("images/logo.png") ?>" style="height: auto">
									</div>
									<div class="col-md-6 col-sm-6 col-xs-6 tagline">
										<h2 class="company-name"><?= COMPANY_NAME ?></h2>
										<div class="separator"></div>
										<p class="company-address"><?= Models::getContactInformation('address'); ?></p>
										<p class="company-contact">
											<?= Models::getContactInformation('mobile1'); ?> |
											<?= Models::getContactInformation('email'); ?>
										</p>
									</div>
									<div class="col-md-3 col-sm-3 col-xs-3 qr">
										<img src="<?= 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl='. urlencode($InvoiceUrl) .'&choe=UTF-8' ?>" />
									</div>
								</div>
								<div class="row invoice-middle">
									<div class="col-md-12 invoice-id">
										<h1>INVOICE</h1>
										<div class="separator"></div>
										<h3>#<?= $OrderId ?></h3>
										<img src="<?= 'https://crm.dhakasolution.com/_ilmComm/barcode/?t'. urlencode(base64_encode($OrderId)) ?>" alt="<?= $OrderId ?>" />
									</div>
								</div>
								<div class="row invoice-middle">
									<div class="col-md-6 col-sm-6 col-xs-6 invoice-info">
										<table border="0">
											<tr><td>Issue Date</td><td>:</td><td><?= date("d-m-Y H:iA") ?> </td></tr>
											<tr><td>Ordering Date</td><td>:</td><td><?= date("d-m-Y H:iA", strtotime($OrderInfo->getOrderDate())) ?> </td></tr>
											<tr><td>Currency</td><td>:</td><td> <?= Models::curr() ?> </td></tr>
											<tr><td>Payment Type</td><td>:</td><td><?= $OrderInfo->getPaymentType() ?></td></tr>
											<tr>
												<td>Issuer</td><td>:</td>
												<td><?= htmlspecialchars($OrderInfo->getName() . ", " . $OrderInfo->getMobileNumber() .
													($OrderInfo->getEmail() ? ", " . $OrderInfo->getEmail() : null)) ?></td>
											</tr>
										</table>
									</div>
									<div class="col-md-6 col-sm-6 col-xs-6 invoice-bill-to">
										<p><u>Ship To: </u></p>
										<p><strong><?= htmlspecialchars($OrderInfo->getShippingName()) ?></strong></p>
										<p><?= htmlspecialchars($OrderInfo->getShippingAddress()) ?></p>
										<p>Delivery Location: <?= htmlspecialchars($OrderInfo->getDeliveryLocation()) ?></p>
										<p><?= htmlspecialchars($OrderInfo->getShippingPhone()) ?></p>
										<p><?= htmlspecialchars($OrderInfo->getEmail()) ?></p>
									</div>
								</div>
								
								<div class="row invoice-table">
									<div class="col-md-12">
										<table border="0" class="itemLists">
											<thead>
												<tr>
													<th>#</th>
													<th style="width:55%">Product Description</th>
													<th>Quantity</th>
													<th>Unit Price</th>
													<th>Total</th>
												</tr>
											</thead>
											<tbody>
											
											<?php
											$Sp = $this->singleProduct();
											$CpInfo = $OrderInfo->getOdrUsedCoupon();
											$OdredProducts = $OrderInfo->getOrderedProducts();
											
											$Ci = $this->orderCartInfo($OdredProducts, $CpInfo->getCouponToken());
											
											foreach($OdredProducts as $i => $Prs):
												$Sp->setPrId( $Prs['p'] );
												$Sp->processDiscount($Prs["q"]);
												$Sp->processStock($Prs["s"], $Prs["c"]);
											?>	
												<tr>
													<td><?= $i+1 ?></td>
													<td>
														<p class="ipnaid ipname"><?= htmlspecialchars($Sp->getName()) ?></p>
														<p class="ipnaid">
															ID: <?= $Sp->getProductId() ?>
															<?php if($Prs["s"]) echo ', Size: '. $Prs["s"] ?>
															<?php if($Prs["c"]) echo ', Color: '. ucwords($Prs["c"]) ?>
														</p>
													</td>
													<td><?= $Prs["q"] ?></td>
													<td>
														<?= Models::curr($Sp->getPrice()) ?>
														<?php if($Sp->getDiscount()) echo '<p class="ipnaid">'. $Sp->getDiscount() .'% off</p>';  ?>
													</td>
													<td><?= Models::curr($Sp->getPrice() * $Prs["q"]) ?></td>
												</tr>
											<?php
											endforeach;
											
											$Total = $Ci->getSubTotal();
											$DCost = $OrderInfo->getDeliveryCost();
											$CouponDiscount = $Ci->getCouponDiscount();
											$SubTotal = $Total + $DCost - $CouponDiscount;
											?>
											
											</tbody>
										</table>
										<table class="itemTotal" border="0">
											<tr><td>Total</td><td><?= Models::curr($Total) ?></td></tr>
											<tr><td>Delivery Cost</td><td><?= Models::curr($DCost) ?></td></tr>
										
										<?php if($CouponDiscount): ?>	
											<tr><td>Coupon Discount</td><td><?= Models::curr($CouponDiscount) ?></td></tr>
										<?php endif; ?>

											<tr class="subtotal"><td>Subtotal</td><td><?= Models::curr($SubTotal) ?></td></tr>
										</table>
										
										<div class="clearfix"></div>
										<div class="separator"></div>
										
										<div class="payment-info">

										<?php if($CouponDiscount): ?>
											<p>Used coupon: <?= $CpInfo->getCouponCode() ?></p>
										<?php endif; ?>
										
											<p>Payment Number: <?= $OrderInfo->getPaymentTrxnId() ?></p>
											<p><img src="<?= 'https://crm.dhakasolution.com/_ilmComm/barcode/?t='. urlencode(base64_encode($OrderInfo->getPaymentTrxnId())) ?>" alt="<?= $OrderInfo->getPaymentTrxnId()  ?>" /></p>
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