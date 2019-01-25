import { NodeSkill } from "../src/NodeSkill";

describe('AwesomeLibrary', () => {

  it('should create an instance', () => {
    const value = new NodeSkill({ Name: 'nice-skill' });
    expect(value).toBeTruthy();
  });

});
