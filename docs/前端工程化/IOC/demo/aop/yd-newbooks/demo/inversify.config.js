import {Container} from 'inversify'
import {Joseph, Zhijia} from './entities'
import {Student, Teacher, Classroom} from './interface'

const container = new Container()

container.bind<Student>(TYPES.Student).to(Joseph)
container.bind<Teacher>(TYPES.Teacher).to(Zhijia)
container.bind<Classroom>(TYPES.Classroom).to(Yd)


export default container