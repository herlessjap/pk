import validator from "validator"
import UserDTO, { UserCreateDTO } from "../../Application/DTO/UserDTO"
import UserPresentationException from "../Exceptions/UserPresentationException"

abstract class UserValidator {
    protected readonly errors: string[]

    constructor() {
        this.errors = []
    }

    validate() {
        this.executeValidations()
        if (this.errors.length > 0) throw new UserPresentationException(this.errors)
    }

    abstract executeValidations(): void

    getErrors() {
        return this.errors
    }
    hasErrors() {
        return this.errors.length > 0
    }
}

export class UserCreateValidator extends UserValidator {
    private readonly _user: UserCreateDTO

    constructor(user: UserCreateDTO) {
        super()
        this._user = user
    }

    executeValidations(): void {
        this.validateEmail()
        this.validateUsername()
        this.validatePassword()
    }

    validateEmail() {
        if (this._user.email === undefined || !validator.isEmail(this._user.email))
            this.errors.push("Invalid Email")
    }

    validateUsername() {
        if (this._user.username === undefined || this._user.username.length <= 0)
            this.errors.push("Invalid Username")
    }

    validatePassword() {
        if (this._user.password === undefined || this._user.password.length <= 0)
            this.errors.push("Invalid Password")
    }
}

export class UserUpdateValidator extends UserValidator {
    private readonly tagWhitelist: string[]
    private readonly user: UserDTO

    constructor(user: UserDTO, tagWhitelist: string[]) {
        super()
        this.user = user
        this.tagWhitelist = tagWhitelist
    }

    executeValidations(): void {
        this.validateAge()
        this.validateTags()
        this.validatePhone()
        this.validateLocation()
        this.validatePrice()
    }

    validateAge() {
        if (this.user.age === undefined || !validator.isNumeric(this.user.age)) {
            this.errors.push("Invalid Age")
        }
    }
    validateTags() {
        if (
            this.user.tags === undefined ||
            this.user.tags.some((v) => this.tagWhitelist.indexOf(v) < 0)
        )
            this.errors.push("Invalid Tags")
    }
    validatePhone() {
        if (this.user.phone === undefined || !validator.isMobilePhone(this.user.phone))
            this.errors.push("Invalid Phone Number")
    }
    validateLocation() {
        if (this.user.location === undefined || this.user.location.length < 0)
            this.errors.push("Invalid Location")
    }

    validatePrice() {
        if (this.user.price === undefined || !validator.isInt(this.user.price, { min: 50 }))
            this.errors.push("Invalid Price")
    }
}
