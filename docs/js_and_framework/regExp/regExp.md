# 正则表达式

## 定义重复的较短方法

我们知道 ``` * ``` 可以使表达式匹配 0 次或多次。着相当于 ``` {o,} ```。实际上还有其他更短的形式，使用他们可以更加优雅，更短。

### 一次或多个重复

使用 ``` + ```,我们可以表示该表达式可能匹配一次或多次。这类似于星号，但是这里必须至少匹配一次。等效于 ``` {1,} ```

```js
/1+23/.test('123')   // true 
/1+23/.test('11111123')   // true 
/1+23/.test('23')   // false 

```

这意味着 ``` /.+/ ```,匹配至少出现一次的任何字符。

```js
/.+/.test('') // false

/.*/.test('') // true

```
例如检查一个字符串是否包含另外一个字符串，但是不以它结尾：

```js

// function checks if the string contains question marks,
// but does not end with it
function hasQuestionMarkBeforeEnd(str){
    return /\?.+/.test(str)
}

hasQuestionMarkBeforeEnd('Do you know regex yet?'); // false
hasQuestionMarkBeforeEnd('Do you know regex yet? Yes, I do!'); // true

```
在这里，问号是个特殊字符，因此我们需要在其前面加一个反斜杠。
可以写一个更加通用的函数：

```js

function hasQuestionMarkBeforeEnd(str, pattern){
    return RegExp(`${pattern}.+`).test(str)
}

hasQuestionMarkBeforeEnd('cat, dog', 'cat')  // true
hasQuestionMarkBeforeEnd('cat, dog', 'dog')  // false

```

## 可选字符

如上所述，问号是个特殊字符。使用它可以创建带有可选字符的模式。它相当于 ``` {0,1} ```

```js
function wereFilesFound(str){
    return /[1-9][0-9]* files? found/.test(str)
}

wereFilesFound('0 files found')  // false
wereFilesFound('No files found')  // false
wereFilesFound('1 file found')  // true
wereFilesFound('2 files found')  // true

```

## 用较短的方法定义一组可能出现的字符

以前我们使用方括号 ```[] ``` 来定义一组可能出现的字符。在正则表达式中，你可以参考一些实现的集合。

### 字母数字字符

如果想匹配所有的字母和数字， 则需要这样的模式： ``` /A-Za-z0-9/ ```,这相当复杂不是吗？不过，有一种更短的方法： ``` \w ```。 注意！它们都不能匹配任何特定语言的字符

### 非字母数字字符

与上述模式相反： ``` /^A-Za-z0-9/ ```。等价于 ``` \W ``` 。它有相同的缺陷，不能处理特定语言的字符

```js

function isAlphanumeric(str){
    return /\w/.test(str)
}
function isNotAlphanumeric(str){
    return /\W/.test(str)
}

isAlphanumeric('Ó'); // false
isNotAlphanumeric('Ó'); // true

```

### 处理数字

之前我们了解到要匹配任何数字，我们可以使用类似 ``` [0-9] ``` 的模式。 还可以使用 ``` \d ``` 。它能匹配任何数字：

```js
function 1isItADigit(string) {
    return /\d/.test(string)
}

1isItADigit('5') // true
1isItADigit('a') // false

```
在某些实现中（包括js）， ``` \d ``` 只表示 ``` [0-9] ``` 。在某些情况下，它可以匹配任何Unicode 数字字符，例如阿拉伯数字。

使用 ``` \D ``` 能够匹配任何非数字字符。

### 空格处理

在字符串中，有几种类型的空格字符：

空格 ” ”

tab “/t”

新行 “\n”

回车符 “\r”


要创建一个匹配所有情况的模式，需要类似这样的复杂内容：/[\t\n\r]/。不过，有一种更简单的方法，它涉及使用 \s（小写s）：

```js
function containsWhitespace(string) {
  return /\s/.test(string);
}

containsWhitespace('Lorem ipsum'); // true
containsWhitespace('Lorem_ipsum'); // false

```
另外 \S (大写S)可以匹配任何非空白字符。

## 指定位置

到目前为止，只是在单纯可以在字符串中进行匹配模式。我们还可以指定位置使匹配更精确。

### 插入符号

如果在模式的开头添加 ``` ^ ``` 符号，则仅当被测试的字符串以该模式开头时，它才会匹配：

```js
/^dog/.test('dog and cat')  // true

/^dog/.test('cat and dog')  // false

```

注意：插入符号用在方括号中时有另外的作用

### 美元符号

在模式的末尾添加一个美元符号，仅当它出现在字符串的末尾时，它才会匹配

```js
/dog$/.test('dog and cat')   // false

/dog$/.test('cat and dog')   // true

```

### 结合这两个标志

如果你的模式以 ^ 开头，并以 $ 结尾，则仅当测试的字符串整体匹配时，它才会匹配：

```js
/success/.test('Unsuccessful operation'); // true
/^success$/.test('Unsuccessful operation'); // false

```
即使在测试的字符串中可以找到字符串 “success”，将模式包含在 ^ 和 $ 中也会使它仅在整个字符串匹配时才匹配。

```js
function areAllCharactersDigits(string) {
  return /^[0-9]+$/.test(string);
}

```

这个例子检查字符串是否仅包含数字。使用加号会使它匹配一位或多位数字。如果在字符串的开头到结尾之间有数字，并且没有其他内容，则将模式用 ^ 和 $ 括起来能够确保仅匹配表达式。

```js

areAllCharactersDigits('123'); // true
areAllCharactersDigits('Digits: 123'); // false

/[0-9]+/.test('Digits: 123');  // true


```

### 多行模式


我们已经了解到可以将其他标志添加到模式中。其中之一是由字母 m 表示的多行标志。它改变了插入符号和美元符号的含义。在多行模式下，它们代表一行的开头和结尾，而不是整个字符串。

```js
const pets = `
dog
cat
parrot and other birds
`;
/^dog$/m.test(pets)  // true
/^cat$/m.test(pets)  // true
/^parrot$/m.test(pets)  // false

```
我在这里用了模板字符串添加换行符。可以这样做：

```js
const pets = 'dog\ncat\nparrot and other birds';

/^dog$/m.test(pets)  // true
/^cat$/m.test(pets)  // true
/^parrot$/m.test(pets)  // false

```
由于使用了多行标志，因此是测试了多个行，而不测试了整个字符串。但是你会发现最后的测试仍然无法通过，因为最后一行包含的内容不只是“parrot”。