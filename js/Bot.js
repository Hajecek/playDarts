class DartsBot {
    constructor(level) {
        // Jména botů pro různé úrovně obtížnosti
        this.botNames = {
            easy: "Nathan Aspinall",
            medium: "Michael van Gerwen",
            hard: "Gerwyn Price",
            pro: "Luke Littler"
        };
        
        // Průměry pro různé úrovně obtížnosti
        this.averages = {
            easy: 40,
            medium: 60,
            hard: 80,
            pro: 100
        };
        
        // Procenta úspěšnosti zavírání pro různé úrovně
        this.checkoutPercentages = {
            easy: 0.3,    // 30% šance na zavření
            medium: 0.5,  // 50% šance na zavření
            hard: 0.7,    // 70% šance na zavření
            pro: 0.85     // 85% šance na zavření
        };
        
        this.level = level;
        this.name = this.botNames[level];
        this.targetAverage = this.averages[level];
        this.score = 501;
    }

    getCheckoutChance() {
        // Základní šance podle úrovně
        let baseChance = this.checkoutPercentages[this.level];
        
        // Upravené šance podle zbývajícího skóre
        if (this.score > 170) {
            return 0; // Nad 170 nelze zavřít
        } else if (this.score >= 150) {
            return {
                easy: 0.08,   // 8%
                medium: 0.15, // 15%
                hard: 0.25,   // 25%
                pro: 0.35     // 35%
            }[this.level];
        } else if (this.score >= 100) {
            return {
                easy: 0.15,   // 15%
                medium: 0.25, // 25%
                hard: 0.40,   // 40%
                pro: 0.55     // 55%
            }[this.level];
        } else if (this.score >= 50) {
            return {
                easy: 0.20,   // 20%
                medium: 0.35, // 35%
                hard: 0.55,   // 55%
                pro: 0.70     // 70%
            }[this.level];
        }
        
        // Pod 50 bodů používáme původní šance
        return baseChance;
    }

    throwDarts() {
        const baseScore = this.targetAverage;
        const variance = {
            easy: 20,
            medium: 15,
            hard: 12,
            pro: 10
        }[this.level];

        // Různé typy hodů s různými pravděpodobnostmi
        const throwType = Math.random();
        let score;

        if (throwType < 0.15) {
            // Výjimečně vysoký hod (140-180)
            score = Math.round(140 + Math.random() * 40);
        } else if (throwType < 0.3) {
            // Nadprůměrný hod (120-140)
            score = Math.round(120 + Math.random() * 20);
        } else if (throwType < 0.5) {
            // Průměrný hod okolo targetAverage
            score = Math.round(baseScore + (Math.random() * variance * 2 - variance));
        } else if (throwType < 0.7) {
            // Podprůměrný hod
            score = Math.round(baseScore * 0.7 + (Math.random() * 20));
        } else if (throwType < 0.85) {
            // Slabší hod
            score = Math.round(baseScore * 0.5 + (Math.random() * 15));
        } else {
            // Velmi slabý hod
            score = Math.round(baseScore * 0.3 + (Math.random() * 10));
        }

        // Zajistíme, že bot nehodí více než má k dispozici
        score = Math.min(score, this.score);
        
        // Logika pro zavírání pod 50 bodů
        if (this.score <= 50) {
            const doubles = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40];
            if (doubles.includes(this.score)) {
                if (Math.random() < this.getCheckoutChance()) {
                    score = this.score;
                } else {
                    score = Math.floor(this.score / 2);
                }
            } else {
                score = Math.min(score, this.score - 2);
            }
        }

        // Před finálním přiřazením score zkontrolujeme, zda je hodnota možná
        const impossibleScores = [163, 166, 169, 172, 173, 175, 176, 178, 179];
        if (impossibleScores.includes(score)) {
            // Pokud je score nemožné, snížíme ho na nejbližší možnou hodnotu
            score = score - 1;
            while (impossibleScores.includes(score)) {
                score--;
            }
        }

        // Zajistíme, že score není záporné nebo null/undefined
        score = Math.max(0, Math.min(score, this.score));
        
        // Aktualizujeme skóre bota pouze pokud máme platné score
        if (score > 0) {
            this.score = Math.max(0, this.score - score);
        }

        return score;
    }

    resetScore() {
        this.score = 501;
    }
}
