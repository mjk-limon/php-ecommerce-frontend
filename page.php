<section class="main-body inner-page">
	<div class="container">
		<div class="page_contents">
			<h2 class="inner_page_title"><?= htmlspecialchars($this->PageContents['header']) ?></h2>
			<?= $this->PageContents['content']; ?>
		</div>
	</div>
</section>
<style type="text/css">
.inner-page ul{margin:inherit;padding:inherit;margin-left:50px}
.inner-page li.MsoNormal{list-style:disc outside;font-weight:500}
</style>