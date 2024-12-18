@Entry
@Component
struct Index {
  @State message: string = 'Hello World';

  build() {
    Column() {
      Text(this.message)
        .id('HelloWorld')
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .alignRules({
          center: { anchor: '__container__', align: VerticalAlign.Center },
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })
        .onClick((ev) => {
          this.message = this.message + `1`
        })
      Text('111').alignSelf(ItemAlign.Start)
      Text('222').alignSelf(ItemAlign.End)
      Text('333').alignSelf(ItemAlign.Center)

    }.width('100%')
  }

}