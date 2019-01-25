import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { AlexaIntent, DisplayBuilder, SoundLibrary, SsmlBuilder, TemplateType, TextKeys } from 'dotup-ts-node-skills';

enum SlotNames {
  name = 'name'
}

export class NameTestIntent extends AlexaIntent {

  constructor() {
    super('NameTestIntent');
  }

  handleRequest(handlerInput: HandlerInput): Response | Promise<Response> {
    const slot = this.getSlot(SlotNames.name);

    const ra = this.requestAttributes;

    // const speechText = t(Strings.HELP_MSG);
    const slotValue = slot.value ? slot.value : 'undefiniert';
    const db = new DisplayBuilder();
    db.WithBodyTemplate(TemplateType.BodyTemplate2)
      .WithTitle(`${TextKeys.SKILL_NAME} - Slot Typ AMAZON.DE_FIRST_NAME`)
      // .WithPrimaryPlainText()
      .WithSecondaryPlainText(`Slotwert: ${slotValue}`);

    const x = db.Build();

    const sb = new SsmlBuilder();
    const sl = new SoundLibrary();

    let speak: string;

    if (slot.value) {
      sb.AddText(`Der Vorname ${slot.value} wurde erkannt.`);
      sb.AddText('Sage einen deutschen Namen.');
      speak = sb.Build();
    } else {
      sb.AddSentence('Sage einen deutschen Namen.');
      sb.AddSentence('Hier ein Beispiel.');
      sb.AddSentence('Der Name Klaus.');

      speak = sb.Build();
    }

    return handlerInput.responseBuilder
      .speak(speak)
      .reprompt('nochmal?')
      .withSimpleCard(`${TextKeys.SKILL_NAME} - Slot Typ AMAZON.DE_FIRST_NAME`, `Vorname: ${slot.value}`)
      .addRenderTemplateDirective(x)
      .getResponse();

  }
}
