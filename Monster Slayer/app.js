function getRandomValue(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data()
    {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },

    watch: {
        playerHealth(value)
        {
            if (value <= 0 && this.monsterHealth <= 0)
            {
                this.winner = 'draw';
            } else if (value <= 0)
            {
                this.winner = 'monster';
            }
        },
        monsterHealth(value)
        {
            if (value <= 0 && this.playerHealth <= 0)
            {
                this.winner = 'draw';
            } else if (value <= 0)
            {
                this.winner = 'player';
            }
        }
    },

    computed: {
        monsterBarStyles()
        {
            if (this.monsterHealth < 0)
            {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles()
        {
            if (this.playerHealth < 0)
            {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack()
        {
            return this.currentRound % 3 !== 0;
        },
        mayUseHeal()
        {
            return this.playerHealth > 30;
        }
    },

    methods: {
        attackMonster()
        {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer()
        {
            const attackValue = getRandomValue(8, 15);
            this.addLogMessage('monster', 'attack', attackValue);
            this.playerHealth -= attackValue;
        },
        specialAttack()
        {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'special-attack', attackValue);
            this.attackPlayer();

        },
        healPlayer()
        {
            this.currentRound++;
            healValue = getRandomValue(8, 20);
            this.playerHealth += healValue;
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        startNewGame()
        {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender()
        {
            this.addLogMessage('player', 'surrender', 0);
            this.winner = 'monster';
        },
        addLogMessage(who, what, value)
        {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        },
        dangerZone(role)
        {
            switch (role)
            {
                case 'player':
                    return this.playerHealth < 30 ? 'danger-zone' : '';
                case 'monster':
                    return this.monsterHealth < 30 ? 'danger-zone' : '';
            }
        }
    }
});

app.mount("#game");
