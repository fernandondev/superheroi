"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("@nestjs/config/dist");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./entities/postgres/usuario.entity");
(0, dotenv_1.config)();
const configService = new dist_1.ConfigService();
const dataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [usuario_entity_1.UsuarioEntity],
    migrations: [__dirname + '/migrations/postgres/*.ts'],
    synchronize: false
};
exports.default = new typeorm_1.DataSource(dataSourceOptions);
//# sourceMappingURL=typeOrm.migration-config.js.map