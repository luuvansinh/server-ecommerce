import { UserModel } from '../model'
import configs from '../configs'
import { to } from '../utils'

const adminRole = configs.roles.admin

const run = async () => {
  const { data } = await to(UserModel.countDocuments({ role: adminRole }))
  if (data) {
    // console.log('ACCOUNT CUSTOMERCARE is adready created')
  } else if (!process.env.ADMIN_PHONE || !process.env.ADMIN_EMAIL || !process.env.ADMIN_NAME) {
    console.log('The information to initialize the  admin account is not ready yet')
  } else {
    const user = new UserModel({
      name: process.env.ADMIN_NAME,
      phone: process.env.ADMIN_PHONE,
      email: process.env.ADMIN_EMAIL,
      role: adminRole,
    })
    const { error } = await to(user.save())
    if (!error) {
      console.log('ACCOUNT CUSTOMERCARE was init successfully with phone number', process.env.ADMIN_PHONE)
    }
  }
}

run()
