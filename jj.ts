
export interface UserModel {
  name: string;
  age?: number;
  sex: number;
}

type JUserModel = Partial<UserModel>
type myPartial<T> = {[P in keyof T] ?: T[P]}
type testPartial = myPartial<UserModel>

type myRequired<T> = {[ K in keyof T] -?: T[K]}

type a = myRequired<UserModel>

const b: keyof any = 1

type myReadonly<T> = { readonly [ K in keyof T] : T[K] }

type c = myReadonly<UserModel>

type myRecord<K extends keyof any, T> = {[P in K ]: T }

type A = '1' | '2'
type d = myRecord<A, string>

type myPick<T, K extends keyof T> = { [P in K] : T[K]}

type e = myPick<UserModel, 'name'>

type myExclude<T, U> = T extends U ? never : T

type myOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type PickRequire<T, K extends keyof T> = Required<Pick<T, K>>

type g = PickRequire<UserModel, 'age'>
