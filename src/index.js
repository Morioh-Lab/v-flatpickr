import Plugin from './plugin.vue';

export default {
    install: function (vm, config) {
        vm.component(Plugin.name, Plugin);
        if (config) {
            vm.provide('flatpickr', config);
        }
    }
};

export { Plugin };