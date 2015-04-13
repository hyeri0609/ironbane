angular.module('ces.components-registry', ['ces.component'])
    .provider('$components', function() {
        'use strict';

        var _preload = {};

        this.register = function(data) {
            angular.extend(_preload, data);
        };

        this.$get = [
            'Component',
            '$log',
            function(Component, $log) {
                var _components = {},
                    _initialized = false,
                    svc = function() {};

                svc.init = function() {
                    if (_initialized) {
                        return;
                    }

                    for (var key in _preload) {
                        this.registerComponent(key, _preload[key]);
                    }
                    _initialized = true;
                };

                svc.registerComponent = function(name, data) {
                    var component = new Component();

                    component.name = name;

                    angular.extend(component, data);

                    _components[name] = component;
                };

                svc.get = function(name, data) {
                    var c;
                    try {
                        c = Object.create(_components[name]);

                        angular.extend(c, data);
                    } catch (err) {
                        $log.debug('error instantiating component: "', name, '" does not exist');
                    }

                    return c;
                };

                return svc;
            }
        ];

    })
    .run([
        '$components',
        function($components) {
            'use strict';

            $components.init();
        }
    ]);