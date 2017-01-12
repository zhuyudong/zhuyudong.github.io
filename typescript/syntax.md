# 基础类型

```javascript
let isDone: boolean = false;
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let octalLiteral: number = 0o744;
let name: string = 'bob';
name = 'simith';
// 模板字符串
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;

let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
// 元组Tuple
let x: [string, number];
x = ['hello', 10];
// 数组越界，联合类型
x[3] = 'world';
x[6] = true; // Error，联合类型中只有string|number

// 默认undefined和null是所有类型的子类型
let u: undefined = undefined;
let u: null = null;
// 指定--strictNullChecks标记，null和undefined只能赋值给void和它们各自

//never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
  return error('Something failed');
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

//类型断言
let someValue: any = 'this is a String';
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```
