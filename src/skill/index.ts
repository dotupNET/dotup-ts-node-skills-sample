
import { INodeSkillConfiguration, NodeSkill } from 'dotup-ts-node-skills';
import { NameTestIntent } from './NameTestIntent';

console.log('loading dotup-sample-skill');

const config: INodeSkillConfiguration = {
  Id: '',
  Name: 'dotup-sample-skill',
  LogRequest: true,
  LogResponse: true
};

const skill: NodeSkill = new NodeSkill(config);
skill.AddBuiltInHandler();

skill.AddIntentHandler(new NameTestIntent());

export const handler = skill.handler();
