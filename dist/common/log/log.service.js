"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const LogEntity_1 = require("../../database/entities/mongo/LogEntity");
const typeorm_2 = require("typeorm");
const log_enum_1 = require("./models/enums/log.enum");
let LogService = class LogService {
    constructor(connection) {
        this.connection = connection;
        this.logger = new common_1.Logger('Log');
    }
    async gravarLog(conteudo, level) {
        const logEntity = new LogEntity_1.LogEntity();
        logEntity.conteudo = conteudo;
        logEntity.createdAt = new Date();
        logEntity.level = level;
        let mongoRepository = this.connection.getMongoRepository(LogEntity_1.LogEntity);
        mongoRepository.save(logEntity);
        if (level === log_enum_1.LogEnum.ERROR) {
            this.logger.error(conteudo);
        }
        else if (level === log_enum_1.LogEnum.WARNING) {
            this.logger.warn(conteudo);
        }
        else if (level === log_enum_1.LogEnum.INFO) {
            this.logger.verbose(conteudo);
        }
    }
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)('MONGO_DB')),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], LogService);
//# sourceMappingURL=log.service.js.map