/*! WOW - v1.1.2 - 2015-08-19
 * Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */
(function () {
    var a, b, c, d, e, f = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        },
        g = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function () {
        function a() {}
        return a.prototype.extend = function (a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = d);
            return a
        }, a.prototype.isMobile = function (a) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
        }, a.prototype.createEvent = function (a, b, c, d) {
            var e;
            return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
        }, a.prototype.emitEvent = function (a, b) {
            return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
        }, a.prototype.addEvent = function (a, b, c) {
            return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
        }, a.prototype.removeEvent = function (a, b, c) {
            return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
        }, a.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function () {
        function a() {
            this.keys = [], this.values = []
        }
        return a.prototype.get = function (a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function (a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
        function a() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return a.notSupported = !0, a.prototype.observe = function () {}, a
    }()), d = this.getComputedStyle || function (a) {
        return this.getPropertyValue = function (b) {
            var c;
            return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function (a, b) {
                return b.toUpperCase()
            }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
        }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function () {
        function e(a) {
            null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, e.prototype.init = function () {
            var a;
            return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, e.prototype.start = function () {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function () {
                    var a, c, d, e;
                    for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.all = function () {
                    var a, c, d, e;
                    for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                    return e
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function (a) {
                return function (b) {
                    var c, d, e, f, g;
                    for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function () {
                        var a, b, c, d;
                        for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                        return d
                    }.call(a));
                    return g
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, e.prototype.stop = function () {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, e.prototype.sync = function () {
            return a.notSupported ? this.doSync(this.element) : void 0
        }, e.prototype.doSync = function (a) {
            var b, c, d, e, f;
            if (null == a && (a = this.element), 1 === a.nodeType) {
                for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                return f
            }
        }, e.prototype.show = function (a) {
            return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
        }, e.prototype.applyStyle = function (a, b) {
            var c, d, e;
            return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
                return function () {
                    return f.customStyle(a, b, d, c, e)
                }
            }(this))
        }, e.prototype.animate = function () {
            return "requestAnimationFrame" in window ? function (a) {
                return window.requestAnimationFrame(a)
            } : function (a) {
                return a()
            }
        }(), e.prototype.resetStyle = function () {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
            return e
        }, e.prototype.resetAnimation = function (a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
        }, e.prototype.customStyle = function (a, b, c, d, e) {
            return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                animationDuration: c
            }), d && this.vendorSet(a.style, {
                animationDelay: d
            }), e && this.vendorSet(a.style, {
                animationIterationCount: e
            }), this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
            }), a
        }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function () {
                var b, d, g, h;
                for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                return h
            }.call(this));
            return d
        }, e.prototype.vendorCSS = function (a, b) {
            var c, e, f, g, h, i;
            for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
            return g
        }, e.prototype.animationName = function (a) {
            var b;
            try {
                b = this.vendorCSS(a, "animation-name").cssText
            } catch (c) {
                b = d(a).getPropertyValue("animation-name")
            }
            return "none" === b ? "" : b
        }, e.prototype.cacheAnimationName = function (a) {
            return this.animationNameCache.set(a, this.animationName(a))
        }, e.prototype.cachedAnimationName = function (a) {
            return this.animationNameCache.get(a)
        }, e.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, e.prototype.scrollCallback = function () {
            var a;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, e.prototype.offsetTop = function (a) {
            for (var b; void 0 === a.offsetTop;) a = a.parentNode;
            for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
            return b
        }, e.prototype.isVisible = function (a) {
            var b, c, d, e, f;
            return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
        }, e.prototype.util = function () {
            return null != this._util ? this._util : this._util = new b
        }, e.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, e
    }()
}).call(this);

/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/
(function ($) {
    var $window = $(window);
    var windowHeight = $window.height();
    $window.resize(function () {
        windowHeight = $window.height();
    });
    $.fn.parallax = function (xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        $this.each(function () {
            firstTop = $this.offset().top;
        });
        if (outerHeight) {
            getHeight = function (jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function (jqo) {
                return jqo.height();
            };
        }
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;

        function update() {
            var pos = $window.scrollTop();
            $this.each(function () {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }
                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }
        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);

/*!
 * scrollup v2.4.1
 * Url: http://markgoodyear.com/labs/scrollup/
 * Copyright (c) Mark Goodyear — @markgdyr — http://markgoodyear.com
 * License: MIT
 */
! function (l, o, e) {
    "use strict";
    l.fn.scrollUp = function (o) {
        l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o))
    }, l.fn.scrollUp.init = function (r) {
        var s, t, c, i, n, a, d, p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r),
            f = !1;
        switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", {
            id: p.scrollName,
            href: "#top"
        }), p.scrollTitle && d.attr("title", p.scrollTitle), d.appendTo("body"), p.scrollImg || p.scrollTrigger || d.html(p.scrollText), d.css({
            display: "none",
            position: "fixed",
            zIndex: p.zIndex
        }), p.activeOverlay && l("<div/>", {
            id: p.scrollName + "-active"
        }).css({
            position: "absolute",
            top: p.scrollDistance + "px",
            width: "100%",
            borderTop: "1px dotted" + p.activeOverlay,
            zIndex: p.zIndex
        }).appendTo("body"), p.animation) {
        case "fade":
            s = "fadeIn", t = "fadeOut", c = p.animationSpeed;
            break;
        case "slide":
            s = "slideDown", t = "slideUp", c = p.animationSpeed;
            break;
        default:
            s = "show", t = "hide", c = 0
        }
        i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance, n = l(o).scroll(function () {
            l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c), f = !1)
        }), p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0, d.click(function (o) {
            o.preventDefault(), l("html, body").animate({
                scrollTop: a
            }, p.scrollSpeed, p.easingType)
        })
    }, l.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationSpeed: 200,
        scrollTrigger: !1,
        scrollTarget: !1,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    }, l.fn.scrollUp.destroy = function (r) {
        l.removeData(e.body, "scrollUp"), l("#" + l.fn.scrollUp.settings.scrollName).remove(), l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(), l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r)
    }, l.scrollUp = l.fn.scrollUp
}(jQuery, window, document);
/*! jPlayerPlaylist for jPlayer 2.9.2 ~ (c) 2009-2014 Happyworm Ltd ~ MIT License */
! function (a, b) {
    jPlayerPlaylist = function (b, c, d) {
        var e = this;
        this.current = 0, this.loop = !1, this.shuffled = !1, this.removing = !1, this.cssSelector = a.extend({}, this._cssSelector, b), this.options = a.extend(!0, {
            keyBindings: {
                next: {
                    key: 221,
                    fn: function () {
                        e.next()
                    }
                },
                previous: {
                    key: 219,
                    fn: function () {
                        e.previous()
                    }
                },
                shuffle: {
                    key: 83,
                    fn: function () {
                        e.shuffle()
                    }
                }
            },
            stateClass: {
                shuffled: "jp-state-shuffled"
            }
        }, this._options, d), this.playlist = [], this.original = [], this._initPlaylist(c), this.cssSelector.details = this.cssSelector.cssSelectorAncestor + " .jp-details", this.cssSelector.playlist = this.cssSelector.cssSelectorAncestor + " .jp-playlist", this.cssSelector.next = this.cssSelector.cssSelectorAncestor + " .jp-next", this.cssSelector.previous = this.cssSelector.cssSelectorAncestor + " .jp-previous", this.cssSelector.shuffle = this.cssSelector.cssSelectorAncestor + " .jp-shuffle", this.cssSelector.shuffleOff = this.cssSelector.cssSelectorAncestor + " .jp-shuffle-off", this.options.cssSelectorAncestor = this.cssSelector.cssSelectorAncestor, this.options.repeat = function (a) {
            e.loop = a.jPlayer.options.loop
        }, a(this.cssSelector.jPlayer).bind(a.jPlayer.event.ready, function () {
            e._init()
        }), a(this.cssSelector.jPlayer).bind(a.jPlayer.event.ended, function () {
            e.next()
        }), a(this.cssSelector.jPlayer).bind(a.jPlayer.event.play, function () {
            a(this).jPlayer("pauseOthers")
        }), a(this.cssSelector.jPlayer).bind(a.jPlayer.event.resize, function (b) {
            b.jPlayer.options.fullScreen ? a(e.cssSelector.details).show() : a(e.cssSelector.details).hide()
        }), a(this.cssSelector.previous).click(function (a) {
            a.preventDefault(), e.previous(), e.blur(this)
        }), a(this.cssSelector.next).click(function (a) {
            a.preventDefault(), e.next(), e.blur(this)
        }), a(this.cssSelector.shuffle).click(function (b) {
            b.preventDefault(), e.shuffle(e.shuffled && a(e.cssSelector.jPlayer).jPlayer("option", "useStateClassSkin") ? !1 : !0), e.blur(this)
        }), a(this.cssSelector.shuffleOff).click(function (a) {
            a.preventDefault(), e.shuffle(!1), e.blur(this)
        }).hide(), this.options.fullScreen || a(this.cssSelector.details).hide(), a(this.cssSelector.playlist + " ul").empty(), this._createItemHandlers(), a(this.cssSelector.jPlayer).jPlayer(this.options)
    }, jPlayerPlaylist.prototype = {
        _cssSelector: {
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        },
        _options: {
            playlistOptions: {
                autoPlay: !1,
                loopOnPrevious: !1,
                shuffleOnLoop: !0,
                enableRemoveControls: !1,
                displayTime: "slow",
                addTime: "fast",
                removeTime: "fast",
                shuffleTime: "slow",
                itemClass: "jp-playlist-item",
                freeGroupClass: "jp-free-media",
                freeItemClass: "jp-playlist-item-free",
                removeItemClass: "jp-playlist-item-remove"
            }
        },
        option: function (a, c) {
            if (c === b) return this.options.playlistOptions[a];
            switch (this.options.playlistOptions[a] = c, a) {
            case "enableRemoveControls":
                this._updateControls();
                break;
            case "itemClass":
            case "freeGroupClass":
            case "freeItemClass":
            case "removeItemClass":
                this._refresh(!0), this._createItemHandlers()
            }
            return this
        },
        _init: function () {
            var a = this;
            this._refresh(function () {
                a.options.playlistOptions.autoPlay ? a.play(a.current) : a.select(a.current)
            })
        },
        _initPlaylist: function (b) {
            this.current = 0, this.shuffled = !1, this.removing = !1, this.original = a.extend(!0, [], b), this._originalPlaylist()
        },
        _originalPlaylist: function () {
            var b = this;
            this.playlist = [], a.each(this.original, function (a) {
                b.playlist[a] = b.original[a]
            })
        },
        _refresh: function (b) {
            var c = this;
            if (b && !a.isFunction(b)) a(this.cssSelector.playlist + " ul").empty(), a.each(this.playlist, function (b) {
                a(c.cssSelector.playlist + " ul").append(c._createListItem(c.playlist[b]))
            }), this._updateControls();
            else {
                var d = a(this.cssSelector.playlist + " ul").children().length ? this.options.playlistOptions.displayTime : 0;
                a(this.cssSelector.playlist + " ul").slideUp(d, function () {
                    var d = a(this);
                    a(this).empty(), a.each(c.playlist, function (a) {
                        d.append(c._createListItem(c.playlist[a]))
                    }), c._updateControls(), a.isFunction(b) && b(), c.playlist.length ? a(this).slideDown(c.options.playlistOptions.displayTime) : a(this).show()
                })
            }
        },
        _createListItem: function (b) {
            var c = this,
                d = "<li><div>";
            if (d += "<a href='javascript:;' class='" + this.options.playlistOptions.removeItemClass + "'>&times;</a>", b.free) {
                var e = !0;
                d += "<span class='" + this.options.playlistOptions.freeGroupClass + "'>(", a.each(b, function (b, f) {
                    a.jPlayer.prototype.format[b] && (e ? e = !1 : d += " | ", d += "<a class='" + c.options.playlistOptions.freeItemClass + "' href='" + f + "' tabindex='-1'>" + b + "</a>")
                }), d += ")</span>"
            }
            return d += "<a href='javascript:;' class='" + this.options.playlistOptions.itemClass + "' tabindex='0'>" + b.title + (b.artist ? " <span class='jp-artist'>by " + b.artist + "</span>" : "") + "</a>", d += "</div></li>"
        },
        _createItemHandlers: function () {
            var b = this;
            a(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.itemClass).on("click", "a." + this.options.playlistOptions.itemClass, function (c) {
                c.preventDefault();
                var d = a(this).parent().parent().index();
                b.current !== d ? b.play(d) : a(b.cssSelector.jPlayer).jPlayer("play"), b.blur(this)
            }), a(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.freeItemClass).on("click", "a." + this.options.playlistOptions.freeItemClass, function (c) {
                c.preventDefault(), a(this).parent().parent().find("." + b.options.playlistOptions.itemClass).click(), b.blur(this)
            }), a(this.cssSelector.playlist).off("click", "a." + this.options.playlistOptions.removeItemClass).on("click", "a." + this.options.playlistOptions.removeItemClass, function (c) {
                c.preventDefault();
                var d = a(this).parent().parent().index();
                b.remove(d), b.blur(this)
            })
        },
        _updateControls: function () {
            this.options.playlistOptions.enableRemoveControls ? a(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).show() : a(this.cssSelector.playlist + " ." + this.options.playlistOptions.removeItemClass).hide(), this.shuffled ? a(this.cssSelector.jPlayer).jPlayer("addStateClass", "shuffled") : a(this.cssSelector.jPlayer).jPlayer("removeStateClass", "shuffled"), a(this.cssSelector.shuffle).length && a(this.cssSelector.shuffleOff).length && (this.shuffled ? (a(this.cssSelector.shuffleOff).show(), a(this.cssSelector.shuffle).hide()) : (a(this.cssSelector.shuffleOff).hide(), a(this.cssSelector.shuffle).show()))
        },
        _highlight: function (c) {
            this.playlist.length && c !== b && (a(this.cssSelector.playlist + " .jp-playlist-current").removeClass("jp-playlist-current"), a(this.cssSelector.playlist + " li:nth-child(" + (c + 1) + ")").addClass("jp-playlist-current").find(".jp-playlist-item").addClass("jp-playlist-current"))
        },
        setPlaylist: function (a) {
            this._initPlaylist(a), this._init()
        },
        add: function (b, c) {
            a(this.cssSelector.playlist + " ul").append(this._createListItem(b)).find("li:last-child").hide().slideDown(this.options.playlistOptions.addTime), this._updateControls(), this.original.push(b), this.playlist.push(b), c ? this.play(this.playlist.length - 1) : 1 === this.original.length && this.select(0)
        },
        remove: function (c) {
            var d = this;
            return c === b ? (this._initPlaylist([]), this._refresh(function () {
                a(d.cssSelector.jPlayer).jPlayer("clearMedia")
            }), !0) : this.removing ? !1 : (c = 0 > c ? d.original.length + c : c, c >= 0 && c < this.playlist.length && (this.removing = !0, a(this.cssSelector.playlist + " li:nth-child(" + (c + 1) + ")").slideUp(this.options.playlistOptions.removeTime, function () {
                if (a(this).remove(), d.shuffled) {
                    var b = d.playlist[c];
                    a.each(d.original, function (a) {
                        return d.original[a] === b ? (d.original.splice(a, 1), !1) : void 0
                    }), d.playlist.splice(c, 1)
                } else d.original.splice(c, 1), d.playlist.splice(c, 1);
                d.original.length ? c === d.current ? (d.current = c < d.original.length ? d.current : d.original.length - 1, d.select(d.current)) : c < d.current && d.current-- : (a(d.cssSelector.jPlayer).jPlayer("clearMedia"), d.current = 0, d.shuffled = !1, d._updateControls()), d.removing = !1
            })), !0)
        },
        select: function (b) {
            b = 0 > b ? this.original.length + b : b, b >= 0 && b < this.playlist.length ? (this.current = b, this._highlight(b), a(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current])) : this.current = 0
        },
        play: function (c) {
            c = 0 > c ? this.original.length + c : c, c >= 0 && c < this.playlist.length ? this.playlist.length && (this.select(c), a(this.cssSelector.jPlayer).jPlayer("play")) : c === b && a(this.cssSelector.jPlayer).jPlayer("play")
        },
        pause: function () {
            a(this.cssSelector.jPlayer).jPlayer("pause")
        },
        next: function () {
            var a = this.current + 1 < this.playlist.length ? this.current + 1 : 0;
            this.loop ? 0 === a && this.shuffled && this.options.playlistOptions.shuffleOnLoop && this.playlist.length > 1 ? this.shuffle(!0, !0) : this.play(a) : a > 0 && this.play(a)
        },
        previous: function () {
            var a = this.current - 1 >= 0 ? this.current - 1 : this.playlist.length - 1;
            (this.loop && this.options.playlistOptions.loopOnPrevious || a < this.playlist.length - 1) && this.play(a)
        },
        shuffle: function (c, d) {
            var e = this;
            c === b && (c = !this.shuffled), (c || c !== this.shuffled) && a(this.cssSelector.playlist + " ul").slideUp(this.options.playlistOptions.shuffleTime, function () {
                e.shuffled = c, c ? e.playlist.sort(function () {
                    return .5 - Math.random()
                }) : e._originalPlaylist(), e._refresh(!0), d || !a(e.cssSelector.jPlayer).data("jPlayer").status.paused ? e.play(0) : e.select(0), a(this).slideDown(e.options.playlistOptions.shuffleTime)
            })
        },
        blur: function (b) {
            a(this.cssSelector.jPlayer).jPlayer("option", "autoBlur") && a(b).blur()
        }
    }
}(jQuery);
/* Demo Scripts for Bootstrap Carousel and Animate.css article
 * on SitePoint by Maria Antonietta Perna
 */
(function ($) {
    /* jPlayer Active */
    new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    }, [
        {
            title: "Lottery",
            mp3: "http://www.intimissibd.com/audio/Lottery.mp3",
            oga: "http://intimissibd.com/audio/Lottery.ogg"
		},
        {
            title: "Shed_A_Light_(feat._Cheat_Codes)",
            mp3: "http://intimissibd.com/audio/Shed_A_Light_(feat._Cheat_Codes).mp3",
            oga: "http://intimissibd.com/audio/Shed_A_Light_feat.ogg"
		},
        {
            title: "no_lie",
            mp3: "http://intimissibd.com/audio/no_lie.mp3",
            oga: "http://intimissibd.com/audio/no_lie.ogg"
		},
        {
            title: "Alone",
            mp3: "http://intimissibd.com/audio/Alone.mp3",
            oga: "http://intimissibd.com/audio/Alone.ogg"
		},
        {
            title: "As_Long_As_You_Love_Me_Album_Version",
            mp3: "http://intimissibd.com/audio/As_Long_As_You_Love_Me_Album_Version.mp3",
            oga: "http://intimissibd.com/audio/As_Long_As_You_Love_Me_Album_Version.ogg"
		},
        {
            title: "Closer",
            mp3: "http://intimissibd.com/audio/Closer.mp3",
            oga: "http://intimissibd.com/audio/Closer.ogg"
		},
        {
            title: "Eenie_Meenie",
            free: true,
            mp3: "http://intimissibd.com/audio/Eenie_Meenie.mp3",
            oga: "http://intimissibd.com/audio/Eenie_Meenie.ogg"
		},
        {
            title: "Faded",
            mp3: "http://intimissibd.com/audio/Faded.mp3",
            oga: "http://intimissibd.com/audio/Faded.ogg"
		},
        {
            title: "Let_Me_Love_You",
            mp3: "http://intimissibd.com/audio/Let_Me_Love_You.mp3",
            oga: "http://intimissibd.com/audio/Let_Me_Love_You.ogg"
		},
        {
            title: "Love_Me_Like_You_Do",
            mp3: "http://intimissibd.com/audio/Love_Me_Like_You_Do.mp3",
            oga: "http://intimissibd.com/audio/Love_Me_Like_You_Do.ogg"
		},
        {
            title: "Sorry",
            free: true,
            mp3: "http://intimissibd.com/audio/Sorry.mp3",
            oga: "http://intimissibd.com/audio/Sorry.ogg"
		},
        {
            title: "Starboy",
            mp3: "http://intimissibd.com/audio/Starboy.mp3",
            oga: "http://intimissibd.com/audio/Starboy.ogg"
		},
        {
            title: "side_to_side",
            mp3: "http://intimissibd.com/audio/side_to_side.mp3",
            oga: "http://intimissibd.com/audio/Starboy.ogg"
		}
	], {
        playlistOptions: {
            autoPlay: true,
        },
        supplied: "oga, mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        autoPlay: true
    });



    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    //Checks if li has sub (ul) and adds class for toggle icon - just an UI
    $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)
    $(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\"><img src=\"images/logo.png\" alt=\"mis music\"></a>");
    //Adds menu-mobile class (for mobile toggle menu) before the normal menu
    //Mobile menu is hidden if width is more then 959px, but normal menu is displayed
    //Normal menu is hidden if width is below 959px, and jquery adds mobile menu
    //Done this way so it can be used with wordpress without any trouble
    $(".menu > ul > li").hover(function (e) {
        if ($(window).width() > 943) {
            $(this).children("ul").stop(true, false).fadeToggle(150);
            e.preventDefault();
        }
    });
    //If width is more than 943px dropdowns are displayed on hover
    $(".menu > ul > li").click(function () {
        if ($(window).width() <= 943) {
            $(this).children("ul").fadeToggle(150);
        }
    });
    //If width is less or equal to 943px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)

    $(".menu-mobile").click(function (e) {
        $(".menu > ul").toggleClass('show-on-mobile');
        e.preventDefault();
    });
    //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)
    /*
    jQuery smoth scroll
    --------------------*/
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
})(jQuery);