# EsLint报错收集

## Missing radix parameter。

1. 意思是：缺少一个基数根，也就是指 parseInt 的第二个参数没有指定；

1. parseInt的第二个参数有四种：2、8、10、16，分别对应二进制、八进制、十进制、十六进制；默认是：十进制；

## Expected an assignment or function call and instead saw an expression  no-unused-expressions

1. 意思是：期望一个赋值或函数调用，而是看到一个表达式的无解表达式

1. 说明你调用函数没有带括号 （一般可能会在计数器中出现）
