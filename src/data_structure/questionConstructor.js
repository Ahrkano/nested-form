export class Question {
    constructor(id, question, type, condition, anchorLevel) {
        this.id = id;
        this.question = question;
        this.type = type;
        this.condition = condition;
        this.anchorLevel = anchorLevel;
    }
}