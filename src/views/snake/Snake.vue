<template>
  <div>
    <div class="score-wrapper">
      <span class="score" id="score">0</span>
      <div class="best-score-wrapper">
        Best: <span id="best-score">0</span>
      </div>
    </div>
    <canvas id="canvas" width="504" height="504"></canvas>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted} from "vue";
import {Board} from './src/board.js';
import {Vector} from "./src/vector";
import {Food} from "./src/food";
import {Snake} from "./src/snake";
import {directionMap} from "./src/directions_map";
import {Score} from "./src/score";
import JSConfetti from 'js-confetti';

let interval = null;

onBeforeUnmount(() => {
  if (interval !== null) {
    clearInterval(interval);
  }
})

onMounted(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const frameRate = 125;
    const board = new Board(canvas);
    const snakeStartLength = 3;
    const jsConfetti = new JSConfetti();

    let snake = newSnake();
    let food = new Food(new Vector(0, 0));
    let score = newScore(snake.body.length);
    let bestScore = new Score(document.getElementById('best-score'), localStorage.getItem("bestScore") ?? score.score);
    if (bestScore.score > score.score) {
      document.getElementsByClassName('best-score-wrapper')[0].classList.add('is-visible');
    }

    function resetGame() {
      snake = newSnake();
      score = newScore(snake.body.length);
      placeRandomFood();
    }

    function deadSnake() {
      jsConfetti.addConfetti({
        emojis: ['😭', '😵', '😵‍💫'],
        confettiNumber: 14,
      });
      if(score.score > bestScore.score) {
        bestScore.set(score.score);
        localStorage.setItem('bestScore', bestScore.score);
        document.getElementsByClassName('best-score-wrapper')[0].classList.add('is-visible');
      }
      resetGame();
    }

    function getPoint() {
      snake.grow(food.worth);
      score.increase(food.worth);
      if (score.score % 5 === 0) {
        jsConfetti.addConfetti({
          confettiNumber: score.score*2,
        });
      }
      if(food.hasConfetti) {
        food.playConfetti(jsConfetti);
      }
      placeRandomFood();
    }

    function newScore(score) {
      return new Score(document.getElementById('score'), score);
    }

    function newSnake() {
      return new Snake(
          snakeStartLength,
          new Vector(
              Math.floor(canvas.width * 0.25),
              Math.floor(canvas.height / 2),
          ),
          directionMap.right,
      );
    }

    function moveSnake() {
      if (snake.checkFoodCollision(food)) {
        getPoint();
      }
      snake.move();
    }

    function placeRandomFood() {
      const freeSpots = {};
      for (let x = 0; x < canvas.width; x += Board.tileSize) {
        for (let y = 0; y < canvas.height; y += Board.tileSize) {
          freeSpots[`${x},${y}`] = {x, y};
        }
      }

      snake.body.forEach(segment => {
        delete freeSpots[`${segment.position.x},${segment.position.y}`];
      });

      const freeSpotsList = Object.values(freeSpots);
      if (freeSpotsList.length) {
        const freeSpot = freeSpotsList[Math.floor(Math.random() * freeSpotsList.length)];
        food = new Food(new Vector(freeSpot.x, freeSpot.y));
      }
    }

    function handleKeyDown(event) {
      switch (event.keyCode) {
        case 37: // ←
        case 65: // a
          snake.appendMove(directionMap.left);
          break;
        case 38: // ↑
        case 87: // w
          snake.appendMove(directionMap.up);
          break;
        case 39: // →
        case 68: // d
          snake.appendMove(directionMap.right);
          break;
        case 40: // ↓
        case 83: // s
          snake.appendMove(directionMap.down);
          break;
      }
    }

    function checkCollisions() {
      return snake.checkWallCollision(canvas.width, canvas.height) || snake.checkSelfCollision();
    }

    function renderScene() {
      board.draw(context);
      food.draw(context);
      snake.draw(context);
    }

    function processGameLogic() {
      moveSnake();
      if (checkCollisions()) {
        deadSnake();
      }
    }

    function mainLoop() {
      interval = setInterval(function () {
        processGameLogic();
        renderScene();
      }, frameRate);
    }

    function init() {
      document.addEventListener('keydown', handleKeyDown);
      resetGame();
      mainLoop();
    }

  init();
})
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Madimi+One&display=swap');

*, *::before, *::after {
  user-select: none;
}

:global(body) {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #614f4b;
}

#canvas {
  border: 21px solid #4da1c4;
}

.score-wrapper {
  text-align: center;
  position: relative;
}

.score {
  font-family: "Madimi One", sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 48px;
  color: #FEF3E8;
  margin: 0;
  padding: 0;
}

.best-score-wrapper {
  display: none;
  position: absolute;
  right: 0;
  bottom: 7px;
  font-family: "Madimi One", sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 24px;
  color: #cbc2b9;
}

.best-score-wrapper.is-visible {
  display: block;
}

</style>
