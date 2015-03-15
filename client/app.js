'use strict';

angular
    .module('Ironbane', [
        'game.ui',
        'game.game-loop',
        'game.world-root',
        'ces',
        'three',
        'ammo',
        'ammo.physics-world',
        'components',
        'game.scripts',
        'game.prefabs',
        'engine.entity-builder',
        'engine.sound-system',
        'engine.ib-config',
        'engine.input.input-system',
        'engine.util',
        'engine.debugger',
        'util.deepExtend',
        'util.name-gen'
    ])
    .config(function (SoundSystemProvider, $locationProvider) {

        // define all of the sounds & music for the game
        SoundSystemProvider.setAudioLibraryData({
            theme: {
                path: 'assets/music/ib_theme',
                volume: 0.55,
                loop: true,
                type: 'music'
            }
        });

        $locationProvider.html5Mode(false);
    })
    .config(function (IbConfigProvider) {
        // Used for input events
        IbConfigProvider.set('domElement', document);
        IbConfigProvider.set('debugDomElementId', 'debug');
    })
    .run(function (Debugger, $window) {
        // for convenience
        $window.debug = Debugger;
    })
    .run(function ($window, $rootWorld) {
        // TODO: move to directive
        $rootWorld.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild($rootWorld.renderer.domElement);
        $rootWorld.renderer.setClearColorHex(0xd3fff8);

        $window.addEventListener('resize', function () {
            $rootWorld.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
    });


function onReady() {
	angular.bootstrap(document, ['Ironbane']);
}

if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
}
else {
	angular.element(document).ready(onReady);
}
