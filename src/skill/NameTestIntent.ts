import { DisplayBuilder, TemplateType, TextKeys, SsmlBuilder, SoundLibrary, AlexaIntent  } from "dotup-ts-node-skills";
import { HandlerInput } from "ask-sdk-core";

enum SlotNames {
	name = 'name'
}

export class NameTestIntent extends AlexaIntent {

	constructor() {
		super('NameTestIntent');
	}

	handleRequest(handlerInput: HandlerInput) {
		const slot = this.getSlot(SlotNames.name);

		const ra = this.requestAttributes;

		// const speechText = t(Strings.HELP_MSG);
		const db = new DisplayBuilder();
		db.WithBodyTemplate(TemplateType.BodyTemplate2)
			.WithTitle(TextKeys.SKILL_NAME + " - Slot Typ AMAZON.DE_FIRST_NAME")
			// .WithPrimaryPlainText()
			.WithSecondaryPlainText("Slotwert: " + slot.value ? slot.value : "undefiniert");

		const x = db.Build() as any;

		const sb = new SsmlBuilder();
		const sl = new SoundLibrary();

		let speak: string;

		if (slot.value) {
			sb.AddText(`Der Vorname ${slot.value} wurde erkannt.`);
			sb.AddText("Sage einen deutschen Namen.")
			speak = sb.Build();
		} else {
			sb.AddSentence("Sage einen deutschen Namen.");
			sb.AddSentence("Hier ein Beispiel.");
			sb.AddSentence("Der Name Klaus.");

			speak = sb.Build();
		}

		return handlerInput.responseBuilder
			.speak(speak)
			.reprompt("nochmal?")
			.withSimpleCard(TextKeys.SKILL_NAME + " - Slot Typ AMAZON.DE_FIRST_NAME", "Vorname: " + slot.value)
			.addRenderTemplateDirective(x)
			.getResponse();
	}
}
