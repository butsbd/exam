// defines structure of application's model

export class Choice {
    constructor(public id: string,public value: string, public correct?: boolean,public questionId?:string) {}
}

export class Question {
    constructor(public label: string, public choices: Choice[]) {}
}

// represents data to load
export class Quiz {
    constructor(public label: string, public name: string, public description: string, public fileName: string) {}
}

// represents data app will collect each time user answers question
export class Answers {
    constructor(public values: Choice[] = []) {}
}
