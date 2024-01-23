document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const boardSize = 20;
  let snake = [{ x: 10, y: 10 }];
  let food = generateFood();
  let direction = "right";

  function createBoard() {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
      }
    }
  }

  function drawSnake() {
    document.querySelectorAll(".snake").forEach((segment) => {
      segment.remove();
    });

    snake.forEach((segment) => {
      const index = segment.x + segment.y * boardSize;
      board.children[index].classList.add("snake");
    });
  }

  function drawFood() {
    const index = food.x + food.y * boardSize;
    board.children[index].classList.add("food");
  }

  function generateFood() {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    return { x, y };
  }

  function checkCollision() {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize
    ) {
      return true;
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    if (head.x === food.x && head.y === food.y) {
      snake.push({});
      food = generateFood();
      drawFood();
    }
    return false;
  }

  function update() {
    const head = Object.assign({}, snake[0]);

    switch (direction) {
      case "up":
        head.y -= 1;
        break;
      case "down":
        head.y += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "right":
        head.x += 1;
        break;
    }

    snake.unshift(head);
    if (!checkCollision()) {
      snake.pop();
      drawSnake();
    } else {
      alert("Game Over!");
      resetGame();
    }
  }

  function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    drawSnake();
    drawFood();
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  });

  createBoard();
  drawSnake();
  drawFood();

  setInterval(update, 200);
});
