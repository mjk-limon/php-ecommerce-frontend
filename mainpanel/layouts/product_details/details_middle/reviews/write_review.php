<?php if ($this->UserData) : ?>
    <form class="replyRvwForm" action="" method="POST">
        <input type="hidden" name="name" value="<?php echo $this->UserData->getFullName() ?>" />
        <input type="hidden" name="email" value="<?php echo $this->UserData->getUserName() ?>" />
        <input type="hidden" name="prid" value="<?php echo $this->Prid ?>" />
        <input type="hidden" name="reply_product_rvw" />
        <input type="hidden" name="rtp" value="rvw" />

        <div class="user-star-rating">
            <h5>Your Rating:</h5>
            <div class="us-rating">
                <!--
                --><input name="rating" id="e5" type="radio" value="05"><label for="e5">&star;</label>
                <!--
                --><input name="rating" id="e4" type="radio" value="04"><label for="e4">&star;</label>
                <!--
                --><input name="rating" id="e3" type="radio" value="03"><label for="e3">&star;</label>
                <!--
                --><input name="rating" id="e2" type="radio" value="02"><label for="e2">&star;</label>
                <!--
                --><input name="rating" id="e1" type="radio" value="01"><label for="e1">&star;</label>
            </div>
        </div>
        <div class="inline-form">
            <textarea type="text" name="message" placeholder="Write a review..." required=""></textarea>
            <button class="">Submit</button>
        </div>
    </form>
<?php else : ?>
    <p>Please <a href="/login/?ref=p.03">Login</a> to write a review.</p>
<?php endif; ?>
