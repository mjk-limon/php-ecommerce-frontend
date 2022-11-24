<?php

use _ilmComm\Head\DevInfo;

DevInfo::getDevInfo();
$ogInfo = $this->HeadData['oginfo'];
$body_class = $this->mobileView ? 'class="htmlformb"' : 'noclass';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title><?php echo $this->HeadData['title']; ?></title>
    <meta charset="utf-8">
    <meta name="title" content="<?php echo $this->HeadData['title'];  ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="<?php echo COMPANY_NAME ?> top online shopping in bangladesh. Browse our latest products and order online with cash on delivery payment system.">
    <meta name="author" content="<?php echo DevInfo::getAuthor(); ?>">
    <meta property="og:url" content="<?php echo $_SERVER['REQUEST_URI'] ?>" />
    <meta property="og:title" content="<?php echo $ogInfo["title"] ?>" />
    <meta property="og:description" content="<?php echo $ogInfo["description"] ?>" />
    <meta property="og:image" content="<?php echo $ogInfo["image"] ?>" />
    <meta property="og:image:type" content="<?php echo $ogInfo["image_ext"] ?>" />
    <meta property="og:image:width" content="<?php echo $ogInfo["image_width"] ?>" />
    <meta property="og:image:height" content="<?php echo $ogInfo["image_height"] ?>" />
    <meta property="og:site_name" content="<?php echo $_SERVER['HTTP_HOST'] ?>" />
    <meta name="keywords" content="<?php echo $ogInfo["description"] ?>">

    <link rel="icon" href="<?php echo asset("favicon.ico") ?>">

    <?php $this->layout('global.css.mainpanel_head_core'); ?>
    <?php $this->layout('global.javascripts.mainpanel_head_core'); ?>
</head>

<body <?php echo $body_class ?>>
    <?php $this->layout('mainpanel.floating_cart'); ?>

    <header id="header">

        <?php $this->layout('mainpanel.header.header_top'); ?>
        <?php $this->layout('mainpanel.header.header_middle'); ?>
        <?php $this->layout('mainpanel.header.header_bottom'); ?>

    </header>

    <?php $this->layout('mainpanel.neck'); ?>

    <section id="skmbcontent" style="display:block">
        
        <?php include $this->subView; ?>

    </section>

    <footer id="footer">
        
        <?php $this->layout('mainpanel.footer.footer_top'); ?>
        <?php $this->layout('mainpanel.footer.footer_middle'); ?>
        <?php $this->layout('mainpanel.footer.footer_bottom'); ?>

    </footer>


    <?php $this->layout('mainpanel.notification_modal'); ?>
    <?php $this->layout('global.javascripts.mainpanel_foot_core'); ?>
    <?php $this->layout('global.javascripts.mainpanel_foot_init'); ?>
</body>

</html>
