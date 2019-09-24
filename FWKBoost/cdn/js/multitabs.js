/**
 * @copyright 	&copy; 2015-2019 Labsoweb
 * @license 	https://www.gnu.org/licenses/gpl-3.0.html GNU/GPL-3.0
 * @author      Sebastien LARTIGUE <babso@labsoweb.fr>
 * @version   	1.0 - 2019 09 06
 * @since   	2019 09 06
*/
(function($) {

    $.fn.extend({
        multiTabs: function(options) {
            var defaults = {
                pluginType: 'modal', // modal, accordion, tabs
                contentClass: '.content-panel',
                animation: false,
                animationClass: 'animated ',
                animationIn: 'slideInLeft',
                animationOut: 'slideOutRight',
                animationDuration: '1000', // milisecondes
                animationDelay: '0', // milisecondes
                accordionSiblings: false,
            };
            options = $.extend(defaults, options);

            if(options.pluginType == 'accordion') // accordion controls management
            {
                $('.open-all-accordions').on('click', function(){
                    $(this).closest('.accordion-container').find('.accordion').addClass('active-panel').css('height', 'auto');
                    $(this).closest('.accordion-container').find('[data-target]').addClass('active-tab');
                    console.log($(this).closest('.accordion-container'));
                });
                $('.close-all-accordions').on('click', function(){
                    $(this).closest('.accordion-container').find('.accordion').removeClass('active-panel').css('height', 0);
                    $(this).closest('.accordion-container').find('[data-target]').removeClass('active-tab');
                });
            }

            // When page loads, open target if hash correspond to an id
            var hashUrl = location.hash;
            var hashTarget = hashUrl.substring(1);

            if(options.pluginType == 'modal') {
                $('.modal-container').find(hashUrl).addClass('active-panel');
                $('.close-modal').on('click', function() {
                    $('.modal-container ' + hashUrl).removeClass('active-panel'); // remove activation class from the target
                });
            } else if(options.pluginType == 'accordion') {
                if($('.accordion-container').find('[data-target="'+hashTarget+'"]').closest('.accordion').length){ // if target is nested
                    $('.accordion-container').find('[data-target="'+hashTarget+'"]').closest('.accordion').addClass('active-panel').css('height', 'auto');
                }
                $('.accordion-container').find('[data-target="'+hashTarget+'"]').addClass('active-tab');
                $('.accordion-container').find(hashUrl).addClass('active-panel').css('height', 'auto');
            } else if(options.pluginType == 'tabs') {
                if(hashUrl){
                    if($('.tabs-container').find('[data-target="'+hashTarget+'"]').closest('.tabs').length){ // if target is nested
                        $('.tabs-container').find('[data-target="'+hashTarget+'"]').closest('.tabs').addClass('active-panel').css('height', 'auto');
                    }
                    $('.tabs-container').find('[data-target="'+hashTarget+'"]').addClass('active-tab');
                    $('.tabs-container').find(hashUrl).addClass('active-panel').css('height', 'auto');
                } else {
                    $('.tabs-container .tabs').first().addClass('active-panel').css('height', 'auto'); // show the first target when the page loading
                    $('.tabs-container [data-trigger]').first().addClass('active-tab'); // and add activation class to the first target's trigger
                    $('.tabs .tabs').first().addClass('active-panel').css('height', 'auto'); // show the first target when it's a nested tabs menu
                    $('.tabs li:first-child [data-trigger]').addClass('active-tab'); // and add activation class to the first target's trigger
                }
            }


            return this.each(function() {
                var dataId = $(this).data('target'), // get the target name
                    targetPanel = $('#' + dataId), // set the target var
                    contentPanel = $('#' + dataId + ' ' + options.contentClass),
                    animStyles = {
                        'animation-duration': options.animationDuration + 'ms',
                        'animation-delay': options.animationDelay + 'ms',
                    },
                    url = window.location.hash; // get the hash url of the current page

                if(options.pluginType == 'modal')
                {
                    $(this).on('click', function(e) { //when click on a trigger
                        e.preventDefault(); // stop the trigger action
                        history.pushState('', '', '#'+dataId); // set the hash of the url whitout apllying it
                        $(targetPanel).addClass('active-panel'); // add activation class to the target
                        $('.close-modal').on('click', function() {
                            $(targetPanel).removeClass('active-panel'); // remove activation class from the target
                        });
                        $('.modal [data-target]').on('click', function(){ // when trigger is inside one of the targets
                            $(this).closest('.modal').removeClass('active-panel'); // remove activation class from the running target
                        });
                        if(options.animation) { // if animate.css is active
                            $(targetPanel).removeClass().css(animStyles);// remove all classes from target & add animation details attributes
                            $(targetPanel).addClass('modal active-panel ' + options.animationClass + ' ' + options.animationIn); // then add necessary opening classes for animate.css
                            $('.close-modal').on('click', function(){
                                $(this).parent().removeClass(options.animationIn).addClass(options.animationOut); // change animation classes to closing ones
                            });
                        }
                    });
                }
                else if(options.pluginType == 'accordion')
                {
                    $(this).after(targetPanel).appendTo(); // get target and place it just after trigger
                    $(this).on('click', function(e) {
                        e.preventDefault(); // stop the trigger action
                        history.pushState('', '', '#'+dataId); // set the hash of the url whitout apllying it
                        var contentHeight = contentPanel.outerHeight(); // calculate height of target
                        if(options.accordionSiblings == true) {
                            $(this).closest('.accordion-container').find('.accordion').not(targetPanel).removeClass('active-panel').height(0);
                            $(this).closest('.accordion-container').find('[data-trigger]').not(this).removeClass('active-tab');
                        }
                        if(targetPanel.hasClass('active-panel')) // if target is active
                        {
                            $(this).removeClass('active-tab');
                            $(targetPanel).removeClass('active-panel'); // remove activation class
                            $(targetPanel).css('height', 0); // set height of target to zero
                            if(options.animation) { // if animate.css
                                $(targetPanel).removeClass().css(animStyles);// remove all classes from target & add animation details attributes
                                $(targetPanel).addClass('accordion ' + options.animationClass + ' ' + options.animationOut);  // then add necessary closing classes for animate.css
                            }
                        }
                        else // if target is not active
                        {
                            $(this).addClass('active-tab');
                            $(targetPanel).addClass('active-panel'); // add activation class
                            $(targetPanel).css('height', contentHeight + 'px'); // set the height of the target
                            if($(this).parents(options.contentClass).length) // if the trigger is inside a target
                            {
                                var parentHeight = $(this).closest(options.contentClass).outerHeight(); // get the height of the container
                                $(targetPanel).closest(options.contentClass).closest('.accordion').css('height', parentHeight + contentHeight + 'px'); // set the new height of the container adding the height of the target
                            }
                            if(options.animation) { // if animate.css
                                $(targetPanel).removeClass().css({ // remove all classes from target & add animation details attributes
                                    'animation-duration': options.animationDuration + 'ms',
                                    'animation-delay': options.animationDelay + 'ms',
                                });
                                $(targetPanel).addClass('accordion active-panel ' + options.animationClass + ' ' + options.animationIn); // then add necessary opening classes for animate.css
                            }
                        }
                    });
                }
                else if(options.pluginType == 'tabs')
                {
                    $(this).on('click', function(e) {
                        e.preventDefault(); // stop the trigger action
                        history.pushState('', '', '#'+dataId); // send the id of the target as hash of the url whitout apllying it
                        var contentHeight = contentPanel.outerHeight(); // set the height of the target
                        if(!$(this).hasClass('active-tab')) // if the trigger isn't active
                        {
                            $(targetPanel).siblings('.tabs').removeClass('active-panel').css('height', 0); // remove the activation class from all targets and set height of targets to zero
                            $(this).parent().siblings().find('[data-target]').removeClass('active-tab'); // and from all sibling triggers
                        }
                        $(this).addClass('active-tab'); // add activation class to the trigger
                        $(targetPanel).addClass('active-panel').css('height', contentHeight + 'px'); // set the height of the target
                        if($(this).parents(options.contentClass).length) // if the trigger is inside a target
                        {
                            var parentHeight = $(this).parents(options.contentClass).outerHeight(); // get the height of the container
                            $(targetPanel).closest(options.contentClass).closest('.tabs').css('height', contentHeight + parentHeight + 'px'); // set the new height of the container adding the target one
                        }
                    });
                }
            });


        }

    });
})(jQuery);
