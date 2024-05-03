"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$npmConfigName1714435674377 = void 0;
let fs = require('fs');
class $npmConfigName1714435674377 {
    async up(queryRunner) {
        let ddlsHeroAttribute = fs.readFileSync('src/database/dataset-superheroi/02_hero_attribute.sql').toString();
        await queryRunner.query(ddlsHeroAttribute);
    }
    async down(queryRunner) {
    }
}
exports.$npmConfigName1714435674377 = $npmConfigName1714435674377;
//# sourceMappingURL=1714435674377-load-dataset-superheroi-hero-attribute.js.map