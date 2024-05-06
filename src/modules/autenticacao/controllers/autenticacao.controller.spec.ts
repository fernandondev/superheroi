import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from '../services/autenticacao.service';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { LogModule } from 'src/common/log/log.module';
import { AutenticacaoGuard } from 'src/common/guards/autenticacao/autenticacao.guard';
import { CanActivate } from '@nestjs/common';
import { AutenticacaoResponseDto } from '../dtos/autenticacao.response.dto';
import { AutenticacaoLoginRequestDto } from '../dtos/autenticacao.login.request.dto';

describe('AutenticacaoController', () => {
  let controller: AutenticacaoController;
  let autenticacaoService: AutenticacaoService;

  let autenticacaoResponseDto = new AutenticacaoResponseDto();
  autenticacaoResponseDto.access_token = "testeaccess";
  autenticacaoResponseDto.refresh_token = "testerefresh";
  autenticacaoResponseDto.expiresIn = 10;

  let autenticacaoLoginRequestDto = new AutenticacaoLoginRequestDto();
  autenticacaoLoginRequestDto.cpf = "111.111.111-11";
  autenticacaoLoginRequestDto.senha = "testesenha";

  beforeEach(async () => {

    const mock_ForceFailGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutenticacaoController],
      providers: [
        {
          provide: AutenticacaoService,
          useValue: {
            login: jest.fn().mockResolvedValue(autenticacaoResponseDto), 
            logout: jest.fn(),
            inativarUsuario: jest.fn(),
            reautenticar: jest.fn()
          }
        },
      ]
    })
    .overrideGuard(AutenticacaoGuard).useValue(mock_ForceFailGuard)
    .compile();

    controller = module.get<AutenticacaoController>(AutenticacaoController);
    autenticacaoService = module.get<AutenticacaoService>(AutenticacaoService);
  });

  it('Deve ser inicializado', () => {
    expect(controller).toBeDefined();
    expect(autenticacaoService).toBeDefined();
  });


  describe('login', () => {
    it('deve retornar AutenticacaoResponseDto', async () => {
      //Ação
      const resultado = await controller.login(autenticacaoLoginRequestDto);

      //Asserção
      expect(resultado).toEqual(autenticacaoResponseDto);
      expect(autenticacaoService.login).toHaveBeenCalledTimes(1);

    });

    it('deve lançar uma exceção', async() => {
      //Arrange
      jest.spyOn(autenticacaoService, 'login').mockRejectedValueOnce(new Error());

      //Asserção
      expect(controller.login).rejects.toThrowError();
    });
  });

});
