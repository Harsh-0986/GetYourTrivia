import "../../index.css"
import {convert, removeDuplicates, shuffle} from '@/utils/utils.ts'
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

interface propsType {
    questions: [
        {
            "category": string,
            "type": string,
            "difficulty": string,
            "question": string,
            "correct_answer": string,
            "incorrect_answers": string[]
        }
    ]
}

const QuestionsList = (props: propsType) => {

    const showOptions = (inc: string[], cor: string) => {
        let opts = inc
        opts.push(cor)
        opts = removeDuplicates(opts)
        return shuffle(opts)
        // return opts
    }

    const checkAnswer = (inc: string[], cor: string, index: number) => {
        const arrLength = inc.length
        console.log(arrLength)
        for (let index1 = 0; index1 <= Math.min(arrLength, 3); index1++) {
            const selDiv = document.getElementById(`div-${index.toString() + index1.toString()}`)
            const selOpt = document.getElementById(`label-${index.toString() + index1.toString()}`)
            console.log(`option-${index.toString() + index1.toString()}`)
            selDiv?.classList.remove("border-gray-100")
            if (selOpt?.innerText.toLowerCase() === cor.toLowerCase()) {
                selDiv?.classList.add("border-green-300")
            } else {
                selDiv?.classList.add("border-red-300")
            }

            if (!(navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i))) {
                window.scrollBy({
                    top: 20,
                    behavior: 'smooth'
                })
            }
        }
    }

    return (
        <main className={"mt-72"}>
            {
                props.questions.map((question, index) =>
                    <section key={index} className={"section-snap"}>
                    <span
                        className={"my-8 block text-xl border-b hover:border-gray-600 lg:text-2xl font-sans cursor-pointer"}
                    >
                        Question - {index + 1}
                    </span>
                        <span className={"block my-4"}>{convert(question.question)}</span>
                        <RadioGroup defaultValue="option-1">
                            {
                                showOptions(question.incorrect_answers, question.correct_answer)
                                    .map((option: string, index1: number) => (
                                        <div
                                            key={`${index.toString()} + ${index1.toString()}`}
                                            id={`div-${index.toString() + index1.toString()}`}
                                            className="flex items-center space-x-2 my-1 px-4 border border-gray-100 hover:border-gray-200 cursor-pointer py-4 rounded-md">
                                            <RadioGroupItem value={`option-${index.toString() + index1.toString()}`}
                                                            id={`option-${index.toString() + index1.toString()}`}/>
                                            <Label className={"cursor-pointer"}
                                                   id={`label-${index.toString() + index1.toString()}`}
                                                   htmlFor={`option-${index.toString() + index1.toString()}`}>
                                                {convert(option)}
                                            </Label>
                                        </div>
                                    ))
                            }
                            <Button
                                key={index}
                                onClick={() => checkAnswer(question.incorrect_answers, question.correct_answer, index)}
                                className={"justify-self-end w-[45%] md:w-[30%]"} variant={"outline"}>Check
                                Answer!</Button>
                        </RadioGroup>
                    </section>
                )
            }
            <section className={"section-snap flex items-center justify-center flex-col gap-4"}>
                <span className={"font-bold text-xl"}>Congratulations on completing your trivia!</span>
                <Button className={""} variant={"outline"} onClick={() => location.reload()}>Take another
                    trivia!</Button>
            </section>
        </main>
    )
}
export default QuestionsList
