import { createApp } from 'vue';
import mitt from 'mitt';

const emitter = mitt();

const bus = createApp({});

bus.config.globalProperties.$bus = emitter;

export default bus;
