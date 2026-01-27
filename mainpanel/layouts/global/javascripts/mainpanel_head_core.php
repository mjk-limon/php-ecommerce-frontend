<script src="<?php echo asset("assets/vendors/_jquery/jqu_ilm_plugin.js") ?>"></script>
<script src="<?php echo asset("assets/vendors/flexslider/__ds_jqu_flex.js") ?>"></script>

<?php if (!$this->mobileView) : ?>
    <script src="<?php echo asset("assets/vendors/imagezoom/__ds_details_zoom.js") ?>"></script>
<?php endif; ?>

<?php _ilmComm\Core\Http\Head\AdditionalHead::getAdditionalScripts(); ?>
