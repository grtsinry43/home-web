export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('scroll-spring', {
        mounted(el) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const callback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        el.classList.add('scroll-in'); // 当进入视口时，添加动画类
                    } else {
                        el.classList.remove('scroll-in'); // 移出视口时，移除动画类
                    }
                });
            };

            const observer = new IntersectionObserver(callback, options);
            observer.observe(el);
        },
        unmounted(el) {
            const observer = new IntersectionObserver(() => {});
            observer.unobserve(el);
        }
    });
});
