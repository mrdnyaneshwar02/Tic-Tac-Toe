let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;  // True means "O" turn, false means "X" turn
let turnCount = 0;

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
    turnO = true;  // Reset to "O" start
    turnCount = 0;  // Reset the number of turns
    enableBoxes();  // Enable all boxes and clear their content
    msgContainer.classList.add("hide");  // Hide the winner message
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && msgContainer.classList.contains("hide")) {  // Only allow clicks if box is empty and no winner message is visible
            if (turnO) {
                box.innerText = "O";  // Player O's turn
            } else {
                box.innerText = "X";  // Player X's turn
            }
            box.disabled = true;  // Disable the clicked box

            turnCount++;  // Increment turn count
            checkWinner();  // Check if there's a winner or draw

            turnO = !turnO;  // Switch turns
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;  // Disable all boxes when game is over
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;  // Enable all boxes when a new game starts
        box.innerText = "";  // Clear text from all boxes
        box.style.backgroundColor = "";  // Reset the background color
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();  // Disable all boxes when there’s a winner
};

const isDraw = () => {
    return turnCount === 9;  // Check if all boxes are filled
};

const highlightWinningPattern = (pattern) => {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#4CAF50"; // Green color for winning boxes
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);  // Display the winner
            highlightWinningPattern(pattern);  // Highlight the winning pattern
            return;  // Exit the function when we find a winner
        }
    }

    if (isDraw()) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();  // Disable all boxes when it’s a draw
        setTimeout(() => {
            resetGame();  // Reset the game after a brief delay
        }, 2000);
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
