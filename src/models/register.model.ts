
export class RegisterView {
    id: string
    buyAt: Date
    productName: string
    username: string
    cardName: string
    local: string
    value: number
    valueString: string
    actual: string

    constructor(register: any, month, year) {
        let installment = register.installments.find(item => item.paymentMonth === month && item.paymentYear == year)
        this.id = register._id
        this.buyAt = register.buyAt
        this.productName = register.productName
        this.username = register.user.completeName
        this.cardName = register.creditCard.name
        this.local = register.local
        this.value = (installment.value / 100)
        this.valueString = (installment.value).toFixed(2)
        this.actual = `(${installment.number}/${register.installmentNumber})`
    }
}