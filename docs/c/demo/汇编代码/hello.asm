section .data
    hello: db 'hello world!/n',10;
    helloLen: equ $-hello ;'hello world' 字符串长度
section .text
    global _start
_start:
    mov ax,4;         4 : sys_write 系统调用号
    mov ebx,1;        1: 标准文件输出描述符
    mov ecx,hello;    放hello 字符串的首地址
    mov edx,helloLen;  hello 字符串长度
    int 80h;           软中断，陷入内核
    mov ax,1;          sys_exit 系统调用号
    mov ebx,0;         返回值， 0 表示没有错误 exit(0)
    int 80h;
