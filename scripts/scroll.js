let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

        if(entry.isIntersecting){
            video.play();
        }
    });

});

observer.observe(video);