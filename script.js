		let breakLength = 5;
		let sessionLength =25;
		let break_increment = document.getElementById("break-increment");
		let break_decrement = document.getElementById("break-decrement");
		let break_length = document.getElementById("break-length");
		let session_increment = document.getElementById("session-increment");
		let session_decrement = document.getElementById("session-decrement");
		let session_length = document.getElementById("session-length");
		let start_stop = document.getElementById("start_stop");
		let reset = document.getElementById("reset");
		let time_left = document.getElementById("time-left");
		let timer_label = document.getElementById("timer-label");
		timer_label.textContent="Session";
		let beep = document.getElementById("beep");

		function changeValue(e){
			let target = e.target;
			if(target.dataset.type==="Break"){
				if(target.dataset.change==="increment"){
					let length;
					length=breakLength+1;
					if(length<=60){
						breakLength=length;
						break_length.textContent = breakLength;
						setBreakMinutesSeconds();
					}
					
				}
				if(target.dataset.change==="decrement"){
					let length;
					length=breakLength-1;
					if(length>0){
						breakLength=length;
						break_length.textContent = breakLength;
						setBreakMinutesSeconds();
					}	
				}
			}
			if(target.dataset.type==="Session"){
				if(target.dataset.change==="increment"){
					let length;
					length=sessionLength+1;
					if(length<=60){
						sessionLength=length;
						session_length.textContent = sessionLength;
						setSessionMinutesSeconds();
					}
				}
				if(target.dataset.change==="decrement"){
					let length;
					length=sessionLength-1;
					if(length>0){
						sessionLength=length;
						session_length.textContent = sessionLength;
						setSessionMinutesSeconds();
					}
				}
			}
			
		}

		
		break_increment.addEventListener("click", changeValue);
		break_decrement.addEventListener("click", changeValue);
		session_increment.addEventListener("click", changeValue);
		session_decrement.addEventListener("click", changeValue);	


		let working = true;
		let t;
		let minutes;
		let seconds;
		let clear=false;
		time_left.innerHTML = `<h1>${sessionLength}:00</h1>`;

		function setBreakMinutesSeconds(){
			if(timer_label.textContent==="Break"){
				minutes=breakLength-1;
				seconds = 60;
				if(breakLength>0&&breakLength<10)
					time_left.innerHTML = `<h1>0${breakLength}:00</h1>`;
				else
					time_left.innerHTML = `<h1>${breakLength}:00</h1>`;

			}
		}
		function setSessionMinutesSeconds(){
			if(timer_label.textContent==="Session"){
				minutes=sessionLength-1;
				seconds = 60;
				if(sessionLength>0&&sessionLength<10)
					time_left.innerHTML = `<h1>0${sessionLength}:00</h1>`;
				else
					time_left.innerHTML = `<h1>${sessionLength}:00</h1>`;
			}
		}
		setSessionMinutesSeconds();

		function handleStartStop(){
			
			if(!clear){
				t = setInterval(decrementTimer,1000);
				clear=!clear;
				break_increment.removeEventListener("click", changeValue);
				break_decrement.removeEventListener("click", changeValue);
				session_increment.removeEventListener("click", changeValue);
				session_decrement.removeEventListener("click", changeValue);
			}
			else{
				clear=!clear;
				clearInterval(t);
				break_increment.addEventListener("click", changeValue);
				break_decrement.addEventListener("click", changeValue);
				session_increment.addEventListener("click", changeValue);
				session_decrement.addEventListener("click", changeValue);
			}

			function decrementTimer(){	
					console.log(minutes+":"+seconds);

					if(minutes===0&&seconds){
						seconds=seconds-1;
						if(seconds<10&&seconds>0){
							time_left.innerHTML = `<h1>0${minutes}:0${seconds}</h1>`;
						}
				
						else if(seconds>=10){
							time_left.innerHTML = `<h1>0${minutes}:${seconds}</h1>`;
						}
						else if(seconds===0){
								time_left.innerHTML = `<h1>0${minutes}:0${seconds}</h1>`;
								//minutes=4;
								//seconds=60;
								if(working){
									working=!working;
									
									beep.play();
									setTimeout(()=>{
										minutes=breakLength-1;
										seconds = 60;
										if(breakLength>0&&breakLength<10)
											time_left.innerHTML = `<h1>0${breakLength}:00</h1>`;
										else
											time_left.innerHTML = `<h1>${breakLength}:00</h1>`;
										timer_label.textContent = "Break";

									},1000);
									//minutes = breakLength-1;//break
									//seconds=59;
								}
								else{
									working=!working;
									beep.play();
									
									setTimeout(()=>{
										minutes=sessionLength-1;
										seconds = 60;
										if(sessionLength>0&&sessionLength<10)
											time_left.innerHTML = `<h1>0${sessionLength}:00</h1>`;
										else
											time_left.innerHTML = `<h1>${sessionLength}:00</h1>`;
										timer_label.textContent = "Session";
									},1000);
									
									//minutes=sessionLength-1;//working
									//seconds=59;
									
								
								}
								/*if(minutes>0&&minutes<10)
									time_left.innerHTML = `<h1>0${minutes}:${seconds}</h1>`;
								else
									time_left.innerHTML = `<h1>${minutes}:${seconds}</h1>`*/
						}
					}
					

				

					else if(minutes>0&&seconds){
							seconds=seconds-1;
							if(minutes<10&&(seconds>0&&seconds<10))
								time_left.innerHTML = `<h1>0${minutes}:0${seconds}</h1>`;
							else if(minutes<10&&seconds>=10)
								time_left.innerHTML = `<h1>0${minutes}:${seconds}</h1>`;
							else if(minutes>=10&&(seconds>0&&seconds<10))
								time_left.innerHTML = `<h1>${minutes}:0${seconds}</h1>`;
							else if(minutes>=10&&seconds>=10)
								time_left.innerHTML = `<h1>${minutes}:${seconds}</h1>`;

							else if((minutes>0&&minutes<10)&&seconds===0){
									time_left.innerHTML = `<h1>0${minutes}:0${seconds}</h1>`;
									minutes=minutes-1;
									seconds=60;
							}
							else if(minutes>=10&&seconds===0){
									time_left.innerHTML = `<h1>${minutes}:0${seconds}</h1>`;
									minutes=minutes-1;
									seconds=60;
							}

						
							
							/*if(minutes>0&&minutes<10)
								time_left.innerHTML = `<h1>0${minutes}:${seconds}</h1>`;
							else if(minutes===0)
								time_left.innerHTML = `<h1>0${minutes}:${seconds}</h1>`;
							else
								time_left.innerHTML = `<h1>${minutes}:${seconds}</h1>`;*/
					}
					/*	
					seconds=seconds-1;
					if(seconds===0){
						time_left.innerHTML = `<h1>${minutes}:${seconds}</h1>`;	
						if(minutes>0){
								minutes=minutes-1;
								seconds=59;
								time_left.innerHTML = `<h1>${minutes}:${seconds}</h1>`;
				
						}
						else if(minutes===0){	
							if(working){
								time_left.innerHTML = `<h1>${breakLength}:00</h1>`;
								working=!working;
								minutes = breakLength-1;//break
								seconds=59;
								timer_label.textContent = "break";
								
							}
							else{
								time_left.innerHTML = `<h1>${sessionLength}:00</h1>`;
								working=!working;
								minutes=sessionLength-1;//working
								seconds=59;
								timer_label.textContent = "session";
								
							}
						}
					}
					else
						time_left.innerHTML = `<h1>${minutes}:${seconds}</h1>`;
					*/

			}
			
		}
		function handleReset(){
			timer_label.textContent = "Session";
			breakLength = 5;
			sessionLength =25;
			/*time_left.innerHTML = `<h1>25:00</h1>`;
			minutes=sessionLength-1;//working
			seconds=59;
			timer_label.textContent = "session";*/
			setSessionMinutesSeconds();
			beep.pause();
			beep.currentTime = 0;

			clearInterval(t);
			clear=false;
			working = true;
			break_length.textContent=5;
			session_length.textContent=25;
			break_increment.addEventListener("click", changeValue);
			break_decrement.addEventListener("click", changeValue);
			session_increment.addEventListener("click", changeValue);
			session_decrement.addEventListener("click", changeValue);
		}


		start_stop.addEventListener("click",handleStartStop);
		reset.addEventListener("click",handleReset);	