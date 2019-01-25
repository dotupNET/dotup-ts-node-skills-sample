
import { NameTestIntent } from "./NameTestIntent";
import { NodeSkill, NodeSkillConfiguration } from "dotup-ts-node-skills";

console.log('loading dotup-sample-skill');

const config: NodeSkillConfiguration = {
  Id: '',
  Name: 'dotup-sample-skill',
  LogRequest: true,
  LogResponse: true
};

const skill = new NodeSkill(config);
skill.AddBuiltInHandler();

skill.AddIntentHandler(new NameTestIntent());

export const handler = skill.handler();
