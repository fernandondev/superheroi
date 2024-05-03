"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$npmConfigName1714435674378 = void 0;
let fs = require('fs');
class $npmConfigName1714435674378 {
    async up(queryRunner) {
        let ddlsHeroPower = fs.readFileSync('src/database/dataset-superheroi/03_hero_power.sql').toString();
        await queryRunner.query(ddlsHeroPower);
    }
    async down(queryRunner) {
    }
}
exports.$npmConfigName1714435674378 = $npmConfigName1714435674378;
//# sourceMappingURL=1714435674378-load-dataset-superheroi-hero-power.js.map