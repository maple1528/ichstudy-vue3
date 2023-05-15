export interface IUser {
  username: string
  password: string
}

export interface IMailBind {
  email: string
  username: string
}

export interface IMailVerify {
  email: string
  username: string
  code: string
}

export interface ISMSBind {
  phone: string
  username: string
}

export interface ISMSVerify {
  phone: string
  username: string
  code: string
}

export interface ITourist {
  action: string
  uindex: string
  tsindex: string
  tindex: string
  mates: string
  phone_number: string
  remarks: string
}

export interface IUpload {
  action: string
  cindex: string
  sindex: string
  ctime: number
}
