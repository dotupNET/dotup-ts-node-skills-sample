"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NameTestIntent_1 = require("./NameTestIntent");
const dotup_ts_node_skills_1 = require("dotup-ts-node-skills");
console.log('loading dotup-sample-skill');
const config = {
    Id: '',
    Name: 'dotup-sample-skill',
    LogRequest: true,
    LogResponse: true
};
const skill = new dotup_ts_node_skills_1.NodeSkill(config);
skill.AddBuiltInHandler();
skill.AddIntentHandler(new NameTestIntent_1.NameTestIntent());
exports.handler = skill.handler();
//# sourceMappingURL=index.js.map