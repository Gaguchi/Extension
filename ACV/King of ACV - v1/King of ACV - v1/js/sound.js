chrome.storage.sync.set({'reserved_jobs': 0})
if(!document.querySelector('body').textContent.includes("No Staged Jobs")){
    var audioInt = setInterval(() => {
        chrome.storage.sync.get(['runing_status'], function (result) {
            if ('runing_status' in result) {
                if (result.runing_status === false) {
                    clearInterval(audioInt);
                }else{
                    var path = 'audio/sound.mp3';
                    var audio = new Audio(chrome.runtime.getURL(path));
                    audio.muted = true;
                    audio.play();
                    audio.muted = false;
                }
            }
        });
    }, 2000);
}

