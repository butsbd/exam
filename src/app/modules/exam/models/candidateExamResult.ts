export interface CandidateExamResult {
    id:string;
    candidateId:string
    examId:string
    candidateName:string
    examName:string
    attemted:number
    notAttempted:number
    correctAnswerCount:number
    accuracy:number
 
}

export interface CandidateExamResultResponse {
    item1:CandidateExamResult[],
    item2:number
 
}
