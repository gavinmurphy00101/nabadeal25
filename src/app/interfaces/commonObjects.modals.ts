export interface CreateBusiness{
    name: string;
    description: string;
    category: string;
    email: string;
    phone: string;
    website: string;
    contact_name:string;
}

export interface Marker{
    position: LatLng; 
    map: any;
    title:string;
    icon:string;
    category:string;
    name: string;
    description: string;
    activeDeal: boolean;
    currentDeal: {id:string};
    dealHistory: string[];
    id: string;
    businessPhone: string;
    businessEmail: string;
    businessWebsite: string;
}

export interface MenuItems{
    name: string;
    slug: string;
    icon: string;
}

export interface LatLng{
    lat: number; 
    lng: number;
}