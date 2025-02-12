import { IconType } from 'react-icons'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface SidebarItemProps {
    icon: IconType
    label: string
    active?:boolean
    href: string
}

export default function SidebarItem({ icon: Icon, label, active, href }:SidebarItemProps) {
    return (
        <Link
            href={href}
            className={twMerge(`
                flex
                flex-row
                h-auto
                items-center
                w-full
                gap-x-4
                text-xl
                font-medium
                cursor-pointer
                transition
                hover:text-white
                text-neutral-400
                py-1
            `,
                active && 'text-white'
            )}
        >
            <Icon size={26} />
            <p className='truncate w-full'>
                {label}
            </p>
        </Link>
    )
}

