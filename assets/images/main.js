music_play = true;	
var x = document.getElementById("audio"); 
	
function musicchange(){

	if(music_play==true)
			{
				music_play=false;
				document.getElementById("mdd").innerHTML="<font color=#abdf32><i class='fa fa-music'></i></font> <button onclick=musicchange()  class=m_off>Off</button>";	
			}
			else{
				music_play=true;
				document.getElementById("mdd").innerHTML="<font color=#abdf32><i class='fa fa-music'></i></font> <button onclick=musicchange()  class=m_on>On</button>";
			}
		}
		
		sound_play = true;
	
		function soundchange(){

			if(sound_play==true)
			{
				document.getElementById("sdd").innerHTML="<font color=#abdf32><i class='fa fa-volume-off'></i></font> <button onclick=soundchange()  class=m_off>Off</button>";
				sound_play=false;
			}
			else{
				document.getElementById("sdd").innerHTML="<font color=#abdf32><i class='fa fa-volume-up'></i></font> <button onclick=soundchange()  class=m_on>On</button>";
				sound_play=true;
			}
		}
		
		var zoom = 100;
		
		function plus(){
			zoom+=5;
			document.getElementById("game").style.zoom=zoom+"%";
		}
	
		function minus(){
			zoom-=5;
			document.getElementById("game").style.zoom=zoom+"%";
		}
	
		var player = "<img src='ship.png' width=96px height=32px/>";
		var position = 0;
	
		var left = false;
		var right = false;
		var shoot = false;
		var shoot_time = 0;
		
		var pause = false;
		var start = 4;
		var speed = 25;
		
		var enter = false;
	
		var bullet = "<img src='bullet.png' width=32px height=32px/>";
		var asteroid = "<img src='asteroid.png' width=32px height=32px/>";
		var live =  "<img src='live.png' width=32px height=32px/>";
		var bonus = "<img src='coin.png' width=32px height=32px/>";
		var none = "<img src='null.png' width=32px height=32px/>";
	
		//---------------------------------------------KLAWISZE
	
		window.addEventListener('keydown', function(event) {
		switch (event.keyCode) {
			case 37: 
			  left = true;
			  right = false;
			break;
			
			case 39:
				right = true;
				left = false;
			break;
		  }
		}, false);
		
		window.addEventListener('keyup', function(event) {
		switch (event.keyCode) {
			case 37: 
			  left = false;
			break;
			
			case 39:
				right = false;
			break;
		  }
		}, false);
		
		window.addEventListener('keyup', function(event) {
		switch (event.keyCode) {
			case 32:
			if(start<=0)
			{
				if(shoot_time>=1)
				{
					shoot = true;
					shoot_time = 0;
				}
			}
			break;
			
			case 80:
			if(death==false)
				if(pause==false)
				{
					pause=true;
				}
				else
				{
					pause=false;
				}
			break;
		  
		  
			case 13:
				enter=true;
			break;
		  }
		}, false);
				
		function asteroid_object(y)
		{
			this.y = 0-y*2;
			this.x = Math.round(Math.random()*33)+1;
			this.type = Math.round(Math.random()*10);
		};
		
		function bullet_object()
		{
			this.y = -100;
			this.x = 100; 
		};
		
		
		var number_of_asteroids = 10;
		var asteroids = Array( number_of_asteroids);
		
		for(var i = 0; i!= number_of_asteroids; i++)
			asteroids[i] = new asteroid_object(i);
		
		var number_of_bullets = 15;
			var bullets = Array( number_of_bullets);
		
		for(var i = 0; i!= number_of_bullets; i++)
			bullets[i]= new bullet_object();
		
		//---------------------------------------------GŁÓWNA PĘTLA
		
		var lives = 3;
		var score = 0;
		var death = false;
		
		var next_time=0;
		
		function start(){
			music();
			sound();
			loop();
		}
		
		var cookies = false;
		
		function loop()
		{
		
			if(cookies==false){
				//music_play=document.cookie.m;
				
				if(music_play==false)
					document.getElementById("mdd").innerHTML="<font color=#abdf32><i class='fa fa-music'></i></font> <button onclick=musicchange()  class=m_off>Wył.</button>";	
				else
					document.getElementById("mdd").innerHTML="<font color=#abdf32><i class='fa fa-music'></i></font> <button onclick=musicchange()  class=m_on>Wł.</button>";
				
				cookies=true;
			}
		
		
			if(music_play==false)
			{	
				x.pause();
			}
			else
			{
				x.play();
			}

			if(pause==false&&end==false)
			{
				if(lives<=0)
					death=true;
			
				background();

				if(death==false)
				{
				
				if(shoot_time<1)
					shoot_time+=0.3;
					
				if(next_time>0)
					next_time--;
				else
					next_time=0;
				
				if(enter==true)
				if(start>0)
					start-=0.06;
				else
				{

				}
				
				if(right==true&&position<27)
					position++;
				
				if(left==true&&position>0)
					position--;
				
				if(shoot==true)
					for(var i = 0; i!= number_of_bullets; i++)
						if(bullets[i].y<0)
						{
							bullets[i].x = position+1;
							bullets[i].y = 16;
							shoot = false;
							break;
						}
						else
							shoot = false;
				
				for(var i = 0; i!= number_of_bullets; i++)
					if(bullets[i].y<0)
					{
						bullets[i].y=-100;
					}
					
				for(var i = 0; i!= number_of_asteroids; i++)
				if(asteroids[i].y>17)
				{
					asteroids[i].y = 0;
					asteroids[i].x = Math.round(Math.random()*33)+1;
				}
				
				for(var i = 0; i!= number_of_asteroids; i++)
				if(asteroids[i].x==position||asteroids[i].x==position+1||asteroids[i].x==position+2)
				if(asteroids[i].y==16)
				{
					asteroids[i].y = 0;
					asteroids[i].x = Math.round(Math.random()*33)+1;
					
					var snd;
					
					snd = new Audio("sounds/live.wav"); 
					
					if(asteroids[i].type==6)
					{
						lives++
						snd = new Audio("sounds/live.wav"); 
					}
					else
				
						if(asteroids[i].type==4){ 
							score+=200;
							snd = new Audio("sounds/bonus.wav"); 
					}
					else
					{
					
						if(next_time==0)
						{
							lives--;
							if(lives>0)
								snd = new Audio("sounds/crash.wav"); 
							else
								snd = new Audio("sounds/death.wav"); 
								
							next_time = 40;
						}
						else
							snd=null;
					}
					
						
					asteroids[i].type = Math.round(Math.random()*10);	
					
					if(snd!=null&&sound_play==true)
					snd.play();
				}
				
				for(var l=0; l!=18; l++)
				{
					var line = "";
					for(var i=0; i!=30; i++)
					{

						if(l==16&&i==position)
						{
							if(next_time%4==0||next_time<=0)
								line+=player;
							else
							{
									line+=none+""+none+""+none;
							}
						}
						
						else if(l!=16||!(l==16&&(i==position+1||i==position+2)))
						{	
							if((i==bullets[0].x&&l==bullets[0].y)
							||(i==bullets[1].x&&l==bullets[1].y)
							||(i==bullets[2].x&&l==bullets[2].y)
							||(i==bullets[3].x&&l==bullets[3].y)
							||(i==bullets[4].x&&l==bullets[4].y)
							||(i==bullets[5].x&&l==bullets[5].y)
							||(i==bullets[6].x&&l==bullets[6].y)
							||(i==bullets[7].x&&l==bullets[7].y)
							||(i==bullets[8].x&&l==bullets[8].y)
							||(i==bullets[9].x&&l==bullets[9].y)
							||(i==bullets[10].x&&l==bullets[10].y)
							||(i==bullets[11].x&&l==bullets[11].y)
							||(i==bullets[12].x&&l==bullets[12].y)
							||(i==bullets[13].x&&l==bullets[13].y)
							||(i==bullets[14].x&&l==bullets[14].y))
								line+=bullet;
							else
							
							if((i==asteroids[0].x&&l==asteroids[0].y&&asteroids[0].type==4)
							||(i==asteroids[1].x&&l==asteroids[1].y&&asteroids[1].type==4)
							||(i==asteroids[2].x&&l==asteroids[2].y&&asteroids[2].type==4)
							||(i==asteroids[3].x&&l==asteroids[3].y&&asteroids[3].type==4)
							||(i==asteroids[4].x&&l==asteroids[4].y&&asteroids[4].type==4)
							||(i==asteroids[5].x&&l==asteroids[5].y&&asteroids[5].type==4)
							||(i==asteroids[6].x&&l==asteroids[6].y&&asteroids[6].type==4)
							||(i==asteroids[7].x&&l==asteroids[7].y&&asteroids[7].type==4)
							||(i==asteroids[8].x&&l==asteroids[8].y&&asteroids[8].type==4)
							||(i==asteroids[9].x&&l==asteroids[9].y&&asteroids[9].type==4))
							{	
								if(start<=0)
									line+=bonus;
							}
							else
							
							if((i==asteroids[0].x&&l==asteroids[0].y&&asteroids[0].type==6)
							||(i==asteroids[1].x&&l==asteroids[1].y&&asteroids[1].type==6)
							||(i==asteroids[2].x&&l==asteroids[2].y&&asteroids[2].type==6)
							||(i==asteroids[3].x&&l==asteroids[3].y&&asteroids[3].type==6)
							||(i==asteroids[4].x&&l==asteroids[4].y&&asteroids[4].type==6)
							||(i==asteroids[5].x&&l==asteroids[5].y&&asteroids[5].type==6)
							||(i==asteroids[6].x&&l==asteroids[6].y&&asteroids[6].type==6)
							||(i==asteroids[7].x&&l==asteroids[7].y&&asteroids[7].type==6)
							||(i==asteroids[8].x&&l==asteroids[8].y&&asteroids[8].type==6)
							||(i==asteroids[9].x&&l==asteroids[9].y&&asteroids[9].type==6))
							{	
								if(start<=0)
									line+=live;
							}
							else
							
							if((i==asteroids[0].x&&l==asteroids[0].y)
							||(i==asteroids[1].x&&l==asteroids[1].y)
							||(i==asteroids[2].x&&l==asteroids[2].y)
							||(i==asteroids[3].x&&l==asteroids[3].y)
							||(i==asteroids[4].x&&l==asteroids[4].y)
							||(i==asteroids[5].x&&l==asteroids[5].y)
							||(i==asteroids[6].x&&l==asteroids[6].y)
							||(i==asteroids[7].x&&l==asteroids[7].y)
							||(i==asteroids[8].x&&l==asteroids[8].y)
							||(i==asteroids[9].x&&l==asteroids[9].y))
							{
								if(start<=0)
									line+=asteroid;
							}
							else
							{
								line+=none;
							}
						}			
					}
					
					if(l==8 || l == 10)
					{
						if(start>0)
							line="";
					}

					if(l==9){
					if(enter==true)
					{
						if(start>0)
						line = "<table><tr><td>Warning!<br><font color=#dd0070>"+Math.round(start)+"</font></td></tr></table>";
					}	
					else
						line = "<table><tr><td><font size=20px>Wciśnij <font color=#dd0070>ENTER</font></font><br><font>Jeżeli okno gry jest za duże, użyj przycików <font color=#abdf32>ZOOM</font></font></font></td></tr></table>";
					}
					document.getElementById(l).innerHTML=line;
				}
			
				if(start<=0)
				{
					for(var i = 0; i!= number_of_asteroids; i++)
						asteroids[i].y++;
					
					for(var i = 0; i!= number_of_bullets; i++)
						bullets[i].y--;
				}
				
				for(var j = 0; j!= number_of_bullets; j++)
				for(var i = 0; i!= number_of_asteroids; i++)
				if(asteroids[i].x==bullets[j].x&&(asteroids[i].y==bullets[j].y||asteroids[i].y==bullets[j].y+1))
				{
					
					asteroids[i].x = -200;
					
					bullets[j].x = 100;
				}

				document.getElementById("info").innerHTML="&nbsp;<font color=#dd0070>♥</font>"+lives+"&nbsp;&nbsp;&nbsp;<font color=#dd0070>Wynik</font>:<font color=#abdf32>"+score+"</font>";
			}
				else
				{
				
					for(var l=0; l!=18; l++)
					{
										line = none;
					
						if(l!=8&&l!=10)
						{
	
						}
						else{
							line = "";
						}
					document.getElementById(l).innerHTML=line;
					}
					
					document.getElementById(9).innerHTML="<table><tr><td>KONIEC GRY<font color=#dd0070>!</font><br><form>Podaj nick<br><input type=text></imput><input type=submit value=Zapisz></input></form></td></tr></table>";
					end=true;
				}
			}
			

			setTimeout(loop, 1/speed*1000);
		}
		
		//---------------------------------------------TŁO

		var end = false;
		var bg_time = 0;
	
		function background()
		{
			bg_time += 0.5;
		
			if(bg_time>=1)
			{
				bg_time=0;
				
				if(start<=0)
					score+=1;
			}
		}