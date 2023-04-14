//gridgame.js
    const gridSize = 32;
    const tileSize = 32;
    const colors = ['red', 'blue', 'green', 'yellow'];
    let player, elements, goals, walls, gameOver;
    let explodedCells = [];
    
    let projectiles = [];
    let redirectionBoxes = [];
    let bombs = [];
    
    function createProjectile(x, y, dx, dy) {
      return {
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        collidedWithBox: false,
      };
    }
    
      
    function setup() {
        createCanvas(gridSize * tileSize + tileSize * 4, gridSize * tileSize);
    
    
        
        elements = colors.flatMap(c => ([
    
    ]));
    goals = colors.flatMap(c => ([
    
    ]));
    class Key {
        constructor(x, y, color, isDoor) {
          this.x = x;
          this.y = y;
          this.color = color;
          this.isDoor = isDoor;
        }
      
        draw() {
          push();
          translate(this.x * tileSize + tileSize / 2, this.y * tileSize + tileSize / 2);
          if (this.isDoor) {
            fill(this.color);
            rect(-tileSize / 2, -tileSize / 2, tileSize, tileSize);
            fill(0);
            textSize(tileSize / 2);
            textAlign(CENTER, CENTER);
            text('K', 0, 0);
          } else {
            fill(0);
            rect(-tileSize / 2, -tileSize / 2, tileSize, tileSize);
            fill(this.color);
            textSize(tileSize / 2);
            textAlign(CENTER, CENTER);
            text('K', 0, 0);
          }
          pop();
        }
      }
      
    class Bomb {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    
      draw() {
        push();
        translate(this.x * tileSize + tileSize / 2, this.y * tileSize + tileSize / 2);
        fill(155, 140, 155);
        rect(-tileSize / 2, -tileSize / 2, tileSize, tileSize);
        textSize(tileSize / 2);
        textAlign(CENTER, CENTER);
        fill(0);
        text('Bmb', 0, 0);
        pop();
      }
    }
    
    class RedirectionBox {
      constructor(x, y, color, rotation) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.rotation = rotation;
      }
    
      redirectProjectile(projectile) {
        this.moveProjectileToCenter(projectile);
    
    
        this.rotateProjectile(projectile, this.rotation);
    }
      moveProjectileToCenter(projectile) {
        projectile.x = this.x * tileSize + tileSize / 2;
        projectile.y = this.y * tileSize + tileSize / 2;
      }
    
      rotateProjectile(projectile) {
        const dx = projectile.dx;
        const dy = projectile.dy;
        const newDirection = radians(this.rotation);
        const speedMultiplier = 4; // Adjust this value to change the projectile speed
        projectile.dx = Math.cos(newDirection) * speedMultiplier;
        projectile.dy = Math.sin(newDirection) * speedMultiplier;
    }
    
    
    
    draw() {
        push();
        translate(this.x * tileSize + tileSize / 2, this.y * tileSize + tileSize / 2);
        rotate(radians(this.rotation));
        fill(this.color);
        rect(-tileSize / 2, -tileSize / 2, tileSize, tileSize);
        textSize(tileSize);
        fill(0);
        text('>', -tileSize / 4, -tileSize / 4);
        pop();
      }
    
    }
    
    player = {x: 23, y: 21, inventory: {}, moves: 0};
    
    walls = [

        {x: 0, y: 1, color: 'red'},
        {x: 1, y: 1, color: 'red'},
        {x: 2, y: 1, color: 'red'},
        {x: 3, y: 1, color: 'red'},
        {x: 4, y: 1, color: 'red'},
        {x: 5, y: 1, color: 'red'},
        {x: 1, y: 2, color: 'orange'},
        {x: 3, y: 2, color: 'orange'},
        {x: 2, y: 2, color: 'orange'},
        {x: 4, y: 2, color: 'orange'},
        {x: 5, y: 2, color: 'orange'},
        {x: 5, y: 3, color: 'orange'},
        {x: 4, y: 3, color: 'orange'},
        {x: 3, y: 3, color: 'orange'},
        {x: 2, y: 4, color: 'orange'},
        {x: 3, y: 4, color: 'orange'},
        {x: 1, y: 4, color: 'orange'},
        {x: 1, y: 3, color: 'gray'},
        {x: 2, y: 3, color: 'white'},
        {x: 4, y: 4, color: 'orange'},
        {x: 5, y: 4, color: 'orange'},
        {x: 5, y: 5, color: 'orange'},
        {x: 4, y: 5, color: 'orange'},
        {x: 3, y: 5, color: 'orange'},
        {x: 3, y: 6, color: 'orange'},
        {x: 4, y: 6, color: 'orange'},
        {x: 5, y: 6, color: 'orange'},
        {x: 4, y: 7, color: 'orange'},
        {x: 3, y: 7, color: 'orange'},
        {x: 2, y: 6, color: 'orange'},
        {x: 2, y: 7, color: 'orange'},
        {x: 1, y: 7, color: 'orange'},
        {x: 1, y: 6, color: 'orange'},
        {x: 1, y: 8, color: 'purple'},
        {x: 2, y: 8, color: 'purple'},
        {x: 3, y: 8, color: 'purple'},
        {x: 4, y: 8, color: 'purple'},
        {x: 1, y: 9, color: 'purple'},
        {x: 3, y: 9, color: 'purple'},
        {x: 2, y: 9, color: 'purple'},
        {x: 2, y: 10, color: 'purple'},
        {x: 1, y: 10, color: 'purple'},
        {x: 2, y: 11, color: 'purple'},
        {x: 3, y: 10, color: 'purple'},
        {x: 4, y: 10, color: 'purple'},
        {x: 3, y: 11, color: 'purple'},
        {x: 4, y: 11, color: 'purple'},
        {x: 1, y: 11, color: 'purple'},
        {x: 4, y: 9, color: 'purple'},
        {x: 3, y: 12, color: 'purple'},
        {x: 3, y: 13, color: 'purple'},
        {x: 3, y: 14, color: 'purple'},
        {x: 3, y: 15, color: 'purple'},
        {x: 2, y: 15, color: 'purple'},
        {x: 1, y: 15, color: 'purple'},
        {x: 13, y: 6, color: 'gray'},
        {x: 12, y: 5, color: 'gray'},
        {x: 11, y: 4, color: 'gray'},
        {x: 12, y: 4, color: 'gray'},
        {x: 13, y: 4, color: 'gray'},
        {x: 14, y: 4, color: 'gray'},
        {x: 15, y: 5, color: 'gray'},
        {x: 15, y: 6, color: 'gray'},
        {x: 16, y: 6, color: 'gray'},
        {x: 17, y: 6, color: 'gray'},
        {x: 18, y: 6, color: 'gray'},
        {x: 19, y: 5, color: 'gray'},
        {x: 19, y: 6, color: 'gray'},
        {x: 20, y: 4, color: 'gray'},
        {x: 21, y: 4, color: 'gray'},
        {x: 22, y: 4, color: 'gray'},
        {x: 23, y: 4, color: 'gray'},
        {x: 22, y: 5, color: 'gray'},
        {x: 21, y: 6, color: 'gray'},
        {x: 21, y: 7, color: 'gray'},
        {x: 20, y: 8, color: 'gray'},
        {x: 19, y: 8, color: 'gray'},
        {x: 17, y: 8, color: 'gray'},
        {x: 14, y: 7, color: 'gray'},
        {x: 14, y: 8, color: 'gray'},
        {x: 18, y: 10, color: 'gray'},
        {x: 19, y: 9, color: 'gray'},
        {x: 19, y: 10, color: 'gray'},
        {x: 19, y: 11, color: 'gray'},
        {x: 18, y: 11, color: 'gray'},
        {x: 17, y: 11, color: 'gray'},
        {x: 16, y: 11, color: 'gray'},
        {x: 14, y: 11, color: 'gray'},
        {x: 15, y: 11, color: 'gray'},
        {x: 14, y: 10, color: 'gray'},
        {x: 14, y: 9, color: 'gray'},
        {x: 17, y: 12, color: 'gray'},
        {x: 17, y: 13, color: 'gray'},
        {x: 17, y: 14, color: 'gray'},
        {x: 16, y: 14, color: 'gray'},
        {x: 14, y: 14, color: 'gray'},
        {x: 12, y: 14, color: 'gray'},
        {x: 11, y: 14, color: 'gray'},
        {x: 9, y: 14, color: 'gray'},
        {x: 9, y: 13, color: 'gray'},
        {x: 9, y: 12, color: 'gray'},
        {x: 10, y: 12, color: 'gray'},
        {x: 11, y: 12, color: 'gray'},
        {x: 12, y: 12, color: 'gray'},
        {x: 13, y: 12, color: 'gray'},
        {x: 9, y: 15, color: 'gray'},
        {x: 10, y: 16, color: 'gray'},
        {x: 9, y: 16, color: 'gray'},
        {x: 11, y: 15, color: 'gray'},
        {x: 13, y: 15, color: 'gray'},
        {x: 15, y: 15, color: 'gray'},
        {x: 12, y: 16, color: 'gray'},
        {x: 11, y: 17, color: 'gray'},
        {x: 11, y: 16, color: 'gray'},
        {x: 13, y: 16, color: 'gray'},
        {x: 14, y: 16, color: 'gray'},
        {x: 15, y: 16, color: 'gray'},
        {x: 9, y: 11, color: 'gray'},
        {x: 9, y: 10, color: 'gray'},
        {x: 9, y: 9, color: 'gray'},
        {x: 10, y: 8, color: 'gray'},
        {x: 11, y: 7, color: 'gray'},
        {x: 10, y: 6, color: 'gray'},
        {x: 9, y: 7, color: 'gray'},
        {x: 8, y: 8, color: 'gray'},
        {x: 7, y: 9, color: 'gray'},
        {x: 7, y: 10, color: 'gray'},
        {x: 7, y: 11, color: 'gray'},
        {x: 7, y: 12, color: 'gray'},
        {x: 8, y: 13, color: 'gray'},
        {x: 16, y: 16, color: 'gray'},
        {x: 17, y: 15, color: 'gray'},
        {x: 16, y: 21, color: 'gray'},
        {x: 19, y: 21, color: 'gray'},
        {x: 15, y: 19, color: 'gray'},
        {x: 16, y: 19, color: 'gray'},
        {x: 17, y: 19, color: 'gray'},
        {x: 18, y: 19, color: 'gray'},
        {x: 19, y: 19, color: 'gray'},
        {x: 20, y: 19, color: 'gray'},
        {x: 21, y: 19, color: 'gray'},
        {x: 21, y: 20, color: 'gray'},
        {x: 21, y: 21, color: 'gray'},
        {x: 21, y: 22, color: 'gray'},
        {x: 21, y: 23, color: 'gray'},
        {x: 21, y: 24, color: 'gray'},
        {x: 21, y: 25, color: 'gray'},
        {x: 20, y: 25, color: 'gray'},
        {x: 19, y: 25, color: 'gray'},
        {x: 17, y: 25, color: 'gray'},
        {x: 17, y: 23, color: 'gray'},
        {x: 16, y: 25, color: 'gray'},
        {x: 15, y: 25, color: 'gray'},
        {x: 15, y: 24, color: 'gray'},
        {x: 15, y: 23, color: 'gray'},
        {x: 15, y: 22, color: 'gray'},
        {x: 15, y: 21, color: 'gray'},
        {x: 15, y: 20, color: 'gray'},
        {x: 17, y: 26, color: 'gray'},
        {x: 17, y: 27, color: 'gray'},
        {x: 19, y: 26, color: 'gray'},
        {x: 19, y: 27, color: 'gray'},
        {x: 16, y: 28, color: 'gray'},
        {x: 15, y: 28, color: 'gray'},
        {x: 14, y: 28, color: 'gray'},
        {x: 14, y: 29, color: 'gray'},
        {x: 14, y: 30, color: 'gray'},
        {x: 14, y: 31, color: 'gray'},
        {x: 16, y: 30, color: 'gray'},
        {x: 16, y: 31, color: 'gray'},
        {x: 20, y: 28, color: 'gray'},
        {x: 21, y: 28, color: 'gray'},
        {x: 22, y: 28, color: 'gray'},
        {x: 22, y: 29, color: 'gray'},
        {x: 22, y: 30, color: 'gray'},
        {x: 22, y: 31, color: 'gray'},
        {x: 20, y: 30, color: 'gray'},
        {x: 20, y: 31, color: 'gray'},
        {x: 24, y: 17, color: 'gray'},
        {x: 22, y: 12, color: 'gray'},
        {x: 23, y: 12, color: 'gray'},
        {x: 24, y: 12, color: 'gray'},
        {x: 24, y: 13, color: 'gray'},
        {x: 24, y: 14, color: 'gray'},
        {x: 24, y: 15, color: 'gray'},
        
    ];
    elements = [
      {x: 8, y: 9, color: 'yellow'},
      {x: 15, y: 13, color: 'red'},
      {x: 12, y: 19, color: 'green'},
      {x: 12, y: 20, color: 'blue'},
    ];
    goals = [
      {x: 7, y: 15, color: 'yellow'},
      {x: 8, y: 11, color: 'red'},
      {x: 18, y: 26, color: 'green'},
      {x: 18, y: 27, color: 'blue'},
    ];
    
    redirectionBoxes = [
        new RedirectionBox(25, 10, 'rgba(255, 155, 75, 84)', 180), // Add color and rotation parameters
        new RedirectionBox(20, 10, 'rgba(255, 155, 75, 84)', 90), // Add color and rotation parameters
        new RedirectionBox(20, 15, 'rgba(255, 155, 75, 84)', 0), // Add color and rotation parameters
        new RedirectionBox(25, 15, 'rgba(255, 155, 75, 84)', 270), // Add color and rotation parameters
        new RedirectionBox(29, 18, 'rgba(255, 155, 75, 84)', 270), // Add color and rotation parameters
        new RedirectionBox(32, 18, 'rgba(255, 155, 75, 84)', 270), // Add color and rotation parameters
        new RedirectionBox(29, 20, 'rgba(255, 155, 75, 84)', 270), // Add color and rotation parameters
        new RedirectionBox(32, 20, 'rgba(255, 155, 75, 84)', 270), // Add color and rotation parameters
        new RedirectionBox(29, 22, 'rgba(255, 155, 75, 84)', 270), // Add color and rotation parameters
        new RedirectionBox(32, 22, 'rgba(255, 155, 75, 84)', 270), // Add color and rotation parameters
    
    
      
    
      // Add more redirection boxes as needed
    ];

    keys = [
        new Key(10, 4, 'yellow', 0),

        new Key(10, 3, 'red', 0),
        new Key(21, 3, 'yellow', 1),
        new Key(21, 2, 'red', 1),
        // Add more keys as needed
      ];
      

      bombs.push(new Bomb(2, 27));
      bombs.push(new Bomb(4, 27));
      bombs.push(new Bomb(2, 25));
      bombs.push(new Bomb(4, 25));
      bombs.push(new Bomb(22, 27));
      bombs.push(new Bomb(24, 27));
      bombs.push(new Bomb(22, 25));
      bombs.push(new Bomb(24, 25));
      bombs.push(new Bomb(27, 27));
      bombs.push(new Bomb(29, 27));
      bombs.push(new Bomb(27, 25));
      bombs.push(new Bomb(29, 25));
  
      bombs.push(new Bomb(2, 32));
      bombs.push(new Bomb(4, 32));
      bombs.push(new Bomb(2, 30));
      bombs.push(new Bomb(4, 30));
      bombs.push(new Bomb(22, 32));
      bombs.push(new Bomb(24, 32));
      bombs.push(new Bomb(22, 30));
      bombs.push(new Bomb(24, 30));
      bombs.push(new Bomb(27, 32));
      bombs.push(new Bomb(29, 32));
      bombs.push(new Bomb(27, 30));
      bombs.push(new Bomb(29, 30));
    
    
    }
    
    function drawGameStats() {
        textAlign(LEFT, TOP);
        textSize(16);
        noStroke();
        fill(128);
        text(`Moves = ${player.moves}`, 0, 0);
    }
    
    function drawProjectiles() {
      fill('red');
      projectiles.forEach(p => {
        rect(p.x, p.y, tileSize / 4, tileSize / 4);
        p.x += p.dx;
        p.y += p.dy;
    
        // Optional: Remove projectiles when they are off the canvas
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          const idx = projectiles.indexOf(p);
          if (idx !== -1) {
            projectiles.splice(idx, 1);
          } 
        }
      });
    }
    
    function updateProjectiles() {
      projectiles.forEach(p => {
        if (!p.collidedWithBox) {
          redirectionBoxes.forEach(box => {
            if (
              p.x + tileSize / 4 > box.x * tileSize &&
              p.x < (box.x + 1) * tileSize &&
              p.y + tileSize / 4 > box.y * tileSize &&
              p.y < (box.y + 1) * tileSize
            ) {
              box.redirectProjectile(p);
              p.collidedWithBox = true;
              p.lastBox = box;
            }
          });
          
          bombs.forEach(bomb => {
      if (
        p.x + tileSize / 4 > bomb.x * tileSize &&
        p.x < (bomb.x + 1) * tileSize &&
        p.y + tileSize / 4 > bomb.y * tileSize &&
        p.y < (bomb.y + 1) * tileSize
      ) {
        // Clear surrounding boxes
        for (let x = bomb.x - 1; x <= bomb.x + 1; x++) {
          for (let y = bomb.y - 1; y <= bomb.y + 1; y++) {
            const keyIndex = keys.findIndex((key) => key.x === x && key.y === y);
            if (keyIndex !== -1) {
              keys.splice(keyIndex, 1);
            }
            // Remove redirection boxes
            const boxIndex = redirectionBoxes.findIndex(box => box.x === x && box.y === y);
            if (boxIndex !== -1) {
              redirectionBoxes.splice(boxIndex, 1);
            }
    
            // Remove walls
            const wallIndex = walls.findIndex(w => w.x === x && w.y === y);
            if (wallIndex !== -1) {
              walls.splice(wallIndex, 1);
            }
    
            // Remove elements
            const elementIndex = elements.findIndex(e => e.x === x && e.y === y);
            if (elementIndex !== -1) {
              elements.splice(elementIndex, 1);
            }
    
            // Remove goals
            const goalIndex = goals.findIndex(g => g.x === x && g.y === y);
            if (goalIndex !== -1) {
              goals.splice(goalIndex, 1);
            }
    
            // Check if the player is in range and remove them if needed
            if (player.x === x && player.y === y) {
              // Remove the player or handle game over logic
              // For example, you can set a variable gameOver to true
              gameOver = true;
            }
          }
        }
    
        const bombIndex = bombs.findIndex(b => b.x === bomb.x && b.y === bomb.y);
    if (bombIndex !== -1) {
      bombs.splice(bombIndex, 1);
      // Add exploded cells to the array
      for (let x = bomb.x - 1; x <= bomb.x + 1; x++) {
        for (let y = bomb.y - 1; y <= bomb.y + 1; y++) {
          explodedCells.push({ x, y });
        }
      }
    }
      }
    });
    
    
          walls.forEach(w => {
            if (
              p.x + tileSize / 4 > w.x * tileSize &&
              p.x < (w.x + 1) * tileSize &&
              p.y + tileSize / 4 > w.y * tileSize &&
              p.y < (w.y + 1) * tileSize
            ) {
              // reverse the direction of the projectile
              p.dx = -p.dx;
              p.dy = -p.dy;
            }
          });
    
        } else {
          const distanceX = Math.abs(p.x - p.lastBox.x * tileSize);
          const distanceY = Math.abs(p.y - p.lastBox.y * tileSize);
          const minDistance = tileSize - 0.1;
    
          if (distanceX > (minDistance) || distanceY > (minDistance)) {
            p.collidedWithBox = false;
          }
        }
      });
    }
    
    
    function drawExplodedCells() {
      strokeWeight(0.5);
      stroke(255, 0, 0);
    
      explodedCells.forEach(cell => {
        const x = cell.x * tileSize;
        const y = cell.y * tileSize;
    
        line(x, y, x + tileSize, y + tileSize);
        line(x + tileSize, y, x, y + tileSize);
      });
    }
    
    
    function draw() {
        background(0);
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                noFill();
                rect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
        drawProjectiles();
        updateProjectiles();
        drawExplodedCells();
        keys.forEach((key) => {
            key.draw();
          });
        redirectionBoxes.forEach((box) => {
        fill(255, 0, 0);
        box.draw(this);
      });
        elements.forEach(e => {
            drawGradient(e.x * tileSize + tileSize / 2, e.y * tileSize + tileSize / 2, e.color);
        });
        bombs.forEach((bomb) => {
      bomb.draw();
    });
    
        goals.forEach(g => {
            drawGoal(g.x * tileSize + tileSize / 2, g.y * tileSize + tileSize / 2, g.color);
        });
        if (draggingBox) {
        draggingBox.x = player.x;
        draggingBox.y = player.y;
      }
      if (gameOver) {
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(255);
      text('Game Over', width / 2, height / 2);
      noLoop(); // Stop the draw loop
    }
    
        drawWalls();
    
        noStroke();
        fill(200, 150, 255, 128);
        rect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
        fill(0);
    textSize(tileSize/2);
    text('P', player.x * tileSize + tileSize / 4, player.y * tileSize + tileSize / 4);
        drawInventory();
        drawGameStats();
    }
    
    function drawGradient(x, y, col) {
        const radius = tileSize / 2;
        for (let r = radius; r > 0; r--) {
            let clr = color(col);
            clr.setAlpha(map(r, 0, radius, 0, 255));
            fill(clr);
            noStroke();
            ellipse(x, y, r * 2);
        }
    }
    
    function drawGoal(x, y, col) {
        noFill();
        stroke(col);
        strokeWeight(3);
        ellipse(x, y, tileSize - 4);
        strokeWeight(1);
    }
    
    function drawInventory() {
        textAlign(LEFT, TOP);
        textSize(16);
        noStroke();
        fill(128);
        for (let i = 0; i < colors.length; i++) {
            const c = colors[i];
            const count = player.inventory[c] || 0;
            text(`${c.charAt(0).toUpperCase() + c.slice(1)} circles = ${count}`, gridSize * tileSize, i * 20);
        }
    }
    let draggingBox = null;
    
    function keyPressed() {
        let moved = false;
        let newX = player.x;
        let newY = player.y;
        if (keyCode === UP_ARROW) newY--;
        if (keyCode === DOWN_ARROW) newY++;
        if (keyCode === LEFT_ARROW) newX--;
        if (keyCode === RIGHT_ARROW) newX++;
      if (['q', 'w', 'e', 'a', 'z', 'x', 'd', 'c'].includes(key.toLowerCase())) {
        fireProjectile(key.toLowerCase());
      }
      if (key === 'r') {
            const overlappingBox = redirectionBoxes.find(box => {
                return player.x === box.x && player.y === box.y;
            });
            if (overlappingBox) {
                overlappingBox.rotation += 90;
                if (overlappingBox.rotation === 360) {
                    overlappingBox.rotation = 0;
                }
            }
        }

    if (key === 'S' || key === 's') {
        if (!draggingBox) {
            const overlappingBox = redirectionBoxes.find(box => {
                return player.x === box.x && player.y === box.y;
              });
              const overlappingBomb = bombs.find(bomb => {
                return player.x === bomb.x && player.y === bomb.y;
              });
              if (overlappingBox) {
                draggingBox = overlappingBox;    }
                if (overlappingBomb) {
                draggingBox = overlappingBomb;    }
          const overlappingKey = keys.find((key) => !key.isDoor && player.x === key.x && player.y === key.y);
          if (overlappingKey) {
            draggingBox = overlappingKey;
          }
        } else {
          draggingBox = null;
        }
      }
      const wallIdx = walls.findIndex((w) => w.x === newX && w.y === newY);
      const doorIdx = keys.findIndex((key) => key.isDoor && key.x === newX && key.y === newY);
    
      if (wallIdx === -1 && (doorIdx === -1 || (draggingBox && keys[doorIdx].color === draggingBox.color))) {
        moved = true;
        player.x = newX;
        player.y = newY;
      }
    
        if (moved) player.moves++;
    
        const idx = elements.findIndex(e => e.x === player.x && e.y === player.y);
        if (idx !== -1) {
            const c = elements[idx].color;
            player.inventory[c] = (player.inventory[c] || 0) + 1;
            elements.splice(idx, 1);
        }
    
        const goalIdx = goals.findIndex(g => g.x === player.x && g.y === player.y && player.inventory[g.color] > 0);
        if (goalIdx !== -1) {
            const c = goals[goalIdx].color;
            player.inventory[c]--;
    
            goals.splice(goalIdx, 1);
    
            if (goals.length === 0) {
                alert('Level completed!');
                window.location.href = "l002.html";

            }
        }
    
        colors.forEach(c => {
            if (player.inventory[c] > 0) {
                walls.push({ x: player.x, y: player.y, color: c });
            }
        });
    }
    
    function fireProjectile(direction) {
      const speed = 4;
      let dx = 0;
      let dy = 0;
    
      switch (direction) {
        case 'q':
          dx = -speed;
          dy = -speed;
          break;
        case 'w':
          dy = -speed;
          break;
        case 'e':
          dx = speed;
          dy = -speed;
          break;
        case 'a':
          dx = -speed;
          break;
        case 'z':
          dx = -speed;
          dy = speed;
          break;
        case 'x':
          dy = speed;
          break;
        case 'd':
          dx = speed;
          break;
        case 'c':
        dx = speed;
      dy = speed;
          break;
        default:
          return;
      }
    
      const projectile = {
        x: player.x * tileSize + tileSize / 2,
        y: player.y * tileSize + tileSize / 2,
        dx: dx,
        dy: dy,
      };
    
      projectiles.push(projectile);
    }
    
    function drawWalls() {
        walls.forEach(w => {
            fill(w.color);
            rect(w.x * tileSize, w.y * tileSize, tileSize, tileSize);
            stroke(0);
            strokeWeight(2);
            line(w.x * tileSize, w.y * tileSize, (w.x + 1) * tileSize, (w.y + 1) * tileSize);
            line((w.x + 1) * tileSize, w.y * tileSize, w.x * tileSize, (w.y + 1) * tileSize);
            strokeWeight(1);
        });
    }
//end of gridgame.js