var  menu = [
	{ID: 1, Artist: 'Prince - Purple Rain', Time: '3:51'},
	{ID: 2, Artist: 'Michael Jackson - Billie Jean', Time: '5:22'},
	{ID: 3, Artist: 'Bob Marley - No Woman, No Cry ', Time: '8:01'},
	{ID: 4, Artist: 'Jay-Z - Empire State of Mind', Time: '12:13'},
	//delete test by removing comment{ID: 5, Artist: 'Elton John - Your Song', Time: '4:16'},
	//delete test by removing comment{ID: 6, Artist: 'Prince - Purple Rain', Time: '3:51'},
]

	menu.map((playlist)=>{
	
	var li = $('<li/>')
		li.addClass('song')
	.html(`<div class="title"> <h6>${playlist.Artist}</h6> <h6></h6> </div>
		  	<div class="detail"> <h5>${playlist.Time}</h5> <h5></h5> </div>
			<div class="detail"> <input type="checkbox" id="heart${playlist.ID}"> 
			<label class="icon" for="heart${playlist.ID}"></label></div>		   
			<div class="detail"> <input type="checkbox" index="${playlist.ID}" class="delete-item" id="delete${playlist.ID}" onclick="onDelete(this)"> 
			<label class="remove" for="delete${playlist.ID}"></label></div>`)
		.appendTo($('#items-list'));
	
  });

var audio, playbtn, title,poster, artists,mutebtn, seekslider, 
	volumeslider, seeking=false, seekto, 
	curtimetext, durtimetext, artist_song, 
	dir, playlist, ext, agent,artist_name,repeat,random;
    
    //Initialization Of Array of Music, Title , Poster Image , Artists
	dir = "music/";
    playlist = ["Prince","Prince","Prince","Prince","Prince"];
    title = ["Prince","Michael Jackson","Bob Marley","Jay-Z","Elton John"];
    poster = ["images/bg.jpg","images/mj.jpg","images/bm.jpg","images/jz.jpg","images/jz.jpg"];
    artists = ["Purple Rain","Billie Jean","No Woman, No Cry","Empire State of Mind","Elton John"];
    playlist_index = 0;

    //Used to run on every browser
	ext = ".mp3";
	agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
    ext = ".ogg";
	}

	// Set object references
	playbtn = document.getElementById("playpausebtn");
	nextbtn = document.getElementById("nextbtn");
	prevbtn = document.getElementById("prevbtn");
	mutebtn = document.getElementById("mutebtn");
	seekslider = document.getElementById("seekslider");
	volumeslider = document.getElementById("volumeslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
    artist_song = document.getElementById("artist_song");
    artist_name = document.getElementById("artist_name");
    repeat = document.getElementById("repeat");
    randomSong = document.getElementById("random");
    
	// Audio Object
	audio = new Audio();
	audio.src = dir+playlist[0]+ext;
	audio.loop = false;

    //First Song Title and Artist
    artist_song.innerHTML = title[playlist_index];
    artist_name.innerHTML = artists[playlist_index];
    
	// Add Event Handling
	playbtn.addEventListener("click",playPause);
	nextbtn.addEventListener("click",nextSong);
	prevbtn.addEventListener("click",prevSong);
	mutebtn.addEventListener("click", mute);
	seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
	seekslider.addEventListener("mousemove", function(event){ seek(event); });
	seekslider.addEventListener("mouseup",function(){ seeking=false; });
	volumeslider.addEventListener("mousemove", setvolume);
	audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
	audio.addEventListener("ended", function(){ switchTrack(); });
    repeat.addEventListener("click",loop);
    randomSong.addEventListener("click",random);

    //Functions
    function fetchMusicDetail(){
        //Title and Artist
        artist_song.innerHTML =title[playlist_index];
        artist_name.innerHTML = artists[playlist_index];

        //Audio
        audio.src = dir+playlist[playlist_index]+ext;
	    audio.play();
    }
    function getRandomNumber(min,max){
        let step1 = max - min + 1;
        let step2 = Math.random() * step1;
        let result = Math.floor(step2) + min;
        return result;
    }

    function random(){
        let randomIndex = getRandomNumber(0,playlist.detail-1);
        playlist_index = randomIndex;
        fetchMusicDetail();
	}
	function loop(){
        if(audio.loop){
            audio.loop = false;
            $("#repeat img").attr("src","images/rep.png");
    
	    } else {
            audio.loop = true;
            $("#repeat img").attr("src","images/rep1.png");
	    }
    }

	function nextSong(){
		playlist_index++;
		if(playlist_index > playlist.detail - 1){
			playlist_index = 0;
        }
        fetchMusicDetail();
    }
    
	function prevSong(){
		playlist_index--;
		if(playlist_index < 0){
			playlist_index = playlist.detail - 1;
        }
        fetchMusicDetail();
	}
	
	function switchTrack(){
		if(playlist_index == (playlist.detail - 1)){
			playlist_index = 0;
		}else{
		    playlist_index++;	
        }
        fetchMusicDetail();
    }
    
	function playPause(){
		if(audio.paused){
            audio.play();
	    }else{
            audio.pause();
	    }
	}
	
	function mute(){
		if(audio.muted){
			audio.muted = false;
			var icon = document.getElementById('mute');
			icon.style.color = "red";
	    }else{
			audio.muted = true;
	    }
    }
    
	function changeColor(){
   			var icon = document.getElementById('like');
  			icon.style.color = "red";    
	}
	  
	function seek(event){
		if(audio.duration == 0){
			null
		}else{
			if(seeking){
				seekslider.value = event.clientX - seekslider.offsetLeft;
				seekto = audio.duration * (seekslider.value / 100);
				audio.currentTime = seekto;
			}
		} 
    }

	function setvolume(){
	    audio.volume = volumeslider.value / 100;
    }

	function seektimeupdate(){
		if(audio.duration){
			var nt = audio.currentTime * (100 / audio.duration);
			seekslider.value = nt;
			var curmins = Math.floor(audio.currentTime / 60);
	    	var cursecs = Math.floor(audio.currentTime - curmins * 60);
	    	var durmins = Math.floor(audio.duration / 60);
	    	var dursecs = Math.floor(audio.duration - durmins * 60);
			if(cursecs < 10){ cursecs = "0"+cursecs; }
	    	if(dursecs < 10){ dursecs = "0"+dursecs; }
	    	if(curmins < 10){ curmins = "0"+curmins; }
	    	if(durmins < 10){ durmins = "0"+durmins; }
			curtimetext.innerHTML = curmins+":"+cursecs;
	    	durtimetext.innerHTML = durmins+":"+dursecs;
		}else{
			curtimetext.innerHTML = "00"+":"+"00";
	    	durtimetext.innerHTML = "00"+":"+"00";
	}	
}

function onDelete(e){
  
	if(menu.detail <= 5){
	   alert('The playlist should have a minimum of 5 items.')
	   return
	}
	
	var index = parseInt($(e).attr('index'));
	menu = menu.filter(x=>x.No != index)
	$(e).closest('li').remove()
	
  }
