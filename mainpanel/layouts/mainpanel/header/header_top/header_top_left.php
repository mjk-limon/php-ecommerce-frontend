<div class="col-sm-6 hidden-xs">
    <div class="top-user-nav">
        <ul class="nav nav-pills">
            <li>
                <a href="#" onclick="window.open('tel:<?php echo get_contact_information("mobile1") ?>')">
                    Hotline: <span><?php echo get_contact_information("mobile1") ?></span>
                </a>
            </li>
            <li>
                <a href="#" onclick="window.open('mailto:<?php echo get_contact_information("email") ?>')">
                    Mail Us: <span><?php echo get_contact_information("email") ?></span>
                </a>
            </li>
        </ul>
    </div>
</div>
