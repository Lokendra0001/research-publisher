import ContactUs from '@/components/common/ContactUs'
import { PAGE_TITLES } from '@/utils/constant'
import React from 'react'

export const metadata = {
  title: PAGE_TITLES.CONTACT,
}

const page = () => {
  return (
    <ContactUs />
  )
}

export default page