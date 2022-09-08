<script defer src="<?php echo asset("assets/_ilm_own/js/detailsPage_scripts.js") ?>"></script>

<script defer type="text/javascript">
$(document).ready(function() {
    <?php if ($this->checkJump('jumpToRvw')) : ?>
        $('#DRRvwBtn').trigger("click");
        _ilm.jumpToSection('#DRRvwBtn', function() {
            $('#rv-main-area .media:first-child').addClass('animated flash');
        });
    <?php endif; ?>

    <?php if ($this->checkJump('jumpToQstn')) : ?>
        _ilm.jumpToSection('#Rating', function() {
            $('#rv-qus-area .media:first-child').addClass('animated flash');
        });
    <?php endif; ?>
});
</script>
