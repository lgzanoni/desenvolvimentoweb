var numSquares = 10;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var lives = 3;
var livesDisplay = document.getElementById("livesDisplay");
var isGameActive = true;

init();

function init() {
    setupModeButtons();
    setupSquares();
    showAllColors();
    reset();
}

function updateLivesDisplay() {
    livesDisplay.textContent = "Vidas: " + lives;
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            reset();
        });
    }
}

function resetVidas() {
    lives = 3;

}


function showAllColors() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            if (!isGameActive) {
                return;
            }
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Acertou!";
                resetButton.textContent = "Jogar novamente?";
                changeColor(clickedColor);
                h1.style.backgroundColor = clickedColor
                document.body.style.backgroundColor = clickedColor;
                lives = 3;
            } else {
                this.style.backgroundColor = "#232323";
                lives--;
                if (lives > 0) {
                    messageDisplay.textContent = "Errou! " + lives + " vidas restantes.";
                } else {
                    document.body.style.backgroundColor = pickedColor
                    messageDisplay.textContent = "Sem vidas! A cor secreta era esta!";
                    resetButton.textContent = "Tentar novamente?";
                    showAllColors();
                    isGameActive = false;
                    lives = 3;
                }
                if (lives <= 0) {
                    if (squares[i].style.backgroundColor === pickedColor) {
                        squares[i].style.opacity = "1"; // Aumentar a opacidade para destacar
                        squares[i].style.border = "3px solid white"; // Adicionar uma borda para destacar
                        messageDisplay.textContent = "Game Over! A cor correta era esta!";
                    } else {
                        squares[i].style.opacity = "0.3"; // Diminuir a opacidade das outras esferas
                    }
                }
            }
        });
    }
}
function reset() {
    colors = generateRandomColors(numSquares);
    lives = 3;
    isGameActive = true;
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "Novas cores";
    messageDisplay.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        h1.style.backgroundColor = "steelblue"
        document.body.style.backgroundColor = "#232323";
    }
}

resetButton.addEventListener("click", function () {
    reset();
})

function changeColor(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i <= num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}