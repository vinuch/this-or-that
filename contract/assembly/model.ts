import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

// @nearBindgen
// class Contestant {
//   name: string;
//   votes: u128;
//   description: string;
//   public static fromPayload(payload: Contestant): Contestant {
//     const contestant = new Contestant();
//     contestant.name = payload.name;
//     contestant.votes = payload.votes;
//     contestant.description = payload.description;
//     return contestant;
//   }
// }
@nearBindgen
export class Contestant {
    name: string;
    votes: u32;

    constructor(){}
}
@nearBindgen
export class Poll {
  id: string;
  prompt: string;
  contestants: Contestant[];
  participants: string[];
  created: string;
  deadline: string;
  owner: string;
  public static fromPayload(payload: Poll): Poll {
    const poll = new Poll();
    poll.id = payload.id;
    poll.prompt = payload.prompt;
    poll.participants = payload.participants;
    poll.contestants = payload.contestants;
    poll.created = payload.created;
    poll.deadline = payload.deadline;
    poll.owner = context.sender;
    return poll;
  }
  public vote(contestantIndex: i32): void {
    let contestant = this.contestants[contestantIndex];
    if(contestant === null) {
      throw new Error(`contestant with ${contestantIndex} doesnt exists`);
    }
    contestant.votes = contestant.votes + 1;
  }
}

export const listedPolls = new PersistentUnorderedMap<string, Poll>("poll");
