export const MOCK_TASK_CONTENT: Record<number, string> = {
  1: `
# Create a New Dino Game

Here is a simple implementation of a Chrome-style Dino game using HTML5 Canvas and JavaScript.

## HTML Structure

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Dino Game</title>
    <style>
        body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f7f7f7; font-family: sans-serif; }
        canvas { border-bottom: 2px solid #535353; background: white; }
        #score { position: absolute; top: 20px; right: 20px; font-size: 20px; color: #535353; }
    </style>
</head>
<body>
    <div id="score">Score: 0</div>
    <canvas id="gameCanvas" width="800" height="200"></canvas>
    <script src="game.js"></script>
</body>
</html>
\`\`\`

## JavaScript Logic (game.js)

\`\`\`javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let dino = { x: 50, y: 150, width: 40, height: 40, dy: 0, jumpPower: -10, gravity: 0.5, grounded: false };
let obstacles = [];
let score = 0;
let gameSpeed = 5;
let frame = 0;

function drawDino() {
    ctx.fillStyle = '#535353';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function updateDino() {
    dino.dy += dino.gravity;
    dino.y += dino.dy;

    if (dino.y + dino.height > canvas.height) {
        dino.y = canvas.height - dino.height;
        dino.dy = 0;
        dino.grounded = true;
    } else {
        dino.grounded = false;
    }
}

function jump() {
    if (dino.grounded) {
        dino.dy = dino.jumpPower;
    }
}

function drawObstacles() {
    ctx.fillStyle = '#535353';
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function updateObstacles() {
    if (frame % 100 === 0) {
        obstacles.push({ x: canvas.width, y: 160, width: 20, height: 40 });
    }

    obstacles.forEach((obs, index) => {
        obs.x -= gameSpeed;
        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
            score++;
            scoreElement.innerText = 'Score: ' + score;
        }
        
        // Collision Detection
        if (
            dino.x < obs.x + obs.width &&
            dino.x + dino.width > obs.x &&
            dino.y < obs.y + obs.height &&
            dino.y + dino.height > obs.y
        ) {
            alert('Game Over! Score: ' + score);
            resetGame();
        }
    });
}

function resetGame() {
    dino.y = 150;
    dino.dy = 0;
    obstacles = [];
    score = 0;
    scoreElement.innerText = 'Score: 0';
    frame = 0;
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    updateDino();
    drawObstacles();
    updateObstacles();
    frame++;
    requestAnimationFrame(loop);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') jump();
});

loop();
\`\`\`

This code sets up a basic game loop, handles gravity and jumping, spawns obstacles, and detects collisions. You can expand on this by adding sprites, sounds, and increasing difficulty over time.
  `,
  2: `
# Xiaomi Stock Price Table (Last Month)

Here is the stock price data for Xiaomi Corporation (1810.HK) for the past month.

| Date       | Open (HKD) | High (HKD) | Low (HKD) | Close (HKD) | Volume (M) |
|------------|------------|------------|-----------|-------------|------------|
| 2024-02-14 | 12.80      | 13.00      | 12.70     | 12.90       | 45.2       |
| 2024-02-13 | 12.60      | 12.84      | 12.50     | 12.76       | 38.1       |
| 2024-02-09 | 12.40      | 12.60      | 12.30     | 12.50       | 32.5       |
| 2024-02-08 | 12.50      | 12.70      | 12.40     | 12.44       | 40.0       |
| 2024-02-07 | 12.30      | 12.50      | 12.20     | 12.48       | 35.6       |
| 2024-02-06 | 12.10      | 12.40      | 12.00     | 12.32       | 50.1       |
| 2024-02-05 | 12.00      | 12.20      | 11.90     | 12.04       | 42.3       |
| 2024-02-02 | 11.80      | 12.00      | 11.70     | 11.96       | 38.9       |
| 2024-02-01 | 11.90      | 12.10      | 11.80     | 11.88       | 30.2       |
| 2024-01-31 | 12.00      | 12.20      | 11.90     | 11.94       | 33.4       |

**Summary:**
- **Highest Price:** 13.00 HKD
- **Lowest Price:** 11.70 HKD
- **Average Volume:** ~38.6M

The stock has shown a slight upward trend in the first half of February.
  `,
  3: `
# Supply Chain Risk Analysis: Tesla

## Executive Summary

Tesla's supply chain is highly vertically integrated, which provides significant advantages in cost and speed but also exposes the company to specific risks. This analysis focuses on key vulnerabilities identified in the latest 10-Q filings and market reports.

## Key Risk Factors

### 1. Battery Material Sourcing
Tesla relies heavily on lithium, nickel, and cobalt.
*   **Risk:** Geopolitical instability in sourcing regions (e.g., DRC for cobalt) and price volatility.
*   **Mitigation:** Diversifying suppliers and investing in lithium refining.

### 2. Semiconductor Shortages
Like all automakers, Tesla is susceptible to global chip shortages.
*   **Impact:** Potential production delays.
*   **Status:** Tesla has managed this better than competitors by rewriting software to support alternative chips.

### 3. Logistics and Transportation
Global shipping disruptions (e.g., Red Sea crisis, Panama Canal drought).
*   **Impact:** Increased lead times for vehicle delivery to Europe and Asia.

## Recommendations

1.  **Increase Buffer Stock:** For critical electronic components.
2.  **Supplier Diversification:** Continue to qualify new suppliers for battery raw materials.
3.  **Localization:** Further localize supply chains near Gigafactories in Berlin and Shanghai to reduce reliance on trans-oceanic shipping.
  `,
  6: `
# 云知声港股招股书深度分析

## 1. 公司概况
云知声 (Unisound) 是一家领先的人工智能公司，专注于语音识别和自然语言处理技术。

## 2. 财务亮点
根据招股书披露的数据：
*   **营收增长：** 过去三年复合增长率 (CAGR) 达到 40% 以上。
*   **毛利率：** 保持在 30%-40% 区间，主要得益于高利润率的 AI 解决方案业务。
*   **研发投入：** 研发费用占营收比例较高，显示出公司对技术创新的重视。

## 3. 业务模式
主要分为三大板块：
1.  **智慧生活：** 智能家居、智能家电解决方案。
2.  **智慧医疗：** 语音电子病历、医疗质控系统。
3.  **智慧企业：** 智能客服、会议转写系统。

## 4. 风险因素
*   **竞争激烈：** 面临来自科大讯飞、百度等巨头的直接竞争。
*   **数据安全：** 随着监管趋严，数据隐私和安全合规成本可能上升。
*   **技术迭代：** AI 技术更新换代快，若不能持续保持技术领先，可能被市场淘汰。

## 5. 结论
云知声在垂直领域（特别是医疗和家居）具有较强的竞争壁垒。建议关注其在港股上市后的表现，特别是其在生成式 AI (LLM) 领域的布局落地情况。
  `
};

export const DEFAULT_TASK_CONTENT = `
# Task Details

This is a placeholder for task details. 

The content for this specific task has not been generated yet. In a real application, this would fetch the conversation history or the generated document associated with the task ID.

## What you can do:
- Go back to the dashboard.
- Create a new task.
- Select another task from the sidebar.
`;
