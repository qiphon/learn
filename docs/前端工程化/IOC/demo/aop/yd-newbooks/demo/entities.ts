// 实体类

import { Student, Teacher, Classroom } from "./interface";
import { injectable, inject } from 'inversify'
import TYPES from "./types";

@injectable()
class Joseph implements Student {
    public learn (){
        return '努力学习'
    }
}


@injectable()
class Zhijia implements Teacher {
    teaching(): string {
        return '高级前端'
    }
}


// 目前实现的目的是 IOC 方式是 DI
@injectable()
class Yd implements Classroom {
    private __joseph: Joseph
    private __zhijia: Zhijia
    constructor({ 
        @inject(TYPES.Student) joseph: Student, 
        @inject(TYPES.Teacher) zhijia: Teacher
    }){
        // DI  aop 是用来辅助 DI 
        this.__joseph = joseph
        this.__zhijia = zhijia
    }
    study(): string {
        // 没能实现高内聚 低耦合  解决这个？ IOC
        return this.__zhijia.teaching() + this.__joseph.learn()
    }
    
}

export {
    Zhijia,
    Joseph,
    Yd
}