/* eslint-disable indent */
import { Roles } from '@/models/roles'

export const login = async (username: string, password: string): Promise<Roles | null> => {
  switch (username) {
    case 'admin':
      return Roles.ADMIN
    case 'dropshipper':
      return Roles.DROPSHIPPER

    case 'carrier':
      return Roles.CARRIER
    case 'customer':
      return Roles.CUSTOMER
    case 'supplier':
      return Roles.SUPPLIER
    default:
      return null
  }
}
