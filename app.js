class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad(){
        this.classList.toggle('active');
    }

    repeat(){
        //let index keep going up until 8 then back to 0
        let step = this.index % 8;
        //get all the pads by class name b0,b1,etc...
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over the pads/bars
        activeBars.forEach(bar =>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //check the pad if is has the active class
            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }

    start(){
        const interval = (60 / this.bpm) * 1000;
        //check if it is playing, null is a falsy value
        if(!this.isPlaying){
        //using arrow function for refering the this keyword and not refer to the default
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add('active');
        } else{
            //clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove('active');
        }
    }

    changeSound(e){
        const selectionName = e.target.name;
        //console.log(selectionName)
        const selectionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    mute(e){
        //console.log(e);
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    };

    changeTempo(e){
        //console.log(e);
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }

    updateTempo(e){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if(playBtn.classList.contains('active')){
            this.start();
        };
    };
}

const drumKit = new DrumKit();



drumKit.pads.forEach(pad =>{
    //once the pad is clicked, run the simple method activePad
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    });
})

drumKit.playBtn.addEventListener('click', () => {
    drumKit.start();
});

drumKit.selects.forEach(select =>{
    select.addEventListener('change', (e) => {
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        drumKit.mute(e);
    })
});

drumKit.tempoSlider.addEventListener('input', (e) =>{
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', (e) =>{
    drumKit.updateTempo(e);
});