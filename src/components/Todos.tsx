import type { FormEvent, PropsWithChildren } from "react"

import { Cross1Icon } from "@radix-ui/react-icons"

import { a, useTransition } from "@react-spring/web"

import { Provider, atom, useAtom, useSetAtom } from "jotai"
import type { PrimitiveAtom } from "jotai"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "./ui/label"

type Todo = {
  title: string
  completed: boolean
}

const filterAtom = atom("all")
const todosAtom = atom<PrimitiveAtom<Todo>[]>([])
const filteredAtom = atom<PrimitiveAtom<Todo>[]>((get) => {
  const filter = get(filterAtom)
  const todos = get(todosAtom)
  if (filter === "all") return todos
  else if (filter === "completed")
    return todos.filter((atom) => get(atom).completed)
  else return todos.filter((atom) => !get(atom).completed)
})

type RemoveFn = (item: PrimitiveAtom<Todo>) => void
type TodoItemProps = {
  atom: PrimitiveAtom<Todo>
  remove: RemoveFn
}
const TodoItem = ({ atom, remove }: TodoItemProps) => {
  const [item, setItem] = useAtom(atom)
  const toggleCompleted = () =>
    setItem((props) => ({ ...props, completed: !props.completed }))
  return (
    <>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={toggleCompleted}
      />
      <span style={{ textDecoration: item.completed ? "line-through" : "" }}>
        {item.title}
      </span>
      <Cross1Icon onClick={() => remove(atom)} />
    </>
  )
}

type RadioProps = {
  id: string
  value: string
}

const Radio = (props: PropsWithChildren<RadioProps>) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={props.value} id={props.id} />
      <Label htmlFor={props.id}>{props.children}</Label>
    </div>
  )
}

const Filter = () => {
  const [filter, set] = useAtom(filterAtom)
  return (
    <RadioGroup
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)}
      value={filter}
    >
      <Radio id="all" value="all">
        All
      </Radio>
      <Radio id="completed" value="completed">
        Completed
      </Radio>
      <Radio id="incompleted" value="incompleted">
        Incompleted
      </Radio>
    </RadioGroup>
  )
}

type FilteredType = {
  remove: RemoveFn
}
const Filtered = (props: FilteredType) => {
  const [todos] = useAtom(filteredAtom)
  const transitions = useTransition(todos, {
    keys: (todo) => todo.toString(),
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
  })
  return transitions((style, atom) => (
    <a.div className="item" style={style}>
      <TodoItem atom={atom} {...props} />
    </a.div>
  ))
}

const TodoList = () => {
  // Use `useSetAtom` to avoid re-render
  // const [, setTodos] = useAtom(todosAtom)
  const setTodos = useSetAtom(todosAtom)
  const remove: RemoveFn = (todo) =>
    setTodos((prev) => prev.filter((item) => item !== todo))
  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = e.currentTarget.inputTitle.value
    e.currentTarget.inputTitle.value = ""
    setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })])
  }
  return (
    <form onSubmit={add}>
      <Filter />
      <input name="inputTitle" placeholder="Type ..." />
      <Filtered remove={remove} />
    </form>
  )
}

export default function Todos() {
  return (
    <Provider>
      <h1>Jōtai</h1>
      <TodoList />
    </Provider>
  )
}
