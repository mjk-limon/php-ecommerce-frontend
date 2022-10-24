<?php

$this->spAddClass = get_site_settings('navhover') ? 'fixed-nav' : null;
$this->slideSize = array(($this->HomeGridNumber * 140), (($this->HomeGridNumber + 1.03571429) * 140), 0);
?>

<?php $this->layout('homepage.home_top'); ?>
<?php $this->layout('homepage.home_body'); ?>
<?php $this->layout('global.css.homepage_core'); ?>
<?php $this->layout('global.javascripts.homepage_core'); ?>
