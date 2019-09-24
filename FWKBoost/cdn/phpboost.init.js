// js_bottom.tpl
$(document).ready(function(){
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

    jQuery('.tab-container').easytabs();

    jQuery('.modal-container [data-trigger]').multiTabs({ pluginType: 'modal' });
    jQuery('.accordion-container.basic [data-trigger]').multiTabs({ pluginType: 'accordion'});
    jQuery('.accordion-container.siblings [data-trigger]').multiTabs({ pluginType: 'accordion', accordionSiblings: true });
    jQuery('.tabs-container [data-trigger]').multiTabs({ pluginType: 'tabs' });

    // Delete captcha fielset if captcha is active when user is connected
    if(jQuery('.captcha-element .form-element').length == 0)
        jQuery('.captcha-element').removeClass('wizard-step');

    jQuery('.wizard-container').wizard();

});
