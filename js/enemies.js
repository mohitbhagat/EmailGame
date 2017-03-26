var enemies = [];
var deleted = [];

var ENEMY_HEALTH = 3;

function createEnemy(x,y,sender,subject){
    enemies.push({
        x:x,
        y:y,
        sender:sender,
        subject:subject,
        killed:False,
        health:ENEMY_HEALTH,
    })
}

function updateEnemies(){
    if(enemy.killed){
        enemies.push([enemy.sender,enemy.subject])
        enemies.splice(i,1);
    }
    if(enemy.hit){
        enemy.health -= 1;
    }
    if(bullet.x ){
        
    }
}

