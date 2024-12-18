interface Company {
  id: number
  name: string
}

interface Person {
  id: number
  name: string
  adress: string
  company: Company
}

type R0 = Partial<Person>

type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object
  ? DeepPartial<T[U]>
  : T[U]
};

type R9 = DeepPartial<Person>