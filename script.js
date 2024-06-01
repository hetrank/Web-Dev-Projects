let songs = [
    {name: "000000", artist: "A.chal", filepath: "music/000000.mp3", coverpath: "covers/000000.jpg" },
    {name: "Attention", artist: "Charlie Puth", filepath: "music/Attention.mp3", coverpath: "covers/attention.jpg" },
    {name: "Eastside", artist: "Benny Blanco, Hasley, Khalid", filepath: "music/Eastside.mp3", coverpath: "covers/eastside.jpg" },
    {name: "Falling", artist: "Trevor Daniel", filepath: "music/Falling.mp3", coverpath: "covers/falling.jpg" },
    {name: "FE!N", artist: "Travis Scott", filepath: "music/FE!N.mp3", coverpath: "covers/fein.jpg" },
    {name: "Hymn For The Weekend", artist: "Coldplay", filepath: "music/Hymn-For-The-Weekend.mp3", coverpath: "covers/hymn for the weekend.jpg" },
    {name: "Paris", artist: "Willy Williams", filepath: "music/Paris.mp3", coverpath: "covers/paris.jpg" },
    {name: "Smack That", artist: "Akon", filepath: "music/Smack-That.mp3", coverpath: "covers/smack that.jpg" },
    {name: "So Pretty", artist: "Reyanna Maria", filepath: "music/So-Pretty.mp3", coverpath: "covers/so-pretty.jpg" },
    {name: "Starboy", artist: "Weekend", filepath: "music/Starboy.mp3", coverpath: "covers/starboy.jpg" },
    {name: "Strawberries & Cigarettes", artist: "Troye Sivan", filepath: "music/Strawberries-Cigarettes.mp3", coverpath: "covers/strawberries and cigarettes.jpg" },
    {name: "Stuck With You", artist: "Ariana Grande, Justin Bieber", filepath: "music/Stuck-With-U.mp3", coverpath: "covers/stuck with you.jpg" },
    {name: "Thrusting", artist: "Internet Money, Swae Lee, Future", filepath: "music/Thrusting.mp3", coverpath: "covers/thrusting.jpg" },
    {name: "Under The Influence", artist: "Chris Brown", filepath: "music/Under-The-Influence.mp3", coverpath: "covers/under the influence.jpg" },
    {name: "Wait A Minute", artist: "Willow", filepath: "music/Wait-A-Minute.mp3", coverpath: "covers/wait a minute.jpg" }
]


let coverphoto = document.getElementById("cover")
let title = document.getElementById("songname")
let playbar = document.getElementById("playbar")
let previous = document.getElementById("back")
let play = document.getElementById("play")
let isplay = true
let next = document.getElementById("next")
let songindex = 0
let mixindex = 0
let songtime = document.getElementsByClassName("current-time")[0]
let min = 0
let current_audio = new Audio(songs[songindex].filepath)
let sec = 0
let list = document.getElementsByClassName("songinfo")
let list_play = document.getElementsByClassName("info-playbutton") 

coverphoto.src = songs[songindex].coverpath
title.innerHTML = songs[songindex].name
list[songindex].getElementsByClassName("name")[0].classList.add("unique-color")
list[songindex].getElementsByClassName("gif")[0].style.opacity = 1

setInterval(()=>{
    let sec = parseInt((current_audio.currentTime%60))
    min = parseInt((current_audio.currentTime/60))
    songtime.innerHTML = `${min}` + ":" + `${sec}`
    if(current_audio.currentTime == current_audio.duration){
        isplay = !isplay
        play.src = 'icons/play-button.png'
    }
}, 500)

play.addEventListener('click', ()=>{
    play.src = isplay ? 'icons/pause.png' : 'icons/play-button.png'
    isplay ? current_audio.play() : current_audio.pause()
    isplay = !isplay
    if(!isplay){
        list_play[songindex].src = "icons/pause.png"
    }
    else{
        list_play[songindex].src = "icons/play-button.png"
    }
})

current_audio.addEventListener('timeupdate', ()=>{
    playbar.value = (current_audio.currentTime/current_audio.duration)*100
})

playbar.addEventListener('change', ()=>{
    current_audio.currentTime = (playbar.value * current_audio.duration)/100
})

previous.addEventListener('click', ()=>{
    list_play[songindex].src = "icons/play-button.png"
    list[songindex].getElementsByClassName("name")[0].classList.remove("unique-color")
    list[songindex].getElementsByClassName("gif")[0].style.opacity = 0
    if(songindex==0){
        songindex = 14
    }
    else{
        songindex-=1
    }
    current_audio.src = songs[songindex].filepath
    current_audio.play()
    if(isplay){
        play.src = 'icons/pause.png'
        isplay = !isplay
    }
    coverphoto.src = songs[songindex].coverpath
    title.innerHTML = songs[songindex].name
    list[songindex].getElementsByClassName("name")[0].classList.add("unique-color")
    list[songindex].getElementsByClassName("gif")[0].style.opacity = 1
    list_play[songindex].src = "icons/pause.png"
})

next.addEventListener('click', ()=>{
    list_play[songindex].src = "icons/play-button.png"
    list[songindex].getElementsByClassName("name")[0].classList.remove("unique-color")
    list[songindex].getElementsByClassName("gif")[0].style.opacity = 0
    if(songindex==14){
        songindex = 0
    }
    else{
        songindex+=1
    }
    current_audio.src = songs[songindex].filepath
    current_audio.play()
    if(isplay){
        play.src = 'icons/pause.png'
        isplay = !isplay
    }
    coverphoto.src = songs[songindex].coverpath
    title.innerHTML = songs[songindex].name
    list[songindex].getElementsByClassName("name")[0].classList.add("unique-color")
    list[songindex].getElementsByClassName("gif")[0].style.opacity = 1
    list_play[songindex].src = "icons/pause.png"
})

Array.from(list_play).forEach((element, i)=>{
    element.addEventListener('click', ()=>{
        list_play[mixindex].src = "icons/play-button.png"
        if(isplay){
            element.src = 'icons/pause.png'
            current_audio.src = songs[i].filepath
            current_audio.play()
            isplay=!isplay
            mixindex = i
        }
        else{
            element.src = 'icons/play-button.png'
            current_audio.pause()
            isplay=!isplay
        }
    })
})

current_audio.addEventListener('ended', ()=>{
    songindex = (songindex==14) ? 0 : (songindex+1)
    current_audio.src = songs[songindex].filepath
    current_audio.play()
    isplay = !isplay
    play.src = 'icons/pause.png'
})

