let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#new-btn");
let undoBtn = document.querySelector("#undo-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let turnCount = 0;
let moveHistory = [];

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    turnCount = 0;
    moveHistory = [];
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && msgContainer.classList.contains("hide")) {
            if (turnO) {
                box.innerText = "O";
            } else {
                box.innerText = "X";
            }
            box.disabled = true;
            moveHistory.push({ index, symbol: box.innerText });
            turnCount++;
            checkWinner();
            turnO = !turnO;
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const isDraw = () => {
    return turnCount === 9;
};

const highlightWinningPattern = (pattern) => {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#4CAF50";
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            highlightWinningPattern(pattern);
            return;
        }
    }

    if (isDraw()) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        setTimeout(() => {
            resetGame();
        }, 2000);
    }
};

const undoMove = () => {
    if (moveHistory.length > 0) {
        const lastMove = moveHistory.pop();
        const { index, symbol } = lastMove;
        boxes[index].innerText = "";
        boxes[index].disabled = false;
        turnCount--;
        turnO = (symbol === "X");
        msgContainer.classList.add("hide");
    }
};

undoBtn.addEventListener("click", undoMove);
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

boxes.forEach(box => {
    box.addEventListener("mouseover", () => {
        box.style.backgroundColor = "#f0e68c";
    });
    box.addEventListener("mouseout", () => {
        box.style.backgroundColor = "#ffffc7";
    });
});
