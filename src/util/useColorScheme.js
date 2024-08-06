import { onMounted, onUnmounted } from 'vue';
import bus from "@/eventBus.js";
/**
 * 当触发themeChange事件，切换页面的颜色主题，在onMounted，onUnmounted生命周期钩子函数中设置
 * 修改原理是css变量
 */
export function useColorScheme() {
    const themeChange = (theme) => {
        console.log('themeChange', theme)
        if (theme) {
            // 深色模式
            document.documentElement.style.setProperty('--primary', '#718dff');
            document.documentElement.style.setProperty('--bg', '#1d1e21');
            document.documentElement.style.setProperty('--font', '#ffffff');
            document.documentElement.style.setProperty('--warning', '#faad14');
            document.documentElement.style.setProperty('--success', '#a8ff7d');
            document.documentElement.style.setProperty('--error', '#f5222d');
            document.documentElement.style.setProperty('--info', '#80c1ff');
            document.documentElement.style.setProperty('--disabled', '#4e4e4e');
            document.documentElement.style.setProperty('--link', '#a0b5ff');
            document.documentElement.style.setProperty('--hover', '#d5e8ff');
        } else {
            // 浅色模式
            document.documentElement.style.setProperty('--primary', '#1890ff');
            document.documentElement.style.setProperty('--bg', '#ffffff');
            document.documentElement.style.setProperty('--font', '#333333');
            document.documentElement.style.setProperty('--warning', '#faad14');
            document.documentElement.style.setProperty('--success', '#52c41a');
            document.documentElement.style.setProperty('--error', '#f5222d');
            document.documentElement.style.setProperty('--info', '#1890ff');
            document.documentElement.style.setProperty('--disabled', '#bfbfbf');
            document.documentElement.style.setProperty('--link', '#1890ff');
            document.documentElement.style.setProperty('--hover', '#001764');
        }
    };

    onMounted(() => {
        bus.config.globalProperties.$bus.on('themeChange', themeChange);
    });

    onUnmounted(() => {
        bus.config.globalProperties.$bus.off('themeChange', themeChange);
    });
}
