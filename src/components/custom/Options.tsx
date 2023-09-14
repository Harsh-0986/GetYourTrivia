import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useState} from "react";
import {Input} from "@/components/ui/input";
import QuestionsList from "@/components/custom/QuestionsList";

const categories = [
    {
        label: "General Knowledge",
        value: 9
    },
    {
        label: "Entertainment: Books",
        value: 10
    },
    {
        label: "Entertainment: Film",
        value: 11
    },
    {
        label: "Entertainment: Music",
        value: 12
    },
    {
        label: "Entertainment: Musicals & Theatres",
        value: 13
    },
    {
        label: "Entertainment: Television",
        value: 14
    },
    {
        label: "Entertainment: Video Games",
        value: 15
    },
    {
        label: "Entertainment: Board Games",
        value: 16
    },
    {
        label: "Science & Nature",
        value: 17
    },
    {
        label: "Science: Computers",
        value: 18
    },
    {
        label: "Science: Mathematics",
        value: 19
    },
    {
        label: "Mythology",
        value: 20
    },
    {
        label: "Sports",
        value: 21
    },
    {
        label: "Geography",
        value: 22
    },
    {
        label: "History",
        value: 23
    },
    {
        label: "Politics",
        value: 24
    },
    {
        label: "Art",
        value: 25
    },
    {
        label: "Celebrities",
        value: 26
    },
    {
        label: "Animals",
        value: 27
    },
    {
        label: "Vehicles",
        value: 28
    },
    {
        label: "Entertainment: Comics",
        value: 29
    },
    {
        label: "Science: Gadgets",
        value: 30
    },
    {
        label: "Entertainment: Japanese Anime & Manga",
        value: 31
    },
    {
        label: "Entertainment: Cartoon & Animations",
        value: 32
    },
    {
        label: "Any Category",
        value: 0
    }
]
const difficultyLevel = [
    {
        label: "Easy",
        value: "easy"
    },
    {
        label: "Medium",
        value: "medium",
    },
    {
        label: "Hard",
        value: "hard"
    }
]
const questionType = [
    {
        label: "Multiple Choice",
        value: "multiple"
    },
    {
        label: "True/False",
        value: "boolean"
    }
]

const Options = () => {
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState(null);
    const [questionsNumber, setQuestionsNumber] = useState(5);
    const [categoryOpen, setCategoryOpen] = useState(false)
    const [categoryValue, setCategoryValue] = useState("")
    const [difficultyOpen, setDifficultyOpen] = useState(false)
    const [difficultyValue, setDifficultyValue] = useState("")
    const [questionOpen, setQuestionOpen] = useState(false)
    const [questionValue, setQuestionValue] = useState("")

    const chooseRandom = () => {
        setCategoryValue(categories[Math.floor(Math.random() * categories.length)].label.toLowerCase())
        setDifficultyValue(difficultyLevel[Math.floor(Math.random() * difficultyLevel.length)].label.toLowerCase())
        setQuestionValue(questionType[Math.floor(Math.random() * questionType.length)].label.toLowerCase())
    }

    const submit = async () => {
        const cValue = categories.find(category => category.label.toLowerCase() === categoryValue)?.value
        const dValue = difficultyLevel.find(category => category.label.toLowerCase() === difficultyValue)?.value
        const tValue = questionType.find(category => category.label.toLowerCase() === questionValue)?.value
        const url = `https://opentdb.com/api.php?amount=${questionsNumber}&category=${cValue}&difficulty=${dValue}&type=${tValue}`

        const response = await fetch(url)
        const responseJSON = await response.json()
        const responseCode = responseJSON?.response_code

        if (responseCode === 1) {
            setError("You asked for too many questions!")
            return
        }

        setQuestions(responseJSON?.results)
    }

    if (questions) {
        return <QuestionsList questions={questions}/>
    }

    return (
        <section>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-2 overflow-hidden"}>
                <div className={"flex w-full items-center justify-center"}>
                    <Input
                        type={"number"}
                        placeholder={"Number of questions"}
                        className="w-full"
                        value={questionsNumber}
                        onChange={(e) => setQuestionsNumber(Number(e.target.value))}
                    />
                </div>
                <div className={"flex w-full items-center justify-center"}>
                    <Popover
                        open={categoryOpen}
                        onOpenChange={setCategoryOpen}
                    >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={categoryOpen}
                                className="justify-between w-full"
                            >
                                {categoryValue
                                    ? categories.find((category) => {
                                        return category.label.toLowerCase() === categoryValue
                                    })?.label
                                    : "Select Category..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search Category..."/>
                                <CommandEmpty>No category found.</CommandEmpty>
                                <CommandGroup>
                                    {categories.map((category) => (
                                        <CommandItem
                                            key={category.value}
                                            onSelect={(currentValue) => {
                                                setCategoryValue(currentValue === categoryValue ? "" : currentValue)
                                                setCategoryOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    categoryValue === category.label.toLowerCase() ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {category.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className={"flex w-full items-center justify-center"}>
                    <Popover open={difficultyOpen} onOpenChange={setDifficultyOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={difficultyOpen}
                                className="justify-between w-full"
                            >
                                {difficultyValue
                                    ? difficultyLevel.find((category) => {
                                        return category.label.toLowerCase() === difficultyValue
                                    })?.label
                                    : "Select Difficulty Level..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search Difficulty Level..."/>
                                <CommandEmpty>No Level found.</CommandEmpty>
                                <CommandGroup>
                                    {difficultyLevel.map((category) => (
                                        <CommandItem
                                            key={category.value}
                                            onSelect={(currentValue) => {
                                                setDifficultyValue(currentValue === difficultyValue ? "" : currentValue)
                                                setDifficultyOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    difficultyValue === category.label.toLowerCase() ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {category.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className={"flex w-full items-center justify-center"}>
                    <Popover open={questionOpen} onOpenChange={setQuestionOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={questionOpen}
                                className="justify-between w-full"
                            >
                                {questionValue
                                    ? questionType.find((category) => {
                                        return category.label.toLowerCase() === questionValue
                                    })?.label
                                    : "Select Question Type..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Search Question Type..."/>
                                <CommandEmpty>No Type found.</CommandEmpty>
                                <CommandGroup>
                                    {questionType.map((category) => (
                                        <CommandItem
                                            key={category.value}
                                            onSelect={(currentValue) => {
                                                setQuestionValue(currentValue === questionValue ? "" : currentValue)
                                                setQuestionOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    questionValue === category.label.toLowerCase() ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {category.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
            <div className="flex items-center justify-between md:justify-end my-4 gap-2">
                <Button variant={"outline"} onClick={() => chooseRandom()}>Choose for me!</Button>
                <Button onClick={() => submit()}>Submit</Button>
            </div>
            <div className={"text-center my-4"}>
                <span className={"text-center font-bold text-red-500 text-xl"}>{error}</span>
            </div>
        </section>
    )
}
export default Options
