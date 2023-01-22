export interface IUser {
  username: string,
  password: string
}

export interface IMailBind {
  email: string,
  username: string
}

export interface IMailVerify {
  email: string,
  username: string
  code: string
}

export interface ISMSBind {
  phone: string,
  username: string
}

export interface ISMSVerify {
  phone: string,
  username: string
  code: string
}
