jQuery(document).ready(function($) {
    var l = 2500, n = 3800, t = n - 3000, r = 50, o = 150, c = 500, h = c + 800, p = 600, e = 1500;
    var u = l;
    function f(s) {
        var i, e, a = w(s);
        s.parents(".cd-headline").hasClass("type") ?
            (i = s.parent(".cd-words-wrapper")).addClass("selected").removeClass("waiting"),
            setTimeout(function() {
                i.removeClass("selected"),
                s.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")
            }, c),
            setTimeout(function() {
                C(a, o)
            }, h) : s.parents(".cd-headline").hasClass("letters") ?
            (e = s.children("i").length >= a.children("i").length,
            function s(i, e, a, n) {
                i.removeClass("in").addClass("out");
                i.is(":last-child") ? a && setTimeout(function() {
                    f(w(e))
                }, l) : setTimeout(function() {
                    s(i.next(), e, a, n)
                }, n);
                var t;
                i.is(":last-child") && $("html").hasClass("no-csstransitions") && (t = w(e), v(e, t))
            }(s.find("i").eq(0), s, e, r), m(a.find("i").eq(0), a, e, r)) : s.parents(".cd-headline").hasClass("clip") ?
            s.parents(".cd-words-wrapper").animate({
                width: "2px"
            }, p, function() {
                v(s, a),
                C(a)
            }) : s.parents(".cd-headline").hasClass("loading-bar") ?
            (s.parents(".cd-words-wrapper").removeClass("is-loading"),
            v(s, a),
            setTimeout(function() {
                f(a)
            }, n),
            setTimeout(function() {
                s.parents(".cd-words-wrapper").addClass("is-loading")
            }, t)) : (v(s, a),
            setTimeout(function() {
                f(a)
            }, l))
    }

    function C(s, i) {
        s.parents(".cd-headline").hasClass("type") ? (m(s.find("i").eq(0), s, !1, i),
            s.addClass("is-visible").removeClass("is-hidden")) : s.parents(".cd-headline").hasClass("clip") &&
        s.parents(".cd-words-wrapper").animate({
            width: s.width() + 10
        }, p, function() {
            setTimeout(function() {
                f(s)
            }, e)
        })
    }

    function m(s, i, e, a) {
        s.addClass("in").removeClass("out"),
        s.is(":last-child") ? (i.parents(".cd-headline").hasClass("type") && setTimeout(function() {
            i.parents(".cd-words-wrapper").addClass("waiting")
        }, 200), e || setTimeout(function() {
            f(i)
        }, l)) : setTimeout(function() {
            m(s.next(), i, e, a)
        }, a)
    }

    function w(s) {
        return s.is(":last-child") ? s.parent().children().eq(0) : s.next()
    }

    function v(s, i) {
        s.removeClass("is-visible").addClass("is-hidden"),
        i.removeClass("is-hidden").addClass("is-visible")
    }

    // Trigger the typing effect after the page loads
    setTimeout(function() {
        f($(".cd-words-wrapper .is-visible").eq(0));
    }, u);
});