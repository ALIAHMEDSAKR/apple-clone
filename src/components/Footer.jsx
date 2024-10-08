import { footerLinks } from '../constants/index'

const Footer = () => {
  return (
    <footer className='py-5 sm:px-10 px-5'>
        <div className='screen-max-width'>
            <div>
                <p className='font-semibold text-gray text-sm'>More ways to shop {' '}
                <span className='underline text-blue cursor-pointer'>
                    Find an Apple Store{' '}
                </span>
                or {' '}
                <span className='underline text-blue cursor-pointer'>
                    other retailer
                </span>{' '}
                near you
                </p>
                <p className='font-semibold text-gray text-sm'>Or call us at (800) 692-7753</p>
            </div>
            <div className='bg-neutral-700 my-5 h-[1px] w-full' />
            <div  className='flex md:flex-row flex-col md:items-center justify-between'>
                <p className='font-semibold text-gray text-sm'>Copyright © 2024 Ali Sakr Inc. All rights reserved.</p>
                <div className='flex my-5'>
                        {footerLinks.map((link, i) => (
                    <p key={link} className="font-semibold text-gray text-xs">
                        {link}{' '}
                        {i !== footerLinks.length - 1 && (
                        <span className="mx-2"> | </span>
                        )}
                    </p>
                    ))}
                </div>
            </div>
        </div>
    </footer >
  )
}

export default Footer
