<?php
$this->spAddClass = get_site_settings('navhover') ? 'fixed-nav' : null;
$this->slideSize = array(($this->HomeGridNumber * 100), (($this->HomeGridNumber + 1) * 100));
?>

<?php $this->layout('homepage.home_top'); ?>
<?php $this->layout('homepage.home_body'); ?>
<?php $this->layout('global.css.homepage_core'); ?>
<?php $this->layout('global.javascripts.homepage_core'); ?>
