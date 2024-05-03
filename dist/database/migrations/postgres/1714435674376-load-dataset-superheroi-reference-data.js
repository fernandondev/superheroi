"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$npmConfigName1714435674376 = void 0;
let fs = require('fs');
class $npmConfigName1714435674376 {
    async up(queryRunner) {
        let ddlsReferenceData = fs.readFileSync('src/database/dataset-superheroi/01_reference_data.sql').toString();
        await queryRunner.query(ddlsReferenceData);
    }
    async down(queryRunner) {
    }
}
exports.$npmConfigName1714435674376 = $npmConfigName1714435674376;
//# sourceMappingURL=1714435674376-load-dataset-superheroi-reference-data.js.map