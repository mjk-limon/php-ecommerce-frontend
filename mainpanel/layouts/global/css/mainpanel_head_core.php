<link href="<?php echo asset("assets/vendors/__boo_tstrap/__ilm_boo_tstrap.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/vendors/__font_aws/css/__ilm_font.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/vendors/boo_tslider/__ilm_boo_tslider.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/vendors/anim/_ilm_anim.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/vendors/flexslider/_ds_flex.css") ?>" rel="stylesheet" />

<link href="<?php echo asset("assets/_ilm_own/css/_ilm_skeleton.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/_ilm_own/css/_ilm_creat_design_lim.css") ?>" rel="stylesheet">
<link href="<?php echo asset("assets/_ilm_own/css/__ilm_creat_design.css") ?>" rel="stylesheet">

<?php if ($this->mobileView) : ?>
    <link href="<?php echo asset("assets/_ilm_own/css/__des_respon_sive.css") ?>" rel="stylesheet">
<?php endif; ?>

<style type="text/css">
:root {
    --accent: <?php echo $this->ColrData['accent'] ?>;
    --accentsec: <?php echo $this->ColrData['accentsec'] ?>;
    --secondary: <?php echo $this->ColrData['secondary'] ?>;
    --mainbody: <?php echo $this->ColrData['mainbody'] ?>;
    --innerpage: <?php echo $this->ColrData['innerpage'] ?>;
    --header: <?php echo $this->ColrData['header'] ?>;
    --menubar: <?php echo $this->ColrData['menubar'] ?>;
}

</style>
