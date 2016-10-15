angular.module('Portfolio.UI', [])
.controller('MainController', ['$timeout', function ($timeout) {
    var self = this;
    self.showColorPicker = false;
    self.settingsPaneColorsInitalized = false;
    self.colorModes = [
        //{ id: _.uniqueId('col'), colorId: "turquoise", name: "turquoise", code: "#1abc9c" },        
        { id: _.uniqueId('col'), colorId: "emerland", name: "emerland", code: "#2ecc71" },
        { id: _.uniqueId('col'), colorId: "darkblack", name: "darkblack", code: "#101010" },
        { id: _.uniqueId('col'), colorId: "peterRiver", name: "peter river", code: "#3498db" },
        { id: _.uniqueId('col'), colorId: "wetAsphalt", name: "wet asphalt", code: "#34495e" },
        { id: _.uniqueId('col'), colorId: "amethyst", name: "amethyst", code: "#9b59b6" },
        { id: _.uniqueId('col'), colorId: "carrot", name: "carrot", code: "#e67e22" },
        { id: _.uniqueId('col'), colorId: "sunDlower", name: "sunDlower", code: "#f1c40f" },
        { id: _.uniqueId('col'), colorId: "alizarin", name: "alizarin", code: "#e74c3c" },
        { id: _.uniqueId('col'), colorId: "pomegranate", name: "pomegranate", code: "#c0392b" }
    ];
    self.activeColorMode = self.colorModes[2];

    self.panmove = function (e) {
        e.pageX = e.center.x;
        e.pageY = e.center.y;
        self.mouseMove(e);
    }

    self.openColorPicker = function () {
        if (self.showColorPicker == false) {
            self.showColorPicker = true;
            self.settingsPaneColorsInitalized = true;
            self.shownColorModes = [];
            $timeout(function () {
                _.each(self.colorModes, function (cm, iter) {
                    self.shownColorModes.push(cm);
                    cm.transition = 'all ' + (50 + (150 * (iter + 1))) + 'ms' + ' ease-out';
                });
                _.each(self.colorModes, function (cm, iter) {
                    $timeout(function () {
                        var _elem = document.getElementById('color_' + cm.colorId);
                        _elem.style.transform = 'rotate(' + (-150 + (iter * 18)) + 'deg)';
                    }, 400);
                });
            }, 400);
        }
        else {
            self.showColorPicker = false;
            $timeout(function () {
                self.settingsPaneColorsInitalized = false;
                self.shownColorModes = [];
            }, 300);
        }
    }

    self.closeColorPicker = function () {
        self.showColorPicker = false;
        $timeout(function () {
            self.settingsPaneColorsInitalized = false;
            self.shownColorModes = [];
        }, 300);
    }

    self.choseColor = function (color) {
        self.activeColorMode = color;
        self.init();
        self.closeColorPicker();
    }

    self.goToContent = function () {
        var _contentElem = document.getElementById('portfolioContent');
        var _scrollTo = _contentElem.getBoundingClientRect().top;
        $('html, body').animate({
            scrollTop: _scrollTo
        }, 300);
    }


    self.init = function () {

        self.showPhoto = false;
        self.loaded = false;

        if (self.t1)
        {
            self.t1.pause();
            self.t1.clear();
        }

        if (self.t2) {
            self.t2.pause();
            self.t2.clear();
        }

        $timeout(function () {

            TweenMax.set($("#foto"), { opacity: 0 });
            var btn = document.getElementById('showPhoto');
            TweenMax.set(btn, { scaleX: 1, scaleY: 1, opacity: 1 });
            TweenMax.set($("#foto path"), { attr: { "fill-opacity": 0, "stroke-opacity": 0 } });

            self.t1 = new TimelineLite({ paused: true });
            self.t2 = new TimelineLite({ paused: true });

            self.t1.to('#foto', 0.01, { opacity: 1 }, "tltime");

            jQuery.each($("#foto path"), function (key, elem) {
                self.t1.add(TweenMax.to(elem, 0.05, { attr: { "stroke-opacity": 1 } }).delay(0.0001 * key));
                self.t2.add(TweenMax.to(elem, 0.3, { attr: { "fill-opacity": 1 } }).delay(0.0001 * key));
                self.t2.add(TweenMax.to(elem, 0.1, { attr: { "stroke-opacity": 0 } }).delay(0.0001 * key));
            });

            self.loaded = true;

        }, 30);
    }


    self.startShowPhoto = function () {
        self.showPhoto = true;
        var btn = document.getElementById('showPhoto');
        TweenMax.to(btn, 0.3, { scaleX: 0, scaleY: 0, transformOrigin: "center", opacity: 0 });
        $timeout(function () {
            self.t1.play();
            self.t1.eventCallback("onComplete", function () {
                self.t2.play();
            });
        }, 300);

    }

    self.init();

}]);