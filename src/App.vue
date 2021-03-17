<template>
    <div class="container">
        <div class="game-panel">
            <div
                v-for="col in 1089"
                :key="col"
                :class="{
                    'col-item': true,
                    snake: isSnake(col),
                    food: food === col,
                    'snake-head': isHead(col)
                }"
            ></div>
        </div>
        <div class="source-wrap">得分： {{ snakeBody.length - 1 }}</div>
        <div class="operation">
            <div class="operation-item operation-top-down" @click="changeDirection('TOP')">UP</div>
            <div class="operation-left-right-col">
                <div class="operation-item" @click="changeDirection('LEFT')">LEFT</div>
                <div class="operation-item" @click="changeDirection('RIGHT')">RIGHT</div>
            </div>
            <div class="operation-item operation-top-down" @click="changeDirection('DOWN')">
                DOWN
            </div>
        </div>
        <div v-if="gameover" class="game-over">
            <span class="game-over-text">GAME OVER</span>
            <br />
            <span class="restart" @click="restart">Restart</span>
        </div>
    </div>
</template>

<script lang="ts">
// 在这里写JS/TS代码（逻辑）
import { defineComponent } from 'vue';
import _ from 'underscore';

export default defineComponent({
    name: 'App',
    data() {
        const intId: NodeJS.Timeout = setInterval(() => {}, 1000);
        return {
            snakeBody: [1],
            food: 0,
            direction: 'RIGHT',
            gameover: false,
            speed: 400,
            intId
        };
    },
    watch: {
        snakeBody: 'checkRule'
    },
    created() {
        this.init();
    },
    mounted() {
        document.onkeydown = (event) => {
            this.keyUp(event);
        };
    },
    methods: {
        checkRule() {
            let uniqBady = _.uniq(this.snakeBody);
            if (uniqBady.length !== this.snakeBody.length) {
                this.stop();
            } else {
                switch (uniqBady.length) {
                    case 3:
                        this.changeSpeed(300);
                        break;
                    case 6:
                        this.changeSpeed(200);
                        break;
                    case 10:
                        this.changeSpeed(100);
                        break;
                    case 20:
                        this.changeSpeed(50);
                        break;
                    default:
                        break;
                }
            }
        },
        changeSpeed(speed: number) {
            clearInterval(this.intId);
            this.speed = speed;
            this.move();
        },
        restart() {
            this.snakeBody = [1];
            this.direction = 'RIGHT';
            this.gameover = false;
            this.speed = 400;
            this.init();
        },
        stop() {
            clearInterval(this.intId);
            this.gameover = true;
        },
        isSnake(col: number) {
            return _.indexOf(this.snakeBody, col) > -1;
        },
        isHead(col: number) {
            return _.last(this.snakeBody) === col;
        },
        changeDirection(direction: string) {
            this.direction = direction;
        },
        touch(event: { clientY: number; clientX: number }) {
            if (event.clientY < 168) {
                this.direction = 'TOP';
            } else if (event.clientY > 328 && event.clientY < 488) {
                this.direction = 'DOWN';
            } else if (event.clientX > window.innerWidth / 2) {
                this.direction = 'RIGHT';
            } else if (event.clientX < window.innerWidth / 2) {
                this.direction = 'LEFT';
            }
        },
        move() {
            this.intId = setInterval(() => {
                const last: number | undefined = _.last(this.snakeBody);
                let newBody = [];
                if (last === undefined) {
                    newBody = this.snakeBody;
                } else if (last === this.food) {
                    newBody = this.snakeBody;
                    this.food = _.random(1, 1089);
                } else {
                    newBody = _.rest(this.snakeBody);
                }
                if (last === undefined) {
                    newBody = this.snakeBody;
                } else if (last > 1089) {
                    newBody.push(last - 1089);
                } else if (last < 1) {
                    newBody.push(1089 + last);
                } else {
                    switch (this.direction) {
                        case 'LEFT':
                            newBody.push(last - 1);
                            break;
                        case 'TOP':
                            newBody.push(last - 33);
                            break;
                        case 'RIGHT':
                            newBody.push(last + 1);
                            break;
                        case 'DOWN':
                            newBody.push(last + 33);
                            break;
                        default:
                            newBody.push(last + 1);
                            break;
                    }
                }
                this.snakeBody = newBody;
            }, this.speed);
        },
        keyUp(event: KeyboardEvent) {
            if (event.code === '0xE04B') {
                this.direction = 'LEFT';
            } else if (event.code === '0xE048') {
                this.direction = 'TOP';
            } else if (event.code === '0xE04D') {
                this.direction = 'RIGHT';
            } else if (event.code === '0xE050') {
                this.direction = 'DOWN';
            }
        },
        init() {
            this.food = _.random(1, 1089);
            this.move();
        }
    }
});
</script>

<style>
/* 在这里写样式 */
.game-panel {
    position: relative;
    width: 330px;
    height: 330px;
    overflow: visible;
    line-height: 0;
    margin: auto;
    background-color: #6d6d6d;
}

.col-item {
    background: #a5a5a5;
    width: 10px;
    height: 10px;
    display: inline-block;
}

.snake {
    background-color: #800000;
}

.snake-head {
    background-color: rgb(9, 255, 0);
}

.food {
    background-color: rgb(112, 255, 255);
}

.operation {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 150px;
    height: 190px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.operation-left-right-col {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.operation-item {
    border: 1px solid;
    width: 50%;
    border-radius: 30px;
}
.operation-top-down {
    width: 40px;
    height: 70px;
    line-height: 70px;
}
.game-over {
    position: fixed;
    top: 190px;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
}
.game-over-text {
    font-size: 20px;
}
.restart {
    font-size: 15px;
    color: red;
}
.source-wrap {
    padding-left: 50px;
}
</style>
