let iconos = [];
        let selecciones = [];
        let cont;
        let body = document.querySelector('body');
        let nuevoJuego = document.getElementById("nuevoJuego");
        let subirVolumen = document.getElementById("volumen+");
        let bajarVolumen = document.getElementById("volumen-");
        let rangoVolumen = document.getElementById("rangoVolumen");
        const clickSound = new Audio('./audio/click.mp3');
        const exitoSound = new Audio('./audio/yeaaa.mp3');
        const winSound = new Audio('./audio/win.mp3');
        const startSound = new Audio('./audio/mario-kart-start.mp3');
        const gameSound = new Audio('./audio/kart-mario.mp3');
        
        

        rangoVolumen.onchange = () => {
            gameSound.volume = rangoVolumen.value / 100;
        };

        function cargarIconos() {
            nuevoJuego.innerHTML = "NEW GAME";
            iconos = [
                './img/1.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/6.jpg',
                './img/7.jpg',
                './img/8.jpg',
                './img/9.jpg',
                './img/10.jpg',
                './img/11.jpg',
                './img/12.jpg'
            ];
        }

        function generarTablero() {
            
            gameSound.pause();
                gameSound.currentTime = 0;
            startSound.play();
            setTimeout(function () {
                gameSound.volume = 0.2;
                gameSound.loop = true;
                gameSound.play();
                
            }, 3100); 
            cont =0;
           
            winSound.pause();
            winSound.currentTime = 0;
            body.style.animation = null;
            cargarIconos();
            let tablero = document.getElementById("tablero");
            let tarjetas = [];
            for (let i = 0; i < 24; i++) {
                tarjetas.push(`
                    <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                        <div class="tarjeta" id="tarjeta${i}">
                            <div class="cara trasera" id="trasera${i}">
                                <img src="${iconos[0]}"></img>
                            </div>
                            <div class="cara superior">
                            </div>
                        </div>
                    </div>
                `);
                if (i % 2 == 1) {
                    iconos.splice(0, 1);
                }
            }
            tarjetas.sort(() => Math.random() - 0.5);
            tablero.innerHTML = tarjetas.join('');
            
        }



        function seleccionarTarjeta(i) {
            clickSound.play();
            let tarjeta = document.getElementById("tarjeta" + i);
            if (tarjeta.style.transform != "rotateY(180deg)") {
                tarjeta.style.transform = "rotateY(180deg)";
                selecciones.push(i);
            }
            if (selecciones.length == 2) {
                deseleccionar(selecciones);
                selecciones = [];
            }
        }

        function deseleccionar(selecciones) {
            setTimeout(() => {
                let trasera1 = document.getElementById("trasera" + selecciones[0]);
                let trasera2 = document.getElementById("trasera" + selecciones[1]);

                if (trasera1.innerHTML != trasera2.innerHTML) {
                    let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
                    let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
                    tarjeta1.style.transform = "rotateY(0deg)";
                    tarjeta2.style.transform = "rotateY(0deg)";
                } else {
                    cont++;
                    if (cont == 12) {
                        gameSound.pause();
                        gameSound.currentTime = 0;
                        winSound.play();
                        body.style.animation = 'colores 1s infinite alternate';
                        
                    } else {
                        exitoSound.play();
                        trasera1.style.background = "plum";
                        trasera2.style.background = "plum";

                    }
                }
            }, 500);
        }