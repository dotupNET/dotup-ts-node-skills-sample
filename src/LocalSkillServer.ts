// tslint:disable-next-line:no-implicit-dependencies
import { SkillServer, SkillServerConfig } from 'dotup-ts-alexa-skill-server';

export class LocalSkillServer {
  private server: SkillServer;

  constructor() {
    this.server = new SkillServer(44303);
    this.server.configure((config: SkillServerConfig) => {
      config.RootPath = __dirname;
      config.SslPath = '../secrets/certs';
      config.SslPrivateKey = 'privkey1.pem';
      config.SslCertificate = 'cert1.pem';
      config.SslChain = 'chain1.pem';
    });

    // Add a skill by it's name
    // server.addSkill('ige-skill');

    // Add a skill from package.json file. the following line overrides the previous regsitration
  }

  Start(): void {
    this.server.addSkillFromPackage('skill');
    // server.addSkillFromPackage('ige-skill');

    // TODO: implement function ?
    // server.addAllSkillsFromPackage();
    this.server.start();

  }

}
