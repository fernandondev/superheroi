"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const dist_1 = require("@nestjs/config/dist");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const LogEntity_1 = require("./entities/mongo/LogEntity");
let DbModule = class DbModule {
};
exports.DbModule = DbModule;
exports.DbModule = DbModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRootAsync({
                name: 'POSTGRES',
                useFactory: async (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [__dirname + '/entities/postgres/**'],
                    migrations: [__dirname + '/migrations/postgres/*.ts'],
                    synchronize: false
                }),
                inject: [dist_1.ConfigService]
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                name: 'MONGO_DB',
                useFactory: async (configService) => ({
                    type: 'mongodb',
                    url: configService.get("DATABASE_MONGO_URL"),
                    entities: [LogEntity_1.LogEntity],
                    migrations: [__dirname + '/migrations/mongo/*.ts'],
                    synchronize: false
                }),
                inject: [dist_1.ConfigService]
            })
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], DbModule);
//# sourceMappingURL=db.module.js.map