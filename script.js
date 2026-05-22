
const matriksBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


const container = document.querySelector(".container");
const pesan = document.getElementById("pesan");
const button = document.getElementsByTagName("button")[0];
const modal = document.querySelector(".modal");
console.log(modal);
const skor1 = document.getElementById("skor1");
const skor2 = document.getElementById("skor2");

let pilihanPlayer = [];
let isRunning = true;
let skorX = 0;
let skorO = 0;
const player = "X";
const computer = "O";


drawGame();

function removeElemenMatriks() {
    for (let i = 0; i < matriksBoard.length; i++) {
        for (let j = 0; j < matriksBoard[i].length; j++) {
            document.getElementById(`box${i}${j}`).innerText = "";
            document.getElementById(`box${i}${j}`).style.color = "black";
            document.getElementById(`box${i}${j}`).style.backgroundColor = "white";
            matriksBoard[i][j] = null;
        }
    }
}


function changeBackgroundColorIfTied() {
    for (let i = 0; i < matriksBoard.length; i++) {
        for (let j = 0; j < matriksBoard[i].length; j++) {
            document.getElementById(`box${i}${j}`).style.color = "#2f3542";
            document.getElementById(`box${i}${j}`).style.backgroundColor = "#dfe4ea";
        }
    }
}

function drawBox() {
    for (let i = 0; i < matriksBoard.length; i++) {
        for (let j = 0; j < matriksBoard[i].length; j++) {
            const box = `<div class="box "id="box${i}${j}"></div>`;
            container.innerHTML += box;
        }
    }
}

function handleClickButton() {
    removeElemenMatriks();
    pilihanPlayer = [];
    isRunning = true;
    pesan.innerText = "";
    modal.style.display="none";
}

function initalizeSkor(skorX, skorO) {
    skor1.innerText = skorX;
    skor2.innerText = skorO;
}

button.addEventListener("click", handleClickButton);

function drawGame() {
    drawBox();
    initalizeSkor(skorX, skorO);
    for (let i = 0; i < matriksBoard.length; i++) {
        for (let j = 0; j < matriksBoard[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.addEventListener("click", function () {
                if (!isRunning) return;
                if (matriksBoard[i][j] != null) return;
                matriksBoard[i][j] = player;
                box.innerText = player;

                pilihanPlayer.push(`${i}${j}`);

                console.log(pilihanPlayer);

                // setelah player jalan, check siapa yang menang
                if (checkWinner(matriksBoard, player, computer)) {
                    modal.style.display="flex";
                    isRunning = false;
                    return;
                }
                if (checkSeri(matriksBoard, player, computer)) {
                    pesan.innerText = "Seri, main lagi yaaa😊";
                    modal.style.display ="flex";
                    changeBackgroundColorIfTied();
                    isRunning = false;
                    return;
                }

                handleComputer(matriksBoard);

                // setelah komputer jalan, check lgi
                if (checkWinner(matriksBoard, player, computer)) {
                    modal.style.display ="flex";
                    isRunning = false;
                    return;
                }
                if (checkSeri(matriksBoard, player, computer)) {
                    pesan.innerText = "Seri, main lagi yaaa😊";
                    modal.style.display ="flex";
                    changeBackgroundColorIfTied();
                    isRunning = false;
                    return;
                }
            });
        }
    }
}

function handleComputer(matriksBoard) {
    let iRandom = Math.floor(Math.random() * 3);
    let jRandom = Math.floor(Math.random() * 3);

    let isSearching = pilihanPlayer.length === 9;

    while (true) {
        if (isSearching) break;
        let pilihanComputer = `${iRandom}${jRandom}`;
        if (!pilihanPlayer.includes(pilihanComputer)) {
            document.getElementById("box" + pilihanComputer).innerText = computer;
            matriksBoard[iRandom][jRandom] = computer;
            pilihanPlayer.push(pilihanComputer);
            break;
        }
        iRandom = Math.floor(Math.random() * 3);
        jRandom = Math.floor(Math.random() * 3);
    }
}

function gantiWarnaElement(index1, index2, index3, winner) {
    let color = winner === player ? "green" : "red";
    const box = document.getElementById(`box${index1}`);
    const box2 = document.getElementById(`box${index2}`);
    const box3 = document.getElementById(`box${index3}`);

    box.style.backgroundColor = color;
    box.style.color = "white";

    box2.style.backgroundColor = color;
    box2.style.color = "white";

    box3.style.backgroundColor = color;
    box3.style.color = "white";
}


function checkWinner2(matriksBoard, player, computer){
    let array_win = [];
    for(let i = 0; i < matriksBoard.length; i++){
        for(let j = 0; j < matriksBoard[i].length; j++){
            array_win.push(matriksBoard[i][j]);
        }
        
    }
}

// masih bisa diperbarui dan diganti algoritmanya
function checkWinner(matriksBoard, player, computer) {
    const horizontal1 = (matriksBoard[0][0] != null) && (matriksBoard[0][0] === matriksBoard[0][1]) && (matriksBoard[0][1] === matriksBoard[0][2]);
    const horizontal2 = (matriksBoard[1][0] != null) && (matriksBoard[1][0] === matriksBoard[1][1]) && (matriksBoard[1][1] === matriksBoard[1][2]);
    const horizontal3 = (matriksBoard[2][0] != null) && (matriksBoard[2][0] === matriksBoard[2][1]) && (matriksBoard[2][1] === matriksBoard[2][2]);

    const vertikal1 = (matriksBoard[0][0] != null) && (matriksBoard[0][0] === matriksBoard[1][0]) && (matriksBoard[1][0] === matriksBoard[2][0]);
    const vertikal2 = (matriksBoard[0][1] != null) && (matriksBoard[0][1] === matriksBoard[1][1]) && (matriksBoard[1][1] === matriksBoard[2][1]);
    const vertikal3 = (matriksBoard[0][2] != null) && (matriksBoard[0][2] === matriksBoard[1][2]) && (matriksBoard[1][2] === matriksBoard[2][2]);

    const diagonal1 = (matriksBoard[0][0] != null) && (matriksBoard[0][0] === matriksBoard[1][1]) && (matriksBoard[1][1] === matriksBoard[2][2]);
    const diagonal2 = (matriksBoard[0][2] != null) && (matriksBoard[0][2] === matriksBoard[1][1]) && (matriksBoard[1][1] === matriksBoard[2][0]);

    let winner = null;

    if (horizontal1) {
        winner = matriksBoard[0][0] === player ? player : computer;
        if (matriksBoard[0][0] === player) {
            skorX++;
        } else {
            skorO++;
        }
        initalizeSkor(skorX, skorO);
        pesan.innerText = matriksBoard[0][0] === player ? player + " win" : computer + " win";
        gantiWarnaElement("00", "01", "02", winner);
        return true;
    }
    if (horizontal2) {

        winner = matriksBoard[1][0] === player ? player : computer;
        if (matriksBoard[1][0] === player) {
            skorX++;
        } else {
            skorO++;
        }
        initalizeSkor(skorX, skorO);
        pesan.innerText = matriksBoard[1][0] === player ? player + " win" : computer + " win";
        gantiWarnaElement("10", "11", "12", winner);
        return true;
    }
    if (horizontal3) {
        winner = matriksBoard[2][0] === player ? player : computer;
        if (matriksBoard[2][0] === player) {
            skorX++;
        } else {
            skorO++;
        }
        initalizeSkor(skorX, skorO);
        pesan.innerText = matriksBoard[2][0] === player ? player + " win" : computer + " win";
        gantiWarnaElement("20", "21", "22", winner);
        return true;
    }

    if (vertikal1) {
        winner = matriksBoard[0][0] === player ? player : computer;
        if (matriksBoard[0][0] === player) {
            skorX++;
        } else {
            skorO++;
        }
        initalizeSkor(skorX, skorO);
        pesan.innerText = matriksBoard[0][0] === player ? player + " win" : computer + " win";
        gantiWarnaElement("00", "10", "20", winner);
        return true;
    }
    if (vertikal2) {
        winner = matriksBoard[0][1] === player ? player : computer;
        if (matriksBoard[0][1] === player) {
            skorX++;
        } else {
            skorO++;
        }
        initalizeSkor(skorX, skorO);
        pesan.innerText = matriksBoard[0][1] === player ? player + " win" : computer + " win";
        gantiWarnaElement("01", "11", "21", winner);
        return true;
    }
    if (vertikal3) {
        winner = matriksBoard[0][2] === player ? player : computer;
        if (matriksBoard[0][2] === player) {
            skorX++;
        } else {
            skorO++;
        }
        initalizeSkor(skorX, skorO);
        pesan.innerText = matriksBoard[0][2] === player ? player + " win" : computer + " win";
        gantiWarnaElement("02", "12", "22", winner);
        return true;
    }

    if (diagonal1) {
        winner = matriksBoard[0][0] === player ? player : computer;
        if (matriksBoard[0][0] === player) {
            skorX++;
        } else {
            skorO++;
        }
        initalizeSkor(skorX, skorO);
        pesan.innerText = matriksBoard[0][0] === player ? player + " win" : computer + " win";
        gantiWarnaElement("00", "11", "22", winner);
        return true;

    }
    if (diagonal2) {
        winner = matriksBoard[0][2] === player ? player : computer;
        if (matriksBoard[0][2] === player) {
            skorX++;
        } else {
            skorO++;
        }
        initalizeSkor(skorX, skorO);
        pesan.innerText = matriksBoard[0][2] === player ? player + " win" : computer + " win";
        gantiWarnaElement("02", "11", "20", winner);
        return true;
    }
    return false;
}


function checkSeri(matriksBoard, player, computer) {
    return pilihanPlayer.length === 9 && !checkWinner(matriksBoard, player, computer);
}