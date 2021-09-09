<template>
    <input type="text" ref="root" />
</template>

<script>

    import { onMounted, onBeforeUnmount, watch, ref, inject } from 'vue';
    import { register } from '@morioh/helper';

    export default {
        name: 'flatpickr',

        props: {
            modelValue: [Object, String, Number, Array],

            config: {
                type: Object,
                default: () => ({})
            },
        },
        emits: ['ready', 'change', 'input', 'blur', 'focus', 'update:modelValue', 'destroy'],

        setup(props, { emit }) {

            let instance = null;
            const root = ref(null);
            const config = inject('flatpickr');

            const defaults = {
                dateFormat: 'U', altFormat: 'Y-m-d G:i K', altInput: true, enableTime: true,
                minDate: new Date(),
                onChange: (selectedDates, dateStr, instance) => {
                    emit('update:modelValue', dateStr);
                    emit('change', selectedDates, dateStr, instance);
                },

            };
            const o = Object.assign({}, defaults, config, props.config);

            const parse = (date) => {
                return o.dateFormat == 'U' ? date * 1000 : date;
            }

            onMounted(() => {                

                register('link', { id: 'flatpickr-css', href: 'https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.9/flatpickr.min.css', type: 'text/css', rel: 'stylesheet' });
                register('script', { id: 'flatpickr-js', src: 'https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.9/flatpickr.min.js', async: true }).then(() => {
                    instance = flatpickr(root.value, o);
                    instance.setDate(parse(props.modelValue));
                });
            });


            watch(() => props.modelValue, (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    instance.setDate(parse(newValue));
                }
            });

            onBeforeUnmount(() => {

                if (instance) {
                    instance.destroy();
                    instance = null;
                }

                // console.log('destroy');

                // Note: By the time the editor is destroyed (promise resolved, editor#destroy fired)
                // the Vue component will not be able to emit any longer. So emitting #destroy a bit earlier.
                emit('destroy', instance);
            })

            return { root };

        }

    }

</script>