
import { INodeSkillConfiguration, NodeSkill } from 'dotup-ts-node-skills';
import { AddToListIntent } from './Intents/AddToListIntent';
import { NameTestIntent } from './NameTestIntent';

console.log('loading dotup-sample-skill');

const config: INodeSkillConfiguration = {
  Id: '',
  Name: 'dotup-sample-skill',
  LogRequest: false,
  LogResponse: false,
  EnableCallstack: true
};

const skill: NodeSkill = new NodeSkill(config);

// skill.AddSessionList('Spieler');
skill.AddBuiltInHandler();

// skill.AddSessionList('testlitst');
// skill.AddSessionList()

skill.AddIntentHandler(new NameTestIntent());
skill.AddIntentHandler(new AddToListIntent());

export const handler = skill.handler();
