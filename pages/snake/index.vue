<template>
  <div class="snake-wrapper">
    <UButton size="xl" class="back-button" @click="goBack">Back</UButton>
    <div>
      <div class="score-wrapper">
        <span id="score" class="score">0</span>
        <div class="best-score-wrapper">Best: <span id="best-score">0</span></div>
      </div>
      <canvas id="canvas" height="504" width="504"/>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount } from 'vue';
import { Board } from '~/utils/snake/board.js'
import { Vector } from '~/utils/snake/vector.js'
import { Food }   from '~/utils/snake/food.js'
import { Snake }  from '~/utils/snake/snake.js'
import { directionMap } from '~/utils/snake/directions_map.js'
import { Score }  from '~/utils/snake/score.js'

definePageMeta({
  auth: false,
})

const router = useRouter();

const goBack = () => {
  router.push('/tools');
};

const { onLoaded } = useScriptNpm({
  packageName: 'js-confetti',
  file: 'dist/js-confetti.browser.js',
  version: '0.12.0',
  scriptOptions: {
    use() {
      return { JSConfetti: window.JSConfetti }
    },
  },
})

let interval = null;

onBeforeUnmount(() => {
  if (interval !== null) {
    clearInterval(interval);
  }
});

onLoaded(({ JSConfetti }) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const frameRate = 125;
  const board = new Board(canvas);
  const snakeStartLength = 3;
  const jsConfetti = new JSConfetti();

  let snake = newSnake();
  let food = new Food(new Vector(0, 0));
  let score = newScore(snake.body.length);
  const bestScore = new Score(
    document.getElementById('best-score'),
    localStorage.getItem('bestScore') ?? score.score
  );
  if (bestScore.score > score.score) {
    document
      .getElementsByClassName('best-score-wrapper')[0]
      .classList.add('is-visible');
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
    if (score.score > bestScore.score) {
      bestScore.set(score.score);
      localStorage.setItem('bestScore', bestScore.score);
      document
        .getElementsByClassName('best-score-wrapper')[0]
        .classList.add('is-visible');
    }
    resetGame();
  }

  function getPoint() {
    snake.grow(food.worth);
    score.increase(food.worth);
    if (score.score % 5 === 0) {
      jsConfetti.addConfetti({
        confettiNumber: score.score * 2,
      });
    }
    if (food.hasConfetti) {
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
        Math.floor(canvas.height / 2)
      ),
      directionMap.right
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
        freeSpots[`${x},${y}`] = { x, y };
      }
    }

    snake.body.forEach((segment) => {
      delete freeSpots[`${segment.position.x},${segment.position.y}`];
    });

    const freeSpotsList = Object.values(freeSpots);
    if (freeSpotsList.length) {
      const freeSpot =
        freeSpotsList[Math.floor(Math.random() * freeSpotsList.length)];
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
    return (
      snake.checkWallCollision(canvas.width, canvas.height) ||
      snake.checkSelfCollision()
    );
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
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Madimi+One&display=swap');

.snake-wrapper {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #614f4b;
  user-select: none;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
}

#canvas {
  border: 21px solid #4da1c4;
}

.score-wrapper {
  text-align: center;
  position: relative;
}

.score {
  font-family: 'Madimi One', sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 48px;
  color: #fef3e8;
  margin: 0;
  padding: 0;
}

.best-score-wrapper {
  display: none;
  position: absolute;
  right: 0;
  bottom: 7px;
  font-family: 'Madimi One', sans-serif;
  font-weight: 800;
  font-style: normal;
  font-size: 24px;
  color: #cbc2b9;
}

.best-score-wrapper.is-visible {
  display: block;
}
</style>

