<div class="item <?php echo !$i ? 'active' : '' ?>">
    <div class="ppc-single-slide">
        <div class="ppc-single-background"
             style="background-image: url('<?php echo asset($this->CatImages[$i]) ?>');"></div>
        <div class="ppc-single-image">
            <img data-src="<?php echo asset($this->CatImages[$i]) ?>">
        </div>
    </div>
</div>