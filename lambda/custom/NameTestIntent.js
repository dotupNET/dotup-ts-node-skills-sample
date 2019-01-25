"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotup_ts_node_skills_1 = require("dotup-ts-node-skills");
var SlotNames;
(function (SlotNames) {
    SlotNames["name"] = "name";
})(SlotNames || (SlotNames = {}));
class NameTestIntent extends dotup_ts_node_skills_1.AlexaIntent {
    constructor() {
        super('NameTestIntent');
    }
    handleRequest(handlerInput) {
        const slot = this.getSlot(SlotNames.name);
        const ra = this.requestAttributes;
        const db = new dotup_ts_node_skills_1.DisplayBuilder();
        db.WithBodyTemplate(dotup_ts_node_skills_1.TemplateType.BodyTemplate2)
            .WithTitle(dotup_ts_node_skills_1.TextKeys.SKILL_NAME + " - Slot Typ AMAZON.DE_FIRST_NAME")
            .WithSecondaryPlainText("Slotwert: " + slot.value ? slot.value : "undefiniert");
        const x = db.Build();
        const sb = new dotup_ts_node_skills_1.SsmlBuilder();
        const sl = new dotup_ts_node_skills_1.SoundLibrary();
        let speak;
        if (slot.value) {
            sb.AddText(`Der Vorname ${slot.value} wurde erkannt.`);
            sb.AddText("Sage einen deutschen Namen.");
            speak = sb.Build();
        }
        else {
            sb.AddSentence("Sage einen deutschen Namen.");
            sb.AddSentence("Hier ein Beispiel.");
            sb.AddSentence("Der Name Klaus.");
            speak = sb.Build();
        }
        return handlerInput.responseBuilder
            .speak(speak)
            .reprompt("nochmal?")
            .withSimpleCard(dotup_ts_node_skills_1.TextKeys.SKILL_NAME + " - Slot Typ AMAZON.DE_FIRST_NAME", "Vorname: " + slot.value)
            .addRenderTemplateDirective(x)
            .getResponse();
    }
}
exports.NameTestIntent = NameTestIntent;
//# sourceMappingURL=NameTestIntent.js.map