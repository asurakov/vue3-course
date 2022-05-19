export default {
    mounted(el, binding) {
        //console.log(el, binding);        
        const options = {
            rootMargin: "0px",
            threshold: 1.0,
        };

        const callback = (entries, observer) => {
            if (entries[0].isIntersecting && binding.instance.page < binding.instance.totalPages) {                
                console.log(binding.instance.page, binding.instance.totalPages);                
                console.log("load more");
                binding.value();                
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name: 'intersection'
}