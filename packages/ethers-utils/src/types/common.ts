import { ResolvedRegister } from "abitype";

export type Hex = `0x${string}`;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type MaybePartial<
  type,
  enabled extends boolean | undefined,
> = enabled extends true ? Prettify<ExactPartial<type>> : type;

export type ExactPartial<type> = {
  [key in keyof type]?: type[key] | undefined;
};

export type IsUnion<union, union2 = union> = union extends union2
  ? [union2] extends [union]
    ? false
    : true
  : never;

export type Widen<type> =
  | ([unknown] extends [type] ? unknown : never)
  | (type extends Function ? type : never)
  | (type extends ResolvedRegister["bigIntType"] ? bigint : never)
  | (type extends boolean ? boolean : never)
  | (type extends ResolvedRegister["intType"] ? number : never)
  | (type extends string
      ? type extends ResolvedRegister["addressType"]
        ? ResolvedRegister["addressType"]
        : type extends ResolvedRegister["bytesType"]["inputs"]
          ? ResolvedRegister["bytesType"]
          : string
      : never)
  | (type extends readonly [] ? readonly [] : never)
  | (type extends Record<string, unknown>
      ? { [K in keyof type]: Widen<type[K]> }
      : never)
  | (type extends { length: number }
      ? {
          [K in keyof type]: Widen<type[K]>;
        } extends infer Val extends readonly unknown[]
        ? readonly [...Val]
        : never
      : never);

export type UnionWiden<type> = type extends any ? Widen<type> : never;

export type UnionToTuple<
  union,
  ///
  last = LastInUnion<union>,
> = [union] extends [never] ? [] : [...UnionToTuple<Exclude<union, last>>, last]
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer l) => 0
  ? l
  : never
type UnionToIntersection<union> = (
  union extends unknown
    ? (arg: union) => 0
    : never
) extends (arg: infer i) => 0
  ? i
  : never