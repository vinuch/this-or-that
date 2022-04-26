import { context } from 'near-sdk-as';
import { Poll, listedPolls } from './model';

export function setPoll(poll: Poll): void {
    let existingPoll = listedPolls.get(poll.id);
    if(existingPoll !== null) {
        throw new Error(`a poll with ${poll.id} already exists`);
    }
    listedPolls.set(poll.id, Poll.fromPayload(poll));
}

export function getPoll(id: string): Poll | null {
    return listedPolls.get(id);
}

export function getPolls(): Poll[] {
    return listedPolls.values();
}

export function vote(pollId: string, contestantIndex: string): void {

    let poll = listedPolls.get(pollId);
    if(poll == null) {
        throw new Error(`poll with ${pollId} doesnt exists`);
    }
    if(poll.participants.includes(context.sender)) {
        throw new Error(`user  ${context.sender} has already voted`);

    }
    if(context.blockTimestamp > U64.parseInt(poll.deadline)) {
        throw new Error(`poll with id ${pollId} is expired`);
    }
   
    poll.vote(I32.parseInt(contestantIndex));
    poll.participants.push(context.sender);
    listedPolls.set(pollId, poll);
}

