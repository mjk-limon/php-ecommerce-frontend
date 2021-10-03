<?php

namespace _ilmComm;
?>

<?php
if ($this->CartItems) :
	$Sp = $this->SingleProduct;
?>
	<div class="scb-cart-area">
		<table class="table fc-table">
			<tbody>
				<?php
				foreach ($this->CartItems as $CKey => $CItem) :
					$Sp->setPrid($CItem['p']);
					$Sp->processDiscount($CItem['q']);
					$Sp->processStock($CItem['s'], $CItem['c']);
				?>
					<tr>
						<td>
							<span data-ciup="+">&plus;</span>
							<strong><?= $CItem['q'] ?></strong>
							<span data-ciup="-">&minus;</span>
						</td>
						<td class="fc-item-dis" width="50%">
							<img src="<?= $Sp->getProductImage() ?>" alt="" />
							<div class="dis-title">
								<h5><?= $Sp->getName() ?></h5>
								<span>Size: <?= $CItem['s'] ?>, Color: <?= $CItem['c'] ?></span>
								<span>Unit Price: <?= Models::curr($Sp->getPrice()) ?></span>
							</div>
						</td>
						<td><?= $Sp->getPrice() * $CItem['q'] ?></td>
						<td><span class="rmv-crt-btn" data-dynamic="<?= $CKey ?>">&times;</span></td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</div>
	<div class="scb-footer">
		<div class="fc-tamount">Your Cart Total: <strong><?= Models::curr($this->CartSummery->getSubTotal()) ?></strong></div>
		<a href="/cart/" class="scbf-link">View Full Cart</a>
		<a href="/checkout/" class="scbf-link">Place Order</a>
	</div>
<?php else : ?>
	<div class="no-products">
		<h4> Shopping Cart Empty! </h4>
		<ul>
			<li>You didn't add any product to cart. </li>
			<li>Please go back to Product Page. And add a product to cart.</li>
			<li>For any help, Please contact our help center</li>
		</ul>
	</div>
<?php endif; ?>