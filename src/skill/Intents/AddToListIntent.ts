import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { AlexaIntent, SsmlBuilder } from 'dotup-ts-node-skills';

enum SlotNames {
  newListItem = 'name'
}

export class AddToListIntent extends AlexaIntent {

  constructor() {
    super('AddToListIntent');
  }

  handleRequest(handlerInput: HandlerInput): Response | Promise<Response> {
    const newListItemSlot = this.getSlot(SlotNames.newListItem);

    // const list = this.getList('d');
    // this.getSessionList();

    // const speechText = t(Strings.HELP_MSG);
    const newListItemSlotValue = newListItemSlot.value ? newListItemSlot.value : undefined;

    let speak: string;

    const sb = new SsmlBuilder();

    if (newListItemSlot.value) {
      sb.AddText(`Der Vorname ${newListItemSlot.value} wurde erkannt.`);
      sb.AddText('Sage einen deutschen Namen.');
      speak = sb.Build();
    } else {
      sb.AddSentence('Ups.');
      sb.AddSentence('Hier ein Beispiel.');
      sb.AddSentence('Der Name Klaus.');

      speak = sb.Build();
    }

    return handlerInput.responseBuilder
      .speak(speak)
      .reprompt('nochmal?')
      // .withSimpleCard(`${TextKeys.SKILL_NAME} - Slot Typ AMAZON.DE_FIRST_NAME`, `Vorname: ${slot.value}`)
      // .addRenderTemplateDirective(x)
      .getResponse();

  }
}
