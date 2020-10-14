function loadScript(url)
{
    var jsLocation = document.getElementsByClassName('js-bottom')[0];
    var script = document.createElement('script');
    script.src = url;
    jsLocation.appendChild(script);
}

var L_HIDE_MESSAGE    = 'hide message';
var L_HIDE_HIDEBLOCK  = 'hide hideblock';
var L_COPYTOCLIPBOARD = 'copy to clipboard';

loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/@global.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/autobox.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/autocomplete.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/basictable.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/dndfiles.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/form/form.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/lightcase.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/linedtextarea.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/menumaker.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/multitabs.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/notation.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/owl.carousel.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/pushmenu.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/selectimg.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/selectimg.multi.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/sortable.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/tooltip.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/upload.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/UrlSerializedParameterEncoder.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/form/validator.js');
loadScript('https://raw.githack.com/PHPBoost/PHPBoost/master/templates/default/plugins/wizard.js');

loadScript('https://raw.githack.com/babsolune/babsolune.github.io/master/FWKBoost/src/phpboost.init.js');
