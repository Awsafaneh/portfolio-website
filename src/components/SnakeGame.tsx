import { useEffect, useRef, useState, useCallback } from "react";

export default function SnakeGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<number[][]>([[10, 10]]);
  const [food, setFood] = useState<number[]>([15, 15]);
  const [direction, setDirection] = useState<string>("right");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("snakeHighScore") || "0");
    }
    return 0;
  });
  const lastKeyPressed = useRef<string>(direction);
  const lastDirection = useRef<string>(direction);

  const isValidDirection = useCallback((newDir: string, currentDir: string) => {
    const opposites = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };
    return opposites[newDir as keyof typeof opposites] !== currentDir;
  }, []);

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection("right");
    setGameOver(false);
    setScore(0);
    lastKeyPressed.current = "right";
  };

  const renderGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 300, 300);

    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach(([x, y]) => {
      ctx.fillRect(x * 10, y * 10, 9, 9);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food[0] * 10, food[1] * 10, 9, 9);
  }, [snake, food]);

  const gameLoop = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = [...newSnake[0]];

    // Yön değiştirme kontrolü
    if (
      lastKeyPressed.current !== lastDirection.current &&
      isValidDirection(lastKeyPressed.current, lastDirection.current)
    ) {
      lastDirection.current = lastKeyPressed.current;
    }

    switch (lastDirection.current) {
      case "up":
        head[1] -= 1;
        break;
      case "down":
        head[1] += 1;
        break;
      case "left":
        head[0] -= 1;
        break;
      case "right":
        head[0] += 1;
        break;
    }

    // Collision check
    const hitWall = head[0] < 0 || head[0] >= 30 || head[1] < 0 || head[1] >= 30;
    const hitSelf = newSnake.some(
      (segment, i) => i !== 0 && segment[0] === head[0] && segment[1] === head[1]
    );

    if (hitWall || hitSelf) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head[0] === food[0] && head[1] === food[1]) {
      const newScore = score + 10;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("snakeHighScore", newScore.toString());
      }
      setFood([Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, food, gameOver, score, highScore, isValidDirection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "r" && gameOver) resetGame();

      // Prevent scrolling with arrow keys while game is open
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      const newDirection = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      }[e.key];

      if (newDirection) {
        lastKeyPressed.current = newDirection;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const gameInterval = setInterval(() => {
      gameLoop();
      renderGame();
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(gameInterval);
    };
  }, [gameLoop, onClose, gameOver, renderGame]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg">
        <div className="text-white mb-2 flex justify-between items-center">
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="border border-gray-600"
        />
        {gameOver && (
          <div className="text-white text-center mt-4">
            <div>Game Over!</div>
            <div className="text-sm text-gray-400 mt-1">
              Press &apos;R&apos; to restart
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
