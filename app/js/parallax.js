(function(jQuery) {
    var jQuerywindow = jQuery(window);
    var windowHeight = jQuerywindow.height();
    jQuerywindow.resize(function() {
        windowHeight = jQuerywindow.height();
    });
    jQuery.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var jQuerythis = jQuery(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        jQuerythis.each(function() {
            firstTop = jQuerythis.offset().top;
        });
        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;

        function update() {
            var pos = jQuerywindow.scrollTop();
            jQuerythis.each(function() {
                var jQueryelement = jQuery(this);
                var top = jQueryelement.offset().top;
                var height = getHeight(jQueryelement);
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }
                jQuerythis.css(
                    "backgroundPosition",
                    xpos + " " + Math.round((top - pos) * speedFactor) + "px"
                );
            });
        }
        jQuerywindow.bind("scroll", update).resize(update);
        update();
    };
})(jQuery);