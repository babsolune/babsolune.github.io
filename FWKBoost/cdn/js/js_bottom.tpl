<script>
<!--
	jQuery('[data-confirmation]').each(function() {
		data_confirmation = jQuery(this).attr('data-confirmation');
		if (data_confirmation == 'delete-element')
			var message = ${escapejs(LangLoader::get_message('confirm.delete', 'status-messages-common'))};
		else
			var message = data_confirmation;
		this.onclick = function () { return confirm(message); }
	});

	jQuery(document).ready(function() {
		jQuery('a[rel^=lightbox]').attr('data-rel', 'lightcase:collection');
		jQuery('a[data-lightbox^=formatter]').attr('data-rel', 'lightcase:collection');
		jQuery('a[data-rel^=lightcase]').lightcase({
			labels : {
				'errorMessage'    : ${escapejs(LangLoader::get_message('element.unexist', 'status-messages-common'))},
				'sequenceInfo.of' : ' ' + ${escapejs(TextHelper::lcfirst(LangLoader::get_message('of', 'common')))} + ' ',
				'close'           : ${escapejs(LangLoader::get_message('close', 'main'))},
				'navigator.prev'  : ${escapejs(LangLoader::get_message('previous', 'common'))},
				'navigator.next'  : ${escapejs(LangLoader::get_message('next', 'common'))},
				'navigator.play'  : ${escapejs(LangLoader::get_message('play', 'common'))},
				'navigator.pause' : ${escapejs(LangLoader::get_message('pause', 'common'))}
			},
			maxHeight: window.innerHeight,
			maxWidth: window.innerWidth,
			shrinkFactor: 0.85
		});
	});

	// BBCode table with no header
	jQuery('.formatter-table').each(function(){
		$this = jQuery(this).find('tbody tr:first-child td');
		if (!$this.hasClass('formatter-table-head'))
			$this.closest('.formatter-table').removeClass('table').addClass('table-no-header');
	});

	// All tables
	jQuery('.table').basictable();
	jQuery('.table-no-header').basictable({
	    header: false
	});

	jQuery(function() {
		jQuery(".lined textarea").linedtextarea();
	});

// TODO: change form builder to multitabs
    jQuery('.tab-container').easytabs();

    jQuery('.modal-container [data-trigger]').multiTabs({ pluginType: 'modal' });
    jQuery('.accordion-container.basic [data-trigger]').multiTabs({ pluginType: 'accordion'});
    jQuery('.accordion-container.siblings [data-trigger]').multiTabs({ pluginType: 'accordion', accordionSiblings: true });
    jQuery('.tabs-container [data-trigger]').multiTabs({ pluginType: 'tabs' });

	// Delete captcha fielset if captcha is active when user is connected
	if(jQuery('.captcha-element .form-element').length == 0)
		jQuery('.captcha-element').removeClass('wizard-step');

    jQuery('.wizard-container').wizard();

	jQuery('.cssmenu-title').each(function(){
		var link = jQuery(this).attr('href');
		if(window.location.href.indexOf(link) > -1) { // if page url contains href of one of the cssmenu items
			jQuery(this).parent().addClass('current'); // add class to it's parent (should be 'li')
			if(jQuery(this).closest('.has-sub').length) { // if item is in subfolder
				jQuery(this).closest('.has-sub').addClass('current');  // add class to the parent subfolder
				jQuery(this).closest('.cssmenu > ul > li').addClass('current'); // and to the first ancestor
			}
		}
	});

	jQuery('.modal-menu a').each(function(){
		var link = jQuery(this).attr('href');
		if(window.location.href.indexOf(link) > -1) { // if page url contains href of one of the cssmenu items
			jQuery(this).parent().addClass('current'); // add class to it's parent (should be 'li')
			if(jQuery(this).closest('.modal-menu > li').length) { // if item is in subfolder
				jQuery(this).closest('.modal-menu > li').addClass('current'); // and to the first ancestor in admin panel
				var rootLink = jQuery(this).closest('.modal').attr('id'); // get the target
				jQuery('[data-target="'+rootLink+'"]').parent().addClass('current');
			}
		}
	});

-->
</script>

# IF C_COOKIEBAR_ENABLED #
<script src="{PATH_TO_ROOT}/user/templates/js/cookiebar.js"></script>
# ENDIF #
