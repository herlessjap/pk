import { generateRefreshToken } from "../../utils/tokenManager"
import { UserSchema } from "../Schema/UserSchema"
import bcrypt from "bcryptjs"

interface Characteristics {
    height?: number
    weight?: number
    eyes?: string
    hair?: string
    fakeBoobs?: boolean
    birthday?: Date
    birthPlace?: string
    zodiac?: string
    measurements?: string
    orientation?: string
    ethnicity?: string
}

export class User implements UserSchema {
    id: string = ""
    email: string = ""
    password: string = ""
    username: string = ""
    name?: string
    price?: string
    age?: number
    phone?: string
    location?: string
    refreshToken?: string
    isPublic: boolean = false
    profilePhoto?: string
    bannerPhoto?: string
    description?: string
    referencePhotos?: Array<string>
    characteristics?: Characteristics
    tags?: Array<string>

    updateRefreshToken() {
        this.refreshToken = generateRefreshToken(this)
    }
    removeRefreshToken() {
        this.refreshToken = undefined
    }
    async isPasswordMatch(password: string) {
        return await bcrypt.compare(password, this.password)
    }

    setId(id: string) {
        this.id = id
        return this
    }
    setEmail(email: string) {
        this.email = email
        return this
    }
    setUsername(username: string) {
        this.username = username
        return this
    }

    setDescription(description?: string) {
        this.description = description
        return this
    }

    setPassword(password: string) {
        this.password = password
        return this
    }
    setPublic(_public: boolean) {
        this.isPublic = _public
        return this
    }
    setName(name?: string) {
        this.name = name
        return this
    }
    setPrice(price?: string) {
        this.price = price
        return this
    }
    setAge(age?: number) {
        this.age = age
        return this
    }
    setPhone(phone?: string) {
        this.phone = phone
        return this
    }
    setLocation(location?: string) {
        this.location = location
        return this
    }
    setRefreshToken(refreshToken?: string) {
        this.refreshToken = refreshToken
        return this
    }
    setProfilePhoto(profilePhoto?: string) {
        this.profilePhoto = profilePhoto
        return this
    }
    setBannerPhoto(bannerPhoto?: string) {
        this.bannerPhoto = bannerPhoto
        return this
    }
    setReferencePhotos(referencePhotos?: Array<string>) {
        this.referencePhotos = referencePhotos
        return this
    }
    setCharacteristics(characteristics?: Characteristics) {
        this.characteristics = characteristics
        return this
    }
    setTags(tags?: Array<string>) {
        this.tags = tags
        return this
    }
}
