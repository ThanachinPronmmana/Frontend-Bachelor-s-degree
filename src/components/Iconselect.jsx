import { House } from 'lucide-react';
import { Hotel } from 'lucide-react';
import { LandPlot } from 'lucide-react';
import { Breadcrumb, BreadcrumbLink } from './ui/breadcrumb';
import { Link } from 'react-router';
const Iconselect = () => {
    return (
        <div className='flex space-x-8 '>
            <Hotel className="mr-3" />
            <BreadcrumbLink href="">Condo</BreadcrumbLink>
            <House className="mr-3" />
            <BreadcrumbLink href="">House</BreadcrumbLink>
            <LandPlot className="mr-3" />
            <BreadcrumbLink href="">Land</BreadcrumbLink>
        </div>
    )
}
export default Iconselect