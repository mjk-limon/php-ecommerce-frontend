<?php if ($this->UserData) : ?>
    <form class="replyRvwForm" action="" method="POST">
        <input type="hidden" name="name" value="<?php echo $this->UserData->getFullName() ?>" />
        <input type="hidden" name="email" value="<?php echo $this->UserData->getUserName() ?>" />
        <input type="hidden" name="qid" value="0" />
        <input type="hidden" name="prid" value="<?php echo $this->Prid ?>" />
        <input type="hidden" name="reply_product_rvw" />
        <input type="hidden" name="rtp" value="qstn" />

        <div class="inline-form">
            <textarea type="text" name="message" placeholder="Ask a question..." required=""></textarea>
            <button class="">Submit</button>
        </div>
    </form>
<?php else : ?>
    <p>Please <a href="/login/?ref=p.03">Login</a> to ask a question.</p>
<?php endif; ?>
