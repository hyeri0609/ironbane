angular
    .module('game.game-loop', [
        'engine.timing',
        'game.world-root',
        'global.constants'
    ])
    .run([
        '$timing',
        '$rootWorld',
        '$window',
        'IB_CONSTANTS',
        'Timer',
        '$rootScope',
        function($timing, $rootWorld, $window, IB_CONSTANTS, Timer, $rootScope) {
            'use strict';

            var uiTimer = new Timer(0.5);

            function onRequestedFrame() {
                $timing.step();

                if (IB_CONSTANTS.isDev) {
                    $rootWorld.stats.begin();
                }

                $rootWorld.update($timing.frameTime, $timing.elapsed, $timing.timestamp);

                if (IB_CONSTANTS.isDev) {
                    $rootWorld.stats.end();
                    debug.clear();
                }

                if (uiTimer.isExpired) {
                    $rootScope.$apply();
                    uiTimer.reset();
                }

                $window.requestAnimationFrame(onRequestedFrame);
            }

            $window.requestAnimationFrame(onRequestedFrame);
        }
    ]);
